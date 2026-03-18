// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  let cart = JSON.parse(localStorage.getItem(key)) || [];
  if (!Array.isArray(cart)) {
    cart = [];
  }
  cart.push(data);
  localStorage.setItem(key, JSON.stringify(cart));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
 //libre
export function updateCartBadge() {
  const cartItems = JSON.parse(localStorage.getItem('so-cart')) || [];
  const cartContainer = document.querySelector('.cart-link'); 

  if (cartContainer) {
    if (cartItems.length > 0) {
      let cartBadge = document.querySelector('.cart-badge');
      if (!cartBadge) {
        cartBadge = document.createElement('span');
        cartBadge.classList.add('cart-badge');
        cartContainer.appendChild(cartBadge);
      }
      cartBadge.textContent = cartItems.length;
    } else {
      const existingBadge = document.querySelector('.cart-badge');
      if (existingBadge) existingBadge.remove();
    }
  }
}

