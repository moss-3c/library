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
    myLib.forEach((book) => displayCard(book));
}
function displayCard(book) {
    let temp = document.getElementById("card-template").content;
    let card = document.importNode(temp, true);
    let properties = Object.keys(book);
    let content;
    //keys: id, title [1], author, pages, notes, read [5]
     for (let i = 1; i <= 5 ; i++) {
         content = card.querySelector(`.${properties[i]}`);
         content.textContent = book[properties[i]];
     }
    let body = document.querySelector('body')
    body.appendChild(card);
}

/**
 * new book button
 * remove book button
 * read status
 */
myLib[0] = new Book("lotr","tolkien","987", "good book", "true");
console.log(myLib);
displayCard(myLib[0]);