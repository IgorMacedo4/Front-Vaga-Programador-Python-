// src/components/ChatWebScraper.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import apiWebScrapper from '../services/api_webscrapper';

const ChatWebScraper = () => {
  const [url, setUrl] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  // Guarda o conteúdo completo (texto limpo) capturado para download
  const [fullContent, setFullContent] = useState('');
  const [mensagens, setMensagens] = useState([]);
  const [mensagemInput, setMensagemInput] = useState('');
  const [loading, setLoading] = useState(false);
  // Controle para indicar que o chat está aguardando input para salvamento
  const [awaitingSave, setAwaitingSave] = useState(false);
  // Controle para exibir as opções de download (botões)
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);

  // Ref para o scroll da área de mensagens
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensagens]);

  // Define a URL e obtém a análise (conteúdo limpo)
  const handleSetUrl = async (e) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    try {
      const validResponse = await apiWebScrapper.validateUrl(urlInput);
      if (validResponse.valid) {
        setUrl(urlInput);
        const analysis = await apiWebScrapper.analyze(urlInput);
        setAnalysisResult(analysis);
        setFullContent(analysis.full_content); // Armazena o conteúdo limpo extraído
      } else {
        alert("URL inválida! Insira uma URL completa (ex: https://www.exemplo.com).");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao validar a URL.");
    }
  };

  // Função auxiliar para adicionar uma mensagem
  const adicionarMensagem = (texto, remetente) => {
    setMensagens((prev) => [...prev, { id: Date.now(), texto, remetente }]);
  };

  // Processa o envio de mensagem ou comando de salvamento
  const enviarMensagem = async (e) => {
    e.preventDefault();
    const inputTrimmed = mensagemInput.trim();
    if (!inputTrimmed || !url) return;

    // Se o usuário digitar um comando para salvar/download
    const downloadKeywords = ["salvar conteudo", "fazer download", "baixar tudo", "salvar tudo", "download tudo"];
    if (downloadKeywords.some((keyword) => inputTrimmed.toLowerCase().includes(keyword))) {
      adicionarMensagem(inputTrimmed, 'usuario');
      oferecerSalvar();
      setMensagemInput('');
      return;
    }

    // Se estivermos aguardando input para salvamento via texto
    if (awaitingSave) {
      if (inputTrimmed.toLowerCase() === 'não') {
        adicionarMensagem("Ok, não salvarei o resultado.", 'bot');
      } else {
        const formatosValidos = ['txt', 'csv', 'pdf', 'json'];
        if (formatosValidos.includes(inputTrimmed.toLowerCase())) {
          await handleDownloadFormat(inputTrimmed.toLowerCase());
        } else {
          adicionarMensagem("Formato inválido. Informe: TXT, CSV, PDF, JSON ou 'não' para ignorar.", 'bot');
          setMensagemInput('');
          return;
        }
      }
      setAwaitingSave(false);
      setShowDownloadOptions(false);
      setMensagemInput('');
      return;
    }

    // Fluxo normal: envia a pergunta para o backend
    adicionarMensagem(inputTrimmed, 'usuario');
    setLoading(true);
    try {
      const resposta = await apiWebScrapper.ask(url, inputTrimmed, 'tudo');
      adicionarMensagem(resposta.response, 'bot');
      // Após a resposta, oferece a opção de salvar o conteúdo
      oferecerSalvar();
    } catch (error) {
      console.error(error);
      adicionarMensagem("Erro ao obter resposta do servidor.", 'bot');
    }
    setLoading(false);
    setMensagemInput('');
  };

  // Oferece a opção de salvar o conteúdo
  const oferecerSalvar = () => {
    adicionarMensagem(
      "Deseja salvar este resultado? Para baixar o conteúdo completo capturado (texto limpo), informe o formato desejado (TXT, CSV, PDF, JSON) ou digite 'não' para ignorar.",
      'bot'
    );
    setAwaitingSave(true);
    setShowDownloadOptions(true);
  };

  // Trata o clique em uma sugestão e envia essa sugestão como pergunta
  const handleSuggestionClick = async (suggestion) => {
    adicionarMensagem(suggestion, 'usuario');
    setLoading(true);
    try {
      const resposta = await apiWebScrapper.ask(url, suggestion, 'tudo');
      adicionarMensagem(resposta.response, 'bot');
    } catch (error) {
      console.error(error);
      adicionarMensagem("Erro ao obter resposta do servidor.", 'bot');
    }
    setLoading(false);
  };

  // Inicia o download chamando o endpoint save e dispara o download do arquivo
  const handleDownloadFormat = async (format) => {
    try {
      const blob = await apiWebScrapper.save(fullContent, format);
      const urlBlob = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.style.display = 'none';
      link.href = urlBlob;
      link.download = `resultado.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(urlBlob);
      adicionarMensagem(`Download iniciado em formato ${format.toUpperCase()}.`, 'bot');
    } catch (error) {
      console.error(error);
      adicionarMensagem("Erro ao salvar o resultado.", 'bot');
    }
    setShowDownloadOptions(false);
  };

  // Exibe as opções de formato para download (botões)
  const handleShowDownloadOptions = () => {
    setShowDownloadOptions(true);
    oferecerSalvar();
  };

  const handleResetUrl = () => {
    setUrl('');
    setUrlInput('');
    setAnalysisResult(null);
    setFullContent('');
    setMensagens([]);
    setAwaitingSave(false);
    setShowDownloadOptions(false);
  };

  // Converte as sugestões do Gemini (texto) em um array de strings para botões
  const getSuggestionButtons = () => {
    if (!analysisResult || !analysisResult.gemini_suggestions) return [];
    return analysisResult.gemini_suggestions
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  };

  return (
    <div className="max-w-6xl mx-auto my-6 bg-white shadow-xl rounded-lg overflow-hidden">
      {/* Cabeçalho / URL */}
      {!url ? (
        <div className="p-6 border-b">
          <form onSubmit={handleSetUrl} className="flex gap-3">
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Digite a URL a ser analisada (ex: https://www.exemplo.com)"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Definir URL
            </button>
          </form>
        </div>
      ) : (
        <div className="p-6 border-b flex justify-between items-center bg-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-800">URL definida:</h2>
            <p className="text-gray-600">{url}</p>
          </div>
          <button
            onClick={handleResetUrl}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Mudar URL
          </button>
        </div>
      )}

      {/* Área principal dividida em duas colunas */}
      <div className="flex">
        {/* Coluna Esquerda: Análise e Sugestões */}
        <div className="w-1/2 p-6 border-r">
          {analysisResult && (
            <>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Análise do Conteúdo</h3>
                <p className="text-sm text-gray-600">
                  Tempo de execução: {analysisResult.execution_time.toFixed(2)} segundos
                </p>
                <p className="mt-2">
                  <span className="font-bold">Snippet:</span> {analysisResult.snippet}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Sugestões:</h3>
                <div className="flex flex-wrap gap-2 mt-3">
                  {getSuggestionButtons().map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                    >
                      {suggestion}
                    </button>
                  ))}
                  <button
                    onClick={handleShowDownloadOptions}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
                  >
                    Salvar Conteúdo
                  </button>
                </div>
                {showDownloadOptions && (
                  <div className="mt-3 flex gap-3">
                    {['txt', 'csv', 'pdf', 'json'].map((format) => (
                      <button
                        key={format}
                        onClick={() => handleDownloadFormat(format)}
                        className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 focus:outline-none"
                      >
                        {format.toUpperCase()}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Coluna Direita: Área de Chat */}
        <div className="w-1/2 flex flex-col">
          <div className="flex-1 bg-white p-6 overflow-y-auto" style={{ minHeight: '0' }}>
            {mensagens.map((mensagem) => (
              <div key={mensagem.id} className={`flex ${mensagem.remetente === 'usuario' ? 'justify-end' : 'justify-start'} mb-3`}>
                <div className={`max-w-[80%] rounded-lg p-3 ${mensagem.remetente === 'usuario' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                  {mensagem.texto}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-3 bg-gray-200 text-gray-800">
                  Carregando resposta...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-6 border-t bg-white">
            <form onSubmit={enviarMensagem} className="flex gap-3">
              <input
                type="text"
                value={mensagemInput}
                onChange={(e) => setMensagemInput(e.target.value)}
                placeholder="Digite sua mensagem ou pergunta..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWebScraper;
