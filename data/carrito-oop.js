
  function Carrito(localStorageKey){
    const carrito = {
      carritoItems: undefined,
      
      loadFromStorage(){
        this.carritoItems = JSON.parse(localStorage.getItem(localStorageKey));
          if (!this.carritoItems) {
            this.carritoItems = [
            {productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 
            quantity: 2,
            deliveryOptionId:'1'
          },
            {productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d', 
            quantity: 1,
            deliveryOptionId: '2'
          },];
        }
      },
    
       guardarLocalStorage() {
        localStorage.setItem(localStorageKey, JSON.stringify(this.carritoItems));
      },
       guardarLocalStorage() {
        localStorage.setItem(localStorageKey, JSON.stringify(this.carritoItems));
      },
    
      addtoCarrito(productId){
        let matchingItem;
       
        this.carritoItems.forEach((carritoItem)=>{
          if (productId === carritoItem.productId) {
            matchingItem = carritoItem;
          }
        });
          const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
          const quantity = Number(quantitySelector.value);
        
          if (matchingItem) {
            matchingItem.quantity+=  quantity;
          } else{
            this.carritoItems.push({
              productId,
              quantity,
              deliveryOptionId: '1'
            });
          }
          this.guardarLocalStorage();
      },
       borrarCarrito(productId) {
        const newCarrito=[];
        this.carritoItems.forEach((carritoItem)=>{
          if (carritoItem.productId !== productId) {
            newCarrito.push(carritoItem);
          }    
        });
      
        this.carritoItems = newCarrito;
        this.guardarLocalStorage();
      },
        updateCarrito() {
        let carritoQuantity = 0;
            this.carritoItems.forEach((carritoItem)=>{
              carritoQuantity += carritoItem.quantity;
            });
            return carritoQuantity
      },
       updateQuantity(productId, newQuantity) {
        let matchingItem;
        this.carritoItems.forEach(carritoItem => {
          if (productId === carritoItem.productId) {
            matchingItem= carritoItem;
          }
        });
        matchingItem.quantity= newQuantity;
        this.sguardarLocalStorage();
      },
      
      updateDeliveryOption(productId, deliveryOptionId) {
      let matchingItem;  
      this.carritoItems.forEach(carritoItem => {
          if (productId === carritoItem.productId) {
            matchingItem=carritoItem
          }
        });
        matchingItem.deliveryOptionId = deliveryOptionId;
    
        this.guardarLocalStorage();
    },
    };

    return carrito;
  }

  const carrito = Carrito('carrito-opp');
  const bussinesCarrito = Carrito('carrito-bussines');

  carrito.loadFromStorage();
  
  bussinesCarrito.loadFromStorage();
  
  console.log(carrito);
  console.log(bussinesCarrito);

