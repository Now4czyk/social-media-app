import { gql } from "@apollo/client";

export const FETCH_POST_BY_ID = gql(`
  query GetPostById($postId: ID!) {
    getPostById(id: $postId) {
      id
      title
      description
      imageUrl
      user {
        firstName
        lastName
        id
      }
      createdAt
      updatedAt
    }
  }
`);

export const FETCH_POSTS = gql(`
  query {
    getAllPosts {
      id
      title
      description
      imageUrl
      user {
        id
        firstName
        lastName
      }
      createdAt
      updatedAt
    }
  }
`);

export const FETCH_POSTS_PAGINATION = gql(`
  query GetPostsPagination($perPage: Int!, $page: Int!) {
    getPostsPagination(perPage: $perPage, page: $page) {
      total
      posts {
        id
        title
        description
        imageUrl
        user {
          id
          firstName
          lastName
        }
        createdAt
        updatedAt
      }
    }
  }
`);
