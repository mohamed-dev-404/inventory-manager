//*Declare DOM element references
let productName = document.getElementById("productName");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let totalPrice = document.getElementById("totalPrice");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
// console.log(productName,price,taxes,ads,discount,totalPrice,count,category,create);

//* get Total Price
function getTotalPrice() {
    if (price.value != "") {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        totalPrice.innerHTML = result;
        totalPrice.style.background = "#1aab4fff";
    } else {
        totalPrice.innerHTML = "";
        totalPrice.style.background = "#DC2626";
    }
}

//* create Poduct
let productList;
if (localStorage.products != null) {
    productList = JSON.parse(localStorage.products);
} else {
    productList = [];
}

create.onclick = function () {
    let newProduct = {
        productName: productName.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        totalPrice: totalPrice.innerHTML,
        count: count.value,
        category: category.value
    };

    if (count.value > 1) {
        for (let i = 0; i < count.value; i++) {
            productList.push(newProduct);
        }
    } else {
        productList.push(newProduct);
    }

    //? save to local Storage
    localStorage.setItem('products', JSON.stringify(productList));

    clearInputs(); //clear input fields
    showProducts(); //show products
}


//* clear inputs fields
function clearInputs() {
    productName.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    totalPrice.innerHTML = '';
    count.value = '';
    category.value = '';
}


//* show all product
function showProducts() {
    let productsTable = '';
    for (let i = 0; i < productList.length; i++) {
        productsTable +=
            `
                    <tr>
                        <td>${i}</td>
                        <td>${productList[i].productName}</td>
                        <td>${productList[i].price}</td>
                        <td>${productList[i].taxes}</td>
                        <td>${productList[i].ads}</td>
                        <td>${productList[i].discount}</td>
                        <td>${productList[i].totalPrice}</td>
                        <td>${productList[i].category}</td>
                        <td><button onClick="updateProductById(${i})" id="update">update</button></td>
                        <td><button onClick="deleteProductById(${i})" id="delete">delete</button></td>
                    </tr>
                    `;
    }
    document.getElementById('tbody').innerHTML = productsTable;
    let deleteAllBtn = document.getElementById('deleteAllBtn');
    if (productList.length > 0) {
        deleteAllBtn.innerHTML = `<button onClick="deleteAllProducts()">Delete all (${productList.length})</button>`;
    } else {
        deleteAllBtn.innerHTML = ``;
    }
}
showProducts();


//* delete product by id and all products
function deleteProductById(productID) {
    productList.splice(productID, 1)
    localStorage.setItem('products', JSON.stringify(productList)); //update local storage 
    showProducts(); //update displayed product table
} 
