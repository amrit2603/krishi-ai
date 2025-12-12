import { WeatherData } from '../types';

export const getWeather = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    // 1. Get Weather from Open-Meteo (Free, no API key required)
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,rain,showers,cloud_cover&daily=precipitation_probability_max&timezone=auto`;
    const weatherRes = await fetch(weatherUrl);
    const weatherJson = await weatherRes.json();

    const current = weatherJson.current;
    const daily = weatherJson.daily;
    
    // Determine condition based on data
    let condition: 'Sunny' | 'Cloudy' | 'Rainy' = 'Sunny';
    if (current.rain > 0 || current.showers > 0) {
      condition = 'Rainy';
    } else if (current.cloud_cover > 50) {
      condition = 'Cloudy';
    }

    // 2. Get Location Name (Reverse Geocoding using BigDataCloud - Free client-side)
    let locationName = 'Unknown Location';
    try {
        const geoUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
        const geoRes = await fetch(geoUrl);
        const geoJson = await geoRes.json();
        
        // Construct a readable location string
        const parts = [];
        if (geoJson.city || geoJson.locality) parts.push(geoJson.city || geoJson.locality);
        if (geoJson.principalSubdivision) parts.push(geoJson.principalSubdivision); // State
        
        locationName = parts.length > 0 ? parts.join(', ') : 'Your Farm';
    } catch (e) {
        console.error("Geocoding failed", e);
        // Fallback to coordinates if geocoding fails
        locationName = `${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E`;
    }

    return {
      temperature: Math.round(current.temperature_2m),
      humidity: Math.round(current.relative_humidity_2m),
      rainChance: daily.precipitation_probability_max?.[0] || 0,
      locationName,
      condition
    };

  } catch (error) {
    console.error("Error fetching weather:", error);
    throw error;
  }
};
