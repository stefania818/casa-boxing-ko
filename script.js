// =========================================================
// CASA BOXING KO
// script.js - TIENDA + PAYPAL + GALERÍA
// =========================================================


// =========================================================
// INVENTARIO
// =========================================================

const inventario = {

  // -------------------------------------------------------
  // GUANTES
  // -------------------------------------------------------
  guantes: [

    {
      id: "guantes-everlast-pro",
      nombre: "Guantes Everlast Pro",
      precio: 35.00,

      fotos: [
        "assets/uploads/guantes/everlast-pro-1.jpg",
        "assets/uploads/guantes/everlast-pro-2.jpg"
      ],

      colores: [
        "Negro",
        "Rojo",
        "Azul"
      ],

      tallas: [
        "12 oz",
        "14 oz",
        "16 oz"
      ]
    },


    {
      id: "guantes-venum-challenger",
      nombre: "Guantes Venum Challenger",
      precio: 45.00,

      fotos: [
        "assets/uploads/guantes/venum-challenger-1.jpg",
        "assets/uploads/guantes/venum-challenger-2.jpg"
      ],

      colores: [
        "Negro/Blanco",
        "Oro/Negro"
      ],

      tallas: [
        "12 oz",
        "14 oz",
        "16 oz"
      ]
    },


    {
      id: "guantes-venum-elite",
      nombre: "Guantes Venum Elite",
      precio: 55.00,

      fotos: [
        "assets/uploads/guantes/venum-elite-1.jpg",
        "assets/uploads/guantes/venum-elite-2.jpg"
      ],

      colores: [
        "Negro",
        "Rojo",
        "Blanco"
      ],

      tallas: [
        "12 oz",
        "14 oz",
        "16 oz"
      ]
    },


    {
      id: "guantes-venum-prime",
      nombre: "Guantes Venum Prime",
      precio: 65.00,

      fotos: [
        "assets/uploads/guantes/venum-prime-1.jpg",
        "assets/uploads/guantes/venum-prime-2.jpg",
        "assets/uploads/guantes/venum-prime-3.jpg"
      ],

      colores: [
        "Negro",
        "Rojo",
        "Azul",
        "Blanco"
      ],

      tallas: [
        "10 oz",
        "12 oz",
        "14 oz",
        "16 oz"
      ]
    }

  ],


  // -------------------------------------------------------
  // VENDAS
  // -------------------------------------------------------
  vendas: [

    {
      id: "vendas-everlast",
      nombre: "Vendas Everlast",
      precio: 8.00,

      fotos: [
        "assets/uploads/vendas/everlast-1.jpg",
        "assets/uploads/vendas/everlast-2.jpg"
      ],

      colores: [
        "Negro",
        "Rojo",
        "Azul",
        "Blanco"
      ],

      tallas: [
        "3 metros",
        "5 metros",
        "7 metros"
      ]
    },


    {
      id: "vendas-venum",
      nombre: "Vendas Venum",
      precio: 10.00,

      fotos: [
        "assets/uploads/vendas/venum-1.jpg",
        "assets/uploads/vendas/venum-2.jpg"
      ],

      colores: [
        "Negro",
        "Rojo",
        "Azul",
        "Rosa"
      ],

      tallas: [
        "3 metros",
        "5 metros",
        "7 metros"
      ]
    }

  ],


  // -------------------------------------------------------
  // BUCALES
  // -------------------------------------------------------
  bucales: [

    {
      id: "bucal-doble-mord",
      nombre: "Bucal Doble-Mor",
      precio: 12.00,

      fotos: [
        "assets/uploads/bucales/doble-mor-1.jpg",
        "assets/uploads/bucales/doble-mor-2.jpg"
      ],

      colores: [
        "Transparente",
        "Negro",
        "Rojo"
      ],

      tallas: [
        "Adulto",
        "Juvenil"
      ]
    },


    {
      id: "bucal-everlast",
      nombre: "Bucal Everlast",
      precio: 15.00,

      fotos: [
        "assets/uploads/bucales/everlast-1.jpg",
        "assets/uploads/bucales/everlast-2.jpg"
      ],

      colores: [
        "Transparente",
        "Negro",
        "Rojo"
      ],

      tallas: [
        "Adulto",
        "Juvenil"
      ]
    },


    {
      id: "bucal-reforzado",
      nombre: "Bucal Reforzado",
      precio: 18.00,

      fotos: [
        "assets/uploads/bucales/reforzado-1.jpg",
        "assets/uploads/bucales/reforzado-2.jpg"
      ],

      colores: [
        "Transparente",
        "Negro"
      ],

      tallas: [
        "Adulto"
      ]
    },


    {
      id: "bucal-venum",
      nombre: "Bucal Venum",
      precio: 20.00,

      fotos: [
        "assets/uploads/bucales/venum-1.jpg",
        "assets/uploads/bucales/venum-2.jpg"
      ],

      colores: [
        "Negro",
        "Rojo",
        "Blanco"
      ],

      tallas: [
        "Adulto",
        "Juvenil"
      ]
    }

  ]

};


