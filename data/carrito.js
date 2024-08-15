export let carrito = JSON.parse(localStorage.getItem('carrito'));
if (!carrito) {
  carrito = [
    {productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 
     quantity: 2,
    },
    {productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d', 
     quantity: 1,
    },];
}


  function guardarLocalStorage() {
      localStorage.setItem('carrito', JSON.stringify(carrito));
  }
export function addtoCarrito(productId){
  let matchingItem;
  document.querySelector(`js-quantity-selector-${productId}`)
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
        quantity
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

export function updateCarrito(classname) {
  let carritoQuantity = 0;
      carrito.forEach((carritoItem)=>{
        carritoQuantity += carritoItem.quantity;
      });
      document.querySelector(classname).innerHTML=carritoQuantity;
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