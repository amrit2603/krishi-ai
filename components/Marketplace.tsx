import React from 'react';
import { MarketItem, AppView } from '../types';
import { MapPin, Phone, Star, ArrowRight } from 'lucide-react';

interface Props {
  view: AppView; // MARKET or RENTAL
  translations: any;
}

const Marketplace: React.FC<Props> = ({ view, translations }) => {
  const t = translations.market;
  const common = translations.common;

  const items: MarketItem[] = view === AppView.MARKET ? [
    {
      id: '1', name: 'Fresh Tomatoes', price: '25', unit: 'per kg',
      location: 'Nashik Mandi', type: 'crop',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&q=80'
    },
    {
      id: '2', name: 'Organic Wheat', price: '40', unit: 'per kg',
      location: 'Punjab Market', type: 'crop',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&q=80'
    },
    {
      id: '3', name: 'Red Onions', price: '30', unit: 'per kg',
      location: 'Local Buyer', type: 'crop',
      image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=500&q=80'
    }
  ] : [
    {
      id: '4', name: 'John Deere Tractor', price: '1200', unit: 'per hour',
      location: '5km away', type: 'equipment',
      image: 'https://images.unsplash.com/photo-1592478411213-61535fdd28f2?w=500&q=80'
    },
    {
      id: '5', name: 'Drone Sprayer', price: '500', unit: 'per acre',
      location: '10km away', type: 'equipment',
      image: 'https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?w=500&q=80'
    }
  ];

  return (
    <div className="space-y-6 pb-24 pt-8">
      <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 py-3 px-5 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900">
          {view === AppView.MARKET ? t.sellTitle : t.rentTitle}
        </h2>
        <p className="text-gray-500 text-sm">
          {view === AppView.MARKET ? t.sellDesc : t.rentDesc}
        </p>
      </div>

      <div className="grid gap-5 px-5">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl shadow-sm hover:shadow-md transition-all border border-gray-100 overflow-hidden group">
            <div className="h-48 w-full relative overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur px-2.5 py-1 rounded-full text-xs font-bold flex items-center shadow-sm">
                <Star size={12} className="text-yellow-500 mr-1" fill="currentColor" />
                4.8
              </div>
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-lg text-xs font-medium flex items-center">
                 <MapPin size={12} className="mr-1" />
                 {item.location}
              </div>
            </div>
            
            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-xl text-gray-800">{item.name}</h3>
                <div className="text-right">
                    <div className="text-agri-700 font-extrabold text-lg">
                    ₹{item.price}
                    </div>
                    <div className="text-gray-400 text-xs font-medium">/ {item.unit}</div>
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <button className="flex-1 bg-agri-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-agri-700 flex items-center justify-center gap-2 shadow-lg shadow-agri-200 transition-all active:scale-95">
                  <Phone size={18} />
                  {common.contact}
                </button>
                <button className="w-12 flex items-center justify-center border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
