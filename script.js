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
function addBookToLib(title, author, pages, notes, read) {
    book = new Book(title, author, pages, notes, read);
    myLib.push(book);
    return book;
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
     for (let i = 1; i <= 5 ; i++) { //skip id key, don't want it in card
         content = card.querySelector(`.${properties[i]}`);
         content.textContent = book[properties[i]];
     }
     card.querySelector('.card').setAttribute("id", book.id);
     card.querySelector('.delete').addEventListener('click', (e) => {
        const id = e.target.parentNode.getAttribute('id');
        deleteBook(id);
        deleteCard(id);
     });


    let body = document.querySelector('.container');
    body.appendChild(card);
}

function deleteBook(id) {
    //find book with the id
    //remove from lib array
   myLib.splice(
            myLib.indexOf(
                myLib.find((book) => book.id === id)
            ),
        1);
}
function deleteCard(id) {
    //remove card from ui
    document.getElementById(id).remove();
}

const dialog = document.querySelector('dialog');
const addBtn = document.querySelector('.add-book');
addBtn.addEventListener('click', () => {dialog.showModal()})
const cancelBtn = document.getElementById("cancel");
cancelBtn.addEventListener('click', () => {dialog.close()});
const submitBtn = document.getElementById('submit-book');
submitBtn.addEventListener('click', () => {
});

const form = document.getElementById('book-form');
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const book = addBookToLib(
        document.getElementById('title').value,
        document.getElementById('author').value,
        document.getElementById('pages').value,
        document.getElementById('notes').value,
        document.getElementById('read').value,
    )
    displayBook(book);
    dialog.close();
    form.reset();
})


//testing
myLib[0] = new Book("lotr","tolkien","987", "good book", "true");
myLib[1] = new Book("bad book","ff","987", "sucks", "true");
displayBook(myLib[0]);
displayBook(myLib[1]);