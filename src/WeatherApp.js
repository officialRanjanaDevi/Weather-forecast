import InBox from './InBox';
import SearchBox from './SearchBox';
import { useState } from 'react';
export default function WeatherApp(){
    const currentDate = new Date();
    
    const [weatherInfo,setWeatherInfo]=useState({
        day:0,
        date:"2024-12-20",
        time:"10:30",
        city:"Mumbai",
        country:"India",
        temp:29.3,
        feelslike:31.2,
        humidity:55,
        weather:"clear",
        windSpeed:10,
        cloud:30,
        
    });
    let updateInfo=(newInfo)=>{
        setWeatherInfo(newInfo);
    }    
    return <div className='relative bg-slate-50 shadow-inner shadow-black py-4 h-full '>
        <SearchBox updateInfo={updateInfo}/><br />
      <InBox info={weatherInfo}/>
    </div>
}