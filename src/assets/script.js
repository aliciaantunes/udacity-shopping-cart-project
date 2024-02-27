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
let totalPaid = 0;

function pay(amount) {
  totalPaid += amount - change; // Atualizar o valor de totalPaid
  let remainingBalance = amount - cartTotal();
  let change = 0;

  if (remainingBalance >= 0) {
    // Remover os itens do carrinho
    cart = [];  
    emptyCart();
    change = remainingBalance;
    return remainingBalance;
  } else {
    return -remainingBalance;
  }
}

function currency(selectedCurrency) {
  const conversionRates = {
    USD: 1,
    EUR: 0.85,
    YEN: 110,
  };
    
  const priceElements = document.querySelectorAll(".price");
  const totalElement = document.querySelector(".cart-total");
  
  let convertedTotalPaid;
  if (selectedCurrency === 'USD') {
    convertedTotalPaid = totalPaid;
  } else {
    convertedTotalPaid = totalPaid * conversionRates[selectedCurrency];
  }
  document.getElementById("totalPaidValue").textContent = currencySymbol + convertedTotalPaid.toFixed(2);
  
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


  const total = parseFloat(totalElement.textContent);
  let convertedTotal; 

  if (selectedCurrency === 'USD') {
    convertedTotal = total;
  } else {
    convertedTotal = total * conversionRates[selectedCurrency];
  }

  totalElement.textContent = convertedTotal.toFixed(2);


  // Atualizar os valores de preço nos objetos products e cart
  products = products.map((product) => {
    let convertedPrice;

    if (selectedCurrency === 'USD') {
      convertedPrice = product.price;
    } else {
      convertedPrice = product.price * conversionRates[selectedCurrency];
    }

    return { ...product, price: convertedPrice };
  });

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