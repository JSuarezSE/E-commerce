const productos = [{
  imagen: 'images/products/intermediate-composite-basketball.jpg',
  nombre: 'pelota',
  rating: {
    estrellas:4,
    contador: 127,
  }, 
  precioCent: 2095,

}, {
  imagen: 'images/products/athletic-cotton-socks-6-pairs.jpg',
  nombre: 'Medias',
  rating: {
    estrellas:4.5,
    contador: 87,
  }, 
  precioCent: 1090,
},{
  imagen: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
  nombre: 'Camisas',
  rating: {
    estrellas:4.5,
    contador: 56,
  }, 
  precioCent: 799,
}];

let productosHTML='';

productos.forEach((producto)=>{
      productosHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${producto.imagen}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${producto.nombre}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${producto.rating.estrellas * 10}.png">
        <div class="product-rating-count link-primary">
          ${producto.rating.contador}
        </div>
      </div>

      <div class="product-price">
        $${(producto.precioCent / 100).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select>
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

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary">
        Add to Cart
      </button>
    </div>
  `;
});

  document.querySelector('.js-productos-grid').innerHTML = productosHTML;