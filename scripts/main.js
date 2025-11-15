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
    
    //? save local Storage
    localStorage.setItem('products', JSON.stringify(productList));

   //todo: clearInputs(); //clear input fields
  //todo: showProducts(); //show products
}