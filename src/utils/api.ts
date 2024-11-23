import axios from 'axios';
import type { Weather } from '../types';

const WEATHER_API_KEY = '6b5afb1afe4b40608a9182128242211';
const BASE_URL = 'https://api.weatherapi.com/v1/current.json';

export const fetchWeather = async (capital: string): Promise<Weather> => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: WEATHER_API_KEY,
        q: capital,
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('API Error:', error.response?.data?.error?.message || 'Unknown API error');
    } else if (error instanceof Error) {
      console.error('Unexpected Error:', error.message);
    } else {
      console.error('Unexpected error occurred', error);
    }
    throw error;
  }
};

const cityNameMapping: Record<string, string> = {
  "Naypyidaw": "Nay Pyi Taw",
  "Ngerulmud": "Melekeok",
  "Fakaofo": "Tokelau",
  "Nuku'alofa": "Tongatapu",
  "Yaoundé": "Yaounde",
  "Sana'a": "Sanaa",
};

const normalizeCityName = (city: string): string =>
  city
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/'/g, '')
    .trim();

const getMappedCityName = (city: string): string => {
  return cityNameMapping[city] || city;
};

export const fetchWeatherWithTemperature = async (capital: string): Promise<number | null> => {
  if (!capital || capital.trim() === '') {
    console.warn('City name is missing or invalid.');
    return null;
  }

  const normalizedCapital = getMappedCityName(normalizeCityName(capital));

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: WEATHER_API_KEY,
        q: encodeURIComponent(normalizedCapital),
      },
    });
    return response.data?.current?.temp_c || null;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        `Failed to fetch weather for "${capital}" (normalized: "${normalizedCapital}"):`,
        error.response?.data?.error?.message || error.message
      );
    } else if (error instanceof Error) {
      console.error('Unexpected Error:', error.message);
    } else {
      console.error('Unexpected error occurred:', error);
    }
    return null;
  }
};
