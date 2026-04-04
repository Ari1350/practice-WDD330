import { getLocalStorage } from "./utils.mjs"; 
import CheckoutProcess from "./CheckoutProcess.mjs";

const myCheckout = new CheckoutProcess("so-cart", "#order-summary");
myCheckout.init();


const zipInput = document.querySelector("#zip");
if (zipInput) {
  zipInput.addEventListener("blur", () => {
    myCheckout.calculateOrderTotal();
  });
}

const form = document.querySelector("#checkout-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault(); 
    const chk_status = form.checkValidity();

    form.reportValidity();

    if (chk_status) {
      myCheckout.checkout(e.target);
    }
  });
}
