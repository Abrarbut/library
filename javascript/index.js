// Array to store books
const myLibrary = [];

// Book Constructor
function Book(title, author, pages, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.id = id || crypto.randomUUID();
}

// Function to add book to library
function addBookToLibrary(title, author, pages, id) {
  const newBook = new Book(title, author, pages, id);
  myLibrary.push(newBook);
}

// Get HTML elements
const titleInput = document.getElementById("book-title");
const authorInput = document.getElementById("book-author");
const pagesInput = document.getElementById("book-pages");
const idInput = document.getElementById("book-id");
const doneButton = document.getElementById("doneButton");
const bookListDiv = document.getElementById("bookList");
const bookselect = document.getElementById("book-select");


// function to display books in options



// When user clicks "Done" button
doneButton.addEventListener("click", function() {
  // Get values from input fields
  const title = titleInput.value;
  const author = authorInput.value;
  const pages = pagesInput.value;
  const id = idInput.value;
  // Check if all fields have values
  if (title && author && pages || id) {
    // Add book to library
    addBookToLibrary(title, author, pages, id);
    
    // Clear input fields
    titleInput.value = title;
    authorInput.value = author;
    pagesInput.value = pages;
    idInput.value = "";

    // Display the books
    displayBooks();
    displayBookOptions();
  } else {
    alert("Please fill in all fields!");
  }
});

// Function to display all books
function displayBooks() {
  bookListDiv.innerHTML = "";
  
  myLibrary.forEach((book) => {
    const bookDiv = document.createElement("div");
    bookDiv.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>id: ${book.id}</p>
    `;
    bookListDiv.appendChild(bookDiv);
  });
}
// function for the book options
function displayBookOptions() {
  // Preserve the default HTML option (placeholder) if it exists
  const placeholder = bookselect.querySelector('option[disabled]') || bookselect.querySelector('option[value=""]');
  bookselect.innerHTML = "";

  if (placeholder) {
    bookselect.appendChild(placeholder);
  }

  myLibrary.forEach((book) => {
    const option = document.createElement("option");
    option.value = book.id;
    option.textContent = book.title;
    bookselect.appendChild(option);
  });
}
