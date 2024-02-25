import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// type defs
const typeDefs = `#graphql
type User {
  id: Int!
  name: String!
  counter: Int!
}

type Comment {
  id: Int!
  content: String!
  author: User!
}

type Post {
  id: Int!
  title: String!
  content: String!
  author: User!
  comments: [Comment!]
}

type Query {
  posts: [Post!]
}

type Mutation {
  updateUser(counter: Int!): User!
}
`;

// dataset
const users = [
  { id: 1, name: 'chanyeong', counter: 1 },
  { id: 2, name: 'jihun', counter: 1 },
  { id: 3, name: 'hakjun', counter: 1 },
];

const comments = [
  { id: 1, content: 'test comment 1', authorId: 1 },
  { id: 2, content: 'test comment 2', authorId: 2 },
  { id: 3, content: 'test comment 3', authorId: 3 },
];

const posts = [
  { id: 1, title: 'test post 1', content: 'test', authorId: 1, commentIds: [1, 2, 3] },
];

// resolvers
const resolvers = {
  Query: {
    posts: () => posts,
  },
  Post: {
    author: (parent: any) => users.find(({ id }: any) => id === parent.authorId),
    comments: (parent: any) =>
      parent?.commentIds?.map((commentId: any) => comments.find(({ id }: any) => id === commentId)),
  },
  Comment: {
    author: (parent: any) => users.find(({ id }: any) => id === parent.authorId),
  },
};

(async () => {
  // server
  const server = new ApolloServer({ typeDefs, resolvers });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
})();