// =========================================================
// VARIABLES DE ESTADO
// =========================================================

let categoriaActual = "";

let productoSeleccionado = null;

let productoIndexActual = 0;

let fotoIndiceActual = 0;

let cantidadSeleccionada = 1;

let colorSeleccionado = "";

let tallaSeleccionada = "";


// =========================================================
// ABRIR MODAL
// =========================================================

function abrirModal(categoria = "") {

  const modal =
    document.getElementById("modalTienda");

  if (!modal) return;


  modal.style.display = "flex";


  if (categoria) {

    abrirNivel2(categoria);

  } else {

    irANivel1();

  }

}


// =========================================================
// CERRAR MODAL
// =========================================================

function cerrarTienda() {

  const modal =
    document.getElementById("modalTienda");

  if (!modal) return;


  modal.style.display = "none";

}


// =========================================================
// NIVEL 1
// CATEGORÍAS
// =========================================================

function irANivel1() {

  const nivel1 =
    document.getElementById("vistaNivel1");

  const nivel2 =
    document.getElementById("vistaNivel2");

  const nivel3 =
    document.getElementById("vistaNivel3");


  if (nivel1) nivel1.style.display = "block";

  if (nivel2) nivel2.style.display = "none";

  if (nivel3) nivel3.style.display = "none";

}


// =========================================================
// NIVEL 2
// MODELOS DE UNA CATEGORÍA
// =========================================================

