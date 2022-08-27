export const auth = {
  login: (token: string) => localStorage.setItem("token", token),
  logout: () => localStorage.removeItem("token"),
  getToken: () => localStorage.getItem("token"),
};
