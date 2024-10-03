const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const port = 5000;
const cors = require("cors");
const bodyParser = require("body-parser");
const { USER } = require("./src/Graph-Ql/User.js");
const { TODOS } = require("./src/Graph-Ql/Todos.js");

const products = [
  { id: "1", name: "Product A", description: "Description A", price: 19.99 },
  { id: "2", name: "Product B", description: "Description B", price: 29.99 },
  // Add more products here
];

// Sample GraphQL schema
const typeDefs = `

 type Product {
    id: ID!
    name: String!
    description: String
    price: Float!
  }

  type Query {
    getAllProducts: [Product]
    getProductById(id: ID!): Product
    getProductsByName(name: String!): [Product]
  }

  type Mutation {
    updateProduct(
      id: ID!
      name: String
      description: String
      price: Float
    ): Product
    deleteProduct(id: ID!): String
    createProduct(name: String!, description: String, price: Float!): Product
  }

  type Subscription {
    productUpdated: Product
  }
`;

// Sample resolver
const resolvers = {
  
  Query: {
    getAllProducts: () => products,
    getProductById: (_, { id }) =>
      products.find((product) => product.id === id),
    getProductsByName: (_, { name }) =>
      products.filter((product) => product.name.includes(name)),
  },

  Mutation: {
    updateProduct: (_, { id, name, description, price }) => {
      const productIndex = products.findIndex((product) => product.id === id);
      if (productIndex === -1) {
        throw new Error("Product not found");
      }
      products[productIndex] = {
        ...products[productIndex],
        name,
        description,
        price,
      };
      return products[productIndex];
    },
    deleteProduct: (_, { id }) => {
      const productIndex = products.findIndex((product) => product.id === id);
      if (productIndex === -1) {
        throw new Error("Product not found");
      }
      products.splice(productIndex, 1);
      return "Product deleted successfully";
    },

    createProduct: (_, { name, description, price }) => {
      const newProduct = {
        id: String(products.length + 1),
        name,
        description,
        price,
      };
      products.push(newProduct);
      return newProduct;
    },
  },
};

// Create Apollo Server instance
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
startStandaloneServer(server, { listen: { port } })
  .then(() => {
    console.log("Server is Working fine Port No is: https://localhost:" + port);
  })
  .catch((err) => {
    console.log(err);
  });
