const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements - References to HTML elements that will be manipulated
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Initialize cart - Retrieve cart data from sessionStorage or create empty array if none exists
// sessionStorage persists data for the duration of the page session but is cleared when the page is closed
let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

// Render product list - Creates and displays the list of available products
function renderProducts() {
  products.forEach((product) => {
    // Create a list item for each product with an "Add to Cart" button
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list - Creates and displays the current items in the cart
function renderCart() {
  // Clear the current cart display before rendering updated cart
  cartList.innerHTML = "";
  cart.forEach((item) => {
    // Create a list item for each cart item with a "Remove" button
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - $${item.price} <button class="remove-from-cart-btn" data-id="${item.id}">Remove</button>`;
    cartList.appendChild(li);
  });

  // Save the updated cart to sessionStorage for persistence across page refreshes
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Add item to cart - Finds the product by ID and adds it to cart
function addToCart(productId) {
  const product = products.find((product) => product.id === productId);
  cart.push(product);
  // Re-render the cart to show the newly added item
  renderCart();
}

// Remove item from cart - Filters out the product with the specified ID
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  // Re-render the cart to reflect the removal
  renderCart();
}

// Clear cart - Resets the cart to an empty array
function clearCart() {
  cart = [];
  // Re-render the empty cart
  renderCart();
}

// Event delegation for product list - Listens for clicks on "Add to Cart" buttons
productList.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart-btn")) {
    // Extract product ID from the data-id attribute and convert to integer
    addToCart(parseInt(event.target.dataset.id));
  }
});

// Event delegation for cart list - Listens for clicks on "Remove" buttons
cartList.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-from-cart-btn")) {
    // Extract product ID from the data-id attribute and convert to integer
    removeFromCart(parseInt(event.target.dataset.id));
  }
});

// Event listener for the "Clear Cart" button
clearCartBtn.addEventListener("click", () => {
  clearCart();
});

// Initial render - Display products and cart when the page loads
renderProducts();
renderCart();