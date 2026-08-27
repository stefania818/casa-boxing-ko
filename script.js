// ==========================================
// 1. INVENTARIO DE PRODUCTOS
// ==========================================
const inventario = {
  guantes: [
    {
      nombre: "Everlast",
      precio: "$45.00",
      fotos: [
        "https://i.ibb.co/nM0Mb7K9/51ad7800-965f-4503-bb4c-329dc83d91d9.jpg",
        "https://i.ibb.co/mVyhbth8/75861512-1a09-45a2-bc52-b07b789c4c07.jpg"
      ],
      colores: ["Negro", "Rojo", "Azul"],
      medidas: ["12 oz", "14 oz", "16 oz"]
    },
    {
      nombre: "Venum",
      precio: "$50.00",
      fotos: [
        "https://i.ibb.co/zDXs9yF/fb5f4b4d-af8e-4027-b6af-96cbe2589185.jpg"
      ],
      colores: ["Negro", "Rojo", "Azul"],
      medidas: ["12 oz", "14 oz", "16 oz"]
    },
    {
      nombre: "Venum Prime",
      precio: "$55.00",
      fotos: [
        "https://i.ibb.co/vx1Mt7SY/d6f4ce44-ed11-4e8b-a7a5-c1ae39f4b509.jpg",
        "https://i.ibb.co/LXm9xSLZ/f747595e-1db2-4477-83ff-103fed8ed8ed.jpg"
      ],
      colores: ["Negro", "Rojo", "Azul"],
      medidas: ["12 oz", "14 oz", "16 oz"]
    }
  ],
  bucales: [
    {
      nombre: "Protectores Bucales",
      precio: "$12.00",
      fotos: [
        "https://i.ibb.co/nM0Mb7K9/51ad7800-965f-4503-bb4c-329dc83d91d9.jpg"
      ],
      colores: ["Negro", "Rojo", "Transparente"],
      medidas: ["Estándar"]
    }
  ],
  vendas: [
    {
      nombre: "Vendas Semielásticas",
      precio: "$10.00",
      fotos: [
        "https://i.ibb.co/mVyhbth8/75861512-1a09-45a2-bc52-b07b789c4c07.jpg"
      ],
      colores: ["Negro", "Rojo", "Azul"],
      medidas: ["3m", "5m"]
    }
  ]
};

// ==========================================
// 2. VARIABLES DE CONTROL DE ESTADO
// ==========================================
let categoriaSeleccionada = "";
let modelosCategoriaActual = [];
let modeloSeleccionado = null;
let fotoIndexActual = 0;
let cantidadSeleccionada = 1;
let colorSeleccionado = "";
let medidaSeleccionada = "";

// ==========================================
// 3. ABRIR Y CERRAR EL MODAL
// ==========================================
function abrirModal(cat) {
  const modal = document.getElementById("modalTienda");
  if (!modal) return;
  
  modal.style.display = "block";
  
  if (cat) {
    abrirNivel2(cat);
  } else {
    irANivel1();
  }
}

function cerrarTienda() {
  const modal = document.getElementById("modalTienda");
  if (modal) modal.style.display = "none";
}

// Cerrar modal al hacer clic fuera del contenido
window.addEventListener("click", function (e) {
  const modal = document.getElementById("modalTienda");
  if (e.target === modal) {
    cerrarTienda();
  }
});

// ==========================================
// 4. NAVEGACIÓN Y RENDERIZADO DE NIVELES
// ==========================================

// NIVEL 1: Categorías principales
function irANivel1() {
  document.getElementById("vistaNivel1").style.display = "block";
  document.getElementById("vistaNivel2").style.display = "none";
  document.getElementById("vistaNivel3").style.display = "none";
}

// NIVEL 2: Catálogo de modelos
function abrirNivel2(cat) {
  categoriaSeleccionada = cat;
  modelosCategoriaActual = inventario[cat] || [];

  document.getElementById("vistaNivel1").style.display = "none";
  document.getElementById("vistaNivel2").style.display = "block";
  document.getElementById("vistaNivel3").style.display = "none";

  const titulos = {
    guantes: "Guantes de Boxeo",
    bucales: "Protectores Bucales",
    vendas: "Vendas Semielásticas"
  };
  document.getElementById("tituloCategoriaNivel2").innerText = titulos[cat] || cat;

  const grilla = document.getElementById("grillaModelosNivel2");
  grilla.innerHTML = "";

  modelosCategoriaActual.forEach((item, index) => {
    grilla.innerHTML += `
      <div class="card-modelo" onclick="abrirNivel3(${index})">
        <img src="${item.fotos[0]}" alt="${item.nombre}" class="img-modelo">
        <span style="display:block; margin-top:5px; font-weight:bold; color:#fff; font-size:12px;">${item.nombre}</span>
        <small style="color:#38bdf8;">${item.precio}</small>
      </div>
    `;
  });
}

