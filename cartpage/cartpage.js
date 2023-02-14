// /* get cart total from session on load */
// updateCartTotal();

// /* button event listeners */
// document.getElementById("emptycart").addEventListener("click", emptyCart);
// var btns = document.getElementsByClassName('addtocart');
// for (var i = 0; i < btns.length; i++) {
//     btns[i].addEventListener('click', function() {addToCart(this);});
// }

// /* ADD TO CART functions */

// function addToCart(elem) {
//     //init
//     var sibs = [];
//     var getprice;
//     var getproductName;
//     var cart = [];
//      var stringCart;
//     //cycles siblings for product info near the add button
//     while(elem = elem.previousSibling) {
//         if (elem.nodeType === 3) continue; // text node
//         if(elem.className == "price"){
//             getprice = elem.innerText;
//         }
//         if (elem.className == "productname") {
//             getproductName = elem.innerText;
//         }
//         sibs.push(elem);
//     }
//     //create product object
//     var product = {
//         productname : getproductName,
//         price : getprice
//     };
//     //convert product data to JSON for storage
//     var stringProduct = JSON.stringify(product);
//     /*send product data to session storage */
    
//     if(!sessionStorage.getItem('cart')){
//         //append product JSON object to cart array
//         cart.push(stringProduct);
//         //cart to JSON
//         stringCart = JSON.stringify(cart);
//         //create session storage cart item
//         sessionStorage.setItem('cart', stringCart);
//         addedToCart(getproductName);
//         updateCartTotal();
//     }
//     else {
//         //get existing cart data from storage and convert back into array
//        cart = JSON.parse(sessionStorage.getItem('cart'));
//         //append new product JSON object
//         cart.push(stringProduct);
//         //cart back to JSON
//         stringCart = JSON.stringify(cart);
//         //overwrite cart data in sessionstorage 
//         sessionStorage.setItem('cart', stringCart);
//         addedToCart(getproductName);
//         updateCartTotal();
//     }
// }
// /* Calculate Cart Total */
// function updateCartTotal(){
//     //init
//     var total = 0;
//     var price = 0;
//     var items = 0;
//     var productname = "";
//     var carttable = "";
//     if(sessionStorage.getItem('cart')) {
//         //get cart data & parse to array
//         var cart = JSON.parse(sessionStorage.getItem('cart'));
//         //get no of items in cart 
//         items = cart.length;
//         //loop over cart array
//         for (var i = 0; i < items; i++){
//             //convert each JSON product in array back into object
//             var x = JSON.parse(cart[i]);
//             //get property value of price
//             price = parseFloat(x.price.split('$')[1]);
//             productname = x.productname;
//             //add price to total
//             carttable += "<tr><td>" + productname + "</td><td>$" + price.toFixed(2) + "</td></tr>";
//             total += price;
//         }
        
//     }
//     //update total on website HTML
//     document.getElementById("total").innerHTML = total.toFixed(2);
//     //insert saved products to cart table
//     document.getElementById("carttable").innerHTML = carttable;
//     //update items in cart on website HTML
//     document.getElementById("itemsquantity").innerHTML = items;
// }
// //user feedback on successful add
// function addedToCart(pname) {
//   var message = pname + " was added to the cart";
//   var alerts = document.getElementById("alerts");
//   alerts.innerHTML = message;
//   if(!alerts.classList.contains("message")){
//      alerts.classList.add("message");
//   }
// }
// /* User Manually empty cart */
// function emptyCart() {
//     //remove cart session storage object & refresh cart totals
//     if(sessionStorage.getItem('cart')){
//         sessionStorage.removeItem('cart');
//         updateCartTotal();
//       //clear message and remove class style
//       var alerts = document.getElementById("alerts");
//       alerts.innerHTML = "";
//       if(alerts.classList.contains("message")){
//           alerts.classList.remove("message");
//       }
//     }
// }






let addToCartButtons = document.getElementsByClassName('btn-primary')
let cartContainer = document.getElementsByTagName('tbody')[0]
let quantityFields = document.getElementsByClassName('num')
let delete_buttons = document.getElementsByClassName('uk-button-danger')

// picking up all the Add-To-Cart buttons
for(let i = 0; i < addToCartButtons.length; i++){
    addToCartButtons[i].addEventListener('click', addToCart)
    
}
// This function helps to add items to our cart
function addToCart(event){

    
    let itemContainer = document.createElement('tr')
    let btn = event.target
    let btnGrandParent = btn.parentElement.parentElement
    let btnParent = btn.parentElement
    let itemImage = btnGrandParent.children[0].src
    let itemName = btnParent.children[0].innerText
    let itemPrice = btnParent.children[1].innerText
    
    
    itemContainer.innerHTML = `
    <td><input class="uk-checkbox" type="checkbox"></td>
    <td><img class="uk-preserve-width uk-border-circle" src=${itemImage} width="40" alt=""></td>
    <td class="uk-table-link">
        <h3 class = "item-name">${itemName}</h3>
    </td>
    <td class="uk-text-truncate item-price"><h3>${itemPrice}</h3></td>
    <td><input type = 'number' class = 'num' value = '1'></td>
    <td class="uk-text-truncate total-price"><h3>${itemPrice}</h3></td>
    <td><button class="uk-button uk-button-danger" type="button">Remove</button></td>
`

    cartContainer.append(itemContainer)




    // Accessing individual quantity fields
    for(let i = 0; i < quantityFields.length; i++){
        quantityFields[i].value = 1
        quantityFields[i].addEventListener('change', totalCost)
                
    }

    // Accessing individual quantity fields
    for(let i = 0; i < delete_buttons.length; i++){
        delete_buttons[i].addEventListener('click', removeItem)
    }

    grandTotal()

   
}



// This function helps to multiply the quantity and the price
function totalCost(event){
    let quantity = event.target
    quantity_parent = quantity.parentElement.parentElement
    price_field = quantity_parent.getElementsByClassName('item-price')[0]
    total_field = quantity_parent.getElementsByClassName('total-price')[0]
    price_field_content = price_field.innerText.replace('$', '')
    total_field.children[0].innerText = '$' +  quantity.value * price_field_content
    grandTotal()
    if(isNaN(quantity.value)|| quantity.value <= 0){
        quantity.value = 1
    }

    
    
}

// This function helps to add up the total of the items
function grandTotal(){
    let total = 0
    let grand_total = document.getElementsByClassName('grand-total')[0]
    all_total_fields = document.getElementsByClassName('total-price')
    for(let i = 0; i < all_total_fields.length; i++){
        all_prices = Number(all_total_fields[i].innerText.replace('$', ''))
        total+=all_prices
    }
    grand_total.children[0].innerText = "$"+total
    grand_total.children[0].style.fontWeight = 'bold'
    console.log(total)
}


function removeItem(event){
    del_btn = event.target
    del_btn_parent = del_btn.parentElement.parentElement
    del_btn_parent.remove()
    console.log(del_btn)
    grandTotal()
    
}