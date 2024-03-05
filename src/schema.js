// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphQL

    # these are the types/schemas.

    type Game{
        id:ID! # ! field mean that this field is required.
        title:String!
        platform:[String!]! # ! field mean that this array is required but there can be null values. we don't set the value to important., if set with the type then value will be required.
    }

    type Review { 
        id:ID!
        rating:Int!
        content:String!
    }

    type Author{
        id:ID!
        name:String!
        verified:Boolean!
    }

#query is must define. query mean what kind of data will be returned on a request.
#defining which type of data will be returned when call this querys.

    type Query{
        games: [Game]
        reviews: [Review]
        authors: [Author]
    }
`;

module.exports = {
  typeDefs,
};
