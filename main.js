let productName=document.getElementById("productName");
let productPrice=document.getElementById("productPrice");
let productCategory=document.getElementById("productCategory");
let productDesc=document.getElementById("productDesc");

let productContainer;

if(localStorage.getItem("products")===null){
    productContainer=[];
}
else{
    productContainer=JSON.parse(localStorage.getItem("products"));
    displayProducts();
}

function addProduct(){

    if(checkInputs()){
        let product={
            name:productName.value,
            price:productPrice.value,
            cat:productCategory.value,
            desc:productDesc.value,
        }
        productContainer.push(product);
        localStorage.setItem("products",JSON.stringify(productContainer));
        console.log(productContainer);
        clear();
       displayProducts();
    }
    else{
        alert("sorry all fields are required");
    }
  
}

function clear(){
    productName.value="";
    productPrice.value="";
    productCategory.value="";
    productDesc.value="";
}

function displayProducts(){

    let cartoona=``;
    for(let i=0;i<productContainer.length;i++){
        cartoona+= ` <tr>
        <td>${i}</td>
        <td>${productContainer[i].name}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].cat}</td>
        <td>${productContainer[i].desc}</td>
        <td> <button onclick="updateProduct(${i})" class="btn btn-outline-warning">update</button></td>
        <td> <button onclick="deleteProduct(${i})"class="btn btn-outline-danger">delete</button></td>
    </tr>`
    }
    document.getElementById("content").innerHTML=cartoona;

}

function checkInputs(){

    if(productName.value==="" || productPrice.value=== "" || 
       productCategory.value==="" || productDesc.value===""){

        return false;
       }
       else{
           return true;
       }
}

function deleteProduct(index){
    productContainer.splice(index,1);
    localStorage.setItem("products",JSON.stringify(productContainer));
    displayProducts();
}

function searchProducts(searchTerm){
    let cartoona=``;

    for(let i=0;i<productContainer.length;i++){
        if( productContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase()) ==true){
        cartoona+= ` <tr>
        <td>${i}</td>
        <td>${productContainer[i].name}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].cat}</td>
        <td>${productContainer[i].desc}</td>
        <td> <button class="btn btn-outline-warning">update</button></td>
        <td> <button onclick="deleteProduct(${i})"class="btn btn-outline-danger">delete</button></td>
    </tr>`
    }

}
document.getElementById("content").innerHTML=cartoona;

}

function updateProduct(index){
    productName.value=productContainer[index].name;
    productPrice.value=productContainer[index].price;
    productCategory.value=productContainer[index].cat;
    productDesc.value=productContainer[index].desc;

    document.getElementById("update").style="display:block";
    document.getElementById("add").style="display:none";
    update=index;
    
}

function updateproductContent(){

   productContainer[update].name=  productName.value;
   productContainer[update].price= productPrice.value;
   productContainer[update].cat=  productCategory.value;
   productContainer[update].desc= productDesc.value;

   document.getElementById("update").style="display:none";
   document.getElementById("add").style="display:block";
   displayProducts();

}