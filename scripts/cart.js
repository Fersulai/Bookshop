import {books} from "./data.js";
import { formatCurrency } from "./utils.js";

export let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartCountElement = document.querySelector(".cart-count");
const cartItemsElement = document.querySelector(".cart-items");
const totalCostElement = document.querySelector(".js-total-cost");

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

function removeFromCart(bookId){
    cart = cart.filter((item) => item.bookId !== bookId)
    saveToStorage();
    renderCartItems();
    updateCartQuantity();
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


                <p class="unit-price">
                    Item price: $${formatCurrency(book.priceCents)}
                </p>

                <p class="stock">
                    Available
                </p>

                <button class="remove-button js-remove-button" data-id="${book.id}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash preview-icon"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                </button>
            </div>

            <input class="quantity" type="number" value="${item.quantity}" min="1">

            <p>
                $${formatCurrency(book.priceCents)}
            </p>


        </div>
        `

    });
    cartItemsElement.innerHTML = html;
    totalCostElement.innerHTML = `
        <div class="order-summary">
            <h3> Order Summary </h3>

            <div class="subtotal-section">
                <p>
                    Subtotal (2 items)
                </p>

                <p>
                    $${calculateTotalPrice()}
                </p>
            </div>

            <div class="shipping-section">
                <p>
                    Shipping
                </p>

                <p>
                    Calculated at checkout
                </p>
            </div>

            <div class="total-price-section">
                <p>
                    Total
                </p>
                <p>
                    $${calculateTotalPrice()}
                </p>
            </div>

            <button>
                Proceed to Checkout
            </button>

            <a href="books.html">
                Continue Shopping
            </a>
        </div>

    `;
}

function calculateTotalPrice(){
    let total = 0;
    cart.forEach((item) =>{
        const book = books.find((book) => item.bookId === book.id);
        total += book.priceCents * item.quantity;
    });
    return formatCurrency(total);
}
updateCartQuantity();

if(cartItemsElement){
    renderCartItems();
    cartItemsElement.addEventListener('click', (event)=>{
        const button = event.target.closest('.js-remove-button');
        if(!button){
            return;
        }
        removeFromCart(Number(button.dataset.id));
    });
};


