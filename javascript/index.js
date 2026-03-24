const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const addButton = document.getElementById("addButton");
const bookListDiv = document.getElementById("bookList");






const myLibrary = [];

function Book(title, author, pages, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.id = id || crypto.randomUUID(); 
}

function addBookToLibrary(title, author, pages) {
  const newBook = new Book(title, author, pages);
  myLibrary.push(newBook);
}