function abrirNivel2(categoria) {

  if (!inventario[categoria]) {

    console.error(
      "La categoría no existe:",
      categoria
    );

    return;

  }


  categoriaActual = categoria;


  const nivel1 =
    document.getElementById("vistaNivel1");

  const nivel2 =
    document.getElementById("vistaNivel2");

  const nivel3 =
    document.getElementById("vistaNivel3");


  if (nivel1) nivel1.style.display = "none";

  if (nivel2) nivel2.style.display = "block";

  if (nivel3) nivel3.style.display = "none";


  const titulo =
    document.getElementById(
      "tituloCategoriaNivel2"
    );


  const nombresCategorias = {

    guantes: "GUANTES DE BOXEO",

    vendas: "VENDAS",

    bucales: "PROTECTORES BUCALES"

  };


  if (titulo) {

    titulo.innerText =
      nombresCategorias[categoria] ||
      categoria.toUpperCase();

  }


  const grilla =
    document.getElementById(
      "grillaModelosNivel2"
    );


  if (!grilla) return;


  grilla.innerHTML = "";


  const productos =
    inventario[categoria];


  if (!productos ||
      productos.length === 0) {

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


  productos.forEach(
    (producto, index) => {

      const foto =
        producto.fotos &&
        producto.fotos.length > 0
          ? producto.fotos[0]
          : "";


      const tarjeta =
        document.createElement("div");


      tarjeta.className =
        "card-modelo";


      tarjeta.onclick =
        function () {

          verDetalleProducto(
            categoria,
            index
          );

        };


      tarjeta.innerHTML = `

        <img
          src="${foto}"
          alt="${producto.nombre}"
          class="img-modelo"
          onerror="this.style.opacity='0.3'"
        >

        <h4
          style="
            margin:8px 0 4px;
            color:#fff;
            font-size:13px;
          "
        >
          ${producto.nombre}
        </h4>

        <span
          style="
            color:#38bdf8;
            font-weight:bold;
            font-size:14px;
          "
        >
          $${producto.precio.toFixed(2)}
        </span>

      `;


      grilla.appendChild(tarjeta);

    }
  );

}


// =========================================================
// VOLVER A NIVEL 2
// =========================================================

function irANivel2() {

  if (!categoriaActual) {

    irANivel1();

    return;

  }


  abrirNivel2(
    categoriaActual
  );

}


// =========================================================
// NIVEL 3
// DETALLE DEL PRODUCTO
// =========================================================

function verDetalleProducto(
  categoria,
  index
) {

  if (!inventario[categoria]) return;


  if (!inventario[categoria][index]) return;


  productoSeleccionado =
    inventario[categoria][index];


  productoIndexActual =
    index;


  categoriaActual =
    categoria;


  fotoIndiceActual = 0;

  cantidadSeleccionada = 1;


  colorSeleccionado =
    productoSeleccionado.colores &&
    productoSeleccionado.colores.length > 0
      ? productoSeleccionado.colores[0]
      : "";


  tallaSeleccionada =
    productoSeleccionado.tallas &&
    productoSeleccionado.tallas.length > 0
      ? productoSeleccionado.tallas[0]
      : "";


  // -------------------------------------------------------
  // CAMBIAR DE NIVEL
  // -------------------------------------------------------

  const nivel2 =
    document.getElementById(
      "vistaNivel2"
    );

  const nivel3 =
    document.getElementById(
      "vistaNivel3"
    );


  if (nivel2) nivel2.style.display = "none";

  if (nivel3) nivel3.style.display = "block";


  // -------------------------------------------------------
  // NOMBRE
  // -------------------------------------------------------

  const titulo =
    document.getElementById(
      "tituloModeloNivel3"
    );


  if (titulo) {

    titulo.innerText =
      productoSeleccionado.nombre;

  }


  // -------------------------------------------------------
  // PRECIO
  // -------------------------------------------------------

  const precio =
    document.getElementById(
      "precioModeloNivel3"
    );


  if (precio) {

    precio.innerText =
      "$" +
      productoSeleccionado.precio.toFixed(2);

  }


  // -------------------------------------------------------
  // CANTIDAD
  // -------------------------------------------------------

  const cantidad =
    document.getElementById(
      "numCantidad"
    );


  if (cantidad) {

    cantidad.innerText =
      cantidadSeleccionada;

  }


  // -------------------------------------------------------
  // FOTOS
  // -------------------------------------------------------

  actualizarFotoMini();


  // -------------------------------------------------------
  // COLORES
  // -------------------------------------------------------

  cargarColores();


  // -------------------------------------------------------
  // TALLAS / ONZAS / MEDIDAS
  // -------------------------------------------------------

  cargarTallas();


  // -------------------------------------------------------
  // TEXTO DE MEDIDA
  // -------------------------------------------------------

  actualizarTituloMedida();


  // -------------------------------------------------------
  // RESUMEN
  // -------------------------------------------------------

  actualizarResumenPedido();


  // -------------------------------------------------------
  // PAYPAL
  // -------------------------------------------------------

  renderizarBotonesPayPal();

}


// =========================================================
// CARGAR COLORES
// =========================================================

function cargarColores() {

  const contenedor =
    document.getElementById(
      "contenedorColores"
    );


  if (!contenedor) return;


  contenedor.innerHTML = "";


  const colores =
    productoSeleccionado &&
    productoSeleccionado.colores
      ? productoSeleccionado.colores
      : [];


  if (colores.length === 0) {

    contenedor.innerHTML =
      "<span style='color:#94a3b8'>No disponible</span>";

    return;

  }


  colores.forEach(
    (color, index) => {

      const boton =
        document.createElement("button");


      boton.type = "button";

      boton.className =
        "btn-opcion";


      if (index === 0) {

        boton.classList.add(
          "activa"
        );

      }


      boton.innerText = color;


      boton.onclick =
        function () {

          seleccionarOpcion(
            boton,
            "color"
          );

        };


      contenedor.appendChild(
        boton
      );

    }
  );

}


// =========================================================
// CARGAR TALLAS / MEDIDAS
// =========================================================

function cargarTallas() {

  const contenedor =
    document.getElementById(
      "contenedorTallas"
    );


  if (!contenedor) return;


  contenedor.innerHTML = "";


  const tallas =
    productoSeleccionado &&
    productoSeleccionado.tallas
      ? productoSeleccionado.tallas
      : [];


  if (tallas.length === 0) {

    contenedor.innerHTML =
      "<span style='color:#94a3b8'>No disponible</span>";

    return;

  }


  tallas.forEach(
    (talla, index) => {

      const boton =
        document.createElement("button");


      boton.type = "button";

      boton.className =
        "btn-opcion";


      if (index === 0) {

        boton.classList.add(
          "activa"
        );

      }


      boton.innerText = talla;


      boton.onclick =
        function () {

          seleccionarOpcion(
            boton,
            "talla"
          );

        };


      contenedor.appendChild(
        boton
      );

    }
  );

}


// =========================================================
// TÍTULO DE MEDIDA
// =========================================================

function actualizarTituloMedida() {

  const titulo =
    document.getElementById(
      "tituloSecTallas"
    );


  if (!titulo) return;


  if (!categoriaActual) {

    titulo.innerText =
      "Selecciona Medida:";

    return;

  }


  if (categoriaActual === "guantes") {

    titulo.innerText =
      "Selecciona Onzas:";

  }

  else if (
    categoriaActual === "vendas"
  ) {

    titulo.innerText =
      "Selecciona Longitud:";

  }

  else if (
    categoriaActual === "bucales"
  ) {

    titulo.innerText =
      "Selecciona Talla:";

  }

  else {

    titulo.innerText =
      "Selecciona Medida:";

  }

}


// =========================================================
// SELECCIONAR OPCIÓN
// =========================================================

function seleccionarOpcion(
  elemento,
  tipo
) {

  if (!elemento) return;


  const contenedor =
    elemento.parentElement;


  if (contenedor) {

    const botones =
      contenedor.querySelectorAll(
        ".btn-opcion"
      );


    botones.forEach(
      boton => {

        boton.classList.remove(
          "activa"
        );

      }
    );

  }


  elemento.classList.add(
    "activa"
  );


  if (tipo === "color") {

    colorSeleccionado =
      elemento.innerText.trim();

  }


  if (tipo === "talla") {

    tallaSeleccionada =
      elemento.innerText.trim();

  }


  actualizarResumenPedido();

  renderizarBotonesPayPal();

}


// =========================================================
// CAMBIAR CANTIDAD
// =========================================================

function cambiarCantidad(delta) {

  cantidadSeleccionada += delta;


  if (cantidadSeleccionada < 1) {

    cantidadSeleccionada = 1;

  }


  if (cantidadSeleccionada > 99) {

    cantidadSeleccionada = 99;

  }


  const cantidad =
    document.getElementById(
      "numCantidad"
    );


  if (cantidad) {

    cantidad.innerText =
      cantidadSeleccionada;

  }


  actualizarResumenPedido();

  renderizarBotonesPayPal();

}


// =========================================================
// FOTO PRINCIPAL
// =========================================================

function actualizarFotoMini() {

  const img =
    document.getElementById(
      "imgPrincipal"
    );


  if (!img) return;


  if (
    !productoSeleccionado ||
    !productoSeleccionado.fotos ||
    productoSeleccionado.fotos.length === 0
  ) {

    img.removeAttribute("src");

    return;

  }


  img.src =
    productoSeleccionado.fotos[
      fotoIndiceActual
    ];

}


// =========================================================
// CAMBIAR FOTO
// =========================================================

function cambiarFotoMini(delta) {

  if (
    !productoSeleccionado ||
    !productoSeleccionado.fotos ||
    productoSeleccionado.fotos.length === 0
  ) {

    return;

  }


  fotoIndiceActual += delta;


  if (
    fotoIndiceActual < 0
  ) {

    fotoIndiceActual =
      productoSeleccionado.fotos.length - 1;

  }


  if (
    fotoIndiceActual >=
    productoSeleccionado.fotos.length
  ) {

    fotoIndiceActual = 0;

  }


  actualizarFotoMini();

}


// =========================================================
// RESUMEN DEL PEDIDO
// =========================================================

function actualizarResumenPedido() {

  if (!productoSeleccionado) return;


  const producto =
    document.getElementById(
      "resumenProducto"
    );


  const color =
    document.getElementById(
      "resumenColor"
    );


  const talla =
    document.getElementById(
      "resumenTalla"
    );


  const cantidad =
    document.getElementById(
      "resumenCantidad"
    );


  const total =
    document.getElementById(
      "resumenTotal"
    );


  if (producto) {

    producto.innerText =
      productoSeleccionado.nombre;

  }


  if (color) {

    color.innerText =
      colorSeleccionado ||
      "No seleccionado";

  }


  if (talla) {

    talla.innerText =
      tallaSeleccionada ||
      "No seleccionada";

  }


  if (cantidad) {

    cantidad.innerText =
      cantidadSeleccionada;

  }


  if (total) {

    const totalCompra =
      productoSeleccionado.precio *
      cantidadSeleccionada;


    total.innerText =
      "$" +
      totalCompra.toFixed(2);

  }

}


// =========================================================
// PAYPAL
// =========================================================

function renderizarBotonesPayPal() {

  const contenedor =
    document.getElementById(
      "paypal-button-container"
    );


  if (!contenedor) return;


  contenedor.innerHTML = "";


  if (!productoSeleccionado) return;


  if (
    typeof paypal ===
    "undefined"
  ) {

    contenedor.innerHTML = `
      <p style="
        color:#f87171;
        text-align:center;
        font-size:12px;
      ">
        PayPal no está disponible.
      </p>
    `;

    return;

  }


  paypal.Buttons({

    // -----------------------------------------------------
    // CREAR ORDEN
    // -----------------------------------------------------

    createOrder:
      function(data, actions) {

        const total =
          (
            productoSeleccionado.precio *
            cantidadSeleccionada
          ).toFixed(2);


        return actions.order.create({

          purchase_units: [

            {

              description:
                productoSeleccionado.nombre,

              amount: {

                currency_code: "USD",

                value: total

              },

              items: [

                {

                  name:
                    productoSeleccionado.nombre,

                  unit_amount: {

                    currency_code: "USD",

                    value:
                      productoSeleccionado.precio
                        .toFixed(2)

                  },

                  quantity:
                    String(
                      cantidadSeleccionada
                    )

                }

              ]

            }

          ]

        });

      },


    // -----------------------------------------------------
    // PAGO APROBADO
    // -----------------------------------------------------

    onApprove:
      function(data, actions) {

        return actions.order
          .capture()
          .then(
            function(details) {

              const nombre =
                details.payer &&
                details.payer.name &&
                details.payer.name.given_name
                  ? details.payer.name.given_name
                  : "cliente";


              alert(
                "¡Pago completado con éxito, " +
                nombre +
                "!"
              );


              cerrarTienda();

            }
          );

      },


    // -----------------------------------------------------
    // ERROR
    // -----------------------------------------------------

    onError:
      function(error) {

        console.error(
          "Error de PayPal:",
          error
        );


        alert(
          "Ocurrió un error al procesar el pago. " +
          "Por favor intenta nuevamente."
        );

      },


    // -----------------------------------------------------
    // CANCELAR
    // -----------------------------------------------------

    onCancel:
      function() {

        console.log(
          "El cliente canceló el pago."
        );

      }

  }).render(
    "#paypal-button-container"
  );

}


// =========================================================
// CARRUSEL PRINCIPAL DE GALERÍA
// =========================================================

let fotoActualIndex = 0;


function moverCarrusel(
  direccion
) {

  const fotos =
    document.querySelectorAll(
      ".foto-carrusel"
    );


  const indicadores =
    document.querySelectorAll(
      ".indicador"
    );


  if (fotos.length === 0) return;


  fotos[
    fotoActualIndex
  ].classList.remove(
    "activa"
  );


  if (
    indicadores[fotoActualIndex]
  ) {

    indicadores[
      fotoActualIndex
    ].classList.remove(
      "activo"
    );

  }


  fotoActualIndex += direccion;


  if (
    fotoActualIndex < 0
  ) {

    fotoActualIndex =
      fotos.length - 1;

  }


  if (
    fotoActualIndex >=
    fotos.length
  ) {

    fotoActualIndex = 0;

  }


  fotos[
    fotoActualIndex
  ].classList.add(
    "activa"
  );


  if (
    indicadores[fotoActualIndex]
  ) {

    indicadores[
      fotoActualIndex
    ].classList.add(
      "activo"
    );

  }

}


// =========================================================
// CERRAR MODAL AL HACER CLICK FUERA
// =========================================================

document.addEventListener(
  "click",
  function(event) {

    const modal =
      document.getElementById(
        "modalTienda"
      );


    if (!modal) return;


    if (
      event.target === modal
    ) {

      cerrarTienda();

    }

  }
);


// =========================================================
// TECLA ESC PARA CERRAR
// =========================================================

document.addEventListener(
  "keydown",
  function(event) {

    if (
      event.key === "Escape"
    ) {

      cerrarTienda();

    }

  }
);


// =========================================================
// CARGAR IMÁGENES PRINCIPALES
// DESDE galeria-datos.js
// =========================================================

document.addEventListener(
  "DOMContentLoaded",
  function() {

    // -----------------------------------------------------
    // LOGO
    // -----------------------------------------------------

    if (
      typeof GALERIA_IMAGENES !==
      "undefined"
    ) {

      const logo =
        document.getElementById(
          "logo-principal"
        );


      if (
        logo &&
        GALERIA_IMAGENES.logo
      ) {

        logo.src =
          GALERIA_IMAGENES.logo;

      }


      // ---------------------------------------------------
      // IMAGEN COMUNIDAD
      // ---------------------------------------------------

      const imagenComunidad =
        document.getElementById(
          "img-post-comunidad"
        );


      if (
        imagenComunidad &&
        GALERIA_IMAGENES.comunidad &&
        GALERIA_IMAGENES.comunidad.length
      ) {

        imagenComunidad.src =
          GALERIA_IMAGENES
            .comunidad[0]
            .src;

      }


      // ---------------------------------------------------
      // IMÁGENES DE CATEGORÍAS
      // ---------------------------------------------------

      const imgGuantes =
        document.getElementById(
          "img-tienda-guantes"
        );


      const imgVendas =
        document.getElementById(
          "img-tienda-vendas"
        );


      const imgBucales =
        document.getElementById(
          "img-tienda-bucales"
        );


      if (
        GALERIA_IMAGENES.tienda
      ) {

        if (
          imgGuantes &&
          GALERIA_IMAGENES
            .tienda
            .guantes
        ) {

          imgGuantes.src =
            GALERIA_IMAGENES
              .tienda
              .guantes;

        }


        if (
          imgVendas &&
          GALERIA_IMAGENES
            .tienda
            .vendas
        ) {

          imgVendas.src =
            GALERIA_IMAGENES
              .tienda
              .vendas;

        }


        if (
          imgBucales &&
          GALERIA_IMAGENES
            .tienda
            .bucales
        ) {

          imgBucales.src =
            GALERIA_IMAGENES
              .tienda
              .bucales;

        }

      }

    }

  }
);
