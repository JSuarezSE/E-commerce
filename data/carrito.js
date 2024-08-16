export let carrito = JSON.parse(localStorage.getItem('carrito'));
if (!carrito) {
  carrito = [
    {productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 
     quantity: 2,
     deliveryOptionId:'1'
    },
    {productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d', 
     quantity: 1,
     deliveryOptionId: '2'
    },];
}


  function guardarLocalStorage() {
      localStorage.setItem('carrito', JSON.stringify(carrito));
  }

export function addtoCarrito(productId){
  let matchingItem;
 
  carrito.forEach((carritoItem)=>{
    if (productId === carritoItem.productId) {
      matchingItem = carritoItem;
    }
  });
    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
    const quantity = Number(quantitySelector.value);
  
    if (matchingItem) {
      matchingItem.quantity+=  quantity;
    } else{
      carrito.push({
        productId,
        quantity,
        deliveryOptionId: '1'
      });
    }
    guardarLocalStorage();
}

export function borrarCarrito(productId) {
  const newCarrito=[];
  carrito.forEach((carritoItem)=>{
    if (carritoItem.productId !== productId) {
      newCarrito.push(carritoItem);
    }    
  });

  carrito = newCarrito;
  guardarLocalStorage();
}

export function updateCarrito() {
  let carritoQuantity = 0;
      carrito.forEach((carritoItem)=>{
        carritoQuantity += carritoItem.quantity;
      });
      return carritoQuantity
}

export function updateQuantity(productId, newQuantity) {
  let matchingItem;
  carrito.forEach(carritoItem => {
    if (productId === carritoItem.productId) {
      matchingItem= carritoItem;
    }
  });
  matchingItem.quantity= newQuantity;
  guardarLocalStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;  
  carrito.forEach(carritoItem => {
      if (productId === carritoItem.productId) {
        matchingItem=carritoItem
      }
    });
    matchingItem.deliveryOptionId = deliveryOptionId;

    guardarLocalStorage();
}