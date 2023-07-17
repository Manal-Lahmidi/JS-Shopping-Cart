/* Image Filter Section: displaying content based on the selected filter button */

const allFilterItems = document.querySelectorAll('.filter-item');
const allFilterBtns = document.querySelectorAll('.filter-btn');

window.addEventListener('DOMContentLoaded', () => {
    allFilterBtns[1].classList.add('active-btn');
});/*it sets the active-btn class on the second filter button (allFilterBtns[1]) to highlight it as the initially active button */

allFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        showFilteredContent(btn);
    });
});

function showFilteredContent(btn){
    allFilterItems.forEach((item) => {
        if(item.classList.contains(btn.id)){
            resetActiveBtn();
            btn.classList.add('active-btn');
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}

function resetActiveBtn(){
    allFilterBtns.forEach((btn) => {
        btn.classList.remove('active-btn');
    });
}


/* Shopping Cart Section */

if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded' , ready);
}

else{
    ready();
}


// this function is the main entry point for setting up the shopping cart functionality.
//It is called when the DOM is loaded and sets up event listeners for various actions related to the shopping cart
function ready(){
    var removeCartItemButton = document.getElementsByClassName('btn-danger');
    for (var i = 0 ; i < removeCartItemButton.length; i++){
        var button = removeCartItemButton[i];
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for(var i = 0 ;i < quantityInputs.length ; i++){
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }
    
    var addToCartButtons = document.getElementsByClassName('shop-item-button');
    for(var i = 0; i< addToCartButtons.length; i++){
        var button = addToCartButtons[i];
        button.addEventListener('click',addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}


function purchaseClicked(){
     alert('Thank you for your purchase !');
     var cartItems = document.getElementsByClassName('cart-items')[0];
     while(cartItems.hasChildNodes()){
         cartItems.removeChild(cartItems.firstChild)
     }
     updateCartTotal();
}/*clear the shopping cart section and the total when we click on purchase button*/

function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();/*The first parentElement moves up to the <td> element, and the second parentElement moves up to the <tr> element that represents the entire cart row*/
    updateCartTotal();
    
}

function  quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0 ){
        input.value = 1;
    }
    updateCartTotal();
}


function addToCartClicked(event){
    var button = event.target;
    var shopItem = button.parentElement.parentElement;/*The first parentElement moves up to the <td> element containing the button, and the second parentElement moves up to the <div> or <section> element that represents the shop item container*/ 
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
    addItemToCart(title,price,imageSrc);
    updateCartTotal();
}

function addItemToCart(title, price, imageSrc){
    var cartRow = document.createElement('tr');
    cartRow.classList.add('cart-row');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title');

    for (i = 0; i< cartItemNames.length ; i++){
        if(cartItemNames[i].innerText == title){
            alert('This item already exists in the cart!');
            return;
        }
    }
    var cartRowContents = `

        <td class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="50" height="50">
            <span class="cart-item-title">${title}</span>                  
        </td>
        <td class="cart-item cart-column">
            <span class="cart-price cart-column">${price}</span>
        </td>
        <td class="cart-item cart-column">
            <input class="cart-quantity-input" type="number" value="1" style="width: 3rem">
            <br><br>
            <button class="btn btn-danger" type="button">Remove</button>
        </td>        
    `;
     
            
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}


function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;
    for (var i = 0 ; i< cartRows.length ; i++){
        var cartRow =cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(priceElement.innerText.replace('DHs ' , ''))
        var quantity = quantityElement.value;
        total = total + (price * quantity);
         
    }
    total = Math.round(total * 100 )/100;
    document.getElementsByClassName('cart-total-price')[0].innerText = 'DHs '+ total + '.00';
 
}