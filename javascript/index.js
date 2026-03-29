document.addEventListener('DOMContentLoaded', () => {
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

  // DOM refs (queried after DOM is ready)
  const bookListEl = document.getElementById('bookList');
  const bookDetailsEl = document.getElementById('bookDetails');
  const addButton = document.getElementById('addButton');
  const doneButton = document.getElementById('doneButton');
  const newBookButton = document.getElementById('newBookButton');
  const formEl = document.querySelector('.form');
  const inputTitle = document.getElementById('book-title');
  const inputAuthor = document.getElementById('book-author');
  const inputPages = document.getElementById('book-pages');
  const inputId = document.getElementById('book-id');
  const bookSelect = document.getElementById('book-select');

  // sanity checks
  if (!bookListEl || !bookSelect) {
    console.error('Required DOM elements missing: bookList or bookSelect.');
    return;
  }

  // Add book factory and helpers
  function addBookToLibrary({ title, author, pages, read = false, id } = {}) {
    let bookId = id ? String(id) : undefined;
    if (!bookId || myLibrary.some(b => b.id === bookId)) {
      if (bookId) console.warn('Provided id already exists — generating a new unique id.');
      bookId = crypto.randomUUID();
    }

    const book = new Book(title, author, pages, read, bookId);
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

  // Render helpers
  function renderLibrary() {
    bookListEl.innerHTML = '';
    const container = document.createElement('div');
    container.className = 'library-container';

    myLibrary.forEach(book => {
      const card = document.createElement('div');
      card.className = 'book-card';
      card.dataset.id = book.id;

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

  function renderBookDetails(book) {
    if (!bookDetailsEl) return;
    bookDetailsEl.innerHTML = '';
    if (!book) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'book-card';
    wrapper.dataset.id = book.id;

    const title = document.createElement('h2');
    title.textContent = book.title;
    wrapper.appendChild(title);

    const author = document.createElement('p');
    author.textContent = `Author: ${book.author}`;
    wrapper.appendChild(author);

    const pages = document.createElement('p');
    pages.textContent = `Pages: ${book.pages}`;
    wrapper.appendChild(pages);

    const idLine = document.createElement('p');
    idLine.style.fontSize = '12px';
    idLine.style.color = '#999';
    idLine.textContent = `ID: ${book.id}`;
    wrapper.appendChild(idLine);

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
    wrapper.appendChild(actions);

    bookDetailsEl.appendChild(wrapper);
  }

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

  // Shared handler for book actions (toggle/remove)
  function handleBookAction(event) {
    const button = event.target.closest('button');
    if (!button) return;
    const action = button.dataset.action;
    const id = button.dataset.id;
    if (!action || !id) return;

    if (action === 'remove') {
      removeBookFromLibrary(id);
      if (bookSelect.value === id) {
        bookSelect.value = '';
        if (bookDetailsEl) bookDetailsEl.innerHTML = '';
      }
    } else if (action === 'toggle') {
      const book = findBook(id);
      if (book) {
        book.toggleRead();
        renderLibrary();
        populateSelect();
        if (bookDetailsEl && bookDetailsEl.querySelector(`[data-id="${id}"]`)) renderBookDetails(book);
      }
    }
  }

  // Event handlers with guards
  if (newBookButton && formEl) {
    newBookButton.addEventListener('click', () => {
      formEl.style.display = '';
      inputTitle.value = '';
      inputAuthor.value = '';
      inputPages.value = 1;
      inputId.value = '';
      inputTitle.focus();
    });
  }

  if (addButton && formEl) {
    addButton.addEventListener('click', (e) => {
      e.preventDefault();
      const title = inputTitle.value.trim();
      const author = inputAuthor.value.trim();
      const pages = inputPages.value ? Number(inputPages.value) : 0;
      const id = inputId.value.trim() || undefined;

      if (!title || !author) {
        alert('Please provide title and author.');
        return;
      }

      const newBook = addBookToLibrary({ title, author, pages, read: false, id });

      formEl.style.display = 'none';
      inputTitle.value = '';
      inputAuthor.value = '';
      inputPages.value = '';
      inputId.value = '';

      if (bookSelect) {
        bookSelect.value = newBook.id;
        renderBookDetails(newBook);
      }
    });
  }

  if (doneButton && formEl) {
    doneButton.addEventListener('click', (e) => {
      e.preventDefault();
      formEl.style.display = 'none';
      inputTitle.value = '';
      inputAuthor.value = '';
      inputPages.value = '';
      inputId.value = '';
    });
  }

  if (bookSelect) {
    bookSelect.addEventListener('change', (e) => {
      const id = e.target.value;
      if (!id) {
        if (bookDetailsEl) bookDetailsEl.innerHTML = '';
        return;
      }
      const book = findBook(id);
      renderBookDetails(book);
    });
  }

  if (bookListEl) bookListEl.addEventListener('click', handleBookAction);
  if (bookDetailsEl) bookDetailsEl.addEventListener('click', handleBookAction);

  // initial render
  renderLibrary();
  populateSelect();
});