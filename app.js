// Datos institucionales fijos y seguros (evita fallos de red o fetch)
const datosInstitucionales = {
  nombre: "Inmosur Andina",
  subtitulo: "Alojamientos & Alquileres Temporarios",
  descripcion: "Especialistas en experiencias de hospedaje únicas. Desarrollos y propuestas inspiradas en el confort, la calidad constructiva y el entorno natural.",
  direccion: "Calle Pública - Cañada Sur 3851, B° Manantiales I, Córdoba, Argentina",
  whatsapp: "5492616253304",
  instagram: "https://www.instagram.com/inmosurcba",
  grupo_edisur: "https://www.grupoedisur.com.ar/desarrollos/manantiales/lotes/el-paso/"
};

let propiedadesData = [];
let propiedadActual = null;
let fotoIndiceActual = 0;

document.addEventListener("DOMContentLoaded", async () => {
  // 1. Cargar datos institucionales de inmediato
  document.getElementById("inst-titulo").innerText = datosInstitucionales.nombre;
  document.getElementById("inst-subtitulo").innerText = datosInstitucionales.subtitulo;
  document.getElementById("inst-desc").innerText = datosInstitucionales.descripcion;
  document.getElementById("inst-direccion").innerText = `📍 ${datosInstitucionales.direccion}`;
  
  document.getElementById("footer-dir").innerText = `📍 ${datosInstitucionales.direccion}`;
  document.getElementById("link-instagram").href = datosInstitucionales.instagram;
  document.getElementById("link-edisur").href = datosInstitucionales.grupo_edisur;

  const msgGeneral = "Hola Inmosur Andina, quisiera consultar por disponibilidad de alojamientos.";
  document.getElementById("footer-whatsapp").href = `https://wa.me/${datosInstitucionales.whatsapp}?text=${encodeURIComponent(msgGeneral)}`;

  // 2. Cargar propiedades desde el JSON
  try {
    const res = await fetch("./alojamientos.json");
    const data = await res.json();
    propiedadesData = data.propiedades;

    document.getElementById("total-propiedades").innerText = propiedadesData.length;
    renderTarjetas(propiedadesData);
  } catch (error) {
    console.error("Error al cargar alojamientos.json:", error);
  }
});

function renderTarjetas(lista) {
  const container = document.getElementById("grid-alojamientos");
  if (!container) return;
  container.innerHTML = "";

  lista.forEach(item => {
    const fotoPrincipal = `./imagenes/${item.id}/${item.fotos[0]}`;

    const card = document.createElement("div");
    card.className = "bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col hover:shadow-md transition cursor-pointer group";
    card.onclick = () => abrirModal(item.id);

    card.innerHTML = `
      <div class="relative h-52 bg-slate-200 overflow-hidden">
        <img src="${fotoPrincipal}" alt="${item.titulo}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" onerror="this.src='https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80'" />
        <span class="absolute bottom-3 left-3 bg-slate-900/75 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
          📍 ${item.ubicacion}
        </span>
        <span class="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-slate-900 font-black text-xs px-2.5 py-1 rounded-lg shadow-sm">
          US$${item.precio_dia} <span class="text-[10px] font-normal text-slate-500">/día</span>
        </span>
      </div>
      
      <div class="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 class="font-bold text-lg text-slate-900 leading-snug group-hover:text-brand-terracotta transition">${item.titulo}</h3>
          <p class="text-xs text-slate-500 mt-1">👤 Capacidad: hasta ${item.capacidad} personas</p>
          <p class="text-xs text-slate-600 mt-2 line-clamp-2">${item.descripcion}</p>
        </div>

        <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
          <span class="text-xs font-bold text-brand-navy bg-slate-50 px-2.5 py-1 rounded-md">Ver detalle y fotos</span>
          <span class="text-slate-400 text-sm">➔</span>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

function abrirModal(id) {
  propiedadActual = propiedadesData.find(p => p.id === id);
  if (!propiedadActual) return;

  fotoIndiceActual = 0;
  actualizarVistaCarrusel();

  document.getElementById("modal-titulo").innerText = propiedadActual.titulo;
  document.getElementById("modal-ubicacion").innerText = `📍 ${propiedadActual.ubicacion}`;
  document.getElementById("modal-precio").innerText = `US$${propiedadActual.precio_dia}`;
  document.getElementById("modal-capacidad").innerText = `${propiedadActual.capacidad} personas`;
  document.getElementById("modal-desc").innerText = propiedadActual.descripcion;

  // Enlace directo corregido a Google Maps usando coordenadas geográficas
  const urlGoogleMaps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(propiedadActual.lat + ',' + propiedadActual.lng)}`;
  document.getElementById("modal-btn-mapa").href = urlGoogleMaps;

  // Renderizar servicios
  const serviciosContainer = document.getElementById("modal-servicios");
  serviciosContainer.innerHTML = propiedadActual.servicios
    .map(s => `<span class="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-medium">${s}</span>`)
    .join('');

  // Enlace de WhatsApp con mensaje personalizado
  const mensajeReserva = `Hola Inmosur Andina, quiero realizar una reserva para el alojamiento "${propiedadActual.titulo}" (ID: ${propiedadActual.id}, Ubicación: ${propiedadActual.ubicacion}). ¿Me confirman disponibilidad?`;
  document.getElementById("modal-btn-whatsapp").href = `https://wa.me/${datosInstitucionales.whatsapp}?text=${encodeURIComponent(mensajeReserva)}`;

  document.getElementById("modal-detalle").classList.remove("hidden");
}

function cerrarModal() {
  document.getElementById("modal-detalle").classList.add("hidden");
}

function cambiarFoto(direccion) {
  if (!propiedadActual) return;
  fotoIndiceActual += direccion;
  
  if (fotoIndiceActual < 0) {
    fotoIndiceActual = propiedadActual.fotos.length - 1;
  } else if (fotoIndiceActual >= propiedadActual.fotos.length) {
    fotoIndiceActual = 0;
  }

  actualizarVistaCarrusel();
}

function actualizarVistaCarrusel() {
  if (!propiedadActual) return;
  const rutaFoto = `./imagenes/${propiedadActual.id}/${propiedadActual.fotos[fotoIndiceActual]}`;
  const modalImg = document.getElementById("modal-img");
  modalImg.src = rutaFoto;
  modalImg.onerror = function() {
    this.src = 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80';
  };
  document.getElementById("carousel-index").innerText = fotoIndiceActual + 1;
  document.getElementById("carousel-total").innerText = propiedadActual.fotos.length;
}
