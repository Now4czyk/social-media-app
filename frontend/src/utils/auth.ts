export const auth = {
  login: (token: string) => {
    console.log("AUTH.LOGIN", token);
    localStorage.setItem("token", token);
  },
  logout: () => localStorage.removeItem("token"),
};
