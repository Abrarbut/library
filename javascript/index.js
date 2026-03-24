// Get HTML elements
const titleInput = document.getElementById("book-title");
const authorInput = document.getElementById("book-author");
const pagesInput = document.getElementById("book-pages");
const doneButton = document.getElementById("doneButton");
const bookListDiv = document.getElementById("bookList");

// When user clicks "Done" button
doneButton.addEventListener("click", function() {
  // Get values from input fields
  const title = titleInput.value;
  const author = authorInput.value;
  const pages = pagesInput.value;
  
  // Check if all fields have values
  if (title && author && pages) {
    // Add book to library
    addBookToLibrary(title, author, pages);
    
    // Clear input fields
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    
    // Display the books
    displayBooks();
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
    `;
    bookListDiv.appendChild(bookDiv);
  });
}