import { carrito, updateCarrito } from "../../data/carrito.js";
import {products, getProducts} from '../../data/products.js';
import {deliveryOptions, getDeliveryOption} from "../../data/deliveryOptions.js";
import { formatMoney } from "../utils/money.js";

export function renderPayment() {

  let productPriceCents = 0;
  let shippingPriceCents = 0;
  carrito.forEach((carritoItem) => {
    const product = getProducts(carritoItem.productId);
    productPriceCents += product.priceCents * carritoItem.quantity; 
    const deliveryOption = getDeliveryOption(carritoItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });
  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const iva = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + iva;

  const paymentSummaryHtml = `
    <div class="payment-summary-title">
      Resumen de tu orden
    </div>

    <div class="payment-summary-row">
      <div class="">Items (${updateCarrito()}):</div>
      <div class="payment-summary-money">$${formatMoney(productPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Envío &amp; Manejo:</div>
      <div class="payment-summary-money">$${formatMoney(shippingPriceCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total antes de impuestos:</div>
      <div class="payment-summary-money">$${formatMoney(totalBeforeTaxCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Impuestos estimados (10%):</div>
      <div class="payment-summary-money">$${formatMoney(iva)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Total del pedido:</div>
      <div class="payment-summary-money">$${formatMoney(totalCents)}</div>
    </div>

    <button class="place-order-button button-primary">
      Haz tu pedido
    </button>
  `;
  document.querySelector('.js-payment').innerHTML= paymentSummaryHtml;
}