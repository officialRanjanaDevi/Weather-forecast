import InBox from './InBox';
import SearchBox from './SearchBox';
import { useState } from 'react';
export default function WeatherApp(){
    const [weatherInfo,setWeatherInfo]=useState({city:"Mumbai",
        country:"India",
        temp:30,
        feelslike:32,
        humidity:20,
        weather:"Sunny",
        windSpeed:10,
        cloud:2,});
    let updateInfo=(newInfo)=>{
        setWeatherInfo(newInfo);
    }    
    return <div className='h-full relative bg-slate-50 shadow-inner shadow-black py-4 h-full '>
        <SearchBox updateInfo={updateInfo}/><br />
      <InBox info={weatherInfo}/>
    </div>
}