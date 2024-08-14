export const carrito=[];

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
}