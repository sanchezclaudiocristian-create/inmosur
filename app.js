                                                                                                                                                                                                                                                                                                                                                                                                              });
let propiedadesData = [];
let whatsappNumero = "";
let propiedadActual = null;
let fotoIndiceActual = 0;

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("./alojamientos.json");
    const data = await res.json();
    
    // Institucional
    whatsappNumero = data.institucional.whatsapp;
    document.getElementById("inst-titulo").innerText = data.institucional.nombre;
    document.getElementById("inst-subtitulo").innerText = data.institucional.subtitulo;
    document.getElementById("inst-desc").innerText = data.institucional.descripcion;
    document.getElementById("total-propiedades").innerText = data.propiedades.length;
    
    // Enlace de WhatsApp en header
    const msgGeneral = "Hola Inmosur Andina, quisiera consultar por disponibilidad de alojamientos.";
    document.getElementById("btn-whatsapp-header").href = `https://wa.me/${whatsappNumero}?text=${encodeURIComponent(msgGeneral)}`;

    // Propiedades
    propiedadesData = data.propiedades;
    renderTarjetas(propiedadesData);

  } catch (error) {
    console.error("Error al cargar los datos:", error);
  }
});

// Renderizar tarjetas resumidas
function renderTarjetas(lista) {
  const container = document.getElementById("grid-alojamientos");
  container.innerHTML = "";

  lista.forEach(item => {
    const fotoPrincipal = `./imagenes/${item.id}/${item.fotos[0]}`;

    const card = document.createElement("div");
    card.className = "bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col hover:shadow-md transition cursor-pointer group";
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

// Abrir Modal de Detalle
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

  // Renderizar servicios
  const serviciosContainer = document.getElementById("modal-servicios");
  serviciosContainer.innerHTML = propiedadActual.servicios
    .map(s => `<span class="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-medium">${s}</span>`)
    .join('');

  // Enlace WhatsApp con mensaje personalizado de reserva
  const mensajeReserva = `Hola Inmosur Andina, quiero realizar una reserva para el alojamiento "${propiedadActual.titulo}" (ID: ${propiedadActual.id}, Ubicación: ${propiedadActual.ubicacion}). ¿Me confirman disponibilidad?`;
  document.getElementById("modal-btn-whatsapp").href = `https://wa.me/${whatsappNumero}?text=${encodeURIComponent(mensajeReserva)}`;

  document.getElementById("modal-detalle").classList.remove("hidden");
}

function cerrarModal() {
  document.getElementById("modal-detalle").classList.add("hidden");
}

// Control del Carrusel en el Modal
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

                                                                                                                                                                                                                                                                                                                                                                                                                                                  renderAlojamientos(filtrados);
                                                                                                                                                                                                                                                                                                                                                                                                                                                  }

                                                                                                                                                                                                                                                                                                                                                                                                                                                  // Lógica del Modal / Galería
                                                                                                                                                                                                                                                                                                                                                                                                                                                  function abrirGaleria(id) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                    const item = alojamientosData.find(a => a.id === id);
                                                                                                                                                                                                                                                                                                                                                                                                                                                      if (!item) return;

                                                                                                                                                                                                                                                                                                                                                                                                                                                        document.getElementById("modal-title").innerText = item.titulo;
                                                                                                                                                                                                                                                                                                                                                                                                                                                          const imgActive = document.getElementById("modal-img-active");
                                                                                                                                                                                                                                                                                                                                                                                                                                                            const thumbsContainer = document.getElementById("modal-thumbnails");
                                                                                                                                                                                                                                                                                                                                                                                                                                                              thumbsContainer.innerHTML = "";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                const rutasFotos = item.fotos.map(f => `./imagenes/${item.id}/${f}`);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    // Foto inicial
                                                                                                                                                                                                                                                                                                                                                                                                                                                                      imgActive.src = rutasFotos[0];

                                                                                                                                                                                                                                                                                                                                                                                                                                                                        // Crear miniaturas
                                                                                                                                                                                                                                                                                                                                                                                                                                                                          rutasFotos.forEach((src, idx) => {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                              const thumb = document.createElement("img");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  thumb.src = src;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      thumb.className = `w-16 h-12 object-cover rounded-md cursor-pointer border-2 ${idx === 0 ? 'border-blue-500' : 'border-transparent'} hover:opacity-80`;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          thumb.onclick = () => {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                imgActive.src = src;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      Array.from(thumbsContainer.children).forEach(c => c.classList.replace('border-blue-500', 'border-transparent'));
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            thumb.classList.replace('border-transparent', 'border-blue-500');
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                };
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    thumbsContainer.appendChild(thumb);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      });

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        document.getElementById("modal-galeria").classList.remove("hidden");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        function cerrarModal() {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          document.getElementById("modal-galeria").classList.add("hidden");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
