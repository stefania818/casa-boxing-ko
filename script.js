// ======================================================
// CASA BOXING KO - TIENDA
// ======================================================

const inventario = {

  guantes: [
    {
      id: "guante-everlast",
      nombre: "Guantes Everlast Pro",
      precio: 35,
      imagenes: [
        "assets/productos/guantes/everlast-pro-1.jpg",
        "assets/productos/guantes/everlast-pro-2.jpg"
      ],
      colores: ["Negro", "Rojo", "Azul"],
      medidas: ["12 oz", "14 oz", "16 oz"]
    },

    {
      id: "guante-venum-challenger",
      nombre: "Guantes Venum Challenger",
      precio: 45,
      imagenes: [
        "assets/productos/guantes/venum-challenger-1.jpg",
        "assets/productos/guantes/venum-challenger-2.jpg"
      ],
      colores: ["Negro/Blanco", "Oro/Negro"],
      medidas: ["12 oz", "14 oz", "16 oz"]
    },

    {
      id: "guante-venum-prime",
      nombre: "Guantes Venum Prime",
      precio: 55,
      imagenes: [
        "assets/productos/guantes/venum-prime-1.jpg",
        "assets/productos/guantes/venum-prime-2.jpg"
      ],
      colores: ["Negro", "Rojo", "Blanco"],
      medidas: ["12 oz", "14 oz", "16 oz"]
    }
  ],

  vendas: [
    {
      id: "vendas-semi-elasticas",
      nombre: "Vendas Semi-Elásticas",
      precio: 8,
      imagenes: [
        "assets/productos/vendas/vendas-1.jpg",
        "assets/productos/vendas/vendas-2.jpg"
      ],
      colores: ["Negro", "Rojo", "Azul", "Amarillo"],
      medidas: ["3 metros", "5 metros", "7 metros"]
    }
  ],

  bucales: [
    {
      id: "bucal-gel-max",
      nombre: "Protector Bucal Gel Max",
      precio: 12,
      imagenes: [
        "assets/productos/bucales/bucal-gel-max-1.jpg",
        "assets/productos/bucales/bucal-gel-max-2.jpg"
      ],
      colores: ["Transparente", "Negro"],
      medidas: ["Juvenil", "Adulto"]
    }
  ]
};


// ======================================================
// VARIABLES
// ======================================================

let categoriaActual = "";
let productoSeleccionado = null;
let fotoIndiceActual = 0;
let cantidadSeleccionada = 1;
let colorSeleccionado = "";
let medidaSeleccionada = "";


// ======================================================
// ABRIR / CERRAR TIENDA
// ======================================================

function abrirModal(categoria) {

  const modal = document.getElementById("modalTienda");

  if (!modal) return;

  modal.style.display = "flex";

  if (categoria) {
    abrirNivel2(categoria);
  } else {
    irANivel1();
  }
}


function cerrarTienda() {

  const modal = document.getElementById("modalTienda");

  if (modal) {
    modal.style.display = "none";
  }

}


// ======================================================
// NIVEL 1
// ======================================================

function irANivel1() {

  document.getElementById("vistaNivel1").style.display = "block";
  document.getElementById("vistaNivel2").style.display = "none";
  document.getElementById("vistaNivel3").style.display = "none";

}


// ======================================================
// NIVEL 2 - MODELOS
// ======================================================

function abrirNivel2(categoria) {

  categoriaActual = categoria;

  document.getElementById("vistaNivel1").style.display = "none";
  document.getElementById("vistaNivel2").style.display = "block";
  document.getElementById("vistaNivel3").style.display = "none";

  const titulo = document.getElementById("tituloCategoriaNivel2");

  const nombres = {
    guantes: "Guantes de Boxeo",
    vendas: "Vendas",
    bucales: "Protectores Bucales"
  };

  titulo.innerText = nombres[categoria] || "Productos";


  const grilla = document.getElementById("grillaModelosNivel2");

  grilla.innerHTML = "";

  const productos = inventario[categoria] || [];

  if (productos.length === 0) {

    grilla.innerHTML = `
      <p style="
        grid-column:1/-1;
        text-align:center;
        color:#cbd5e1;
      ">
        Próximamente más productos.
      </p>
    `;

    return;
  }


  productos.forEach((producto, index) => {

    const imagen = producto.imagenes[0];

    grilla.innerHTML += `

      <div
        class="card-modelo"
        onclick="verDetalleProducto('${categoria}', ${index})"
      >

        <img
          src="${imagen}"
          alt="${producto.nombre}"
          class="img-modelo"
          onerror="this.src='assets/productos/imagen-no-disponible.jpg'"
        >

        <h4>${producto.nombre}</h4>

        <span class="precio-modelo">
          $${producto.precio.toFixed(2)}
        </span>

      </div>

    `;

  });

}


