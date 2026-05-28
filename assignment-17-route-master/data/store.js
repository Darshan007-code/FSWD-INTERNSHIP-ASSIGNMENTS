// In-memory data store (acts as a mock database)

const authors = [
  { id: 1, name: "J.K. Rowling", nationality: "British", birthYear: 1965 },
  { id: 2, name: "George Orwell", nationality: "British", birthYear: 1903 },
  { id: 3, name: "F. Scott Fitzgerald", nationality: "American", birthYear: 1896 },
];

const books = [
  { id: 1, title: "Harry Potter and the Philosopher's Stone", authorId: 1, genre: "Fantasy", price: 299, year: 1997 },
  { id: 2, title: "Harry Potter and the Chamber of Secrets", authorId: 1, genre: "Fantasy", price: 349, year: 1998 },
  { id: 3, title: "1984", authorId: 2, genre: "Dystopian", price: 199, year: 1949 },
  { id: 4, title: "Animal Farm", authorId: 2, genre: "Political Satire", price: 149, year: 1945 },
  { id: 5, title: "The Great Gatsby", authorId: 3, genre: "Classic", price: 179, year: 1925 },
];

module.exports = { authors, books };
