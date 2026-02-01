export const useAuth = defineStore("store:auth", () => {
  const account = ref<any>();
  const token = ref<string>("");
  const isAuthenticated = () => {};
  const authenticate = () => {};
  const register = () => {};
  const logout = () => {};

  return {
    account,
    token,
    isAuthenticated,
    authenticate,
    register,
    logout,
  };
});
