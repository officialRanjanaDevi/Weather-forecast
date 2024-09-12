import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AirIcon from '@mui/icons-material/Air';
import CloudIcon from '@mui/icons-material/Cloud';
import FilterDramaRoundedIcon from '@mui/icons-material/FilterDramaRounded';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import MoodIcon from '@mui/icons-material/Mood';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Stack from '@mui/material/Stack';
import WbTwilightRoundedIcon from '@mui/icons-material/WbTwilightRounded';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import ThunderstormOutlinedIcon from '@mui/icons-material/ThunderstormOutlined';
import AcUnitRoundedIcon from '@mui/icons-material/AcUnitRounded';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import one from './images/one.png';
import two from './images/two.png';
import three from './images/three.png';
import four from './images/four.png';
import "./InBox.css";
export default function InBox({ info }) {
  const tempPercentage = (info.temp / 50) * 100;
  const cloudPercentage = info.cloud; // Assuming this is out of 100
  
  const elements = [];
  let currentTime = new Date('2024-09-11T' + info.time); // starting from the given time
  let currentTemp = info.temp; // starting temperature

  for (let i = 0; i < 5; i++) {
    elements.push(
      <div key={i} className='flex-col justify-evenly mx-4 mx-auto'>
        <p>{currentTime.getHours().toString().padStart(2, '0') + ':' + currentTime.getMinutes().toString().padStart(2, '0')}</p>
        {info.cloud > 80 ? (
          <ThunderstormOutlinedIcon className='text-2xl' />
        ) : info.cloud > 50 ? (
          <FilterDramaRoundedIcon className='text-2xl' />
        ) : (
          <LightModeOutlinedIcon className='text-2xl' />
        )}
        <p><b>{currentTemp.toFixed(1)}&#8451;</b></p> {/* Limit temperature to 1 decimal place */}
      </div>
    );

    // Increment time by 2 hours for the next iteration
    currentTime.setHours(currentTime.getHours() + 2);

    // Adjust temperature randomly between -2 and +2 degrees with 1 decimal place precision
    currentTemp = (currentTemp + (Math.random() * 4 - 2)).toFixed(1);
    currentTemp = parseFloat(currentTemp); // Ensure it's a number again after manipulation
  }


  return (
    <Card className={`${info.cloud>50?'bg-black':info.day === 0 ? 'bg-black' : 'bg-sky-600'} cardStyle`}>
        
      <div className='p-4 text-white h-4/6'>

        <div className='flex flex-wrap justify-between'>
          <div>
            <h4>Today</h4>
            <p><b>{info.city}, {info.country}</b></p>
          </div>
          <div className='text-end'>
            <p>{info.date}</p>
            <p>{info.time}</p>
          </div>
        </div>

        <div className=' text-center'>
          <p className='text-6xl mb-0'>{info.temp}&#8451;</p>
          <p className='mb-0'>{info.weather}</p>
          <img src={info.cloud>80? three:info.cloud>50?four:info.day===0?two:one } alt="img"></img>
        </div>
      </div>


      <CardContent className={`${info.cloud>50?'cloudy':info.day === 0 ? 'night ' : 'day'} infoBox `}>
        <div className='text-white mt-2 mx-4 flex justify-between'>
        <p className=' text-base'>Check out today's weather information</p>
        <AccountBoxIcon></AccountBoxIcon> 
        </div>
      
        <div className='additionalInfo'>
          <p className='mt-3 ml-4'><b>More details of today's weather: </b></p>
          <div className='flex '>
            {elements}
          </div>
        </div>

        <div className='gridDiv'>
          {/* Weather */}
          <div className='gridContainer'>
            <div className='flex justify-between'>
              <b>Weather</b><WbSunnyIcon className={`${info.cloud>50?'bg-black ':info.day === 0 ? 'bg-gray-950 ' : 'bg-sky-700'} gridSideIcon`} />
            </div>
            {info.weather}
            <br />
            {info.cloud > 75 ? <ThunderstormOutlinedIcon className={`${info.cloud>50?'text-black ':info.day === 0 ? 'text-gray-950 ' : 'text-sky-700'} text-4xl `} /> : info.cloud > 50 ? <CloudIcon className={`${info.cloud>50?'text-black ':info.day === 0 ? 'text-gray-950 ' : 'text-sky-700'} text-4xl `} /> : <LightModeOutlinedIcon className={`${info.cloud>50?'text-black ':info.day === 0 ? 'text-gray-950 ' : 'text-sky-700'} text-4xl `} />}
          </div>

          {/* Temperature */}
          <div className='gridContainer'>
            <div className='flex justify-between'>
              <b>Temperature</b><ThermostatIcon className={`${info.cloud>50?'bg-black ':info.day === 0 ? 'bg-gray-950 ' : 'bg-sky-700'} gridSideIcon`} />
            </div>
            {info.temp}&#8451;
            <div className='flex w-full text-xs mt-3'>
              <p> 0 &#8451; &nbsp;  </p>
              <div className="progress w-2/3" role="progressbar" aria-valuenow={info.temp} aria-valuemin="0" aria-valuemax="50" style={{ height: "10px", backgroundColor: "rgb(200 200 200)" }}>
                <div className="progress-bar " style={{ width: `${tempPercentage}%`, backgroundColor:info.cloud>50?"black":info.day === 0 ? "black" : "rgb(3 105 161)" }}>

                </div>
              </div>
              <p>&nbsp;50 &#8451; </p>
            </div>
          </div>

          {/* Humidity */}
          <div className='gridContainer'>
            <div className='flex justify-between'>
              <b>Humidity</b><WaterDropIcon className={`${info.cloud>50?'bg-black ':info.day === 0 ? 'bg-gray-950 ' : 'bg-sky-700'} gridSideIcon`} />
            </div>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 3 }}>
              <Gauge width={70} height={70} value={info.humidity} />
            </Stack>
          </div>

          {/* Wind Speed */}
          <div className='gridContainer'>
            <div className='flex justify-between'>
              <b>Wind Speed</b> <AirIcon className={`${info.cloud>50?'bg-black ':info.day === 0 ? 'bg-gray-950 ' : 'bg-sky-700'} gridSideIcon`}  />
            </div>
            <Gauge className='w-24 h-16 mx-auto ' value={info.windSpeed} startAngle={-90} endAngle={90} sx={{ [`& .${gaugeClasses.valueText}`]: { fontSize: 15, transform: 'translate(0px, 0px)' } }} text={({ value }) => `${value} kwh`} />
          </div>

          {/* Feels Like */}
          <div className='gridContainer'>
            <div className='flex justify-between'>
              <b>Feels Like</b> <MoodIcon className={`${info.cloud>50?'bg-black ':info.day === 0 ? 'bg-gray-950 ' : 'bg-sky-700'} gridSideIcon`}  />
            </div>
            {info.feelslike}&#8451;<br />
            {info.temp > 40 ? <LightModeOutlinedIcon className={`${info.cloud>50?'text-black ':info.day === 0 ? 'text-gray-950 ' : 'text-sky-700'} text-4xl `} /> : info.temp > 30 ? <WbTwilightRoundedIcon className={`${info.cloud>50?'text-black ':info.day === 0 ? 'text-gray-950 ' : 'text-sky-700'} text-4xl `} /> : info.temp < 10 ? <AcUnitRoundedIcon className={`${info.cloud>50?'text-black ':info.day === 0 ? 'text-gray-950 ' : 'text-sky-700'}text-5xl `} /> : <SentimentVerySatisfiedIcon className={`${info.cloud>50?'text-black ':info.day === 0 ? 'text-gray-950 ' : 'text-sky-700'} text-4xl `} />}
          </div>

          {/* Cloud */}
          <div className='gridContainer'>
            <div className='flex justify-between'>
              <b>Cloud</b><FilterDramaRoundedIcon className={`${info.cloud>50?'bg-black ':info.day === 0 ? 'bg-gray-950 ' : 'bg-sky-700'} gridSideIcon`}  />
            </div>
            {info.cloud} %
            <div className='flex justify-center mt-3'>
              0 &nbsp;<div className="progress w-2/3" role="progressbar" aria-valuenow={info.cloud} aria-valuemin="0" aria-valuemax="100" style={{ height: "10px", backgroundColor:"rgb(200,200,200)" }}>
                <div className="progress-bar " style={{ width: `${cloudPercentage}%`, backgroundColor:info.cloud>50?"black":info.day === 0 ? "black" : "rgb(3 105 161)" }}>

                </div>
              </div> &nbsp;100
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
