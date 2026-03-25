// Library data + constructor
const myLibrary = [];

function Book(title, author, pages, read = false, id = crypto.randomUUID()) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = Boolean(read);
    this.id = id;
}

Book.prototype.toggleRead = function () {
    this.read = !this.read;
};

// DOM refs
const bookListEl = document.getElementById('bookList');
const addButton = document.getElementById('addButton');
const doneButton = document.getElementById('doneButton');
const inputTitle = document.getElementById('book-title');
const inputAuthor = document.getElementById('book-author');
const inputPages = document.getElementById('book-pages');
const inputId = document.getElementById('book-id');
const bookSelect = document.getElementById('book-select');

// Add book factory and helpers
function addBookToLibrary({ title, author, pages, read = false, id } = {}) {
    const book = new Book(title, author, pages, read, id);
    myLibrary.push(book);
    renderLibrary();
    populateSelect();
    return book;
}

function removeBookFromLibrary(id) {
    const idx = myLibrary.findIndex(b => b.id === id);
    if (idx !== -1) myLibrary.splice(idx, 1);
    renderLibrary();
    populateSelect();
}

function findBook(id) {
    return myLibrary.find(b => b.id === id);
}

// Render
function renderLibrary() {
    bookListEl.innerHTML = '';
    const container = document.createElement('div');
    container.className = 'library-container';

    myLibrary.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.dataset.id = book.id;

        // optional image placeholder
        const img = document.createElement('div');
        img.style.height = '120px';
        img.style.background = '#f4f4f7';
        img.style.borderRadius = '6px';
        img.style.display = 'flex';
        img.style.alignItems = 'center';
        img.style.justifyContent = 'center';
        img.textContent = 'Cover';
        card.appendChild(img);

        const title = document.createElement('h2');
        title.textContent = book.title;
        card.appendChild(title);

        const author = document.createElement('p');
        author.textContent = `Author: ${book.author}`;
        card.appendChild(author);

        const pages = document.createElement('p');
        pages.textContent = `Pages: ${book.pages}`;
        card.appendChild(pages);

        const idLine = document.createElement('p');
        idLine.style.fontSize = '12px';
        idLine.style.color = '#999';
        idLine.textContent = `ID: ${book.id}`;
        card.appendChild(idLine);

        const actions = document.createElement('div');
        actions.className = 'card-actions';

        const toggleBtn = document.createElement('button');
        toggleBtn.type = 'button';
        toggleBtn.className = book.read ? 'secondary' : '';
        toggleBtn.textContent = book.read ? 'Read' : 'Not read';
        toggleBtn.dataset.action = 'toggle';
        toggleBtn.dataset.id = book.id;

        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'secondary';
        removeBtn.textContent = 'Remove';
        removeBtn.dataset.action = 'remove';
        removeBtn.dataset.id = book.id;

        actions.appendChild(toggleBtn);
        actions.appendChild(removeBtn);

        card.appendChild(actions);
        container.appendChild(card);
    });

    bookListEl.appendChild(container);
}

// populate select (optional UI)
function populateSelect() {
    if (!bookSelect) return;
    bookSelect.innerHTML = '<option value="">--Please choose an option--</option>';
    myLibrary.forEach(b => {
        const opt = document.createElement('option');
        opt.value = b.id;
        opt.textContent = b.title;
        bookSelect.appendChild(opt);
    });
}

// Event handlers
addButton.addEventListener('click', (e) => {
    e.preventDefault(); // prevents default if this sits inside a form
    const title = inputTitle.value.trim();
    const author = inputAuthor.value.trim();
    const pages = inputPages.value ? Number(inputPages.value) : 0;
    const id = inputId.value.trim() || undefined;

    if (!title || !author) {
        alert('Please provide title and author.');
        return;
    }

    addBookToLibrary({ title, author, pages, read: false, id });
    // clear inputs
    inputTitle.value = '';
    inputAuthor.value = '';
    inputPages.value = '';
    inputId.value = '';
});

doneButton.addEventListener('click', (e) => {
    e.preventDefault();
    // Example 'done' behavior: clear form
    inputTitle.value = '';
    inputAuthor.value = '';
    inputPages.value = '';
    inputId.value = '';
});

// event delegation for toggle/remove
bookListEl.addEventListener('click', (e) => {
    const action = e.target.dataset.action;
    const id = e.target.dataset.id;
    if (!action || !id) return;

    if (action === 'remove') {
        removeBookFromLibrary(id);
    } else if (action === 'toggle') {
        const book = findBook(id);
        if (book) {
            book.toggleRead();
            renderLibrary();
            populateSelect();
        }
    }
});

// add some sample books to start with
addBookToLibrary({ title: 'The Hobbit', author: 'J.R.R. Tolkien', pages: 310, read: true });
addBookToLibrary({ title: '1984', author: 'George Orwell', pages: 328, read: false });
addBookToLibrary({ title: 'Clean Code', author: 'Robert C. Martin', pages: 464, read: true });

// initial render
renderLibrary();
populateSelect();