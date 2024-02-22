/* Create an array named products which you will use to add all of your product object literals that you create in the next step. */
let products = [];

/* Create 3 or more product objects using object literal notation 
   Each product should include five properties
   - name: name of product (string)
   - price: price of product (number)
   - quantity: quantity in cart should start at zero (number)
   - productId: unique id for the product (number)
   - image: picture of product (url string)
*/
let product1 = {
  name: "Cherry",
  price: 20,
  quantity: 0,
  productId: 1,
  image: "./images/cherry.jpg"
};

let product2 = {
  name: "Orange",
  price: 10,
  quantity: 0,
  productId: 2,
  image: "./images/orange.jpg"
};

let product3 = {
  name: "Strawberry",
  price: 15,
  quantity: 0,
  productId: 3,
  image: "./images/strawberry.jpg"
};

products.push(product1);
products.push(product2);
products.push(product3);


/* Declare an empty array named cart to hold the items in the cart */
let cart = [];

/* Create a function named addProductToCart that takes in the product productId as an argument
  - addProductToCart should get the correct product based on the productId
  - addProductToCart should then increase the product's quantity
  - if the product is not already in the cart, add it to the cart
*/
function addProductToCart (productId) {
  let product = products.find((product) => product.productId === productId);

  if (product) {
   
    let cartProduct = cart.find((item) => item.productId === productId);
    if (cartProduct) {
      cartProduct.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
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
  let cartProduct = cart.find((item) => item.productId === productId);
  if (cartProduct) {
    cartProduct.quantity--;
    if (cartProduct.quantity === 0) {
      cart = cart.filter((item) => item.productId !== productId);
    }
  }
}

/* Create a function named removeProductFromCart that takes in the productId as an argument
  - removeProductFromCart should get the correct product based on the productId
  - removeProductFromCart should update the product quantity to 0
  - removeProductFromCart should remove the product from the cart
*/
function removeProductFromCart (productId) {
  let cartProduct = cart.find((item) => item.productId === productId);
  if (cartProduct) {
    cartProduct.quantity = 0;
    cart = cart.filter((item) => item.productId !== productId); 
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
function pay (amount) {
  let remainingBalance = amount - cartTotal();

  if (remainingBalance >= 0) {
    return remainingBalance;
  } else {
    return -remainingBalance;
  }
}



currencySelector.addEventListener('change', function () {
  const selectedCurrency = currencySelector.value;

  const conversionRates = {
    usd: 1,
    real: 5.5,
    euro: 0.85,
    yen: 110,
  };

  const priceElements = document.querySelectorAll(".price");
  const totalElement = document.querySelector(".cart-total");

  priceElements.forEach((element) => {
    const price = parseFloat(element.textContent);
    let convertedPrice;

    if (selectedCurrency === 'usd') {
      convertedPrice = price;
    } else {
      convertedPrice = price * conversionRates[selectedCurrency];
    }

    element.textContent = convertedPrice.toFixed(2);
  });

  const total = parseFloat(totalElement.textContent);
  let convertedTotal;

  if (selectedCurrency === 'usd') {
    convertedTotal = total;
  } else {
    convertedTotal = total * conversionRates[selectedCurrency];
  }

  totalElement.textContent = convertedTotal.toFixed(2);


  // Atualizar os valores de preço nos objetos products e cart
  products = products.map((product) => {
    let convertedPrice;

    if (selectedCurrency === 'usd') {
      convertedPrice = product.price;
    } else {
      convertedPrice = product.price * conversionRates[selectedCurrency];
    }

    return { ...product, price: convertedPrice };
  });

  cart.forEach((item) => {
    if (selectedCurrency !== 'usd') {
      item.price = item.price * conversionRates[selectedCurrency];
    }
  });
});




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