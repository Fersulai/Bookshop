import {books} from "./data.js";
import {addToCart} from "./cart.js";

const params = new URLSearchParams(window.location.search);
const bookId = params.get("id");

const book = books.find(book => book.id === Number(bookId));

const bookDetailsElement = document.querySelector('.book-details');
const bookImageElement = document.querySelector('.book-image');

const buyButtonElement = document.querySelector('.js-buy-button');

function renderBooks() {
    let html = "";

    html += `
        <h2 class="book-title">
            ${book.title}
        </h2>
        <p class="book-author">
            ${book.author}
        </p>
        <p class="rating">
            ${book.rating}
        </p>

        <div class="book-genres">
            ${book.genres.map(genre => `
                <span class="genre-tag">${genre}</span>
            `).join("")}
        </div>

        <p class="book-synopsis">
            ${book.synopsis}
        </p>

        <p class="book-price">
            $${formatCurrency(book.priceCents)}
        </p>
    `;
    bookDetailsElement.innerHTML = html;
    bookImageElement.src = `${book.image}`;

};

function formatCurrency(priceCents){
    return (priceCents / 100).toFixed(2);
}

renderBooks()

buyButtonElement.addEventListener('click', () =>{
    addToCart(book.id);
});
