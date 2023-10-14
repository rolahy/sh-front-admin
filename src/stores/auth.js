import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {
      username: "",
      password: "",
    },
    access_token: "",
    isLogin: false,
  }),
  actions: {
    login() {
      this.isLogin = true;
      axios
        .post(
          "http://sh-api-emarolahy16-gmailcom.vercel.app/auth/login",
          this.user
        )
        .then((res) => {
          localStorage.setItem("access_token", res.data.access_token);
          this.access_token = res.data.access_token;
          this.router.push({ name: "dashboard" });
        })
        .catch((error) => {
          console.log("erreur", error);
        })
        .finally(() => {
          this.isLogin = false;
        });
    },
  },
});
