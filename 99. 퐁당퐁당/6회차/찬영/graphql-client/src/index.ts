import { request, gql } from 'graphql-request';
import { normalization } from './normalization';
import { GraphQLCache } from './graphql-cache';

(async () => {
  const query = gql`
    query ExampleQuery {
      posts {
        __typename
        id
        title
        content
        comments {
          __typename
          author {
            __typename
            id
            name
            counter
          }
          content
          id
        }
        author {
          __typename
          id
          name
          counter
        }
      }
    }
  `;
  const cache = new GraphQLCache();
  const data = await request('http://localhost:4000/graphql', query);
  const { result, resultKeys } = normalization(data as any);
  cache.writeData(result);
  console.dir(cache.read(query), { depth: null });

  // console.dir(
  //   parse(gql`
  //     query ExampleQuery {
  //       posts {
  //         __typename
  //         id
  //         title
  //         content
  //         comments {
  //           __typename
  //           author {
  //             __typename
  //             id
  //             name
  //             counter
  //           }
  //           content
  //           id
  //         }
  //         author {
  //           __typename
  //           id
  //           name
  //           counter
  //         }
  //       }
  //     }
  //   `),
  //   { depth: null },
  // );
})();
