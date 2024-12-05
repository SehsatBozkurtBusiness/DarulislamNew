import axios from 'axios';
import { PrayerResponse } from '../types/prayer';

const API_URL = 'https://api.aladhan.com/v1/timingsByCity';

function adjustTime(time: string, minutesToAdd: number): string {
  const [hours, minutes] = time.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes + minutesToAdd;
  const newHours = Math.floor(totalMinutes / 60) % 24;
  const newMinutes = totalMinutes % 60;
  return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
}

export async function fetchPrayerTimes(): Promise<PrayerResponse> {
  try {
    // First try to get user's location using IP geolocation
    const geoResponse = await axios.get('https://ipapi.co/json/');
    const { city, country } = geoResponse.data;

    // Then fetch prayer times for that location
    const response = await axios.get(API_URL, {
      params: {
        city,
        country,
        method: 2, // Islamic Society of North America calculation method
      }
    });

    // Transform aladhan.com API response to match our interface
    const { data } = response.data;
    
    // Adjust prayer times according to specifications
    const adjustedTimes = {
      Imsak: data.timings.Imsak,
      Fajr: adjustTime(data.timings.Fajr, -11), // Decrease by 11 minutes
      Dhuhr: adjustTime(data.timings.Dhuhr, 7),  // Increase by 7 minutes
      Asr: adjustTime(data.timings.Asr, 4),      // Increase by 4 minutes
      Maghrib: adjustTime(data.timings.Maghrib, 7), // Increase by 7 minutes
      Isha: adjustTime(data.timings.Isha, 18)    // Increase by 18 minutes
    };

    return {
      status: 'OK',
      results: {
        datetime: [{
          times: adjustedTimes,
          date: {
            timestamp: Date.now(),
            gregorian: data.date.gregorian.date,
            hijri: data.date.hijri.date
          }
        }],
        location: {
          city,
          country,
          latitude: geoResponse.data.latitude,
          longitude: geoResponse.data.longitude
        }
      }
    };
  } catch (error) {
    console.error('Error fetching prayer times:', error);
    throw new Error('Failed to fetch prayer times');
  }
}