export type Decoded = {
  userId: string;
  email: string;
  iat: number;
  exp: number;
};

export interface CustomError {
  message: string;
  id: string;
}
