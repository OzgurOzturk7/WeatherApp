import React, { useState } from 'react';
import logo from './assets/logo.png';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const apiKey = '23236143300cfb8db10607f81fb75e85'; 

  const fetchWeather = () => {
    if (!city) return;

    setLoading(true);
    setError('');
    setWeather(null);

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=tr`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Şehir bulunamadı');
        }
        return res.json();
      })
      .then(data => {
        setWeather(data);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', padding: 20, boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: 10, fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Hava Durumu</h1>

      <input
        type="text"
        placeholder="Şehir girin"
        value={city}
        onChange={e => setCity(e.target.value)}
        style={{ width: '100%', padding: 10, fontSize: 16, marginBottom: 10, borderRadius: 5, border: '1px solid #ccc' }}
      />
      <button
        onClick={fetchWeather}
        style={{ width: '100%', padding: 10, fontSize: 16, borderRadius: 5, border: 'none', backgroundColor: '#007bff', color: 'white', cursor: 'pointer' }}
      >
        Getir
      </button>

      {loading && <p style={{ textAlign: 'center', marginTop: 10 }}>Yükleniyor...</p>}

      {error && <p style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>{error}</p>}

      {weather && (
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <h2>{weather.name}</h2>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
          <p style={{ fontSize: 32, margin: 0 }}>{Math.round(weather.main.temp)}°C</p>
          <p style={{ textTransform: 'capitalize', marginTop: 5 }}>{weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;

