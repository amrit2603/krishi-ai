import React, { useState, useRef, useEffect } from 'react';
import { Mic, Send, X, Bot, User } from 'lucide-react';
import { ChatMessage, Language } from '../types';
import { chatWithBotanist } from '../services/geminiService';
import { SPEECH_LANG_CODES, LANGUAGE_NAMES } from '../utils/translations';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  translations: any;
}

const ChatAssistant: React.FC<Props> = ({ isOpen, onClose, language, translations }) => {
  const t = translations.chat;
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      { id: '1', text: t.welcome, sender: 'bot', timestamp: new Date() }
    ]);
  }, [language, t.welcome]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputText.trim() || isProcessing) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsProcessing(true);

    const langName = LANGUAGE_NAMES[language];
    const responseText = await chatWithBotanist(userMsg.text, langName);

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      text: responseText,
      sender: 'bot',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMsg]);
    setIsProcessing(false);
  };

  const handleMicClick = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsListening(true);
      // @ts-ignore
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = SPEECH_LANG_CODES[language]; 
      recognition.start();

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
    } else {
      alert("Voice input not supported in this browser.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="bg-gray-50 w-full sm:max-w-md h-[90vh] sm:h-[650px] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="bg-gradient-to-r from-agri-600 to-emerald-600 p-5 flex justify-between items-center text-white shadow-lg z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Bot size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">{translations.appTitle}</h3>
              <p className="text-xs text-emerald-100 font-medium opacity-90">{LANGUAGE_NAMES[language]} • {translations.online}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-gray-50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.sender === 'user' 
                  ? 'bg-gray-900 text-white rounded-br-none' 
                  : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
              }`}>
                {msg.text}
                <div className={`text-[10px] mt-1 text-right ${msg.sender === 'user' ? 'text-gray-400' : 'text-gray-400'}`}>
                    {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
            </div>
          ))}
          {isProcessing && (
            <div className="flex justify-start">
              <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 flex gap-1.5 items-center">
                <span className="text-xs font-medium text-gray-400 mr-2">Typing</span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-gray-100">
          <div className="flex gap-2 items-center bg-gray-50 p-1.5 rounded-full border border-gray-200 focus-within:border-agri-400 focus-within:ring-2 focus-within:ring-agri-100 transition-all">
            <button 
              onClick={handleMicClick}
              className={`p-3 rounded-full transition-all duration-300 ${
                isListening 
                  ? 'bg-red-500 text-white animate-pulse shadow-md' 
                  : 'text-gray-500 hover:bg-gray-200'
              }`}
            >
              <Mic size={20} />
            </button>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={isListening ? t.listening : t.placeholder}
              className="flex-1 bg-transparent border-none outline-none text-sm text-gray-800 placeholder-gray-400"
            />
            <button 
              onClick={handleSend}
              disabled={!inputText.trim() || isProcessing}
              className="p-3 bg-agri-600 text-white rounded-full hover:bg-agri-700 disabled:opacity-50 disabled:hover:bg-agri-600 transition-colors shadow-md"
            >
              <Send size={20} className={inputText.trim() ? "translate-x-0.5" : ""} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;
