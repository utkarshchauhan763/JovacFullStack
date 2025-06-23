// Library System
let library = [
    { title: "Book A", author: "Author 1", year: 2020, available: true },
    { title: "Book B", author: "Author 2", year: 2019, available: true }
];

function displayAvailableBooks() {
    library.forEach(book => {
        if (book.available) console.log(book.title);
    });
}

function markAsBorrowed(title) {
    let book = library.find(b => b.title === title);
    if (book) book.available = false;
}

function addBook(title, author, year) {
    library.push({ title, author, year, available: true });
}

// Example usage:
displayAvailableBooks();
markAsBorrowed("Book A");
addBook("Book C", "Author 3", 2021);
displayAvailableBooks();