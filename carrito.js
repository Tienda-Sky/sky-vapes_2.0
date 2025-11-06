// ================= CLASE DEL CARRITO =================
class Carrito {
  constructor() {
    this.items = []; // array con los productos
    this.tbody = document.querySelector("#cart-table tbody"); // cuerpo de la tabla
    this.totalElement = document.getElementById("cart-total"); // total a pagar
  }

  // ================= AGREGAR PRODUCTO =================
  agregarProducto(nombre, precio) {
    const productoExistente = this.items.find(item => item.name === nombre);

    if (productoExistente) {
      productoExistente.cantidad++;
    } else {
      this.items.push({ name: nombre, price: precio, cantidad: 1 });
    }

    this.actualizar();
  }

  // ================= ELIMINAR PRODUCTO =================
  eliminarProducto(index) {
    this.items.splice(index, 1);
    this.actualizar();
  }

  // ================= ACTUALIZAR TABLA =================
  actualizar() {
    this.tbody.innerHTML = ""; // limpiar tabla
    let total = 0;

    this.items.forEach((item, index) => {
      const row = `
        <tr>
          <td>${item.name}</td>
          <td>$${item.price} COP</td>
          <td>${item.cantidad}</td>
          <td>$${item.price * item.cantidad} COP</td>
          <td><button class="btn" onclick="carrito.eliminarProducto(${index})">❌</button></td>
        </tr>
      `;
      this.tbody.innerHTML += row;
      total += item.price * item.cantidad;
    });

    this.totalElement.innerText = "Total: $" + total + " COP";
  }

  // ================= FINALIZAR COMPRA =================
  finalizarCompra() {
    if (this.items.length === 0) {
      alert("⚠️ Tu carrito está vacío");
    } else {
      alert("✅ Gracias por tu compra 🛒🔥");
      this.items = []; // vaciar carrito
      this.actualizar();
    }
  }
}

// ================= INSTANCIA GLOBAL =================
const carrito = new Carrito();

// ================= EVENTOS =================

// Detectar todos los botones de "Añadir al carrito"
document.querySelectorAll(".add-to-cart").forEach(boton => {
  boton.addEventListener("click", () => {
    const name = boton.getAttribute("data-name");
    const price = parseInt(boton.getAttribute("data-price"));
    carrito.agregarProducto(name, price);
  });
});

// Detectar el botón de "Finalizar compra"
document.getElementById("checkout-btn").addEventListener("click", () => {
  carrito.finalizarCompra();
});
