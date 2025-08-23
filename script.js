const myLib = [];

function Book(title, author, pages, notes, read) { 
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
      }
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.notes = notes;
}
function addBookToLib(title, author) {
    myLib.push(new Book(id, title, author));
}
function displayLib () {
    //loops through the array and displays each book on the page
    myLib.forEach((book) => displayBook(book));
}
function displayBook(book) {
    let temp = document.getElementById("card-template").content;
    let card = document.importNode(temp, true);
    let properties = Object.keys(book);
    let content;
    //keys: id, title [1], author, pages, notes, read [5]
     for (let i = 1; i <= 5 ; i++) {
         content = card.querySelector(`.${properties[i]}`);
         content.textContent = book[properties[i]];
     }
    let body = document.querySelector('body');
    body.appendChild(card);
}

const addButton = document.querySelector('#add-book');
const form = document.querySelector('dialog');
addButton.addEventListener('click', );

/**
 * new book button
 * - click button -> form should pop up
 * - form needs a submit button
 * - on clicking submit, eventpreventdefault + should make a book and store it from the data
 * remove book button
 * read status
 */
myLib[0] = new Book("lotr","tolkien","987", "good book", "true");
displayBook(myLib[0]);
displayBook(myLib[0]);