// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphQL

    # these are the types/schemas.

    type Game{
        id:ID! # ! field mean that this field is required.
        title:String!
        platform:[String!]! # ! field mean that this array is required but there can be null values. we don't set the value to important., if set with the type then value will be required.
        reviews:[Review!]
    }

    type Review { 
        id:ID!
        rating:Int!
        content:String!
        game:Game!
        author:Author!
    }

    type Author{
        id:ID!
        name:String!
        verified:Boolean!
        reviews:[Review!]   #It can be a review or not but if it is, then won't be null.
    }

#query is must define. query mean what kind of data will be returned on a request.
#defining which type of data will be returned when call this querys.

    type Query{
        games: [Game]
        reviews: [Review]
        authors: [Author]

        #to get individual data.

        game(id:ID!): Game
        review(id:ID!): Review
        author(id:ID!): Author
    }

    type Mutation {
        deleteGame(id:ID!):[Game]
        addGame(game:addGameInput!):Game
        updateGame(id:ID!, edits:updateGameInput!):Game
    }

    # we can define type of input values in objects.
    input addGameInput {
        title: String!
        platform: [String!]!
    }
# duplicate input is because of in update args can be optional.
    input updateGameInput {
        title: String
        platform: [String!]
    }
`;

module.exports = {
  typeDefs,
};