function irANivel2() {
  document.getElementById("vistaNivel3").style.display = "none";
  document.getElementById("vistaNivel2").style.display = "block";
}

// NIVEL 3: Detalle del producto
function abrirNivel3(indexModelo) {
  modeloSeleccionado = modelosCategoriaActual[indexModelo];
  if (!modeloSeleccionado) return;

  fotoIndexActual = 0;
  cantidadSeleccionada = 1;
  colorSeleccionado = modeloSeleccionado.colores[0] || "";
  medidaSeleccionada = modeloSeleccionado.medidas[0] || "";

  document.getElementById("vistaNivel2").style.display = "none";
  document.getElementById("vistaNivel3").style.display = "block";

  document.getElementById("tituloModeloNivel3").innerText = modeloSeleccionado.nombre;
  document.getElementById("precioModeloNivel3").innerText = modeloSeleccionado.precio;
  document.getElementById("numCantidad").innerText = cantidadSeleccionada;
  
  actualizarFotoPrincipal();

  // Renderizar Colores con selección activa
  const contColores = document.getElementById("contenedorColores");
  contColores.innerHTML = "";
  modeloSeleccionado.colores.forEach((c, i) => {
    const activeClass = i === 0 ? "activa" : "";
    contColores.innerHTML += `<button class="btn-opcion ${activeClass}" onclick="seleccionarColor(this, '${c}')">${c}</button>`;
  });

  // Renderizar Medidas con selección activa
  const contTallas = document.getElementById("contenedorTallas");
  contTallas.innerHTML = "";
  modeloSeleccionado.medidas.forEach((m, i) => {
    const activeClass = i === 0 ? "activa" : "";
    contTallas.innerHTML += `<button class="btn-opcion ${activeClass}" onclick="seleccionarMedida(this, '${m}')">${m}</button>`;
  });
}

// ==========================================
// 5. FUNCIONALIDADES INTERNAS Y SELECCIONES
// ==========================================
function actualizarFotoPrincipal() {
  const img = document.getElementById("imgPrincipal");
  if (img && modeloSeleccionado && modeloSeleccionado.fotos.length > 0) {
    img.src = modeloSeleccionado.fotos[fotoIndexActual];
  }
}

function cambiarFotoMini(direccion) {
  if (!modeloSeleccionado || !modeloSeleccionado.fotos.length) return;
  fotoIndexActual += direccion;
  
  if (fotoIndexActual < 0) {
    fotoIndexActual = modeloSeleccionado.fotos.length - 1;
  } else if (fotoIndexActual >= modeloSeleccionado.fotos.length) {
    fotoIndexActual = 0;
  }
  
  actualizarFotoPrincipal();
}

function seleccionarColor(btn, color) {
  colorSeleccionado = color;
  const botones = btn.parentElement.querySelectorAll(".btn-opcion");
  botones.forEach(b => b.classList.remove("activa"));
  btn.classList.add("activa");
}

function seleccionarMedida(btn, medida) {
  medidaSeleccionada = medida;
  const botones = btn.parentElement.querySelectorAll(".btn-opcion");
  botones.forEach(b => b.classList.remove("activa"));
  btn.classList.add("activa");
}

function cambiarCantidad(delta) {
  cantidadSeleccionada += delta;
  if (cantidadSeleccionada < 1) cantidadSeleccionada = 1;
  document.getElementById("numCantidad").innerText = cantidadSeleccionada;
}

