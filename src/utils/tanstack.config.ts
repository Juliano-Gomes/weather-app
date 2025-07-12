import {env} from './env.config'
import { useQuery, type UseQueryResult } from "@tanstack/react-query";


type responseAPI = {
  place_id: number,
  licence: string,
  osm_type: string,
  osm_id: number,
  lat: string,
  lon: string,
  display_name: string,
  address: {
    road: string,
    neighbourhood: string,
    suburb: string,
    village: string,
    city: string,
    county: string,
    "ISO3166-2-lvl6": string,
    postcode: string,
    country: string,
    "country_code": string
  },
  boundingbox: string[],
}

type responseFlag = {
  flags: {
      png: string,
      svg: string,
      alt:string
    }
}


export type weather = {
  request: {
    type: string;
    query: string;
    language: string;
    unit: string;
  };
  location: {
    name: string;
    country: string;
    region: string;
    lat: string;
    lon: string;
    timezone_id: string;
    localtime: string;
    localtime_epoch: number;
    utc_offset: string;
  };
  current: {
    observation_time: string;
    temperature: number;
    weather_code: number;
    weather_icons: string[];
    weather_descriptions: string[];
    astro: {
      sunrise: string;
      sunset: string;
      moonrise: string;
      moonset: string;
      moon_phase: string;
      moon_illumination: number;
    };
    air_quality: {
      co: string;
      no2: string;
      o3: string;
      so2: string;
      pm2_5: string;
      pm10: string;
      "us-epa-index": string;
      "gb-defra-index": string;
    };
    wind_speed: number;
    wind_degree: number;
    wind_dir: string;
    pressure: number;
    precip: number;
    humidity: number;
    cloudcover: number;
    feelslike: number;
    uv_index: number;
    visibility: number;
    is_day: "yes" | "no";
  };
};

export const weather_gather = async(data:{lat:number,lon:number}) : Promise<{
    Image: string;
    Name: string;
    weather: weather;
    city: string;
} | null>=>{
  try {
    const {lat,lon} = data//validator.parse(data)

    const URL = `${env.VITE_REVERSE_GEO_URL}?lat=${lat}&lon=${lon}&api_key=${env.VITE_REVERSE_GEO_KEY}`

    const request = await fetch(URL)
    const response:responseAPI = await request.json()
    console.log({res:"res 1", ...response})
    if (!request.ok) {
      //throw new Error('Failed to fetch data')
      return null
    }else{
      const newURL =await fetch(`${env.VITE_API_COUNTRY}/${response.address.country}`) 

      const responseFlag : responseFlag[]= await newURL.json()
      //return responseFlag
      console.log({res:"res 2", ...responseFlag[0]})
      if(responseFlag){
       const weatherURL =await fetch(`${env.VITE_WEATHER_TWO_URL}current?access_key=${env.VITE_WEATHER_TWO_KEY}&query=${response.address.city}`) 

        const weatherResponse : weather =await weatherURL.json()
        console.log({res:"res 3", ...weatherResponse})
        console.log("fg : "+responseFlag[0].flags.png)
        return{
          Image: responseFlag[0].flags.png,
          Name: response.address.country,
          weather: weatherResponse,
          city: response.address.city,
        }
      }else{
        console.log('No flag found for the country')
        return null
      }
    }

   
  } catch (err) {
    console.log(err)
    console.log('Validation error!')
    return null
  }
}

//alternative to searchWeather but using tanstack query ,for better performance and caching
export const SearchWeather = (query: string): UseQueryResult<weather, Error> => {
  return useQuery({
    queryKey: ['searchWeather', query],
    queryFn: async () => {
      const weatherURL = await fetch(`${env.VITE_WEATHER_TWO_URL}current?access_key=${env.VITE_WEATHER_TWO_KEY}&query=${query}`);
      console.log("response has arrived")
      console.log({res:"search weather", ...weatherURL})
      const weatherResponse: weather = await weatherURL.json();
      if (!weatherURL.ok) {
        console.error('Failed to fetch weather data:', weatherResponse);
        throw new Error('Failed to fetch weather data');
      } else {
        return weatherResponse;
      }
    },
    enabled: !!query, // Only run the query if coordinates are available
    refetchOnWindowFocus: false,
  });
}


export const SearchWeatherTwo = async(text:string):Promise<weather | null>=>{
  try {
      const weatherURL = await fetch(`${env.VITE_WEATHER_TWO_URL}current?access_key=${env.VITE_WEATHER_TWO_KEY}&query=${text}`);
      const weatherResponse: weather = await weatherURL.json();

      //console.log({res:"search weather two", ...weatherResponse})
      return weatherResponse;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null
  }
}

/**
 * Test data for the weather API response
 {
   "request": {
     "type": "City",
     "query": "Almada, Portugal",
     "language": "en",
     "unit": "m"
   },
   "location": {
     "name": "covilhã",
     "country": "Portugal",
     "region": "Castelo Branco",
     "lat": "38.683",
     "lon": "-9.150",
     "timezone_id": "Europe/Lisbon",
     "localtime": "2025-07-11 18:16",
     "localtime_epoch": 1752257760,
     "utc_offset": "1.0"
   },
   "current": {
     "observation_time": "05:16 PM",
     "temperature": 22,
     "weather_code": 116,
     "weather_icons": [
       "https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0002_sunny_intervals.png"
     ],
     "weather_descriptions": [
       "Partly cloudy"
     ],
     "astro": {
       "sunrise": "06:21 AM",
       "sunset": "09:03 PM",
       "moonrise": "09:59 PM",
       "moonset": "06:33 AM",
       "moon_phase": "Waning Gibbous",
       "moon_illumination": 100
     },
     "air_quality": {
       "co": "233.1",
       "no2": "11.655",
       "o3": "78",
       "so2": "2.035",
       "pm2_5": "16.465",
       "pm10": "32.375",
       "us-epa-index": "2",
       "gb-defra-index": "2"
     },
     "wind_speed": 19,
     "wind_degree": 259,
     "wind_dir": "W",
     "pressure": 1015,
     "precip": 0,
     "humidity": 73,
     "cloudcover": 75,
     "feelslike": 25,
     "uv_index": 2,
     "visibility": 10,
     "is_day": "yes"
   }
 }
 * 
 */