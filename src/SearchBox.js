import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './SearchBox.css';

export default function SearchBox({ updateInfo }) {
  const [city, setCity] = useState('');
  const [error, setError] = useState(false);
  const API_URL = "https://api.weatherapi.com/v1/current.json"; 


  const API_Key = process.env.REACT_APP_API_KEY;

  const getWeatherInfo = async () => {
    try {
      const res = await fetch(`${API_URL}?key=${API_Key}&q=${city}&aqi=no`);

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const jsonRes = await res.json();


      if (!jsonRes.location) {
        setError(true);
        throw new Error('No location data found in response');
      }


      const {
        current: {
          is_day,
          temp_c,
          feelslike_c,
          humidity,
          condition: { text: weather },
          wind_kph,
          cloud,
        },
        location: { localtime, country },
      } = jsonRes;

      const result = {
        day:jsonRes.current.is_day,
        date:jsonRes.location.localtime.substring(0,10),
        time:jsonRes.location.localtime.substring(11),
        city:city,
        country:jsonRes.location.country,
        temp:jsonRes.current.temp_c,
        feelslike:jsonRes.current.feelslike_c,
        humidity:jsonRes.current.humidity,
        weather:jsonRes.current.condition.text,
        windSpeed:jsonRes.current.wind_kph,
        cloud:jsonRes.current.cloud,
      };

      console.log(result);
      return result;
    } catch (err) { throw err ;} };

    
    let handleChange=(event)=>{
        setCity(event.target.value);
    };
    let handleSubmit=async(event)=>{
        try{
            event.preventDefault();
            console.log(city);
            setCity("");
            let newInfo=await getWeatherInfo();
            updateInfo(newInfo);
        }catch{
            setError(true);
        }
      
    };
    return (
        <div className="searchBox ">
            <form className='w-full flex justify-center ' onSubmit={handleSubmit}>
                <input type="text" label="City" variant="outlined" value={city} onChange={handleChange} placeholder='&nbsp;&nbsp;&nbsp;search city' required></input>

                <button variant="contained" color="primary" ><SearchIcon className='searchIcon' type="Submit"></SearchIcon></button>
            </form>
            {error && <p className='text-center text-red-500 ' >No such place exixt in our data!</p>}
        </div>
    )
}