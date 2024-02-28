// Products data initial list
let products = [
  {
    name: "Cherry",
    price: 20,
    quantity: 0,
    productId: 1,
    image: "./images/cherry.jpg"
  },
  {
    name: "Orange",
    price: 10,
    quantity: 0,
    productId: 2,
    image: "./images/orange.jpg"
  },
  {
    name: "Strawberry",
    price: 15,
    quantity: 0,
    productId: 3,
    image: "./images/strawberry.jpg"
  }
];

// cart data initial list
let cart = [];

/* Create a function named addProductToCart that takes in the product productId as an argument
  - addProductToCart should get the correct product based on the productId
  - addProductToCart should then increase the product's quantity
  - if the product is not already in the cart, add it to the cart
*/
function addProductToCart (productId) {
  let product = products.find((product) => product.productId === productId);

  if (product) {
    // Check if the product is already in the cart
    let cartProduct = cart.find((item) => item.productId === productId);

    // If the product is already in the cart, increase the quantity
    if (cartProduct) {
      product.quantity++; // Increase the quantity of the product
    } else { // If the product is not in the cart, add it to the cart
      product.quantity++; // Increase the quantity of the product
      cart.push(product);
    }
  }
} 

/* Create a function named increaseQuantity that takes in the productId as an argument
  - increaseQuantity should get the correct product based on the productId
  - increaseQuantity should then increase the product's quantity
*/
function increaseQuantity(productId) {
  let cartProduct = cart.find((item) => item.productId === productId);
  if (cartProduct) {
    cartProduct.quantity++;
  }
}

/* Create a function named decreaseQuantity that takes in the productId as an argument
  - decreaseQuantity should get the correct product based on the productId
  - decreaseQuantity should decrease the quantity of the product
  - if the function decreases the quantity to 0, the product is removed from the cart
*/
function decreaseQuantity (productId) {
  let product = products.find((item) => item.productId === productId);
  if (product) {
    product.quantity--;
    if (product.quantity <= 0) {
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].productId === productId) {
          cart.splice(i, 1);
          break;
        }
      }
    }
  }
}

/* Create a function named removeProductFromCart that takes in the productId as an argument
  - removeProductFromCart should get the correct product based on the productId
  - removeProductFromCart should update the product quantity to 0
  - removeProductFromCart should remove the product from the cart
*/
function removeProductFromCart (productId) {
  let cartProductIndex = cart.findIndex((item) => item.productId === productId);
  let product = products.find((item) => item.productId === cart[cartProductIndex].productId);

  if (cartProductIndex !== -1 && product) {
    product.quantity = 0;

    cart.splice(cartProductIndex, 1);
  }
}

/* Create a function called emptyCart that empties the products from the cart */
function emptyCart() {
  cart = []; 
}

/* Create a function named cartTotal that has no parameters
  - cartTotal should iterate through the cart to get the total of all products
  - cartTotal should return the sum of the products in the cart
*/
function cartTotal() {
  let total = 0;

  for (let item of cart) {
    total += item.quantity * item.price;
  }

  return total;
}

/* Create a function named pay that takes in an amount as an argument
  - pay will return a negative number if there is a remaining balance
  - pay will return a positive number if money should be returned to customer
*/
let totalPaid = 0;

/**
 * Calculates the remaining balance after paying the specified amount.
 * If the remaining balance is greater than or equal to zero, it clears the cart and updates the total paid.
 * If the remaining balance is negative, it returns the absolute value of the remaining balance.
 * @param {number} amount - The amount to be paid.
 * @returns {number} - The remaining balance or the absolute value of the remaining balance.
 */
function pay(amount) {
  let remainingBalance = amount - cartTotal();
  let change = 0;

  if (remainingBalance >= 0) {
    // Remover os itens do carrinho
    cart = [];  
    emptyCart();
    change = remainingBalance;
    totalPaid += amount - change; // Atualizar o valor de totalPaid
    return remainingBalance;
  } else {
    return -remainingBalance;
  }
}


/**
 * Converts the prices and total amount in the shopping cart to the selected currency.
 * @param {string} selectedCurrency - The currency to convert to (e.g. 'USD', 'EUR', 'YEN').
 */
function currency(selectedCurrency) {
  const conversionRates = {
    USD: 1,
    EUR: 0.85,
    YEN: 110,
  };
  
  // Get the currency symbol
  const priceElements = document.querySelectorAll(".price");
  const totalElement = document.querySelector(".cart-total");
  
  // Update the total paid with the new currency
  let convertedTotalPaid;
  if (selectedCurrency === 'USD') {
    convertedTotalPaid = totalPaid;
  } else {
    convertedTotalPaid = totalPaid * conversionRates[selectedCurrency];
  }
  document.getElementById("totalPaidValue").textContent = currencySymbol + convertedTotalPaid.toFixed(2);
  
  // Convert the prices of the products in the shopping cart
  priceElements.forEach((element) => {
    const price = parseFloat(element.textContent);
    let convertedPrice;

    if (selectedCurrency === 'USD') {
      convertedPrice = price;
    } else {
      convertedPrice = price * conversionRates[selectedCurrency];

    }

    element.textContent = convertedPrice.toFixed(2);
  });

  // Convert the total amount in the shopping cart
  const total = parseFloat(totalElement.textContent);
  let convertedTotal; 

  if (selectedCurrency === 'USD') {
    convertedTotal = total;
  } else {
    convertedTotal = total * conversionRates[selectedCurrency];
  }

  totalElement.textContent = convertedTotal.toFixed(2);

  // Update the products and cart with the new currency
  products = products.map((product) => {
    let convertedPrice;

    if (selectedCurrency === 'USD') {
      convertedPrice = product.price;
    } else {
      convertedPrice = product.price * conversionRates[selectedCurrency];
    }

    return { ...product, price: convertedPrice };
  });

  // Update the cart with the new currency
  cart.forEach((item) => {
    if (selectedCurrency !== 'USD') {
      item.price = item.price * conversionRates[selectedCurrency];
    }
  });
}




/* The following is for running unit tests. 
   To fully complete this project, it is expected that all tests pass.
   Run the following command in terminal to run tests
   npm run test
*/

module.exports = {
    products,
    cart,
    addProductToCart,
    increaseQuantity,
    decreaseQuantity,
    removeProductFromCart,
    cartTotal,
    pay, 
    emptyCart,
    currency
  }