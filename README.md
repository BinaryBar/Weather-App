# 🌤 Weather App

A clean and simple Weather App that shows current weather for any city.  
This project supports a **Demo Mode** so it works without an API key, and can be upgraded to use **OpenWeatherMap** for live data.

---

## 🚀 Features
- Search weather by **city name**
- Shows temperature, "feels like", humidity, wind, sunrise, and an icon
- Unit toggle: **°C / °F**
- Demo Mode (works without API key) — great for GitHub Pages demo
- Saves last searched city to `localStorage`
- Responsive UI, easy to customize

---

## 🛠 Tech
- HTML, CSS, JavaScript (Vanilla)
- OpenWeatherMap (optional for live mode)

---

## 🧩 How to Use (Demo)
1. Open `index.html` locally OR upload to GitHub Pages.  
2. By default **Demo Mode** is enabled — type a city name and click **Check**.  
3. To use live data, obtain an OpenWeatherMap API key (see below), paste it into `app.js` at the top (`API_KEY`), and uncheck **Demo Mode**.

---

## 🔑 Get an OpenWeatherMap API Key (optional, free)
1. Visit https://openweathermap.org/ and sign up.  
2. Go to API keys in your account, create a key.  
3. Replace the `API_KEY` value in `app.js` with your key.

**Important:** Do NOT commit secret keys in public repos in plaintext for production. For private work or demos, local replacement is OK. For production, use a serverless proxy to hide keys.

---

## 📂 Project Structure
