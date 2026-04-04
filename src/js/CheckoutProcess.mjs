import { getLocalStorage, alertMessage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
  }

  calculateItemSummary() {
    const summaryElement = document.querySelector(this.outputSelector + " #subtotal");
    this.itemTotal = this.list.reduce((sum, item) => sum + item.FinalPrice, 0);
    summaryElement.innerText = `$${this.itemTotal.toFixed(2)}`;
  }

  calculateOrderTotal() {
    this.shipping = 10 + (this.list.length - 1) * 2;
    this.tax = (this.itemTotal * 0.06).toFixed(2);
    this.orderTotal = (
      parseFloat(this.itemTotal) +
      parseFloat(this.shipping) +
      parseFloat(this.tax)
    ).toFixed(2);

    this.displayOrderTotals();
  }

  displayOrderTotals() {
    document.querySelector(this.outputSelector + " #shipping").innerText = `$${this.shipping}`;
    document.querySelector(this.outputSelector + " #tax").innerText = `$${this.tax}`;
    document.querySelector(this.outputSelector + " #orderTotal").innerText = `$${this.orderTotal}`;
  }

  packageItems(items) {
    return items.map((item) => ({
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1, 
    }));
  }

  async checkout(form) {
    const formData = new FormData(form);
    const convertedJSON = {};
    formData.forEach((value, key) => {
      convertedJSON[key] = value;
    });

    convertedJSON.orderDate = new Date().toISOString();
    convertedJSON.orderTotal = this.orderTotal;
    convertedJSON.tax = this.tax;
    convertedJSON.shipping = this.shipping;
    convertedJSON.items = this.packageItems(this.list);

    try {
      const services = new ExternalServices();
      const res = await services.checkout(convertedJSON);
      console.log("Pedido exitoso:", res);

      localStorage.removeItem(this.key);

      location.href = "success.html";

    } catch (err) {

      const existingAlerts = document.querySelectorAll(".alert");
      existingAlerts.forEach(alert => alert.remove());

      for (let key in err.message) {
        alertMessage(err.message[key]);
      }
      
      console.log("Error detallado del servidor:", err);
    }

  }
}
