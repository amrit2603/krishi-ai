import React from 'react';
import { Home, Scan, Users, ShoppingBag, Tractor } from 'lucide-react';
import { AppView } from '../types';

interface NavigationProps {
  currentView: AppView;
  onChangeView: (view: AppView) => void;
  labels: {
    home: string;
    scan: string;
    community: string;
    market: string;
    rental: string;
  };
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onChangeView, labels }) => {
  const navItems = [
    { view: AppView.HOME, icon: Home, label: labels.home },
    { view: AppView.SCAN, icon: Scan, label: labels.scan },
    { view: AppView.COMMUNITY, icon: Users, label: labels.community },
    { view: AppView.MARKET, icon: ShoppingBag, label: labels.market },
    { view: AppView.RENTAL, icon: Tractor, label: labels.rental },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 pb-safe z-50">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = currentView === item.view;
          return (
            <button
              key={item.view}
              onClick={() => onChangeView(item.view)}
              className={`flex flex-col items-center space-y-1 transition-colors ${
                isActive ? 'text-agri-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;
