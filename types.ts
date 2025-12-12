export type Language = 'en' | 'hi' | 'mr' | 'kn';

export interface WeatherData {
  temperature: number;
  humidity: number;
  rainChance: number;
  locationName: string;
  condition: 'Sunny' | 'Cloudy' | 'Rainy';
}

export interface DiagnosisResult {
  diseaseName: string;
  confidence: number;
  isHealthy: boolean;
  description: string;
  treatments: string[];
  preventions: string[];
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export enum AppView {
  HOME = 'HOME',
  SCAN = 'SCAN',
  COMMUNITY = 'COMMUNITY',
  MARKET = 'MARKET',
  RENTAL = 'RENTAL'
}

export interface MarketItem {
  id: string;
  name: string;
  price: string;
  unit: string;
  location: string;
  image: string;
  type: 'crop' | 'equipment';
}

export interface Post {
  id: string;
  author: string;
  role: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timeAgo: string;
}
