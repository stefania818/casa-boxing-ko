// Debe declararse ARRIBA DEL TODO de script.js
const inventario = {
  guantes: [
    {
      nombre: "Everlast",
      precio: "$45.00",
      fotos: GALERIA_IMAGENES?.inventarioFotos?.everlast || [],
      colores: ["Negro", "Rojo", "Azul"],
      medidas: ["12 oz", "14 oz", "16 oz"]
    },
    {
      nombre: "Venum",
      precio: "$55.00",
      fotos: GALERIA_IMAGENES?.inventarioFotos?.venum || [],
      colores: ["Blanco/Oro", "Negro/Rojo"],
      medidas: ["12 oz", "14 oz"]
    }
  ],
  vendas: [
    {
      nombre: "Vendas Pro",
      precio: "$10.00",
      fotos: GALERIA_IMAGENES?.inventarioFotos?.vendas || [],
      colores: ["Rojo", "Negro"],
      medidas: ["3.5m", "5m"]
    }
  ],
  bucales: [
    {
      nombre: "Bucal Gel",
      precio: "$12.00",
      fotos: GALERIA_IMAGENES?.inventarioFotos?.bucales || [],
      colores: ["Transparente", "Negro"],
      medidas: ["Estándar"]
    }
  ]
};
function abrirNivel2(categoria) {
  const productos = inventario[categoria];
  if (!productos) return;

  // Ocultar Nivel 1 y 3, mostrar Nivel 2
  document.getElementById('vistaNivel1').style.display = 'none';
  document.getElementById('vistaNivel3').style.display = 'none';
  document.getElementById('vistaNivel2').style.display = 'block';

  const contenedor = document.getElementById('grillaModelosNivel2');
  contenedor.innerHTML = '';

  productos.forEach((prod, index) => {
    contenedor.innerHTML += `
      <div class="card-modelo" onclick="verDetalleProducto('${categoria}', ${index})">
        <img src="${prod.fotos[0] || ''}" alt="${prod.nombre}" style="width:100%; border-radius:6px;">
        <h4>${prod.nombre}</h4>
        <p>${prod.precio}</p>
      </div>
    `;
  });
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
