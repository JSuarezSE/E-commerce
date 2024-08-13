let productosHTML='';

products.forEach((product)=>{
      productosHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${(product.priceCents / 100).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select class = "js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-${product.id}">
        <img src="images/icons/checkmark.png">
        Añadido
      </div>

      <button class="add-to-cart-button button-primary js-add-carrito"
      data-product-id="${product.id}">
        Añadir al carrito
      </button>
    </div>
  `;
});
  
  document.querySelector('.js-productos-grid').innerHTML = productosHTML;
  document.querySelectorAll('.js-add-carrito').forEach((button)=>{
    let addedMessageTimeoutId;
    button.addEventListener('click', ()=>{
      const {productId}= button.dataset;
      let matchingItem;
      document.querySelector(`js-quantity-selector-${productId}`)
      carrito.forEach((item)=>{
        if (productId === item.productId) {
          matchingItem=item;
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
        let carritoQuantity = 0;
        carrito.forEach((item)=>{
          carritoQuantity += item.quantity;
        });
        document.querySelector('.js-carrito-quantity').innerHTML=carritoQuantity;
        const addedMessage = document.querySelector(`.js-added-${productId}`);
        addedMessage.classList.add('added-to-cart-visible');

         if (addedMessageTimeoutId) {
        clearTimeout(addedMessageTimeoutId);
        }
        const timeoutId = setTimeout(() => {
          addedMessage.classList.remove('added-to-cart-visible');
        }, 2000);
        addedMessageTimeoutId= timeoutId;
    });
  });