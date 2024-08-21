import { addtoCarrito, updateCarrito } from "../data/carrito.js";
import { orders } from "../data/ordenes.js";
import { getProducts, loadProductsFetch } from "../data/products.js";
import { formatMoney } from "./utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
document.querySelector('.js-carrito-quantity').innerHTML= updateCarrito();
async function loadPage() {
  await loadProductsFetch();
  let ordersHtml = '';
  document.querySelector('.js-carrito-quantity').innerHTML= updateCarrito();
  orders.forEach(order => {

    const orderTimeString = dayjs(order.orderTime).format('MMMM D');
  
  
    ordersHtml+= `
    <div class="order-container">
    <div class="order-header">
      <div class="order-header-left-section">
        <div class="order-date">
          <div class="order-header-label">Orden establecida:</div>
          <div>${orderTimeString}</div>
        </div>
        <div class="order-total">
          <div class="order-header-label">Total:</div>
          <div>$${formatMoney(order.totalCostCents)}</div>
        </div>
      </div>
    
      <div class="order-header-right-section">
        <div class="order-header-label">Orden ID:</div>
        <div>${order.id}</div>
      </div>
    </div>
    
    <div class="order-details-grid">
      ${productsListHTML(order)}
    </div>
    </div>`;
  });
  
 function productsListHTML(order) {
  let productsListHTML='';
  order.products.forEach((productDetails)=>{
    const product = getProducts(productDetails.productId);
    productsListHTML += `
    <div class="product-image-container">
      <img src="${product.image}">
    </div>
    <div class="product-details">
      <div class="product-name">
        ${product.name}
      </div>
      <div class="product-delivery-date">
        LLegará en: ${
          dayjs(productDetails.estimatedDeliveryTime).format('MMMM D')
        }
      </div>
      <div class="product-quantity">
        Cantidad: ${productDetails.quantity}
      </div>
      <button class="buy-again-button button-primary js-buy-again" data-product-id="${product.id}">
        <img class="buy-again-icon" src="images/icons/buy-again.png">
        <span class="buy-again-message">Compra de nuevo</span>
      </button>
    </div>
    <div class="product-actions">
      <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
        <button class="track-package-button button-secondary">
          Seguir el pedido
        </button>
      </a>
    </div>
  `;
});
  return productsListHTML;
 }
 document.querySelector('.js-orders-grid').innerHTML = ordersHtml;

 document.querySelectorAll('.js-buy-again').forEach((button)=>{
  button.addEventListener('click',()=>{
    addtoCarrito(button.dataset.productId);
    loadPage();
    button.innerHTML = 'Agregado';
    setTimeout(() => {
      button.innerHTML = `
        <img class="buy-again-icon" src="images/icons/buy-again.png">
        <span class="buy-again-message">Compra de nuevo</span>
      `;
    }, 1000);
  });
 });
}
loadPage();