// ==========================================
//  JAVASCRIPT DEL CARRUSEL
// ==========================================
  <script>
    let indiceFoto = 0;

    function mostrarFoto(indice) {
      const fotos = document.querySelectorAll(".foto-carrusel");
      const indicadores = document.querySelectorAll(".indicador");

      if (!fotos.length) return;

      fotos.forEach((foto) => foto.classList.remove("activa"));
      indicadores.forEach((indicador) => indicador.classList.remove("activo"));

      indiceFoto = indice;
      fotos[indiceFoto].classList.add("activa");
      if (indicadores[indiceFoto]) {
        indicadores[indiceFoto].classList.add("activo");
      }
    }

    function moverCarrusel(direccion) {
      const fotos = document.querySelectorAll(".foto-carrusel");
      if (!fotos.length) return;

      indiceFoto += direccion;

      if (indiceFoto >= fotos.length) indiceFoto = 0;
      if (indiceFoto < 0) indiceFoto = fotos.length - 1;

      mostrarFoto(indiceFoto);


// ==========================================
// 6. PROCESO DE COMPRA AUTOMATIZADO
// ==========================================
async function procesarPago() {
  if (!modeloSeleccionado) {
    alert("Por favor selecciona un modelo antes de continuar.");
    return;
  }

  // 1. Recopilar datos del cliente (puedes tomar estos datos desde un modal/formulario)
  const datosCliente = {
    nombre: document.getElementById("clienteNombre")?.value || "Cliente",
    email: document.getElementById("clienteEmail")?.value || "cliente@email.com",
    telefono: document.getElementById("clienteTelefono")?.value || "",
    direccion: document.getElementById("clienteDireccion")?.value || "Retiro en local"
  };

  // 2. Estructurar la orden
  const orden = {
    producto: modeloSeleccionado.nombre,
    precio: modeloSeleccionado.precio,
    color: colorSeleccionado,
    medida: medidaSeleccionada,
    cantidad: cantidadSeleccionada,
    total: modeloSeleccionado.precio * cantidadSeleccionada,
    cliente: datosCliente,
    fecha: new Date().toISOString()
  };

  try {
    // 3. Enviar orden a tu servidor o webhook de automatización (Zapier / Make / Netlify Functions)
    const respuesta = await fetch("https://tu-servidor-o-webhook.com/api/pedidos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orden)
    });

    if (respuesta.ok) {
      alert("¡Pedido registrado exitosamente! Te hemos enviado un correo con la confirmación.");
      // Redirigir a página de agradecimiento
      window.location.href = "/gracias.html";
    } else {
      throw new Error("Error al procesar el pedido.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Hubo un problema al procesar tu compra. Por favor intenta nuevamente.");
  }
}
// ==========================================
// COMUNIDAD - CREAR PUBLICACIÓN RÁPIDA
// ==========================================
function agregarNuevaPublicacion() {
  const tituloInput = document.getElementById('post-titulo');
  const contenidoInput = document.getElementById('post-contenido');

  const titulo = tituloInput ? tituloInput.value.trim() : '';
  const contenido = contenidoInput ? contenidoInput.value.trim() : '';

  if (!titulo || !contenido) {
    alert('Por favor completa el título y el contenido.');
    return;
  }

  const feed = document.getElementById('comunidad-feed');
  if (!feed) return;

  const nuevoPost = document.createElement('article');
  nuevoPost.className = 'post-card';
  nuevoPost.style = 'border: 1px solid rgba(255,255,255,0.1); padding: 15px; border-radius: 8px; background: rgba(0,0,0,0.2); margin-top: 20px;';
  
  const idUnico = 'post-' + Date.now();
  const fecha = new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });

  nuevoPost.innerHTML = `
    <span class="fecha-post" style="color: #4cc9f0; font-size: 0.85rem;">${fecha}</span>
    <h3 style="margin: 10px 0;">${titulo}</h3>
    <p>${contenido}</p>
    <hr style="border-color: rgba(255,255,255,0.1); margin: 20px 0;">
    <div class="comentarios-seccion">
      <h4 style="margin-bottom: 10px;">Comentarios</h4>
      <div class="cusdis_thread"
        data-host="https://cusdis.com"
        data-app-id="3dd99e1a-9425-487a-95a3-c79c71aebdf2"
        data-page-id="${idUnico}"
        data-page-url="https://casa-boxing-ko.netlify.app#${idUnico}"
        data-page-title="${titulo}">
      </div>
    </div>
  `;

  feed.prepend(nuevoPost);
  tituloInput.value = '';
  contenidoInput.value = '';
  
  if (window.renderCusdis) window.renderCusdis();
}
