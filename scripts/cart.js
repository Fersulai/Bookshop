import {books} from "./data.js";

export let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartCountElement = document.querySelector(".cart-count");
const cartItemsElement = document.querySelector(".cart-items");

function saveToStorage(){
    localStorage.setItem("cart", JSON.stringify(cart));

}

export function addToCart(bookId){
    let matchingItem;
    cart.forEach((item)=>{
        if(item.bookId === bookId){
            matchingItem = item;
        }
    });
    if(matchingItem){
    matchingItem.quantity += 1;
    }
    else{
        cart.push({bookId, quantity: 1});
    }
    updateCartQuantity();
    saveToStorage();
};

export function getCartQuantity(){
    let total = 0;
    cart.forEach((item) =>{
        total += item.quantity
    });
    return total;
}

export function updateCartQuantity(){
    cartCountElement.textContent = getCartQuantity();
}



function renderCartItems(){
    let html = "";
    cart.forEach((item)=>{
        const book = books.find((book) => item.bookId === book.id);
        html += `
        <div class="cart-item"> 
            <img src="${book.image}" class="book-image">
            <div class="book-info"> 
                <p class="book-title">
                    ${book.title}
                </p>

                <p class="book-author">
                    ${book.author}
                </p>

                <p class="publish-date">
                    2007    
                </p>

                <p class="page-number">
                    ### Pages
                </p>

                <p class="book-language">
                    English
                </p>

                <p class="stock">
                    Available
                </p>
            </div>

            <input class="quantity" type="number" value="${item.quantity}" min="1">

            <p>
                ${book.priceCents}
            </p>


        </div>
        `

    });
    cartItemsElement.innerHTML = html;
}

updateCartQuantity();
if(cartItemsElement){
    renderCartItems();
}
