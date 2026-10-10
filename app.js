const datosInmobilia = {
  "institucional": {
    "nombre": "Inmosur Andina",
    "whatsapp": "5492616253304"
  },
  "propiedades": [
    {
      "id": 1,
      "titulo": "Cabaña Los Pinos",
      "ubicacion": "Bariloche",
      "capacidad": 4,
      "precio_dia": 85,
      "descripcion": "Hermosa cabaña de montaña rodeada de bosques nativos, totalmente equipada con hogar a leña y vistas panorámicas increíbles.",
      "servicios": ["WiFi", "Parrilla", "Estacionamiento", "Calefacción"],
      "fotos": ["a.jpg", "b.jpg", "c.jpg"]
    },
    {
      "id": 2,
      "titulo": "Departamento Centro Luminoso",
      "ubicacion": "Mendoza",
      "capacidad": 2,
      "precio_dia": 50,
      "descripcion": "Moderno departamento céntrico, ideal para parejas. Cercano a la zona comercial, gastronómica y circuitos vitivinícolas.",
      "servicios": ["WiFi", "Aire Acondicionado", "Cocina equipada", "Balcón"],
      "fotos": ["a.jpg", "b.jpg"]
    },
    {
      "id": 3,
      "titulo": "Refugio Andino Lumbreras",
      "ubicacion": "San Martín de los Andes",
      "capacidad": 6,
      "precio_dia": 120,
      "descripcion": "Amplia casa de diseño alpino con gran parque, ventanales al bosque y excelente ubicación cerca del lago Lácar.",
      "servicios": ["WiFi", "Parrilla", "Estacionamiento", "Hogar a leña", "Cocina completa"],
      "fotos": ["a.jpg", "b.jpg", "c.jpg", "d.jpg"]
    },
    {
      "id": 4,
      "titulo": "Loft Minimalista Vista al Valle",
      "ubicacion": "Ushuaia",
      "capacidad": 2,
      "precio_dia": 95,
      "descripcion": "Espacio moderno con diseño de autor, calefacción por suelo radiante y grandes ventanales orientados hacia el canal de Beagle.",
      "servicios": ["WiFi", "Calefacción central", "Smart TV", "Cocina"],
      "fotos": ["a.jpg", "b.jpg"]
    },
    {
      "id": 5,
      "titulo": "Casa de Piedra Serrana",
      "ubicacion": "Villa General Belgrano",
      "capacidad": 5,
      "precio_dia": 110,
      "descripcion": "Tradicional construcción en piedra y madera con piscina exterior, parque privado y un entorno de absoluta tranquilidad.",
      "servicios": ["WiFi", "Piscina", "Parrilla", "Estacionamiento", "Parque"],
      "fotos": ["a.jpg", "b.jpg", "c.jpg"]
    }
  ]
};

let propiedadesData = [];
let whatsappNumero = "";
let propiedadActual = null;
let fotoIndiceActual = 0;

document.addEventListener("DOMContentLoaded", () => {
  try {
    whatsappNumero = datosInmobilia.institucional.whatsapp;
    propiedadesData = datosInmobilia.propiedades;

    document.getElementById("total-propiedades").innerText = propiedadesData.length;

    // Configurar enlace de WhatsApp en el pie de página
    const msgGeneral = "Hola Inmosur Andina, quisiera consultar por disponibilidad de alojamientos.";
    document.getElementById("footer-whatsapp").href = `https://wa.me/${whatsappNumero}?text=${encodeURIComponent(msgGeneral)}`;

    renderTarjetas(propiedadesData);
  } catch (error) {
    console.error("Error al iniciar:", error);
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

  const serviciosContainer = document.getElementById("modal-servicios");
  serviciosContainer.innerHTML = propiedadActual.servicios
    .map(s => `<span class="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-medium">${s}</span>`)
    .join('');

  const mensajeReserva = `Hola Inmosur Andina, quiero realizar una reserva para el alojamiento "${propiedadActual.titulo}" (ID: ${propiedadActual.id}, Ubicación: ${propiedadActual.ubicacion}). ¿Me confirman disponibilidad?`;
  document.getElementById("modal-btn-whatsapp").href = `https://wa.me/${whatsappNumero}?text=${encodeURIComponent(mensajeReserva)}`;

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
  document.getElementById("modal-img").src = rutaFoto;
  document.getElementById("carousel-index").innerText = fotoIndiceActual + 1;
  document.getElementById("carousel-total").innerText = propiedadActual.fotos.length;
}
