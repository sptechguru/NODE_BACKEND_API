const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const port = 8000;

const server = new ApolloServer({
  typeDefs: `
  type Query {
  hello:String,
  welcome:String
}`,

  resolvers: {
    Query: {
      hello: () => "Hello GraphQl",
      welcome: () => "Welcome  GraphQl Server",
    },
  },
});

startStandaloneServer(server, {
  listen: {
    port,
  },
})
  .then(() => {
    console.log("Server is Working fine Port No is: " + port);
  })
  .catch((err) => {
    console.log(err);
  });
