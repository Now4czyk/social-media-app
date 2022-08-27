export type UserType = Record<string, string>;
export interface Authorization {
  verify: {
    isAuthorized: boolean;
  };
}
