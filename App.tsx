import React, { useState, useRef, useEffect } from 'react';
import { AppView, DiagnosisResult, Language, WeatherData } from './types';
import Navigation from './components/Navigation';
import DiagnosisResultCard from './components/DiagnosisResultCard';
import Marketplace from './components/Marketplace';
import CommunityFeed from './components/CommunityFeed';
import ChatAssistant from './components/ChatAssistant';
import { Camera, Upload, Mic, Sun, CloudRain, Droplets, ArrowUpRight, Globe, ChevronDown, Leaf, Cloud, MapPin } from 'lucide-react';
import { fileToGenerativePart, analyzePlantDisease } from './services/geminiService';
import { getWeather } from './services/weatherService';
import { translations, LANGUAGE_NAMES } from './utils/translations';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  
  const t = translations[language];
  
  // Weather State
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loadingWeather, setLoadingWeather] = useState(true);

  // Scanning State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Initialize Weather on Mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const data = await getWeather(position.coords.latitude, position.coords.longitude);
            setWeather(data);
          } catch (error) {
            console.error("Weather fetch failed", error);
            // Default fallback if fetch fails
            setWeather({
              temperature: 28,
              humidity: 65,
              rainChance: 20,
              locationName: 'Nashik, MH',
              condition: 'Sunny'
            });
          } finally {
            setLoadingWeather(false);
          }
        },
        (error) => {
          console.error("Location permission denied or error", error);
          setLoadingWeather(false);
          // Default fallback
          setWeather({
            temperature: 28,
            humidity: 65,
            rainChance: 20,
            locationName: 'Nashik, MH',
            condition: 'Sunny'
          });
        }
      );
    } else {
      setLoadingWeather(false);
      // Fallback for no geolocation support
      setWeather({
        temperature: 28,
        humidity: 65,
        rainChance: 20,
        locationName: 'Nashik, MH',
        condition: 'Sunny'
      });
    }
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const base64Data = await fileToGenerativePart(file);
      setPreviewImage(`data:image/jpeg;base64,${base64Data}`);
      setIsAnalyzing(true);
      setCurrentView(AppView.SCAN);
      
      const langName = LANGUAGE_NAMES[language];
      const result = await analyzePlantDisease(base64Data, langName);
      setDiagnosis(result);
    } catch (error) {
      alert("Failed to analyze image. Please try again.");
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const triggerCamera = () => {
    fileInputRef.current?.click();
  };

  const renderWeatherIcon = () => {
    if (loadingWeather) return <Sun className="animate-spin text-white opacity-50" size={80} />;
    if (!weather) return <Sun size={120} />;

    switch (weather.condition) {
      case 'Rainy': return <CloudRain size={120} />;
      case 'Cloudy': return <Cloud size={120} />;
      default: return <Sun size={120} />;
    }
  };

  const renderHome = () => (
    <div className="px-5 pt-8 pb-24 space-y-6">
      {/* Header & Language */}
      <div className="flex justify-between items-start">
        <div className="animate-fade-in">
          <h1 className="text-3xl font-extrabold text-agri-900 tracking-tight">{t.appTitle}</h1>
          <p className="text-agri-700 font-medium mt-1">{t.greeting}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
           {/* Modern Language Pill */}
           <div className="relative group">
             <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm border border-agri-100 hover:border-agri-300 transition-colors">
                <Globe size={14} className="text-agri-600" />
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className="text-xs font-bold text-agri-800 bg-transparent border-none outline-none appearance-none pr-4 cursor-pointer"
                  style={{backgroundImage: 'none'}}
                >
                  {Object.entries(LANGUAGE_NAMES).map(([code, name]) => (
                    <option key={code} value={code}>{name}</option>
                  ))}
                </select>
                <ChevronDown size={12} className="absolute right-2 text-agri-400 pointer-events-none" />
             </div>
          </div>
          
          <div className="flex items-center gap-1.5 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">{t.online}</span>
          </div>
        </div>
      </div>

      {/* Modern Weather Widget - Compact Version */}
      <div className="relative group overflow-hidden rounded-3xl shadow-lg shadow-blue-200/50 transition-all duration-500">
        <div className={`absolute inset-0 bg-gradient-to-br transition-colors duration-500 ${
          weather?.condition === 'Rainy' ? 'from-slate-600 via-slate-700 to-slate-800' :
          weather?.condition === 'Cloudy' ? 'from-blue-400 via-blue-500 to-indigo-500' :
          'from-blue-500 via-blue-600 to-indigo-600'
        }`}></div>
        
        <div className="absolute -right-8 -top-8 text-white/10 rotate-12 group-hover:rotate-0 transition-transform duration-700">
            {renderWeatherIcon()}
        </div>
        
        <div className="relative p-5 text-white z-10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-blue-100 text-[10px] font-bold uppercase tracking-widest mb-1">
                {loadingWeather ? t.weather.locating : 'Current Weather'}
              </p>
              <h2 className="text-4xl font-bold tracking-tighter">
                {weather ? `${weather.temperature}°` : '--'}
              </h2>
              <div className="flex items-center gap-1 text-blue-100 font-medium mt-1">
                <MapPin size={12} />
                <p className="text-sm">{weather ? weather.locationName : '...'}</p>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-md p-2.5 rounded-2xl">
                {weather?.condition === 'Rainy' ? <CloudRain size={24} className="text-white" /> :
                 weather?.condition === 'Cloudy' ? <Cloud size={24} className="text-white" /> :
                 <Sun size={24} className="text-white" />}
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="flex-1 bg-black/10 rounded-xl p-2 flex items-center gap-2 backdrop-blur-sm">
              <Droplets size={14} className="text-blue-200" />
              <div>
                  <p className="text-[10px] text-blue-200 uppercase">{t.weather.humidity}</p>
                  <p className="text-sm font-bold">{weather ? `${weather.humidity}%` : '--'}</p>
              </div>
            </div>
            <div className="flex-1 bg-black/10 rounded-xl p-2 flex items-center gap-2 backdrop-blur-sm">
              <CloudRain size={14} className="text-blue-200" />
              <div>
                  <p className="text-[10px] text-blue-200 uppercase">{t.weather.rain}</p>
                  <p className="text-sm font-bold">{weather ? `${weather.rainChance}%` : '--'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Scan Button */}
      <button 
        onClick={triggerCamera}
        className="w-full relative overflow-hidden group rounded-3xl p-1 transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-xl shadow-green-200"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-agri-500 to-emerald-600"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative bg-white/10 backdrop-blur-sm rounded-[20px] p-6 flex items-center justify-between border border-white/20">
            <div className="flex items-center gap-4">
                <div className="bg-white p-3.5 rounded-2xl shadow-lg">
                    <Camera size={28} className="text-agri-600" />
                </div>
                <div className="text-left">
                    <h3 className="text-xl font-bold text-white leading-tight">{t.scanAction}</h3>
                    <p className="text-agri-100 text-sm font-medium">{t.scanDesc}</p>
                </div>
            </div>
            <div className="bg-white/20 p-2 rounded-full">
                <ArrowUpRight size={24} className="text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
        </div>
      </button>

      {/* Market Ticker Grid */}
      <div className="grid grid-cols-2 gap-3">
         <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-28 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-16 h-16 bg-red-50 rounded-bl-full -mr-4 -mt-4 z-0"></div>
             <div className="relative z-10">
                 <p className="text-gray-500 text-xs font-bold uppercase">{t.marketPrices}</p>
                 <h4 className="font-bold text-gray-800 text-lg mt-1">Tomato</h4>
             </div>
             <div className="relative z-10 flex items-end gap-1 text-green-600">
                 <span className="text-2xl font-bold">₹25</span>
                 <span className="text-xs font-medium mb-1">/kg</span>
                 <ArrowUpRight size={16} className="mb-1.5" />
             </div>
         </div>
         <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-28 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-16 h-16 bg-orange-50 rounded-bl-full -mr-4 -mt-4 z-0"></div>
             <div className="relative z-10">
                 <p className="text-gray-500 text-xs font-bold uppercase">{t.marketPrices}</p>
                 <h4 className="font-bold text-gray-800 text-lg mt-1">Onion</h4>
             </div>
             <div className="relative z-10 flex items-end gap-1 text-red-500">
                 <span className="text-2xl font-bold">₹18</span>
                 <span className="text-xs font-medium mb-1">/kg</span>
                 <ArrowUpRight size={16} className="mb-1.5 rotate-90" />
             </div>
         </div>
      </div>

      {/* Feature Cards */}
      <div 
        onClick={() => setIsChatOpen(true)}
        className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-4 flex items-center gap-4 cursor-pointer border border-indigo-100 hover:shadow-md transition-shadow"
      >
        <div className="bg-white p-3 rounded-full text-indigo-600 shadow-sm ring-4 ring-indigo-50/50">
          <Mic size={24} />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-indigo-900 text-lg">{t.askExpert}</h3>
          <p className="text-indigo-600 text-sm">{t.expertDesc}</p>
        </div>
        <div className="bg-indigo-100 px-3 py-1 rounded-full text-xs font-bold text-indigo-700">
            Free
        </div>
      </div>
    </div>
  );

  const renderScanView = () => (
    <div className="px-5 pt-8 pb-24 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-agri-100 rounded-lg text-agri-700">
            <Leaf size={24} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">{t.nav.scan}</h2>
      </div>
      
      {isAnalyzing ? (
        <div className="flex-1 flex flex-col items-center justify-center space-y-8 bg-white rounded-3xl shadow-inner p-8">
          <div className="relative">
            {previewImage && (
              <img src={previewImage} alt="Scanning" className="w-64 h-64 rounded-2xl object-cover opacity-80 blur-sm transition-all duration-1000" />
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                  <div className="w-24 h-24 border-4 border-agri-200 rounded-full"></div>
                  <div className="w-24 h-24 border-4 border-agri-600 border-t-transparent rounded-full animate-spin absolute inset-0"></div>
                  <Leaf className="absolute inset-0 m-auto text-agri-600 animate-pulse" size={32} />
              </div>
            </div>
          </div>
          <div className="text-center space-y-2">
              <h3 className="text-xl font-bold text-gray-800">{t.common.analyzing}</h3>
              <p className="text-gray-500 text-sm">Identifying patterns and symptoms...</p>
          </div>
        </div>
      ) : diagnosis ? (
        <DiagnosisResultCard 
          result={diagnosis} 
          onClose={() => {
            setDiagnosis(null);
            setPreviewImage(null);
            setCurrentView(AppView.HOME);
          }}
          translations={t}
        />
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-white rounded-3xl border-2 border-dashed border-gray-200 hover:border-agri-300 transition-colors">
          <div className="w-24 h-24 bg-agri-50 rounded-full flex items-center justify-center text-agri-500 mb-6 shadow-sm">
            <Upload size={40} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{t.common.noImage}</h3>
          <p className="text-gray-500 text-sm max-w-xs mx-auto leading-relaxed mb-8">{t.common.takePhoto}</p>
          
          <button 
            onClick={triggerCamera}
            className="w-full max-w-xs bg-agri-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-agri-200 hover:bg-agri-700 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Camera size={20} />
            {t.common.openCamera}
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50/50 md:max-w-md md:mx-auto md:shadow-2xl md:border-x border-gray-200">
      {/* Hidden File Input */}
      <input 
        type="file" 
        accept="image/*" 
        capture="environment" // Forces back camera on mobile
        ref={fileInputRef}
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Main Content Area */}
      <main className="min-h-screen">
        {currentView === AppView.HOME && renderHome()}
        {currentView === AppView.SCAN && renderScanView()}
        {currentView === AppView.COMMUNITY && <CommunityFeed translations={t} />}
        {currentView === AppView.MARKET && <Marketplace view={AppView.MARKET} translations={t} />}
        {currentView === AppView.RENTAL && <Marketplace view={AppView.RENTAL} translations={t} />}
      </main>

      {/* Floating Action Button for Chat (only on non-home pages if needed, or always) */}
      {!isChatOpen && currentView !== AppView.HOME && (
        <button 
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-24 right-5 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg shadow-indigo-300 flex items-center justify-center z-40 hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all"
        >
          <Mic size={28} />
        </button>
      )}

      {/* Chat Overlay */}
      <ChatAssistant 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        language={language}
        translations={t}
      />

      {/* Bottom Navigation */}
      <Navigation currentView={currentView} onChangeView={setCurrentView} labels={t.nav} />
    </div>
  );
};

export default App;