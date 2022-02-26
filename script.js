const library = document.querySelector('.library')

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
}

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

function displayLibrary() {
    for (let i = 0; i < myLibrary.length; i++) {
        let book = myLibrary[i];
        // create book card
        const bookCard = document.createElement('div');
        const bookInfoContainer = document.createElement('div');
        const titleLabel = document.createElement('div');
        const authorLabel = document.createElement('div');
        const pagesLabel = document.createElement('div');
        const cardButtonsContainer = document.createElement('div')
        const readButton = document.createElement('button');
        const removeButton = document.createElement('button')

        bookCard.classList.add('book-card');
        titleLabel.classList.add('title');
        removeButton.classList.add('remove-button');
        readButton.classList.add('read-button');
        
        // add listeners to read button  and remove button
        readButton.onclick = () => clickReadButton(book);
        removeButton.onclick = () => removeBook(i);

        // set book card values
        titleLabel.innerText = "\"" + book.title + "\"";
        authorLabel.innerText = book.author;
        pagesLabel.innerText = book.pages + ' pages';
        if(book.read) {
            readButton.innerText = 'Read';
            readButton.style.backgroundColor = '#d4ffd4';
        } else {
            readButton.innerText = 'Not read';
            readButton.style.backgroundColor = '#ffcccc';
        }
        removeButton.innerText = 'Remove';
        
        bookInfoContainer.appendChild(titleLabel);
        bookInfoContainer.appendChild(authorLabel);
        bookInfoContainer.appendChild(pagesLabel);
        cardButtonsContainer.appendChild(readButton);
        cardButtonsContainer.appendChild(removeButton);

        bookCard.appendChild(bookInfoContainer);
        bookCard.appendChild(cardButtonsContainer);

        // append book card to document
        library.appendChild(bookCard);
    }
}

function clickReadButton(book) {
    book.toggleRead();
    clearDisplay();
    displayLibrary();
}

// remove book from library and redraw library onto display
function removeBook(index) {
    console.log(index);
    myLibrary.splice(index, 1);
    clearDisplay();
    displayLibrary();
}

function submitBook() {
    // get input elements
    const title = document.querySelector('#title');
    const author = document.querySelector('#author');
    const pages = document.querySelector('#pages');
    const read = document.querySelector('#read');

    addBookToLibrary(title.value, author.value, pages.value, read.checked);
    clearDisplay();
    displayLibrary();

    // close form
    modal.style.display = "none";

    // clear form
    title.value = null;
    author.value = null;
    pages.value = null;
    read.checked = false;
}

function clearDisplay () {
    while (library.lastChild) {
        library.removeChild(library.lastChild);
    }
}

const addBookBtn = document.querySelector('#add-book');
const modal = document.querySelector('.modal');

// add event listener to add-book button that displays form
addBookBtn.onclick = function() {
    modal.style.display = "block";
}

// closes form when clicking on the modal background
window.onmousedown = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}

const form = document.querySelector('form');
form.onsubmit = submitBook;

addBookToLibrary('The Hobbit', 'J. R. R. Tolkien', 310, false);
addBookToLibrary('Lord of the Flies', 'William Golding', 224, true);
addBookToLibrary('Nineteen Eighty-Four', 'George Orwell', 328, false);

displayLibrary()