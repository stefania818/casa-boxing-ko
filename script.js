// ==========================================
// 1. INVENTARIO BASE (Lee de GALERIA_IMAGENES)
// ==========================================
const inventario = {
  guantes: [
    {
      nombre: "Everlast",
      precio: "$45.00",
      fotos: (typeof GALERIA_IMAGENES !== 'undefined' && GALERIA_IMAGENES.inventarioFotos?.everlast) ? GALERIA_IMAGENES.inventarioFotos.everlast : [],
      colores: ["Negro", "Rojo", "Azul"],
      medidas: ["12 oz", "14 oz", "16 oz"]
    },
    {
      nombre: "Venum",
      precio: "$55.00",
      fotos: (typeof GALERIA_IMAGENES !== 'undefined' && GALERIA_IMAGENES.inventarioFotos?.venum) ? GALERIA_IMAGENES.inventarioFotos.venum : [],
      colores: ["Blanco/Oro", "Negro/Rojo"],
      medidas: ["12 oz", "14 oz"]
    },
    {
      nombre: "Venum Prime",
      precio: "$65.00",
      fotos: (typeof GALERIA_IMAGENES !== 'undefined' && GALERIA_IMAGENES.inventarioFotos?.venumPrime) ? GALERIA_IMAGENES.inventarioFotos.venumPrime : [],
      colores: ["Negro Mate", "Gris"],
      medidas: ["14 oz", "16 oz"]
    }
  ],
  bucales: [
    {
      nombre: "Protector Bucal Pro",
      precio: "$12.00",
      fotos: (typeof GALERIA_IMAGENES !== 'undefined' && GALERIA_IMAGENES.inventarioFotos?.bucales) ? GALERIA_IMAGENES.inventarioFotos.bucales : [],
      colores: ["Transparente", "Negro", "Rojo"],
      medidas: ["Estándar Adulto"]
    }
  ],
  vendas: [
    {
      nombre: "Vendas Semielásticas",
      precio: "$10.00",
      fotos: (typeof GALERIA_IMAGENES !== 'undefined' && GALERIA_IMAGENES.inventarioFotos?.vendas) ? GALERIA_IMAGENES.inventarioFotos.vendas : [],
      colores: ["Negro", "Rojo", "Azul"],
      medidas: ["3 Metros", "5 Metros"]
    }
  ]
};

// Variables de estado global
let indiceCarrusel = 0;
let productoSeleccionado = null;
let categoriaActual = '';
let fotoMiniIndice = 0;
let cantidadProducto = 1;

// ==========================================
// 2. INICIALIZACIÓN
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  if (typeof GALERIA_IMAGENES !== 'undefined') {
    // Cargar Logo
    const logoImg = document.getElementById("logo-principal");
    if (logoImg && GALERIA_IMAGENES.logo) logoImg.src = GALERIA_IMAGENES.logo;

    // Cargar Imágenes Portada de Tienda
    const imgGuantes = document.getElementById("img-tienda-guantes");
    const imgVendas = document.getElementById("img-tienda-vendas");
    const imgBucales = document.getElementById("img-tienda-bucales");

    if (imgGuantes && GALERIA_IMAGENES.tienda?.guantes) imgGuantes.src = GALERIA_IMAGENES.tienda.guantes;
    if (imgVendas && GALERIA_IMAGENES.tienda?.vendas) imgVendas.src = GALERIA_IMAGENES.tienda.vendas;
    if (imgBucales && GALERIA_IMAGENES.tienda?.bucales) imgBucales.src = GALERIA_IMAGENES.tienda.bucales;

    // Cargar Post Comunidad
    const imgPost = document.getElementById("img-post-comunidad");
    if (imgPost && GALERIA_IMAGENES.comunidad?.[0]) imgPost.src = GALERIA_IMAGENES.comunidad[0];

    // Inicializar Carrusel Principal
    renderizarCarrusel();
  }
});

// ==========================================
// 3. LÓGICA DEL CARRUSEL DE FOTOS
// ==========================================
function renderizarCarrusel() {
  const contenedorFotos = document.getElementById("contenedor-carrusel-fotos");
  const contenedorIndicadores = document.getElementById("contenedor-indicadores");
  if (!contenedorFotos || !GALERIA_IMAGENES.carrusel) return;

  contenedorFotos.innerHTML = "";
  contenedorIndicadores.innerHTML = "";

  GALERIA_IMAGENES.carrusel.forEach((src, idx) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = `Campeón ${idx + 1}`;
    if (idx === 0) img.classList.add("activa");
    contenedorFotos.appendChild(img);

    const punto = document.createElement("span");
    if (idx === 0) punto.classList.add("activo");
    punto.onclick = () => irAFotoCarrusel(idx);
    contenedorIndicadores.appendChild(punto);
  });
}

function moverCarrusel(direccion) {
  const fotos = document.querySelectorAll("#contenedor-carrusel-fotos img");
  const puntos = document.querySelectorAll("#contenedor-indicadores span");
  if (!fotos.length) return;

  fotos[indiceCarrusel].classList.remove("activa");
  puntos[indiceCarrusel].classList.remove("activo");

  indiceCarrusel = (indiceCarrusel + direccion + fotos.length) % fotos.length;

  fotos[indiceCarrusel].classList.add("activa");
  puntos[indiceCarrusel].classList.add("activo");
}

