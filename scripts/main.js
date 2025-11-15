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

let mode = 'create'; //init app mode (will be create by default and change when click update)
let tempId;

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
        productName: productName.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        totalPrice: totalPrice.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    };

    if (productName.value != '' && price.value != '' && category.value != '') {
        if (mode == 'create') {
            // meaning that we will create new product
            if (count.value > 1) {
                for (let i = 0; i < count.value; i++) {
                    productList.push(newProduct);
                }
            } else {
                productList.push(newProduct);
            }
        } else {
            // meaning that we will update existing product
            productList[tempId] = newProduct;
            switchToCreateMode();
        }
        clearInputs(); //clear input fields
    }

    //? save to local Storage
    localStorage.setItem('products', JSON.stringify(productList));

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
    getTotalPrice(); //update total price
    let productsTable = '';
    for (let i = 0; i < productList.length; i++) {
        productsTable +=
            `
                    <tr>
                        <td>${i+1}</td>
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

    // display delete All Button dynamically
    let deleteAllBtn = document.getElementById('deleteAllBtn');
    if (productList.length > 0) {
        deleteAllBtn.innerHTML = `<button onClick="deleteAllProducts()">Delete all (${productList.length})</button>`;
    } else {
        deleteAllBtn.innerHTML = ``;
    }
}
showProducts();


//* delete product by id
function deleteProductById(productID) {
    productList.splice(productID, 1)
    localStorage.setItem('products', JSON.stringify(productList)); //update local storage 
    showProducts(); //update displayed product table
}


//* delete all products
function deleteAllProducts() {
    localStorage.clear(); //clear local storage
    productList.splice(0); //clear product list
    showProducts(); //update displayed product table
}


//* update product by id
function updateProductById(productID) {
    tempId = productID;
    loadProductIntoFormToUpdate(productList[productID]);
    switchToUpdateMode();
    scroll({
        top: 0, //scroll page to most top
        behavior: 'smooth'
    });
}
function loadProductIntoFormToUpdate(product) {
    productName.value = product.productName;
    price.value = product.price;
    taxes.value = product.taxes;
    ads.value = product.ads;
    discount.value = product.discount;
    getTotalPrice();
    category.value = product.category;
    count.style.display = 'none';
}
function switchToUpdateMode() {
    mode = 'update'
    create.innerHTML = 'Update'
}
function switchToCreateMode() {
    mode = 'create'
    create.innerHTML = 'Create'
    count.style.display = 'block';
}

//* search for product
let searchMode = 'name'; //default search mode

function getSearchMode(btnId) {
    let searchInput = document.getElementById('search');
    if (btnId == 'searchCategoty') {
        searchMode = 'category';
        searchInput.placeholder = 'Enter category to search';
    }
    else {
        searchMode = 'name';
        searchInput.placeholder = 'Enter product name to search';
    }
    searchInput.focus(); // focus serch field when click on any search button

    if (searchInput.value != '') {
        search(searchInput.value);
    }
}

function search(value) {
    let searchTable = '';
    if (searchMode == 'name') {
        for (let i = 0; i < productList.length; i++) {
            if (productList[i].productName.includes(value.toLowerCase())) {
                searchTable +=
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
        }
    } else {
        for (let i = 0; i < productList.length; i++) {
            if (productList[i].category.includes(value.toLowerCase())) {
                searchTable +=
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
        }
    }
    document.getElementById('tbody').innerHTML = searchTable;
}