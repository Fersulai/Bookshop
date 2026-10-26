import {books} from "./data.js";
import {formatCurrency} from "./utils.js";

function renderBooks(books) {
    let html = "";
    const featuredBooks = books.filter((book) => book.featured)
    featuredBooks.forEach(book => {
    html += `
        <div class="book-card">
            <div class="book-image-container">
                <a href="checkout.html?id=${book.id}"> 
                    <img src="${book.image}" alt="${book.title}" class="book-image">
                </a>
            </div>
            <a class="book-title" href="checkout.html?id=${book.id}">
                ${book.title}
            </a>
            <p class="book-author">
                by ${book.author}
            </p>

            <p class="book-rating">
                ${book.rating}
            </p>

            <p class="book-price">
                $${formatCurrency(book.priceCents)}
            </p>
        </div>
    `;
    })

    document.querySelector(".featured-books-content").innerHTML = html;
}

renderBooks(books);