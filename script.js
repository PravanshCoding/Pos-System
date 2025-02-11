// Product Inventory stored in Local Storage
let products = JSON.parse(localStorage.getItem("products")) || [];
let cart = [];
let totalAmount = 0;

// Function to add product to inventory
function addProduct() {
    let name = document.getElementById("productName").value;
    let price = document.getElementById("productPrice").value;
    let stock = document.getElementById("productStock").value;

    if (name && price && stock) {
        let newProduct = { name, price: Number(price), stock: Number(stock) };
        products.push(newProduct);
        localStorage.setItem("products", JSON.stringify(products));
        updateInventory();
    }
}

// Function to update inventory list and dropdown
function updateInventory() {
    let inventoryList = document.getElementById("inventoryList");
    let productSelect = document.getElementById("productSelect");
    inventoryList.innerHTML = "";
    productSelect.innerHTML = "";

    products.forEach((product, index) => {
        let listItem = document.createElement("li");
        listItem.innerText = `${product.name} - ₹${product.price} (Stock: ${product.stock})`;
        inventoryList.appendChild(listItem);

        let option = document.createElement("option");
        option.value = index;
        option.innerText = product.name;
        productSelect.appendChild(option);
    });
}

// Function to add selected product to the bill
function addToBill() {
    let productIndex = document.getElementById("productSelect").value;
    let qty = document.getElementById("productQty").value;

    if (productIndex !== "" && qty > 0) {
        let product = products[productIndex];
        if (product.stock >= qty) {
            cart.push({ name: product.name, price: product.price, qty: Number(qty) });
            product.stock -= Number(qty);
            localStorage.setItem("products", JSON.stringify(products));
            updateInventory();
            updateBill();
        } else {
            alert("Not enough stock!");
        }
    }
}

// Function to generate invoice
function generateInvoice() {
    let invoiceOutput = document.getElementById("invoiceOutput");
    let invoiceText = `--- Invoice ---\n`;

    cart.forEach(item => {
        invoiceText += `${item.name} x ${item.qty} = ₹${item.price * item.qty}\n`;
    });

    invoiceText += `-----------------\nTotal: ₹${totalAmount}\n\nThank You for buying!`;

    // Display text invoice
    invoiceOutput.innerText = invoiceText;

    // Add QR code image below the invoice
    let qrCodeImage = document.createElement("img");
    qrCodeImage.src = "path/to/qr-code.png"; // Replace with the actual path to your QR code image
    qrCodeImage.alt = "QR Code";
    qrCodeImage.style.marginTop = "10px";
    qrCodeImage.style.width = "150px";
    qrCodeImage.style.height = "150px";

    // Append the QR code to the invoice section
    invoiceOutput.appendChild(qrCodeImage);

    // Clear cart after generating invoice
    cart = [];
    updateBill();
}


// Load inventory on startup
updateInventory();
