import React from 'react';

const DemoInfo = () => {
  return (
    <div className="mb-10 text-center px-4">
      <h1 className="text-4xl font-extrabold text-gray-800">
        Demonstração Interativa para a Vaga de Programador(a) Python
      </h1>
      <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
        Este demonstrativo foi desenvolvido especialmente para evidenciar as habilidades em automação web,
        utilização de modelos de linguagem (LLM) e engenharia de dados. A ferramenta permite extrair e analisar
        o conteúdo HTML de qualquer URL informada.
      </p>
      <div className="mt-8 max-w-3xl mx-auto text-left">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Como utilizar a ferramenta:</h2>
        <ol className="list-decimal list-inside text-gray-700 space-y-2">
          <li>
            <span className="font-medium">Inserir a URL:</span> Digite a URL completa (por exemplo, <code>https://www.exemplo.com</code>) no campo indicado e clique em "Definir URL".
          </li>
          <li>
            <span className="font-medium">Análise do Conteúdo:</span> Após validar a URL, a ferramenta extrai o conteúdo de texto limpo do site e apresenta um resumo (snippet) junto com sugestões automáticas.
          </li>
          <li>
            <span className="font-medium">Interagir com o Chat:</span> Faça perguntas ou clique nas sugestões para obter respostas do modelo.
          </li>
          <li>
            <span className="font-medium">Salvar o Conteúdo:</span> Se desejar baixar o conteúdo extraído, clique no botão "Salvar Conteúdo" ou digite um comando relacionado. Você poderá escolher entre os formatos TXT, CSV, PDF ou JSON.
          </li>
          <li>
            <span className="font-medium">Continuação da Conversa:</span> O chat é interativo e permite continuar fazendo perguntas ou salvando resultados conforme necessário.
          </li>
        </ol>
      </div>
    </div>
  );
};

export default DemoInfo;
