const { games, authors, reviews } = require("./_db");

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.

const resolvers = {
  Query: {
    // fetch all collection data.
    games() {
      return games;
    },
    authors: () => authors,
    reviews: () => reviews,

    // fetching individual values.
    game(parent, args) {
      return games.find((game) => game.id === args.id);
    },
    review(parent, args) {
      return reviews.find((game) => game.id === args.id);
    },
    author(parent, args) {
      return authors.find((game) => game.id === args.id);
    },
  },
  // if i need to fetch all the inner claues then define outside from the Query object.
  Game: {
    reviews(parent, args) {
      return reviews.filter((review) => review.game_id === parent.id);
    },
  },
  Author: {
    reviews(parent, args) {
      return reviews.filter((review) => review.author_id === parent.id);
    },
  },
  Review: {
    author(parent, args) {
      return authors.find((author) => author.id === parent.author_id);
    },
    game(parent, args) {
      return games.find((game) => game.id === parent.game_id);
    },
  },

  // Mutation
  Mutation: {
    deleteGame(parent, args) {
      return games.filter((game) => game.id !== args.id);
    },
  },
};

module.exports = {
  resolvers,
};
