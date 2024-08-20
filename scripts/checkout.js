import {  loadProductsFetch } from "../data/products.js";
import { renderRevision } from "./checkout/orderSummary.js";
import { renderPayment } from "./checkout/paymentSummary.js";
//import'../data/carrito-class.js';
//import '../data/backend-practica.js'
 
async function loadPage() {
  await loadProductsFetch()
  renderRevision();
  renderPayment();
}

loadPage();
/*
loadProductsFetch().then(()=>{
  renderRevision();
  renderPayment();
});
*/
/*
Promise.all([
  new Promise((resolve)=>{
    loadProducts(()=>{
      resolve('hecho');
    });
  }),

  //// agregar mas promesas
]).then((values)=>{ // se pueden obtener valores enviados por resolve
  console.log(values);
  renderRevision();
  renderPayment();
});
*/
/* callback
loadProducts(()=>{
 renderRevision();
  renderPayment();
});
*/
