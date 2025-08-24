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
Book.prototype.toggleRead =  function() {
    //toggle key in obj
    this.read = (this.read === 'read' ? 'unread' : 'read');
    //update display
    document.getElementById(this.id).querySelector('.read').textContent = this.read;
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
function findBook(id) {
    return myLib.find((book) => book.id == id);
}

function displayBook(book) {
    //make card for book
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
     }, { once: true });
     card.getElementById('toggle-read').addEventListener('click', (e) => {
        const id = e.target.parentNode.getAttribute('id');
        findBook(id).toggleRead();
     })
     //evenlistener for 'toggle read'
     //should be similar to delete, know when it's click -> get parent's id
     //for book in array: if read is read then become unread, otherwise vice versa
     //and then .id .read change the card on ui

     //checkbox issue, it always says "on" for read no matter what
     //'how to get checkbox state using javascript'

    let body = document.querySelector('.container');
    body.appendChild(card);
}

function deleteBook(id) {
    //find book with the id
    //remove from lib array
   myLib.splice(
            myLib.indexOf(
                findBook(id)
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
        (document.getElementById('read').checked ? 'read' : 'unread')
    )
    displayBook(book);
    dialog.close();
    form.reset();
    
})


//initial
myLib[0] = new Book("How to become a playpus","Perry","11", "very good book 11/10", "read");
myLib[1] = new Book("Lord of the Rings","Tolkien","987", "want to read", "unread");
myLib[2] = new Book("Harry Potter","Rowling","?", "should reread", "read");
displayLib(); 