// ======================================================
// VOLVER A NIVEL 2
// ======================================================

function irANivel2() {

  abrirNivel2(categoriaActual);

}


// ======================================================
// NIVEL 3 - DETALLE DEL PRODUCTO
// ======================================================

function verDetalleProducto(categoria, index) {

  productoSeleccionado = inventario[categoria][index];

  fotoIndiceActual = 0;
  cantidadSeleccionada = 1;

  colorSeleccionado =
    productoSeleccionado.colores?.[0] || "";

  medidaSeleccionada =
    productoSeleccionado.medidas?.[0] || "";


  document.getElementById("vistaNivel2").style.display = "none";
  document.getElementById("vistaNivel3").style.display = "block";


  document.getElementById("tituloModeloNivel3").innerText =
    productoSeleccionado.nombre;


  document.getElementById("precioModeloNivel3").innerText =
    `$${productoSeleccionado.precio.toFixed(2)}`;


  document.getElementById("numCantidad").innerText =
    cantidadSeleccionada;


  actualizarFotoMini();

  renderizarColores();

  renderizarMedidas();

  actualizarTotal();

  renderizarBotonesPayPal();

}


// ======================================================
// FOTOS DEL PRODUCTO
// ======================================================

function actualizarFotoMini() {

  const imagen = document.getElementById("imgPrincipal");

  if (!imagen || !productoSeleccionado) return;

  imagen.src =
    productoSeleccionado.imagenes[fotoIndiceActual];

}


function cambiarFotoMini(direccion) {

  if (!productoSeleccionado) return;

  const total =
    productoSeleccionado.imagenes.length;

  fotoIndiceActual += direccion;

  if (fotoIndiceActual < 0) {
    fotoIndiceActual = total - 1;
  }

  if (fotoIndiceActual >= total) {
    fotoIndiceActual = 0;
  }

  actualizarFotoMini();

}


// ======================================================
// COLORES
// ======================================================

function renderizarColores() {

  const contenedor =
    document.getElementById("contenedorColores");

  contenedor.innerHTML = "";

  if (!productoSeleccionado.colores?.length) {
    contenedor.innerHTML =
      "<span>No hay colores disponibles.</span>";

    return;
  }


  productoSeleccionado.colores.forEach((color, index) => {

    contenedor.innerHTML += `

      <button
        class="btn-opcion ${index === 0 ? "activa" : ""}"
        onclick="seleccionarColor(this, '${color}')"
      >
        ${color}
      </button>

    `;

  });

}


function seleccionarColor(elemento, color) {

  colorSeleccionado = color;

  const botones =
    elemento.parentElement.children;

  for (const boton of botones) {
    boton.classList.remove("activa");
  }

  elemento.classList.add("activa");

}


// ======================================================
// MEDIDAS / ONZAS / LONGITUD
// ======================================================

function renderizarMedidas() {

  const contenedor =
    document.getElementById("contenedorTallas");

  const titulo =
    document.getElementById("tituloSecTallas");

  contenedor.innerHTML = "";

  if (categoriaActual === "guantes") {
    titulo.innerText = "Selecciona Onzas:";
  }

  else if (categoriaActual === "vendas") {
    titulo.innerText = "Selecciona Longitud:";
  }

  else if (categoriaActual === "bucales") {
    titulo.innerText = "Selecciona Tamaño:";
  }

  else {
    titulo.innerText = "Selecciona Medida:";
  }


  productoSeleccionado.medidas.forEach(
    (medida, index) => {

      contenedor.innerHTML += `

        <button
          class="btn-opcion ${index === 0 ? "activa" : ""}"
          onclick="seleccionarMedida(this, '${medida}')"
        >
          ${medida}
        </button>

      `;

    }
  );

}


function seleccionarMedida(elemento, medida) {

  medidaSeleccionada = medida;

  const botones =
    elemento.parentElement.children;

  for (const boton of botones) {
    boton.classList.remove("activa");
  }

  elemento.classList.add("activa");

}


// ======================================================
// CANTIDAD
// ======================================================

