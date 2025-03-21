async function fetchAndDisplayProducts() {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const products = await response.json();

        // Select three random products
        const randomProducts = [];
        while (randomProducts.length < 3) {
            const randomProduct = products[Math.floor(Math.random() * products.length)];
            if (!randomProducts.includes(randomProduct)) {
                randomProducts.push(randomProduct);
            }
        }

        // Clear previous products
        const productsContainer = document.getElementById("products");
        productsContainer.innerHTML = "";

        // Display product details in their own containers
        randomProducts.forEach(product => {
            const productContainer = document.createElement("div");
            productContainer.className = "product-container";

            const productImage = document.createElement("img");
            productImage.className = "productImage";
            productImage.src = product.image;
            productImage.alt = "Product Image";

            const productTitle = document.createElement("h2");
            productTitle.className = "productTitle";
            productTitle.textContent = product.title;

            const productPrice = document.createElement("p");
            productPrice.className = "productPrice";
            productPrice.textContent = `$${product.price}`;

            productContainer.appendChild(productImage);
            productContainer.appendChild(productTitle);
            productContainer.appendChild(productPrice);

            productsContainer.appendChild(productContainer);
        });
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

document.addEventListener("DOMContentLoaded", fetchAndDisplayProducts); // Run on page load
document.getElementById("fetchButton").addEventListener("click", fetchAndDisplayProducts); // Button

document.getElementById("this-year").textContent = new Date().getFullYear(); // Year for footer