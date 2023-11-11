import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {
      username: "",
      password: "",
    },
    userConnected: [],
    access_token: "",
    isLogin: false,
  }),
  actions: {
    async login() {
      this.isLogin = true;
      axios
        .post("https://sh-api-v1.vercel.app/auth/login", this.user)
        .then(async (res) => {
          localStorage.setItem("access_token", res.data.access_token);
          this.access_token = res.data.access_token;
          this.router.push({ name: "dashboard" });
          await this.getUserConnected();
        })
        .catch((error) => {
          console.log("erreur", error);
        })
        .finally(() => {
          this.isLogin = false;
        });
    },
    async getUserConnected() {
      axios
        .get(
          "https://sh-api-v1.vercel.app/users?username=" + this.user.username
        )
        .then(async (res) => {
          setTimeout(() => {
            this.userConnected = res.data[0];
          }, 2000);
          localStorage.setItem("userConnected", JSON.stringify(res.data[0]));
        })
        .catch((error) => {
          console.log("erreur", error);
        });
    },
  },
});
