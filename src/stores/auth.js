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
          this.userConnected = res.data[0];
          localStorage.setItem("userConnected", JSON.stringify(res.data[0]));
          if (res.data[0].roles[0].role == "apprenant") {
            this.router.push({ name: "course" });
          } else {
            this.router.push({ name: "dashboard" });
          }
          //TODO add switch case in function of role userConnected To redirect user in the route that suits
        })
        .catch((error) => {
          console.log("erreur", error);
        });
    },
  },
});
