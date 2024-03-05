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
    

    // for fetching individual values.
    game(parent, args) {
      return games.find(game=>game.id===args.id)
    },
    review(parent, args) {
      return reviews.find(game=>game.id===args.id)
    },
    author(parent, args) {
      return authors.find(game=>game.id===args.id)
    }

  },
};

module.exports = {
  resolvers,
};
