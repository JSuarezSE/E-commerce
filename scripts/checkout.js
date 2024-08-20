import { loadProducts } from "../data/products.js";
import { renderRevision } from "./checkout/orderSummary.js";
import { renderPayment } from "./checkout/paymentSummary.js";
//import'../data/carrito-class.js';
//import '../data/backend-practica.js'

new Promise((resolve)=>{
  loadProducts(()=>{
    resolve();
  });
}).then(()=>{
  renderRevision();
  renderPayment();
});
/*
loadProducts(()=>{
 renderRevision();
  renderPayment();
});
*/
