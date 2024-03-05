const { games, authors, reviews } = require("./_db");

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.

const resolvers = {
  Query: {
    games() {
      return games;
    },
    authors: () => authors,
    reviews: () => reviews,
  },
};

module.exports = {
  resolvers,
};
