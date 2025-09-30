import { requestAPI } from "./utils";
import type { AuthProvider } from "@refinedev/core";

export const TOKEN_KEY = "access_token";

export const authProvider: AuthProvider = {
  register: async ({ email, password }) => {
    const response = await requestAPI("POST", "/auth/signup", {
      email,
      password,
    });
  
    localStorage.setItem(TOKEN_KEY, response.data.data.accessToken);
  
    return {
      success: true,
      redirectTo: "/login",
    };
  },

  login: async ({ username, email, password }) => {
    if ((username || email) && password) {
      const response = await requestAPI("POST", "/auth/signin", {
        username,
        email,
        password,
      });
      
      localStorage.setItem(TOKEN_KEY, response.data.data.accessToken);
      localStorage.setItem("user", JSON.stringify(response.data.data));
  
      return {
        success: true,
        redirectTo: "/",
      };
    }

    return {
      success: false,
      error: {
        name: "LoginError",
        message: "Invalid username or password",
      },
    };
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem("user");
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        id: 1,
        name: "John Doe",
        avatar: "https://i.pravatar.cc/300",
      };
    }
    return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
