let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let createBtn = document.getElementById("submit");
let mood = "create";
let tmp;
// get price total
function getTotalPrice(){
    if(price.value != ""){
        let result = (+price.value + +taxes.value + +ads.value) 
        - +discount.value;
        total.innerHTML = result;
        total.style.cssText = `
        background-color:green;
        padding:12px;
        font-size:18px;
        border-radius:5px;
        `    
    }
    else{
        total.innerHTML = "";
        total.style.cssText = `
        background-color: #a855f7;
        padding:12px;
        font-size:18px;
        border-radius:5px;    `
    }
}

// create product , save local storage , count, clean data
let dataProduct;
if(localStorage.product != null){
    dataProduct = JSON.parse(localStorage.product)
}
else{
    dataProduct = [];
}
createBtn.onclick = function(){
    let newProduct = {
        title:title.value.toUpperCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toUpperCase()
    }   
    if(title.value != "" 
        && price.value != ""
        && category.value != ""
        && newProduct.count < 100){
        if(mood === "create"){
        if(newProduct.count > 1){
            for(let i = 0; i < newProduct.count; i++){
                dataProduct.push(newProduct);
            }
        }else{
            dataProduct.push(newProduct);
        }
    }else{
        dataProduct[tmp] = newProduct;
        count.style.display = "block";
        mood = "create";
        createBtn.innerHTML = "create";
    }
    clearInputs();
}
    localStorage.setItem("product" , JSON.stringify(dataProduct));
    showData();
    getTotalPrice();
}

// clear inputs
function clearInputs(){
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}

// read data
function showData(){
    let table = "";
    for(let i = 0; i < dataProduct.length; i++){
        table += `
        <tr>
        <td data-label="Id">${i+1}</td>
        <td data-label="Title">${dataProduct[i].title}</td>
        <td data-label="Price">${dataProduct[i].price}</td>
        <td data-label="Taxes">${dataProduct[i].taxes}</td>
        <td data-label="Ads">${dataProduct[i].ads}</td>
        <td data-label="Discount">${dataProduct[i].discount}</td>
        <td data-label="Total">${dataProduct[i].total}</td>
        <td data-label="Count">${dataProduct[i].count}</td>
        <td data-label="Category">${dataProduct[i].category}</td>
        <td><button onclick="updateData(${i})">update</button></td>
        <td><button onclick="deleteData(${i})">delete</button></td>
        </tr>
        `
    }
    document.getElementById("tbody").innerHTML = table;
    let deleteBtn = document.getElementById("deleteAll");
    deleteBtn.innerHTML = `Delete All  (${dataProduct.length})`;
    if(dataProduct.length > 0){
        deleteBtn.style.display = "block";
    }else{
        deleteBtn.style.display = "none";
    }
};
showData();

// delete data
function deleteData(i){
    dataProduct.splice(i,1);
    localStorage.product = JSON.stringify(dataProduct);
    showData();
};

// deleteAll data
function deleteAll(){
    localStorage.clear();
    dataProduct.splice(0);
    showData();
};

// update data
function updateData(i){
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    taxes.value = dataProduct[i].taxes;
    ads.value = dataProduct[i].ads;
    discount.value = dataProduct[i].discount;
    category.value = dataProduct[i].category;
    getTotalPrice();
    count.style.display = "none";
    createBtn.innerHTML = "Update";
    mood = "update";
    tmp = i;
    scroll({
        top:0,
        behavior:"smooth",
    })
}

// search data
let searchMood = "title";
let searchInput = document.getElementById("search");
function getsearchMood(id){
    if(id === "searchTitle"){
        searchMood = "title";
    }
    else{
        searchMood = "category";
    }
    searchInput.focus();
    searchInput.placeholder = "search by " + searchMood;
    searchInput.value = "";
    showData();
};

function searchData(value){
    let table = "";
    for(let i = 0; i < dataProduct.length; i++){
        if(dataProduct[i].title.includes(value)){
            table += `
                <tr>
                <td>${i}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].count}</td>
                <td>${dataProduct[i].category}</td>
                <td><button onclick="updateData(${i})">update</button></td>
                <td><button onclick="deleteData(${i})">delete</button></td>
                </tr>
            `
        }
        else if(dataProduct[i].category.includes(value)){
            table += `
                <tr>
                <td>${i}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].count}</td>
                <td>${dataProduct[i].category}</td>
                <td><button onclick="updateData(${i})">update</button></td>
                <td><button onclick="deleteData(${i})">delete</button></td>
                </tr>
            `
        }
    }
    document.getElementById("tbody").innerHTML = table;   
}


