import { Language } from '../types';

export const LANGUAGE_NAMES: Record<Language, string> = {
  en: 'English',
  hi: 'हिंदी',
  mr: 'मराठी',
  kn: 'ಕನ್ನಡ'
};

export const SPEECH_LANG_CODES: Record<Language, string> = {
  en: 'en-IN',
  hi: 'hi-IN',
  mr: 'mr-IN',
  kn: 'kn-IN'
};

export const translations: Record<Language, any> = {
  en: {
    appTitle: 'Crop Doctor',
    greeting: 'Good Morning, Farmer',
    online: 'Active',
    weather: {
      humidity: 'Humidity',
      rain: 'Chance Rain',
      locating: 'Locating...'
    },
    scanAction: 'Scan Plant',
    scanDesc: 'Diagnose diseases instantly',
    marketPrices: 'Market Trends',
    askExpert: 'Agri Expert',
    expertDesc: 'Voice Assistant',
    nav: { home: 'Home', scan: 'Scan', community: 'Community', market: 'Market', rental: 'Rentals' },
    market: { sellTitle: 'Marketplace', sellDesc: 'Sell harvest directly to buyers', rentTitle: 'Equipment Rental', rentDesc: 'Share & rent farming tools' },
    community: { title: 'Farmer Community', desc: 'Connect with experts & peers' },
    chat: { 
      placeholder: 'Ask a question...', 
      welcome: 'Namaste! I am your Agri-Assistant. Ask me anything about your crops.',
      listening: 'Listening...'
    },
    diagnosis: {
      title: 'AI Diagnosis',
      confidence: 'Confidence Match',
      healthyTitle: 'Excellent Health!',
      healthyDesc: 'Your crop looks great. Keep up the good work maintaining healthy soil and watering schedules.'
    },
    common: {
      contact: 'Call Now',
      details: 'View Details',
      scanAnother: 'Scan Another Plant',
      treatments: 'Treatment Plan',
      prevention: 'Prevention Guide',
      analyzing: 'Analyzing leaf health...',
      noImage: 'Ready to Scan',
      takePhoto: 'Capture a clear photo of the affected leaf for instant AI diagnosis.',
      openCamera: 'Start Camera'
    }
  },
  hi: {
    appTitle: 'फसल डॉक्टर',
    greeting: 'नमस्ते, किसान भाई',
    online: 'सक्रिय',
    weather: {
      humidity: 'नमी',
      rain: 'बारिश की संभावना',
      locating: 'खोज रहा है...'
    },
    scanAction: 'फसल जांचें',
    scanDesc: 'बीमारियों का तुरंत पता लगाएं',
    marketPrices: 'मंडी भाव',
    askExpert: 'कृषि विशेषज्ञ',
    expertDesc: 'वॉयस असिस्टेंट',
    nav: { home: 'होम', scan: 'स्कैन', community: 'समुदाय', market: 'बाज़ार', rental: 'किराये' },
    market: { sellTitle: 'बाज़ार', sellDesc: 'सीधे खरीदारों को फसल बेचें', rentTitle: 'उपकरण किराये', rentDesc: 'कृषि उपकरण साझा करें' },
    community: { title: 'किसान समुदाय', desc: 'विशेषज्ञों से जुड़ें' },
    chat: { 
      placeholder: 'प्रश्न पूछें...', 
      welcome: 'नमस्ते! मैं आपका कृषि सहायक हूं। अपनी फसलों के बारे में कुछ भी पूछें।',
      listening: 'सुन रहा हूँ...'
    },
    diagnosis: {
      title: 'AI निदान',
      confidence: 'सटीकता',
      healthyTitle: 'फसल स्वस्थ है!',
      healthyDesc: 'आपकी फसल बहुत अच्छी दिख रही है। अच्छी देखभाल जारी रखें।'
    },
    common: {
      contact: 'संपर्क करें',
      details: 'विवरण देखें',
      scanAnother: 'दूसरा पौधा स्कैन करें',
      treatments: 'उपचार योजना',
      prevention: 'बचाव के उपाय',
      analyzing: 'फसल की जांच हो रही है...',
      noImage: 'स्कैन के लिए तैयार',
      takePhoto: 'तुरंत निदान पाने के लिए प्रभावित पत्ती की साफ फोटो लें।',
      openCamera: 'कैमरा खोलें'
    }
  },
  mr: {
    appTitle: 'पीक डॉक्टर',
    greeting: 'नमस्कार, शेतकरी दादा',
    online: 'सक्रिय',
    weather: {
      humidity: 'आर्द्रता',
      rain: 'पावसाची शक्यता',
      locating: 'शोधत आहे...'
    },
    scanAction: 'पीक तपासणी',
    scanDesc: 'रोगांचे त्वरित निदान करा',
    marketPrices: 'बाजार भाव',
    askExpert: 'कृषी तज्ञ',
    expertDesc: 'व्हॉइस असिस्टंट',
    nav: { home: 'होम', scan: 'स्कॅन', community: 'समुदाय', market: 'बाजार', rental: 'भाड्याने' },
    market: { sellTitle: 'बाजारपेठ', sellDesc: 'थेट खरेदीदारांना विक्री करा', rentTitle: 'उपकरणे भाड्याने', rentDesc: 'शेती अवजारे भाड्याने घ्या/द्या' },
    community: { title: 'शेतकरी समुदाय', desc: 'तज्ञांशी चर्चा करा' },
    chat: { 
      placeholder: 'प्रश्न विचारा...', 
      welcome: 'नमस्कार! मी तुमचा कृषी सहाय्यक आहे. मला तुमच्या पिकांबद्दल काहीही विचारा.',
      listening: 'ऐकत आहे...'
    },
    diagnosis: {
      title: 'AI निदान',
      confidence: 'खात्री',
      healthyTitle: 'पीक निरोगी आहे!',
      healthyDesc: 'तुमचे पीक छान दिसत आहे. चांगली निगा राखणे चालू ठेवा.'
    },
    common: {
      contact: 'संपर्क साधा',
      details: 'तपशील पहा',
      scanAnother: 'दुसरे झाड स्कॅन करा',
      treatments: 'उपचार पद्धती',
      prevention: 'प्रतिबंधात्मक उपाय',
      analyzing: 'तपासणी सुरू आहे...',
      noImage: 'स्कॅनसाठी तयार',
      takePhoto: 'त्वरित निदानासाठी रोगग्रस्त पानाचा स्पष्ट फोटो घ्या.',
      openCamera: 'कॅमेरा चालू करा'
    }
  },
  kn: {
    appTitle: 'ಬೆಳೆ ವೈದ್ಯ',
    greeting: 'ನಮಸ್ಕಾರ, ರೈತ ಮಿತ್ರ',
    online: 'ಸಕ್ರಿಯ',
    weather: {
      humidity: 'ತೇವಾಂಶ',
      rain: 'ಮಳೆ ಸಾಧ್ಯತೆ',
      locating: 'ಪತ್ತೆ ಮಾಡಲಾಗುತ್ತಿದೆ...'
    },
    scanAction: 'ಬೆಳೆ ಪರೀಕ್ಷಿಸಿ',
    scanDesc: 'ರೋಗಗಳನ್ನು ತಕ್ಷಣ ಗುರುತಿಸಿ',
    marketPrices: 'ಮಾರುಕಟ್ಟೆ ದರಗಳು',
    askExpert: 'ತಜ್ಞರ ಸಲಹೆ',
    expertDesc: 'ಧ್ವನಿ ಮೂಲಕ ಸಹಾಯ',
    nav: { home: 'ಮುಖಪುಟ', scan: 'ಸ್ಕ್ಯಾನ್', community: 'ಸಮುದಾಯ', market: 'ವ್ಯಾಪಾರ', rental: 'ಬಾಡಿಗೆ' },
    market: { sellTitle: 'ಬೆಳೆ ಮಾರಾಟ', sellDesc: 'ನೇರವಾಗಿ ಖರೀದಿದಾರರನ್ನು ಸಂಪರ್ಕಿಸಿ', rentTitle: 'ಯಂತ್ರ ಬಾಡಿಗೆ', rentDesc: 'ಕೃಷಿ ಉಪಕರಣಗಳು ಲಭ್ಯ' },
    community: { title: 'ಕೃಷಿ ಮಿತ್ರರು', desc: 'ಅನುಭವಿ ರೈತರೊಂದಿಗೆ ಚರ್ಚಿಸಿ' },
    chat: {
      placeholder: 'ಪ್ರಶ್ನೆ ಕೇಳಿ...',
      welcome: 'ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಕೃಷಿ ಸಹಾಯಕ. ಬೆಳೆಗಳ ಬಗ್ಗೆ ಏನೇ ಪ್ರಶ್ನೆ ಇದ್ದರೂ ಕೇಳಿ.',
      listening: 'ಆಲಿಸಲಾಗುತ್ತಿದೆ...'
    },
    diagnosis: {
      title: 'AI ರೋಗ ನಿರ್ಣಯ',
      confidence: 'ನಿಖರತೆ',
      healthyTitle: 'ಬೆಳೆ ಆರೋಗ್ಯಕರವಾಗಿದೆ!',
      healthyDesc: 'ನಿಮ್ಮ ಬೆಳೆ ಚೆನ್ನಾಗಿ ಕಾಣುತ್ತಿದೆ. ಉತ್ತಮ ನಿರ್ವಹಣೆಯನ್ನು ಮುಂದುವರಿಸಿ.'
    },
    common: {
      contact: 'ಸಂಪರ್ಕಿಸಿ',
      details: 'ವಿವರಗಳು',
      scanAnother: 'ಮತ್ತೊಂದು ಸಸ್ಯ ಪರೀಕ್ಷಿಸಿ',
      treatments: 'ಚಿಕಿತ್ಸೆಗಳು',
      prevention: 'ತಡೆಗಟ್ಟುವ ಕ್ರಮಗಳು',
      analyzing: 'ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...',
      noImage: 'ಫೋಟೋ ಆಯ್ಕೆಮಾಡಿ',
      takePhoto: 'ರೋಗದ ನಿಖರ ಮಾಹಿತಿಗಾಗಿ ಸ್ಪಷ್ಟ ಫೋಟೋ ತೆಗೆಯಿರಿ.',
      openCamera: 'ಕ್ಯಾಮೆರಾ ತೆರೆಯಿರಿ'
    }
  }
};