function irAFotoCarrusel(index) {
  const fotos = document.querySelectorAll("#contenedor-carrusel-fotos img");
  const puntos = document.querySelectorAll("#contenedor-indicadores span");
  if (!fotos.length) return;

  fotos[indiceCarrusel].classList.remove("activa");
  puntos[indiceCarrusel].classList.remove("activo");

  indiceCarrusel = index;

  fotos[indiceCarrusel].classList.add("activa");
  puntos[indiceCarrusel].classList.add("activo");
}

// ==========================================
// 4. LÓGICA DE TIENDA Y MODAL
// ==========================================
function abrirModal(categoria) {
  const modal = document.getElementById('modalTienda');
  if (modal) {
    modal.style.display = 'flex';
    abrirNivel2(categoria);
  }
}

function cerrarTienda() {
  const modal = document.getElementById('modalTienda');
  if (modal) modal.style.display = 'none';
}

function irANivel1() {
  document.getElementById('vistaNivel2').style.display = 'none';
  document.getElementById('vistaNivel3').style.display = 'none';
  document.getElementById('vistaNivel1').style.display = 'block';
}

function abrirNivel2(cat) {
  categoriaActual = cat;
  const lista = inventario[cat];
  if (!lista) return;

  document.getElementById('vistaNivel1').style.display = 'none';
  document.getElementById('vistaNivel3').style.display = 'none';
  document.getElementById('vistaNivel2').style.display = 'block';

  const titulo = document.getElementById('tituloCategoriaNivel2');
  if (titulo) titulo.innerText = `Modelos: ${cat.toUpperCase()}`;

  const grilla = document.getElementById('grillaModelosNivel2');
  if (grilla) {
    grilla.innerHTML = '';
    lista.forEach((prod, index) => {
      const foto = prod.fotos[0] || '';
      grilla.innerHTML += `
        <div class="card-modelo" onclick="verDetalleProducto('${cat}', ${index})" style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px; cursor: pointer; text-align: center;">
          <img src="${foto}" alt="${prod.nombre}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 6px;">
          <h4 style="margin: 8px 0 4px; color: #fff;">${prod.nombre}</h4>
          <span style="color: #38bdf8; font-weight: bold;">${prod.precio}</span>
        </div>
      `;
    });
  }
}

function irANivel2() {
  document.getElementById('vistaNivel3').style.display = 'none';
  document.getElementById('vistaNivel2').style.display = 'block';
}

function verDetalleProducto(cat, index) {
  productoSeleccionado = inventario[cat][index];
  if (!productoSeleccionado) return;

  fotoMiniIndice = 0;
  cantidadProducto = 1;

  document.getElementById('vistaNivel2').style.display = 'none';
  document.getElementById('vistaNivel3').style.display = 'block';

  document.getElementById('tituloModeloNivel3').innerText = productoSeleccionado.nombre;
  document.getElementById('precioModeloNivel3').innerText = productoSeleccionado.precio;
  document.getElementById('numCantidad').innerText = cantidadProducto;

  actualizarFotoMini();

  // Generar Opciones de Colores
  const contColores = document.getElementById('contenedorColores');
  contColores.innerHTML = '';
  productoSeleccionado.colores.forEach((c, i) => {
    contColores.innerHTML += `<button class="btn-variante ${i === 0 ? 'activo' : ''}" onclick="seleccionarOpcion(this)">${c}</button>`;
  });

  // Generar Opciones de Medidas
  const contMedidas = document.getElementById('contenedorTallas');
  contMedidas.innerHTML = '';
  productoSeleccionado.medidas.forEach((m, i) => {
    contMedidas.innerHTML += `<button class="btn-variante ${i === 0 ? 'activo' : ''}" onclick="seleccionarOpcion(this)">${m}</button>`;
  });
}

function cambiarFotoMini(dir) {
  if (!productoSeleccionado || !productoSeleccionado.fotos.length) return;
  const total = productoSeleccionado.fotos.length;
  fotoMiniIndice = (fotoMiniIndice + dir + total) % total;
  actualizarFotoMini();
}

function actualizarFotoMini() {
  const img = document.getElementById('imgPrincipal');
  if (img && productoSeleccionado && productoSeleccionado.fotos.length) {
    img.src = productoSeleccionado.fotos[fotoMiniIndice];
  }
}

function seleccionarOpcion(btn) {
  const hermanos = btn.parentElement.querySelectorAll('.btn-variante');
  hermanos.forEach(b => b.classList.remove('activo'));
  btn.classList.add('activo');
}

function cambiarCantidad(val) {
  cantidadProducto = Math.max(1, cantidadProducto + val);
  const numCant = document.getElementById('numCantidad');
  if (numCant) numCant.innerText = cantidadProducto;
}

function procesarPago() {
  if (!productoSeleccionado) return;
  const texto = `¡Hola! Quiero comprar ${cantidadProducto} unidad(es) de ${productoSeleccionado.nombre} (${productoSeleccionado.precio})`;
  const urlWhatsApp = `https://wa.me/?text=${encodeURIComponent(texto)}`;
  window.open(urlWhatsApp, '_blank');
}
