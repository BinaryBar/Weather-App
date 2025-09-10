/* Weather App — app.js
   Demo Mode works without an API key (sample data).
   To use OpenWeatherMap replace the API_KEY value and uncheck Demo Mode.
*/

const el = id => document.getElementById(id);

const searchBtn = el('searchBtn');
const cityInput = el('cityInput');
const resultCard = el('result');
const loader = el('loader');
const msg = el('msg');
const demoCheckbox = el('demoMode');
const unitSelect = el('unitSelect');

const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; // <- replace with your key for live data

function show(elm){ elm.classList.remove('hidden'); }
function hide(elm){ elm.classList.add('hidden'); }

function toTime(ts, tz=0) {
  try {
    const d = new Date((ts + tz) * 1000);
    return d.toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' });
  } catch { return '--:--'; }
}

const DEMO_DATA = {
  name: "Dhaka",
  sys: { country: "BD", sunrise: 1696068000, sunset: 1696114800 },
  weather: [{ description: "Partly cloudy", icon: "03d" }],
  main: { temp: 31, feels_like: 33, humidity: 72 },
  wind: { speed: 3.5 },
  timezone: 21600
};

async function fetchWeatherLive(city, units='metric') {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=${units}&appid=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('City not found');
  return res.json();
}

function displayData(data, units='metric') {
  el('place').textContent = `${data.name}, ${data.sys?.country || ''}`;
  el('desc').textContent = data.weather?.[0]?.description || '';
  el('temp').textContent = `${Math.round(data.main.temp)}°${units==='metric'?'C':'F'}`;
  el('feels').textContent = `${Math.round(data.main.feels_like)}°`;
  el('hum').textContent = `${data.main.humidity}%`;
  el('wind').textContent = `${data.wind?.speed ?? 0} ${units==='metric'?'m/s':'mph'}`;
  el('sunrise').textContent = toTime(data.sys.sunrise, data.timezone);
  const iconCode = data.weather?.[0]?.icon;
  if (iconCode) el('icon').src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  show(resultCard);
}

async function runSearch() {
  const city = (cityInput.value || '').trim();
  const units = unitSelect.value || 'metric';
  msg.textContent = '';
  hide(resultCard);
  if (!city) { msg.textContent = 'Please enter a city name.'; return; }

  show(loader);
  try {
    let data;
    if (demoCheckbox.checked) {
      // Demo: simulate small delay
      await new Promise(r => setTimeout(r, 600));
      data = { ...DEMO_DATA, name: city };
      // adjust temps roughly if unit is imperial
      if (units === 'imperial') {
        data.main.temp = Math.round(data.main.temp * 9/5 + 32);
        data.main.feels_like = Math.round(data.main.feels_like * 9/5 + 32);
      }
    } else {
      data = await fetchWeatherLive(city, units);
    }
    displayData(data, units);
    // save last city
    try { localStorage.setItem('bb-last-city', city); } catch {}
  } catch (err) {
    msg.textContent = '⚠️ ' + (err.message || 'Error fetching data');
  } finally {
    hide(loader);
  }
}

searchBtn.addEventListener('click', runSearch);
cityInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') runSearch(); });

// load last
window.addEventListener('load', () => {
  const last = localStorage.getItem('bb-last-city');
  if (last) {
    cityInput.value = last;
    // auto-run in demo by default
    // runSearch();
  }
});
