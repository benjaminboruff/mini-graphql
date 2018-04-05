// Some fake data
const books = [
  {
    id: 1,
    title: 'Harry Potter and the Sorcerer\'s stone',
    authorId: 1,
  },
  {
    id: 2,
    title: 'Jurassic Park',
    authorId: 2,
  },
];

const authors = [
  {
    id: 1,
    firstName: 'J.K.',
    lastName: 'Rowling',
  },
  {
    id: 2,
    firstName: 'Michael',
    lastName: 'Crichton',
  },
];

// The resolvers
const resolvers = {
  Query: {
    allBooks: () => books,
    allAuthors: () => authors,
    author: (obj, {id}) => authors.find((author) => author.id === id),
    book: (obj, {id, title}) => books
      .find((book) => {
        return (
        id && title ? book.id === id && book.title === title :
          id ? book.id === id : title ? book.title === title : null
      );
    }),
  },
  Author: {
    books: (author) => books.filter((book) => book.authorId === author.id),
  },
  Book: {
    author: (book) => authors.find((author) => author.id === book.authorId),
  },
};

export default resolvers;
