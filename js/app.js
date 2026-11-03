// ---------- Búsqueda y filtros ----------
const buscador = document.getElementById('buscador');
const selSemestre = document.getElementById('semestre');
const selEstado = document.getElementById('estado');
const sinResultados = document.getElementById('sin-resultados');
const items = document.querySelectorAll('.filtrable');

function normalizar(t) {
  return t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function filtrar() {
  const q = normalizar(buscador.value.trim());
  const sem = selSemestre.value;
  const est = selEstado.value;
  let visibles = 0;

  items.forEach(el => {
    const ok =
      el.dataset.semestre === sem &&
      (est === 'todas' || el.dataset.estado === est) &&
      normalizar(el.textContent).includes(q);
    el.hidden = !ok;
    if (ok) visibles++;
  });

  sinResultados.hidden = visibles > 0;
}

[buscador, selSemestre, selEstado].forEach(c => c.addEventListener('input', filtrar));
filtrar();

// ---------- Clima (OpenWeather) ----------
const API_KEY = ''; // pega aquí tu clave de openweathermap.org
const CIUDAD = 'Bogota,CO';
const clima = document.getElementById('weather-content');

async function cargarClima() {
  if (!API_KEY) {
    clima.innerHTML = '<p>Agrega tu API key de OpenWeather en js/app.js para ver el clima.</p>';
    return;
  }
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(CIUDAD)}&units=metric&lang=es&appid=${API_KEY}`;
    const r = await fetch(url);
    if (!r.ok) throw new Error(r.status);
    const d = await r.json();
    clima.innerHTML = `
      <p class="temp">${Math.round(d.main.temp)}°C - ${d.weather[0].description}</p>
      <p>Humedad: ${d.main.humidity}%</p>`;
  } catch (e) {
    clima.innerHTML = '<p>No se pudo cargar el clima. Intenta más tarde.</p>';
  }
}
cargarClima();
