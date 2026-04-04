import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || []; 
  if (!Array.isArray(cartItems)) {
    console.warn("El carrito no es una lista válida. Limpiando...");
    localStorage.removeItem("so-cart");
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}


function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <span class="cart-card__remove" data-id="${item.Id}">X</span>
  <a href="#" class="cart-card__image">
    <img src="${item.Image}" alt="${item.Name}" />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function removeFromCart(id) {
  let cartItems = getLocalStorage("so-cart") || [];
  const index = cartItems.findIndex(item => item.Id === id);
  
  if (index !== -1) {
    cartItems.splice(index, 1); 
    localStorage.setItem("so-cart", JSON.stringify(cartItems));
    renderCartContents();
  }
}

renderCartContents();

document.querySelector(".product-list").addEventListener("click", (e) => {
  if (e.target.classList.contains("cart-card__remove")) {
    const productId = e.target.dataset.id;
    removeFromCart(productId);
  }
});
