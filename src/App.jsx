import React from 'react';
import DemoInfo from './components/DemoInfo';
import ChatWebScraper from './components/ChatWebScraper';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="max-w-4xl w-full mx-auto p-4 flex-grow">
        <DemoInfo />
        <ChatWebScraper />
      </div>
      <Footer />
    </div>
  );
};

export default App;
