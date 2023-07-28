import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {
      username: "",
      password: "",
    },
  }),
  actions: {
    login() {
      axios
        .post("https://sh-api-v1.up.railway.app/auth/login", this.user)
        .then((res) => {
          localStorage.setItem("access_token", res.data.access_token);
          this.router.push({ name: "dashboard" });
        })
        .catch((error) => {
          console.log("erreur", error);
        });
    },
  },
});
