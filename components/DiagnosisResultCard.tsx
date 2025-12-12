import React from 'react';
import { DiagnosisResult } from '../types';
import { CheckCircle, AlertTriangle, Droplet, Shield, ArrowLeft } from 'lucide-react';

interface Props {
  result: DiagnosisResult;
  onClose: () => void;
  translations: any;
}

const DiagnosisResultCard: React.FC<Props> = ({ result, onClose, translations }) => {
  const isHealthy = result.isHealthy;
  const t = translations.diagnosis;
  const common = translations.common;

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden animate-fade-in-up border border-gray-100">
      {/* Header Section */}
      <div className={`p-6 ${isHealthy ? 'bg-gradient-to-br from-green-500 to-emerald-600' : 'bg-gradient-to-br from-red-500 to-pink-600'} text-white`}>
        <div className="flex justify-between items-start mb-4">
           <button onClick={onClose} className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors backdrop-blur-sm">
             <ArrowLeft size={20} />
           </button>
           <div className="bg-black/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
             {t.title}
           </div>
        </div>
        
        <div className="flex items-center gap-3 mb-2">
          {isHealthy ? <CheckCircle size={32} className="text-green-100" /> : <AlertTriangle size={32} className="text-red-100" />}
          <h2 className="text-2xl font-bold leading-tight">{result.diseaseName}</h2>
        </div>
        
        {/* Confidence Bar */}
        <div className="mt-4">
            <div className="flex justify-between text-xs font-medium text-white/80 mb-1">
                <span>{t.confidence}</span>
                <span>{Math.round(result.confidence)}%</span>
            </div>
            <div className="h-2 bg-black/20 rounded-full overflow-hidden backdrop-blur-sm">
                <div 
                    className="h-full bg-white/90 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${result.confidence}%` }}
                />
            </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="bg-gray-50 p-4 rounded-xl text-gray-700 text-sm leading-relaxed border border-gray-100">
            {result.description}
        </div>

        {!isHealthy && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-agri-800 font-bold mb-3 uppercase text-xs tracking-wider">
                <div className="p-1.5 bg-agri-100 rounded-lg text-agri-600">
                    <Droplet size={16} />
                </div>
                {common.treatments}
              </div>
              <ul className="space-y-3">
                {result.treatments.map((treatment, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-gray-700">
                    <span className="w-6 h-6 rounded-full bg-agri-100 text-agri-600 flex items-center justify-center shrink-0 text-xs font-bold border border-agri-200">
                        {idx + 1}
                    </span>
                    <span className="pt-0.5">{treatment}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-2 text-indigo-800 font-bold mb-3 uppercase text-xs tracking-wider">
                 <div className="p-1.5 bg-indigo-100 rounded-lg text-indigo-600">
                    <Shield size={16} />
                 </div>
                {common.prevention}
              </div>
              <ul className="space-y-3">
                {result.preventions.map((prevention, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-gray-700 bg-indigo-50/50 p-3 rounded-xl border border-indigo-50">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                    {prevention}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        
        {isHealthy && (
          <div className="text-center py-8">
            <div className="inline-block p-4 bg-green-50 rounded-full mb-4">
                <CheckCircle size={48} className="text-green-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{t.healthyTitle}</h3>
            <p className="text-gray-500 text-sm">{t.healthyDesc}</p>
          </div>
        )}

        <button 
          onClick={onClose}
          className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-gray-800 transition-colors shadow-lg active:scale-[0.98] transform"
        >
          {common.scanAnother}
        </button>
      </div>
    </div>
  );
};

export default DiagnosisResultCard;
