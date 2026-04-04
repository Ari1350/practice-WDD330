export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
  let cart = JSON.parse(localStorage.getItem(key)) || [];
  if (!Array.isArray(cart)) {
    cart = [];
  }
  cart.push(data);
  localStorage.setItem(key, JSON.stringify(cart));
}

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

export function alertMessage(message, scroll = true) {

  const alert = document.createElement('div');

  alert.classList.add('alert');

  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  alert.addEventListener('click', function(e) {
      if(e.target.tagName == "SPAN") {
        main.removeChild(this);
      }
  });

  const main = document.querySelector('main');
  main.prepend(alert);

  if(scroll) window.scrollTo(0,0);
}


