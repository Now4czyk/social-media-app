import { gql } from "@apollo/client";

export const CREATE_USER = gql(`
  mutation CreateUser($email: String!, $password: String!, $confirmPassword: String!, $firstName: String!, $lastName: String!) {
    createUser(email: $email, password: $password, confirmPassword: $confirmPassword, firstName: $firstName, lastName: $lastName) {
      id
      email
      password
      firstName
      lastName
      createdAt
      updatedAt
    }
  }
`);

export const SINGIN_USER = gql(`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`);

export const UPDATE_USER = gql(`
  mutation UpdateUser($firstName: String!, $lastName: String!, $email: String!) {
    updateUser(firstName: $firstName, lastName: $lastName, email: $email) {
      email
    }
  }
`);
