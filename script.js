
const productForm = document.getElementById("productForm");
const productList = document.getElementById("productList");

// Load previously saved products
let products = [];

try {
    products = JSON.parse(
        localStorage.getItem("products")
    ) || [];

    if (!Array.isArray(products)) {
        products = [];
    }
} catch (error) {
    products = [];
}

// Display products in the table
function displayProducts() {
    productList.replaceChildren();

    products.forEach(function (product) {
        const row = document.createElement("tr");

        const values = [
            product.name,
            "₹" + Number(product.price).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }),
            product.manufacturer,
            product.date
        ];

        values.forEach(function (value) {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        productList.appendChild(row);
    });
}

// Add a new product
productForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const price = document.getElementById("price").value;
    const manufacturer = document
        .getElementById("manufacturer").value.trim();
    const date = document.getElementById("date").value;

    if (
        !name ||
        !manufacturer ||
        !date ||
        price === "" ||
        !Number.isFinite(Number(price)) ||
        Number(price) <= 0
    ) {
        alert("Please enter valid product details.");
        return;
    }

    const product = {
        id: Date.now().toString() + Math.random().toString(16).slice(2),
        name: name,
        price: Number(price),
        manufacturer: manufacturer,
        date: date
    };

    products.push(product);

    // Save products in browser storage
    try {
        localStorage.setItem("products", JSON.stringify(products));
    } catch (error) {
        products.pop();
        alert("Could not save products. Check your browser storage.");
        return;
    }

    // Update table and clear form
    displayProducts();
    productForm.reset();

    alert("Product added and saved successfully!");
});

// Show saved products when the page opens
displayProducts();
