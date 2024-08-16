import {carrito, borrarCarrito, updateCarrito, updateQuantity, updateDeliveryOption} from '../../data/carrito.js';
import {products, getProducts} from '../../data/products.js';
import { formatMoney } from '../utils/money.js';
import {calculateDeliveryDate, deliveryOptions, getDeliveryOption} from "../../data/deliveryOptions.js";
import { renderPayment } from './paymentSummary.js';


document.querySelector('.js-revision').innerHTML= `${updateCarrito()} items`;
 export function renderRevision() {

  let cartSummaryHtml='';
  
  carrito.forEach((carritoItem)=>{
    
    const productId = carritoItem.productId;
    
    const matchingProducts = getProducts(productId);

    const deliveryOptionId = carritoItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);
   

    cartSummaryHtml+=`
    <div class="cart-item-container js-cart-item-${matchingProducts.id}">
        <div class="delivery-date">
          Fecha de delivery: ${calculateDeliveryDate(deliveryOption)}
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
            ${deliveryOptionsHtml(matchingProducts, carritoItem)}
          </div>
        </div>
    </div>
    `;
  });

  function deliveryOptionsHtml(matchingProducts, carritoItem) {

    let html = '';

    deliveryOptions.forEach((deliveryOption)=>{


      const priceString = deliveryOption.priceCents === 0
      ? 'GRATIS'
      : `$${formatMoney(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === carritoItem.deliveryOptionId;

      html +=`
      <div class="delivery-option js-delivery-option" data-product-id="${matchingProducts.id}" data-delivery-option-id="${deliveryOption.id}">
              <input type="radio"
                ${isChecked ? 'checked' : ''}
                class="delivery-option-input"
                name="delivery-option-${matchingProducts.id}">
              <div>
                <div class="delivery-option-date">
                  ${calculateDeliveryDate(deliveryOption)}
                </div>
                <div class="delivery-option-price">
                  ${priceString} Gastos de envío
                </div>
              </div>
            </div>
      `
    });
    return html;
  }

  document.querySelector('.js-carrito').innerHTML= cartSummaryHtml;

  document.querySelectorAll('.js-borrar-link').forEach((link) => {
    link.addEventListener('click', ()=>{
      const {productId}= link.dataset;
      borrarCarrito(productId);
      
      renderRevision();
      renderPayment();
      document.querySelector('.js-revision').innerHTML= `${updateCarrito()} items`;
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
    
        document.querySelector('.js-revision').innerHTML= `${updateCarrito()} items`;
        renderPayment();

    });
  });;

  document.querySelectorAll('.js-delivery-option').forEach((element)=>{
    element.addEventListener('click', ()=>{
      const {productId, deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderRevision();
      renderPayment();
    });
  });
  
}
