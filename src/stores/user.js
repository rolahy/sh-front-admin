import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    users: [],
    userInfo: {
      username: "",
      roles: [],
      password: "",
      scoreTraining: 0,
      isQuizIsFinish: false,
    },
    isModalEdit: false,
    isEditingUser: false,
    isCreateUser: false,
    url: "https://sh-api-v1.vercel.app/users",
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
    updateUser() {
      axios
        .put(this.url + "/" + this.userInfo._id, this.userInfo, this.config)
        .then((res) => {
          this.isModalEdit = false;
          this.isEditingUser = false;
          this.userInfo = [];
          console.log("updated", res);
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    createUser() {
      axios
        .post(this.url + "/signup", this.userInfo, this.config)
        .then((res) => {
          this.isModalEdit = false;
          this.getAllUser();
          console.log("user created", res);
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  },
});
