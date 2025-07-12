import { useEffect, useState } from "react";
import {  SearchWeatherTwo, weather_gather, type weather } from "../utils/tanstack.config";
import { useQuery } from "@tanstack/react-query";
import { Building2, Cloud, CloudLightning, Locate, MapPin, Search } from "lucide-react";
import { ArCondition } from "../components/Ar";


export function HOME() {
  const [coordinates, setCoordinates] = useState<{ lat: number; lon: number } | null>(null);
  const [IsSearching,setIsSearching]= useState<boolean>(false)
  const [textSearch, setTextSearch] = useState<string>("");
  const [searchResponse , setSearchResponse] = useState<weather | null>(null);

  const search = async() => {
    try {
      setIsSearching(true)
  
      if (textSearch.trim() === "") {
        setIsSearching(false);
        return;
      }
      //const {data} = SearchWeather(textSearch);
      const data = await SearchWeatherTwo(textSearch);
      if (data) {
        console.log({res1:"search field",...data});
        setSearchResponse(data);
      } else {
        console.log("No data found for the search term.");
        setSearchResponse(null);
        setIsSearching(false);
      }
    // Call the weather_gather function with the search term
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setIsSearching(false)
    }finally{
      setTextSearch("");
    }
    // Reset the search term after searching  
  }
  //useEffect : get the lat and lon from the browser
  useEffect(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCoordinates({ lat: latitude, lon: longitude });
        //console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      });
    }, []);


  //useQuery : get the data from the API
  const {data} = useQuery({
    queryKey: ['weather',coordinates],
    queryFn: () =>weather_gather({
        lat: coordinates!.lat,
        lon: coordinates!.lon
    }),
    enabled: !!coordinates, // Only run the query if coordinates are available
    refetchOnWindowFocus: false, // Disable refetching on window focus
  })

  const dataFormater = (text?:string)=>{
    try {
      if(text){
        const newDay = new Date(text);
        const options: Intl.DateTimeFormatOptions = {
          weekday: 'long',
          hour: '2-digit',
          minute: '2-digit',
        }
        return newDay.toLocaleDateString('pt-br', options);
      }else{

        const newDay = new Date(data!.weather.location.localtime);
        const options: Intl.DateTimeFormatOptions = {
          weekday: 'long',
          hour: '2-digit',
          minute: '2-digit',
        }
        return newDay.toLocaleDateString('pt-br', options);
      }
      
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return ""
    }
  }
  return (
      <div className="flex flex-wrap bg-[#dbceb2] gap-2 sm:flex-col h-[100vh] overflow-x-hidden sm:overflow-y-hidden xl:overflow-y-hidden w-[100vw]  p-2 ">
          <div className=" xl:max-w-[400px]  grow min-w-[300px] flex gap-2 flex-col items-center py-2">
           
            <nav className="flex items-center h-[50px] border-2 w-[80%] rounded gap-2 p-2">
              <Search onClick={search} className="cursor-pointer"/>
              <input type="text" placeholder="search for places" value={textSearch} onChange={(e)=>setTextSearch(e.target.value)} className="outline-none grow font-roboto"/>
               <Locate />
            </nav>

            <main className="xl:grow sm:grow flex flex-col  xl:w-[90%] p-2  gap-2">
              <section className="flex flex-col  items-center justify-center h-[450px] gap-4 xl:w-[98%] rounded">
                <img src={data?.weather.current.weather_icons[0]} alt="weather icon" className="sm:w-[90%]  w-[90%] xl:w-[80%] rounded "/>
                <section className="w-[90%] h-[80px]  flex flex-col gap-1 p-2">
                  <p className="text-lg font-montserrat font-semibold flex items-center gap-2">
                    <Cloud />
                    {data?.weather.current.weather_descriptions[0]}
                  </p>
                  <h1 className="text-2xl font-montserrat flex gap-1 items-center font-semibold">
                    <Building2 />
                    {data?.weather.location.name}
                  </h1>
                </section>
              </section>
              <section className="flex flex-col items-center  p-1 gap-2 xl:w-[98%]">
                <span className="font-roboto font-mono text-zinc-700 text-9xl">
                  {data?.weather.current.temperature}°C
                </span>
                <span className="w-[90%] text-zinc-900 p-2 font-montserrat font-semibold">{dataFormater()}</span>
              </section>

            </main>

            <div className="flex items-center gap-1 border-2 h-[90px] justify-center rounded w-[250px] " >
              <img src={data?.Image} alt="your country" className="h-[42px] w-[42px] rounded" />
              <h1 className="text-xl font-montserrat z-20  font-bold">{data?.Name}</h1>
              <MapPin color="white" size={20}  fill="red"  className="z-20"/>
            </div>
          </div>

          <div className="grow-2 min-w-[400px] xl:grow-2 sm:grow-2 flex flex-col  xl:flex-col  sm:flex-col  sm:overflow-x-hidden sm:overflow-y-scroll xl:overflow-y-scroll gap-2">
            <header className="flex items-center flex-col gap-2  p-2 ">
              <nav className="p-2 border-2 w-full rounded">
                <h1 className="text-2xl font-montserrat font-semibold">Weather</h1>
                <nav className="flex items-center gap-1">
                  <span className="text-sm text-purple-300 font-bold font-roboto">an app for weather</span>
                  <CloudLightning  size={18} color="purple"/>
                </nav>
              </nav>
                {(IsSearching && searchResponse) && (
              <div className="border-2 border-[#627e75] w-full flex flex-col items-center p-2 rounded">
                    <h1 className="text-2xl font-montserrat font-semibold p-2">
                      Search Results :
                    </h1>
                      <section className="flex flex-col w-[90%]  items-center justify-center h-[450px] gap-4 sm:w-[90%] xl:w-[90%] rounded">
                          <img src={searchResponse?.current.weather_icons[0]} alt="weather icon" className="sm:w-[50%]  w-[70%] xl:w-[30%]  rounded "/>
                          <section className="w-[60%] h-[80px]  flex flex-col gap-1 p-2">
                            <p className="text-lg font-montserrat font-semibold flex items-center gap-2">
                              <Cloud />
                              {searchResponse?.current.weather_descriptions[0]}
                            </p>
                            <h1 className="text-2xl font-montserrat flex gap-1 items-center font-semibold">
                              <Building2 />
                              {searchResponse?.location.name}
                            </h1>
                        </section>
                      </section>
                      <section className="flex flex-col items-center  p-1 gap-2 xl:w-[80%]">
                          <span className="font-roboto font-mono text-zinc-700 text-9xl">
                            {searchResponse?.current.temperature}°C
                          </span>
                          <div className="h-[50px] flex items-center w-[80%]  rounded">
                            <span className="w-[90%] block text-zinc-900 p-2 font-montserrat font-semibold">{dataFormater(searchResponse.location.localtime)}</span>
                            <span className="h-[45px]  w-[145px]  flex justify-center items-center px-1  text-center text-sm font-roboto text-red-900 font-bold cursor-pointer hover:text-white hover:bg-red-900 duration-[.8s] bg-white rounded-md shadow" onClick={()=>
                              setIsSearching(false)
                              }>
                              close search
                            </span>
                          </div>
                      </section>
                      </div>
                )}
            </header>

            <main className="xl:grow sm:grow flex flex-col gap-2 p-2  ">
              <section className="sm:h-[200px] min-h-[200px] py-2 flex flex-col gap-4 sm:gap-2">
                  <h1 className="sm:text-4xl text-2xl  font-montserrat sm:my-4 font-semibold">
                    astronomical data
                  </h1>

                  {data?.weather.current.astro && <div className="flex sm:flex-row sm:items-center flex-col gap-2 sm:w-[600px]">
                    <ArCondition name="sunrise" value={data!.weather.current.astro.sunrise} />
                    <ArCondition name="sunset" value={data!.weather.current.astro.sunset} />
                    <ArCondition name="moonrise" value={data!.weather.current.astro.moonrise} />
                    <ArCondition name="moonset" value={data!.weather.current.astro.moonset} />
                    <ArCondition name="moon phase" value={data!.weather.current.astro.moon_phase} />
                    <ArCondition name="moon illumination" value={data!.weather.current.astro.moon_illumination.toString()} />
                  </div>}
              </section>

              <section className="sm:h-[200px] text-2xl py-2 flex flex-col gap-5 sm:gap-2">
                <h1 className="sm:text-3xl font-montserrat sm:my-4 font-semibold">
                  condition of the weather in your area
                </h1 >
                <div className="flex sm:items-center gap-2 flex-col sm:flex-row flex-wrap">
                  <ArCondition name="co" value={`${data?.weather.current.air_quality.co}%`} />
                  <ArCondition name="c3" value={`${data?.weather.current.air_quality.o3}%`} />
                  <ArCondition name="so2" value={`${data?.weather.current.air_quality.so2}%`} />
                </div>
              </section>

              <section className="sm:h-[200px] py-2 flex flex-col gap-5 sm:gap-2">
                <h1 className="sm:text-3xl text-2xl font-montserrat sm:my-4 font-semibold">Weather forecast</h1>
                <div className="flex sm:items-center gap-2 flex-col sm:flex-row flex-wrap xl:w-[750px] sm:w-[600px]">
                  <ArCondition name="humidity" value={`${data?.weather.current.humidity}%`} />
                  <ArCondition name="pressure" value={`${data?.weather.current.pressure}%`} />
                  <ArCondition name="wind speed" value={`${data?.weather.current.wind_speed} km/h`} />
                  <ArCondition name="visibility" value={`${data?.weather.current.visibility}`} />
                  <ArCondition name="wind degree" value={`${data?.weather.current.wind_degree}`} />
                  <ArCondition name="precipitation" value={`${data?.weather.current.precip}`} />
                  <ArCondition name="cloud cover" value={`${data?.weather.current.cloudcover}`} />
                </div>
              </section>
            </main>
          </div>
      </div>
  )
}


