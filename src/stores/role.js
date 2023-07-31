import { defineStore } from "pinia";
import axios from "axios";

export const useRoleStore = defineStore("role", {
  state: () => ({
    roles: [],
    url: "https://sh-api-v1.up.railway.app/roles",
    config: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    },
  }),
  actions: {
    getAllRole() {
      axios
        .get(this.url, this.config)
        .then((res) => {
          this.roles = res.data;
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  },
});
