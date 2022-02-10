import { gql } from "@apollo/client";

export const POSTS_QUERY = gql`
  query Posts {
    posts {
      id
      body
      createdAt
      username
      comments {
        id
        body
        username
        createdAt
      }
      likes {
        id
        username
        createdAt
      }
    }
  }
`;

export const POST_QUERY = gql`
  query Post($postId: ID!) {
    post(postId: $postId) {
      id
      body
      createdAt
      username
      comments {
        id
        body
        username
        createdAt
      }
      likes {
        id
        username
        createdAt
      }
    }
  }
`;
