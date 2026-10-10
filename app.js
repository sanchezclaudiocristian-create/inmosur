let propiedadesData = [];
let whatsappNumero = "";
let propiedadActual = null;
let fotoIndiceActual = 0;

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("./alojamientos.json");
    const data = await res.json();
    
    // Datos institucionales
    whatsappNumero = data.institucional.whatsapp;
    document.getElementById("inst-titulo").innerText = data.institucional.nombre;
    document.getElementById("inst-subtitulo").innerText = data.institucional.subtitulo;
    document.getElementById("inst-desc").innerText = data.institucional.descripcion;
    document.getElementById("total-propiedades").innerText = data.propiedades.length;
    
    // Enlace de WhatsApp en el header superior
    const msgGeneral = "Hola Inmosur Andina, quisiera consultar por disponibilidad de alojamientos.";
    document.getElementById("btn-whatsapp-header").href = `https://wa.me/${whatsappNumero}?text=${encodeURIComponent(msgGeneral)}`;

    // Cargar propiedades en las tarjetas
    propiedadesData = data.propiedades;
    renderTarjetas(propiedadesData);

  } catch (error) {
    console.error("Error al cargar los datos de alojamientos.json:", error);
  }
});

// 1. Renderizar las tarjetas resumidas en la página principal
function renderTarjetas(lista) {
  const container = document.getElementById("grid-alojamientos");
  container.innerHTML = "";

  lista.forEach(item => {
    // Muestra solo la imagen principal (a.jpg) en la tarjeta
    const fotoPrincipal = `./imagenes/${item.id}/${item.fotos[0]}`;

    const card = document.createElement("div");
    card.className = "bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col hover:shadow-md transition cursor-pointer group";
    
    // Al presionar la tarjeta completa, se abre el modal de detalle
    card.onclick = () => abrirModal(item.id);

    card.innerHTML = `
      <div class="relative h-52 bg-slate-100 overflow-hidden">
        <img src="${fotoPrincipal}" alt="${item.titulo}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" onerror="this.src='https://via.placeholder.com/400x250?text=Inmosur+Andina'" />
        <span class="absolute bottom-3 left-3 bg-slate-900/75 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
          📍 ${item.ubicacion}
        </span>
        <span class="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-slate-900 font-black text-xs px-2.5 py-1 rounded-lg shadow-sm">
          US$${item.precio_dia} <span class="text-[10px] font-normal text-slate-500">/día</span>
        </span>
      </div>
      
      <div class="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 class="font-bold text-lg text-slate-900 leading-snug group-hover:text-sky-600 transition">${item.titulo}</h3>
          <p class="text-xs text-slate-500 mt-1">👤 Capacidad: hasta ${item.capacidad} personas</p>
          <p class="text-xs text-slate-600 mt-2 line-clamp-2">${item.descripcion}</p>
        </div>

        <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
          <span class="text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md">Ver detalle y fotos</span>
          <span class="text-slate-400 text-sm">➔</span>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

// 2. Abrir Modal de Detalle con la información de la propiedad
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

  // Renderizar servicios en el modal
  const serviciosContainer = document.getElementById("modal-servicios");
  serviciosContainer.innerHTML = propiedadActual.servicios
    .map(s => `<span class="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-medium">${s}</span>`)
    .join('');

  // Configurar botón de reserva por WhatsApp con mensaje predeterminado
  const mensajeReserva = `Hola Inmosur Andina, quiero realizar una reserva para el alojamiento "${propiedadActual.titulo}" (ID: ${propiedadActual.id}, Ubicación: ${propiedadActual.ubicacion}). ¿Me confirman disponibilidad?`;
  document.getElementById("modal-btn-whatsapp").href = `https://wa.me/${whatsappNumero}?text=${encodeURIComponent(mensajeReserva)}`;

  // Mostrar el modal
  document.getElementById("modal-detalle").classList.remove("hidden");
}

function cerrarModal() {
  document.getElementById("modal-detalle").classList.add("hidden");
}

// 3. Control del Carrusel de imágenes dentro del Modal
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
  document.getElementById("modal-img").src = rutaFoto;
  document.getElementById("carousel-index").innerText = fotoIndiceActual + 1;
  document.getElementById("carousel-total").innerText = propiedadActual.fotos.length;
}
