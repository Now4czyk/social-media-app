import { gql } from "@apollo/client";

export const CREATE_POST = gql(`
  mutation CreatePost($title: String!, $description: String!, $imageUrl: String) {
    createPost(title: $title, description: $description, imageUrl: $imageUrl) {
      id
      title
      description
      imageUrl
      createdAt
      updatedAt
    }
  }
`);

export const UPDATE_POST = gql(`
  mutation UpdatePost($postId: ID!, $title: String!, $description: String!, $imageUrl: String) {
    updatePost(id: $postId, title: $title, description: $description, imageUrl: $imageUrl) {
      id
      title
      description
      imageUrl
      createdAt
      updatedAt
    }
  }
`);

export const DELETE_POST = gql(`
  mutation DeletePost($postId: ID!) {
    deletePost(id: $postId) {
      id
    }
  }
`);

export const LIKE_POST = gql(`
  mutation LikePost($postId: ID!) {
    likePost(id: $postId) {
      id
    }
  }
`);
