import { getOrder } from "../data/ordenes.js"
import { getProducts, loadProductsFetch } from "../data/products.js"
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { updateCarrito } from "../data/carrito.js";
document.querySelector('.js-carrito-quantity').innerHTML= updateCarrito();
async function loadPage() {
  await loadProductsFetch();
  document.querySelector('.js-carrito-quantity').innerHTML= updateCarrito();
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');

  const order = getOrder(orderId);
  const product = getProducts(productId);

  
  let productDetails;
  order.products.forEach((details) => {
    if (details.productId === product.id) {
      productDetails = details;
    }
  });

  const today = dayjs();
  const orderTime = dayjs(order.orderTime);
  const deliveryTime = dayjs(productDetails.estimatedDeliveryTime);
  const percentProgress = ((today - orderTime) / (deliveryTime - orderTime)) * 100;

  const trackingHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">
      Ver todas las ordenes
    </a>
    <div class="delivery-date">
      El pedido arrivará en ${
        dayjs(productDetails.estimatedDeliveryTime).format('dddd, MMMM D')
      }
    </div>
    <div class="product-info">
      ${product.name}
    </div>
    <div class="product-info">
      Cantidad: ${productDetails.quantity}
    </div>
    <img class="product-image" src="${product.image}">
    <div class="progress-labels-container">
      <div class="progress-label ${percentProgress < 50 ?'current-status' : ''}">
        Preparando
      </div>
      <div class="progress-label current-status  ${
        (percentProgress >= 50 && percentProgress < 100) ? 'current-status' : ''}">
        Enviado
      </div>
      <div class="progress-label ${
        percentProgress >= 100 ? "current-status" : ''
      }">
        Entregado
      </div>
    </div>
    <div class="progress-bar-container">
      <div class="progress-bar" style="width: ${percentProgress}%;"></div>
    </div>
  `;

  document.querySelector('.js-order-tracking').innerHTML = trackingHTML;
}

loadPage();