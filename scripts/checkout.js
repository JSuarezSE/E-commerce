import {carrito, borrarCarrito, updateCarrito, updateQuantity} from '../data/carrito.js';
import {products} from '../data/products.js';
import { formatMoney } from './utils/money.js';
let cartSummaryHtml='';

updateCarrito('.js-revision');

carrito.forEach((carritoItem)=>{
  
  const productId = carritoItem.productId;
  
  let matchingProducts;

  products.forEach((product)=>{
      if (product.id === productId) {
        matchingProducts = product; 
      }    
  });

  cartSummaryHtml+=`
  <div class="cart-item-container js-cart-item-${matchingProducts.id}">
      <div class="delivery-date">
        Fecha de delivery: Miercoles, 14 de Agosto
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProducts.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProducts.name}
          </div>
          <div class="product-price">
            $${formatMoney(matchingProducts.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Cantidad: <span class="quantity-label js-quantity-label-${matchingProducts.id}">${carritoItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary 
            js-actualizar-link" data-product-id="${matchingProducts.id}">
              Actualizar 
            </span>
            <input class="quantity-input js-quantity-input-${matchingProducts.id}">
            <span class="save-quantity-link link-primary js-guardar-link" data-product-id="${matchingProducts.id}">Guardar</span>
            <span class="delete-quantity-link link-primary 
            js-borrar-link" data-product-id="${matchingProducts.id}">
              Eliminar
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Escoje una opción de delivery:
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${matchingProducts.id}">
            <div>
              <div class="delivery-option-date">
                Miercoles, 14 de Agosto
              </div>
              <div class="delivery-option-price">
                Envío gratis
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProducts.id}">
            <div>
              <div class="delivery-option-date">
                Jueves, 15 de Agosto
              </div>
              <div class="delivery-option-price">
                $4.99 - Gastos de envío
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProducts.id}">
            <div>
              <div class="delivery-option-date">
                Domingo, 18 de Agosto
              </div>
              <div class="delivery-option-price">
                $9.99 - Gastos de envío
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
  `;
});

document.querySelector('.js-carrito').innerHTML= cartSummaryHtml;

document.querySelectorAll('.js-borrar-link').forEach((link) => {
  link.addEventListener('click', ()=>{
    const {productId}= link.dataset;
    borrarCarrito(productId);
    
   const container = document.querySelector(`.js-cart-item-${productId}`)
    container.remove();
    updateCarrito('.js-revision');
  });
});

document.querySelectorAll('.js-actualizar-link').forEach(link => {
  link.addEventListener('click', ()=>{
    const {productId} = link.dataset;
    const container = document.querySelector(
      `.js-cart-item-${productId}`
    );
    container.classList.add('is-editing-quantity');
    
  
  });
});;

document.querySelectorAll('.js-guardar-link').forEach(link => {
  link.addEventListener('click', ()=>{
    const {productId} = link.dataset;
    const container = document.querySelector(
      `.js-cart-item-${productId}`
    );
    container.classList.remove('is-editing-quantity');
    const quantityInput = document.querySelector(
      `.js-quantity-input-${productId}`
    );
    const newQuantity = Number(quantityInput.value);
      updateQuantity(productId,newQuantity)
      const quantityLabel = document.querySelector(
        `.js-quantity-label-${productId}`
      );
      quantityLabel.innerHTML = newQuantity;
      updateCarrito('.js-revision');
  });
});;

