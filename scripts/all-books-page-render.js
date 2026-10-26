import {books} from "./data.js";
import {formatCurrency} from "./utils.js";

const checkboxes = document.querySelectorAll(".category-options input");
const bookGrid = document.querySelector(".book-grid");

const filterToggle = document.querySelector(".filter-toggle");
const sidebar = document.querySelector("#filters");

filterToggle.addEventListener("click", () => {
    const isOpen = sidebar.classList.toggle("open");
    filterToggle.setAttribute("aria-expanded", isOpen);
    filterToggle.textContent = isOpen ? "Hide filters" : "Filters";
});

function renderBooks(bookList) {
    let html = "";
    bookList.forEach(book => {
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
    bookGrid.innerHTML = html;

};

function getFilteredBooks() {
    let checkedGenres = Array.from(checkboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
    if(checkedGenres.length === 0){
        return books
    }
    // return books.filter(book => book.genres.some(genre => checkedGenres.includes(genre.toLowerCase())));
    return books.filter(book => checkedGenres.every(checked => book.genres.map(genre => genre.toLowerCase()).includes(checked)));
}




checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
        renderBooks(getFilteredBooks());
    })
});

renderBooks(getFilteredBooks());


const bookCardElement = document.querySelector('.book-card');

