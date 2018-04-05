import books from '../data/books';
import authors from '../data/authors';

// The resolvers
const resolvers = {
  Query: {
    books: () => books,
    book: (obj, {id, title}) => books
      .find((book) => {
        return (
        id && title ? book.id === id && book.title === title :
          id ? book.id === id : title ? book.title === title : null
        );
      }),
    authors: () => authors,
    author: (obj, {id}) => authors.find((author) => author.id === id),
  },
  Author: {
    books: (author) => books.filter((book) => book.authorId === author.id),
  },
  Book: {
    author: (book) => authors.find((author) => author.id === book.authorId),
  },
};

export default resolvers;
