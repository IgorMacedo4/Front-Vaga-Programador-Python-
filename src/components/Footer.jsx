import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-200 py-4 mt-8 w-full">
      <div className="max-w-4xl mx-auto text-center text-sm text-gray-700">
        Desenvolvido por <span className="font-semibold">Igor Macedo</span> para a vaga de <strong>Programador(a) Python</strong> 
        (2+ anos de experiência e/ou criação de aplicações avançadas com IA).<br />
        Este demonstrativo foi enviado exclusivamente para <a href="mailto:thomas.maia@abladvogados.com" className="text-blue-600 hover:underline">thomas.maia@abladvogados.com</a>.
      </div>
    </footer>
  );
};

export default Footer;
