// ======================================================
// CASA BOXING KO - TIENDA
// ======================================================

// ======================================================
// INVENTARIO
// ======================================================

const inventario = {

  // ----------------------------------------------------
  // GUANTES
  // ----------------------------------------------------
  guantes: [

    {
      nombre: "Guantes Everlast",
      precio: 35.00,

      fotos: [
        "/assets/tienda/guantes/everlast/37bc54d3-0472-43a3-926e-e58bb6a9758a.jpg"
      ],

      colores: [
        "Negro",
        "Rojo",
        "Azul"
      ],

      tallas: [
        "10 oz",
        "12 oz",
        "14 oz",
        "16 oz"
      ]
    },

    {
      nombre: "Guantes Venum Clásico",
      precio: 45.00,

      fotos: [
        "/assets/tienda/guantes/venum/venum-clasico.jpg"
      ],

      colores: [
        "Negro",
        "Negro/Blanco"
      ],

      tallas: [
        "10 oz",
        "12 oz",
        "14 oz",
        "16 oz"
      ]
    },

    {
      nombre: "Guantes Venum Elite",
      precio: 55.00,

      fotos: [
        "/assets/tienda/guantes/venum/venum-elite.jpg"
      ],

      colores: [
        "Negro",
        "Rojo",
        "Blanco"
      ],

      tallas: [
        "10 oz",
        "12 oz",
        "14 oz",
        "16 oz"
      ]
    },

    {
      nombre: "Guantes Venum Prime",
      precio: 65.00,

      fotos: [
        "/assets/tienda/guantes/venum/venum-prime.jpg"
      ],

      colores: [
        "Negro",
        "Rojo",
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


  // ----------------------------------------------------
  // VENDAS
  // ----------------------------------------------------
  vendas: [

    {
      nombre: "Vendas Everlast",
      precio: 8.00,

      fotos: [
        "/assets/tienda/vendas/vendas-everlast.jpeg"
      ],

      colores: [
        "Negro",
        "Rojo",
        "Azul",
        "Blanco"
      ],

      tallas: [
        "3 metros",
        "5 metros"
      ]
    },

    {
      nombre: "Vendas Venum",
      precio: 10.00,

      fotos: [
        "/assets/tienda/vendas/vendas-venum.jpeg"
      ],

      colores: [
        "Negro",
        "Rojo",
        "Azul",
        "Blanco"
      ],

      tallas: [
        "3 metros",
        "5 metros"
      ]
    }

  ],


  // ----------------------------------------------------
  // BUCALES
  // ----------------------------------------------------
  bucales: [

    {
      nombre: "Bucal Doble",
      precio: 15.00,

      fotos: [
        "/assets/tienda/bucales/bucal-doble-mor.jpg"
      ],

      colores: [
        "Negro",
        "Transparente"
      ],

      tallas: [
        "Adulto",
        "Juvenil"
      ]
    },

    {
      nombre: "Bucal Everlast",
      precio: 12.00,

      fotos: [
        "/assets/tienda/bucales/bucal-everlast.jpg"
      ],

      colores: [
        "Negro",
        "Transparente"
      ],

      tallas: [
        "Adulto",
        "Juvenil"
      ]
    },

    {
      nombre: "Bucal Reforzado",
      precio: 18.00,

      fotos: [
        "/assets/tienda/bucales/bucal-reforzado.jpg"
      ],

      colores: [
        "Negro",
        "Transparente"
      ],

      tallas: [
        "Adulto",
        "Juvenil"
      ]
    },

    {
      nombre: "Bucal Venum",
      precio: 20.00,

      fotos: [
        "/assets/tienda/bucales/bucal-venum.jpg"
      ],

      colores: [
        "Negro",
        "Transparente"
      ],

      tallas: [
        "Adulto",
        "Juvenil"
      ]
    }

  ]
};


// ======================================================
// VARIABLES DE ESTADO
// ======================================================

let categoriaActual = "";
let productoSeleccionado = null;
let productoIndexActual = 0;

let fotoIndiceActual = 0;
let cantidadSeleccionada = 1;

let colorSeleccionado = "";
let tallaSeleccionada = "";


// ======================================================
// ABRIR TIENDA
// ======================================================

function abrirModal(categoria = "") {

  const modal = document.getElementById("modalTienda");

  if (!modal) return;

  modal.style.display = "flex";

  if (categoria) {
    abrirNivel2(categoria);
  } else {
    irANivel1();
  }
}


// ======================================================
// CERRAR TIENDA
// ======================================================

function cerrarTienda() {

  const modal = document.getElementById("modalTienda");

  if (!modal) return;

  modal.style.display = "none";

}


// ======================================================
// NIVEL 1
// CATEGORÍAS
// ======================================================

function irANivel1() {

  const nivel1 = document.getElementById("vistaNivel1");
  const nivel2 = document.getElementById("vistaNivel2");
  const nivel3 = document.getElementById("vistaNivel3");

  if (nivel1) nivel1.style.display = "block";
  if (nivel2) nivel2.style.display = "none";
  if (nivel3) nivel3.style.display = "none";

}


// ======================================================
// NIVEL 2
// MODELOS DE UNA CATEGORÍA
// ======================================================

function abrirNivel2(categoria) {

  categoriaActual = categoria;

  const nivel1 = document.getElementById("vistaNivel1");
  const nivel2 = document.getElementById("vistaNivel2");
  const nivel3 = document.getElementById("vistaNivel3");

  if (nivel1) nivel1.style.display = "none";
  if (nivel2) nivel2.style.display = "block";
  if (nivel3) nivel3.style.display = "none";


  // Título

  const titulo = document.getElementById("tituloCategoriaNivel2");

  if (titulo) {

    const nombres = {
      guantes: "Guantes de Boxeo",
      vendas: "Vendas",
      bucales: "Protectores Bucales"
    };

    titulo.innerText = nombres[categoria] || categoria;

  }


  // Contenedor

  const grilla = document.getElementById("grillaModelosNivel2");

  if (!grilla) return;

  grilla.innerHTML = "";


  const productos = inventario[categoria] || [];


  if (productos.length === 0) {

    grilla.innerHTML = `
      <p style="
        grid-column:1/-1;
        text-align:center;
        color:#cbd5e1;
        padding:30px;
      ">
        Próximamente más productos.
      </p>
    `;

    return;
  }


  // Crear tarjetas

  productos.forEach((producto, index) => {

    const foto = producto.fotos?.[0] || "";

    const tarjeta = document.createElement("div");

    tarjeta.className = "card-modelo";

    tarjeta.onclick = function () {

      verDetalleProducto(categoria, index);

    };


    tarjeta.innerHTML = `

      <img
        src="${foto}"
        alt="${producto.nombre}"
        class="img-modelo"
      >

      <h4>
        ${producto.nombre}
      </h4>

      <span class="precio-modelo">
        $${producto.precio.toFixed(2)}
      </span>

    `;


    grilla.appendChild(tarjeta);

  });

}


// ======================================================
// VOLVER AL NIVEL 2
// ======================================================

function irANivel2() {

  abrirNivel2(categoriaActual);

}


// ======================================================
// NIVEL 3
// DETALLE DEL PRODUCTO
// ======================================================

function verDetalleProducto(categoria, index) {

  categoriaActual = categoria;

  productoIndexActual = index;

  productoSeleccionado = inventario[categoria][index];

  fotoIndiceActual = 0;

  cantidadSeleccionada = 1;


  // Reiniciar opciones

  colorSeleccionado =
    productoSeleccionado.colores?.[0] || "";

  tallaSeleccionada =
    productoSeleccionado.tallas?.[0] || "";


  // Cambiar niveles

  document.getElementById("vistaNivel2").style.display = "none";

  document.getElementById("vistaNivel3").style.display = "block";


  // Nombre

  document.getElementById("tituloModeloNivel3").innerText =
    productoSeleccionado.nombre;


  // Precio

  document.getElementById("precioModeloNivel3").innerText =
    "$" + productoSeleccionado.precio.toFixed(2);


  // Cantidad

  document.getElementById("numCantidad").innerText =
    cantidadSeleccionada;


actualizarFotoMini();

cargarColores();

cargarTallas();

// Actualizar resumen
actualizarResumenPedido();

// Mostrar botones de pago
renderizarBotonesPayPal();

}


// ======================================================
// CARGAR COLORES
// ======================================================

function cargarColores() {

  const contenedor =
    document.getElementById("contenedorColores");

  if (!contenedor) return;

  contenedor.innerHTML = "";


  const colores =
    productoSeleccionado.colores || [];


  colores.forEach((color, index) => {

    const boton =
      document.createElement("button");

    boton.className =
      "btn-opcion" +
      (index === 0 ? " activa" : "");

    boton.innerText = color;


    boton.onclick = function () {

      seleccionarOpcion(
        boton,
        "color"
      );

      colorSeleccionado = color;

    };


    contenedor.appendChild(boton);

  });

}


// ======================================================
// CARGAR TALLAS / MEDIDAS
// ======================================================

function cargarTallas() {

  const contenedor =
    document.getElementById("contenedorTallas");

  const titulo =
    document.getElementById("tituloSecTallas");

  const seccion =
    document.getElementById("secTallas");


  if (!contenedor) return;


  contenedor.innerHTML = "";


  const tallas =
    productoSeleccionado.tallas || [];


  // Si el producto no tiene medidas,
  // ocultamos completamente esta sección.

  if (tallas.length === 0) {

    if (seccion)
      seccion.style.display = "none";

    return;

  }


  if (seccion)
    seccion.style.display = "block";


  // Cambiar texto dependiendo de la categoría

  if (titulo) {

    if (categoriaActual === "guantes") {

      titulo.innerText =
        "Selecciona Onzas:";

    } else if (categoriaActual === "vendas") {

      titulo.innerText =
        "Selecciona Longitud:";

    } else {

      titulo.innerText =
        "Selecciona Medida:";

    }

  }


  tallas.forEach((talla, index) => {

    const boton =
      document.createElement("button");

    boton.className =
      "btn-opcion" +
      (index === 0 ? " activa" : "");

    boton.innerText = talla;


    boton.onclick = function () {

      seleccionarOpcion(
        boton,
        "talla"
      );

      tallaSeleccionada = talla;

    };


    contenedor.appendChild(boton);

  });

}


// ======================================================
// SELECCIONAR OPCIÓN
// ======================================================

function seleccionarOpcion(elemento, tipo) {

  const contenedor = elemento.parentElement;

  const botones =
    contenedor.querySelectorAll(".btn-opcion");

  botones.forEach(btn => {
    btn.classList.remove("activa");
  });

  elemento.classList.add("activa");


  // Selección de color
  if (tipo === "color") {

    colorSeleccionado =
      elemento.innerText;

  }


  // Selección de talla / medida / onzas
  if (tipo === "talla") {

    tallaSeleccionada =
      elemento.innerText;

  }


  // Actualizar resumen
  actualizarResumenPedido();


  // Actualizar PayPal
  renderizarBotonesPayPal();

}


  // Actualizar PayPal

  renderizarBotonesPayPal();

}


// ======================================================
// CANTIDAD
// ======================================================

function cambiarCantidad(delta) {

  cantidadSeleccionada += delta;


  if (cantidadSeleccionada < 1) {

    cantidadSeleccionada = 1;

  }


  if (cantidadSeleccionada > 99) {

    cantidadSeleccionada = 99;

  }


  const cantidad =
    document.getElementById("numCantidad");


  if (cantidad) {

    cantidad.innerText =
      cantidadSeleccionada;

  }


  // Actualizar resumen
  actualizarResumenPedido();


  // Actualizar pago
  renderizarBotonesPayPal();

}


// ======================================================
// FOTO PRINCIPAL
// ======================================================

function actualizarFotoMini() {

  const imagen =
    document.getElementById("imgPrincipal");


  if (
    !imagen ||
    !productoSeleccionado ||
    !productoSeleccionado.fotos
  ) return;


  imagen.src =
    productoSeleccionado.fotos[fotoIndiceActual];

}


// ======================================================
// CAMBIAR FOTO
// ======================================================

function cambiarFotoMini(delta) {

  if (
    !productoSeleccionado ||
    !productoSeleccionado.fotos ||
    productoSeleccionado.fotos.length <= 1
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


// ======================================================
// PAYPAL
// ======================================================

function renderizarBotonesPayPal() {

  const contenedor =
    document.getElementById(
      "paypal-button-container"
    );


  if (!contenedor) return;


  contenedor.innerHTML = "";


  if (
    typeof paypal === "undefined" ||
    !productoSeleccionado
  ) {

    return;

  }


  const precio =
    Number(productoSeleccionado.precio);


  const total =
    (precio * cantidadSeleccionada)
    .toFixed(2);


  paypal.Buttons({

    style: {

      layout: "vertical",

      shape: "rect",

      label: "paypal"

    },


    createOrder:
      function(data, actions) {

        return actions.order.create({

          purchase_units: [

            {

              description:
                productoSeleccionado.nombre,

              amount: {

                currency_code: "USD",

                value: total

              }

            }

          ]

        });

      },


    onApprove:
      function(data, actions) {

        return actions.order
          .capture()
          .then(function(details) {


            alert(
              "¡Pago realizado correctamente!"
            );


            console.log(
              "Compra:",
              {
                producto:
                  productoSeleccionado.nombre,

                color:
                  colorSeleccionado,

                talla:
                  tallaSeleccionada,

                cantidad:
                  cantidadSeleccionada,

                total:
                  total,

                cliente:
                  details.payer.name
              }
            );


            cerrarTienda();

          });

      },


    onCancel:
      function() {

        console.log(
          "El cliente canceló el pago."
        );

      },


    onError:
      function(error) {

        console.error(
          "Error PayPal:",
          error
        );


        alert(
          "No se pudo procesar el pago. Intenta nuevamente."
        );

      }

  }).render(
    "#paypal-button-container"
  );

}

// ======================================================
// RESUMEN DEL PEDIDO
// ======================================================

function actualizarResumenPedido() {

  if (!productoSeleccionado) return;


  const producto =
    document.getElementById("resumenProducto");

  const color =
    document.getElementById("resumenColor");

  const talla =
    document.getElementById("resumenTalla");

  const cantidad =
    document.getElementById("resumenCantidad");

  const total =
    document.getElementById("resumenTotal");


  if (producto) {

    producto.innerText =
      productoSeleccionado.nombre;

  }


  if (color) {

    color.innerText =
      colorSeleccionado || "No seleccionado";

  }


  if (talla) {

    talla.innerText =
      tallaSeleccionada || "No seleccionada";

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
      "$" + totalCompra.toFixed(2);

  }

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


  fotos[
    fotoActualIndex
  ].classList.remove("activa");


  if (indicadores[fotoActualIndex]) {

    indicadores[
      fotoActualIndex
    ].classList.remove("activo");

  }


  fotoActualIndex += direccion;


  if (fotoActualIndex < 0) {

    fotoActualIndex =
      fotos.length - 1;

  }


  if (
    fotoActualIndex >= fotos.length
  ) {

    fotoActualIndex = 0;

  }


  fotos[
    fotoActualIndex
  ].classList.add("activa");


  if (indicadores[fotoActualIndex]) {

    indicadores[
      fotoActualIndex
    ].classList.add("activo");

  }

}


// ======================================================
// CARGAR IMÁGENES DEL SITIO
// ======================================================

document.addEventListener(
  "DOMContentLoaded",
  function() {


    // Logo

    const logo =
      document.getElementById(
        "logo-principal"
      );


    if (
      logo &&
      typeof GALERIA_IMAGENES !== "undefined"
    ) {

      logo.src =
        GALERIA_IMAGENES.logo;

    }


    // Imágenes de categorías

    if (
      typeof GALERIA_IMAGENES !== "undefined"
    ) {


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


      if (imgGuantes) {

        imgGuantes.src =
          GALERIA_IMAGENES.tienda.guantes;

      }


      if (imgVendas) {

        imgVendas.src =
          GALERIA_IMAGENES.tienda.vendas;

      }


      if (imgBucales) {

        imgBucales.src =
          GALERIA_IMAGENES.tienda.bucales;

      }


      // Imagen de comunidad

      const imagenComunidad =
        document.getElementById(
          "img-post-comunidad"
        );


      if (
        imagenComunidad &&
        GALERIA_IMAGENES.comunidad.length
      ) {

        imagenComunidad.src =
          GALERIA_IMAGENES
            .comunidad[0]
            .src;

      }

    }


    // ==================================================
    // CREAR GALERÍA
    // ==================================================

    if (
      typeof GALERIA_IMAGENES !== "undefined"
    ) {

      const contenedorFotos =
        document.getElementById(
          "contenedor-carrusel-fotos"
        );


      const contenedorIndicadores =
        document.getElementById(
          "contenedor-indicadores"
        );


      if (
        contenedorFotos &&
        contenedorIndicadores
      ) {

        contenedorFotos.innerHTML = "";

        contenedorIndicadores.innerHTML = "";


        GALERIA_IMAGENES
          .carrusel
          .forEach(
            function(foto, index) {


              const imagen =
                document.createElement("img");


              imagen.src =
                foto.src;


              imagen.alt =
                foto.alt;


              imagen.className =
                "foto-carrusel";


              if (
                index === 0 ||
                foto.activa
              ) {

                imagen.classList.add(
                  "activa"
                );

                fotoActualIndex =
                  index;

              }


              contenedorFotos
                .appendChild(imagen);


              const indicador =
                document.createElement("span");


              indicador.className =
                "indicador";


              if (
                index === fotoActualIndex
              ) {

                indicador.classList.add(
                  "activo"
                );

              }


              indicador.onclick =
                function() {

                  const fotos =
                    document.querySelectorAll(
                      ".foto-carrusel"
                    );


                  const indicadores =
                    document.querySelectorAll(
                      ".indicador"
                    );


                  fotos[
                    fotoActualIndex
                  ].classList.remove(
                    "activa"
                  );


                  indicadores[
                    fotoActualIndex
                  ].classList.remove(
                    "activo"
                  );


                  fotoActualIndex =
                    index;


                  fotos[
                    fotoActualIndex
                  ].classList.add(
                    "activa"
                  );


                  indicadores[
                    fotoActualIndex
                  ].classList.add(
                    "activo"
                  );

                };


              contenedorIndicadores
                .appendChild(indicador);

            }
          );

      }

    }

  }
);
