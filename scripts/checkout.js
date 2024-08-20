import { loadProducts } from "../data/products.js";
import { renderRevision } from "./checkout/orderSummary.js";
import { renderPayment } from "./checkout/paymentSummary.js";
//import'../data/carrito-class.js';
//import '../data/backend-practica.js'
loadProducts(()=>{
  renderRevision();
  renderPayment();
});