function cambiarCantidad(cambio) {

  cantidadSeleccionada += cambio;

  if (cantidadSeleccionada < 1) {
    cantidadSeleccionada = 1;
  }

  if (cantidadSeleccionada > 20) {
    cantidadSeleccionada = 20;
  }


  document.getElementById("numCantidad").innerText =
    cantidadSeleccionada;

  actualizarTotal();

  renderizarBotonesPayPal();

}


// ======================================================
// TOTAL
// ======================================================

function actualizarTotal() {

  if (!productoSeleccionado) return;

  const total =
    productoSeleccionado.precio *
    cantidadSeleccionada;


  const elemento =
    document.getElementById("totalProducto");

  if (elemento) {

    elemento.innerText =
      `$${total.toFixed(2)}`;

  }

}


// ======================================================
// PAYPAL
// ======================================================

function renderizarBotonesPayPal() {

  const contenedor =
    document.getElementById("paypal-button-container");

  if (!contenedor || !productoSeleccionado) return;

  contenedor.innerHTML = "";


  if (typeof paypal === "undefined") {

    contenedor.innerHTML = `
      <p style="color:#f87171;text-align:center;">
        PayPal todavía no está disponible.
      </p>
    `;

    return;
  }


  paypal.Buttons({

    style: {
      layout: "vertical",
      shape: "rect",
      label: "paypal"
    },


    createOrder: async function() {

      const respuesta =
        await fetch("/.netlify/functions/create-order", {

          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({

            producto: {
              id: productoSeleccionado.id,
              nombre: productoSeleccionado.nombre,
              precio: productoSeleccionado.precio
            },

            cantidad: cantidadSeleccionada,

            color: colorSeleccionado,

            medida: medidaSeleccionada

          })

        });


      if (!respuesta.ok) {

        throw new Error(
          "No se pudo crear la orden."
        );

      }


      const datos =
        await respuesta.json();


      return datos.id;

    },


    onApprove: async function(data) {

      const respuesta =
        await fetch("/.netlify/functions/capture-order", {

          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({

            orderID: data.orderID

          })

        });


      const resultado =
        await respuesta.json();


      if (resultado.success) {

        alert(
          "¡Pago realizado correctamente! Gracias por comprar en Casa Boxing KO."
        );

        cerrarTienda();

      } else {

        alert(
          "El pago no pudo ser confirmado."
        );

      }

    },


    onCancel: function() {

      console.log("El cliente canceló el pago.");

    },


    onError: function(error) {

      console.error(
        "Error de PayPal:",
        error
      );

      alert(
        "Ocurrió un problema con el pago. Intenta nuevamente."
      );

    }

  }).render(
    "#paypal-button-container"
  );

}


// ======================================================
// CARRUSEL DE GALERÍA
// ======================================================

let fotoActualIndex = 0;


function moverCarrusel(direccion) {

  const fotos =
    document.querySelectorAll(
      ".foto-carrusel"
    );

  const indicadores =
    document.querySelectorAll(
      ".indicador"
    );


  if (fotos.length === 0) return;


  fotos[fotoActualIndex]
    .classList.remove("activa");


  if (indicadores[fotoActualIndex]) {

    indicadores[fotoActualIndex]
      .classList.remove("activo");

  }


  fotoActualIndex += direccion;


  if (fotoActualIndex < 0) {

    fotoActualIndex =
      fotos.length - 1;

  }


  if (fotoActualIndex >= fotos.length) {

    fotoActualIndex = 0;

  }


  fotos[fotoActualIndex]
    .classList.add("activa");


  if (indicadores[fotoActualIndex]) {

    indicadores[fotoActualIndex]
      .classList.add("activo");

  }

}


// ======================================================
// CARGAR IMÁGENES DEL PROYECTO
// ======================================================

document.addEventListener(
  "DOMContentLoaded",
  function() {

    if (
      typeof GALERIA_IMAGENES !==
      "undefined"
    ) {

      const logo =
        document.getElementById(
          "logo-principal"
        );

      if (logo) {
        logo.src =
          GALERIA_IMAGENES.logo;
      }


      const imgGuantes =
        document.getElementById(
          "img-tienda-guantes"
        );

      if (imgGuantes) {
        imgGuantes.src =
          GALERIA_IMAGENES.tienda.guantes;
      }


      const imgVendas =
        document.getElementById(
          "img-tienda-vendas"
        );

      if (imgVendas) {
        imgVendas.src =
          GALERIA_IMAGENES.tienda.vendas;
      }


      const imgBucales =
        document.getElementById(
          "img-tienda-bucales"
        );

      if (imgBucales) {
        imgBucales.src =
          GALERIA_IMAGENES.tienda.bucales;
      }

    }

  }
);
