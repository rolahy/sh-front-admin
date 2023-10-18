import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {
      username: "",
      password: "",
    },
    userConnected: undefined,
    access_token: "",
    isLogin: false,
  }),
  actions: {
    login() {
      this.isLogin = true;
      axios
        .post("https://sh-api-v1.vercel.app/auth/login", this.user)
        .then((res) => {
          localStorage.setItem("access_token", res.data.access_token);
          this.access_token = res.data.access_token;
          this.router.push({ name: "dashboard" });
          this.getUserconnected();
        })
        .catch((error) => {
          console.log("erreur", error);
        })
        .finally(() => {
          this.isLogin = false;
        });
    },
    getUserconnected() {
      axios
        .post("https://sh-api-v1.vercel.app/auth/login", this.user)
        .then((res) => {
          console.log("use connected", res.data);
          // localStorage.setItem("userConnected", res.data.access_token);
        })
        .catch((error) => {
          console.log("erreur", error);
        });
    },
  },
});
