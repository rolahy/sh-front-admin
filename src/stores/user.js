import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    users: [],
    url: "https://sh-api-v1.up.railway.app/users",
    config: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    },
  }),
  actions: {
    getAllUser() {
      axios
        .get(this.url, this.config)
        .then((res) => {
          this.users = res.data;
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  },
});
