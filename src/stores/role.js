import { defineStore } from "pinia";
import axios from "axios";

export const useRoleStore = defineStore("role", {
  state: () => ({
    roles: [],
    roleInfo: {
      role: "",
    },
    isModalEdit: false,
    isEditingRole: false,
    isCreateRole: false,
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
    updateRole() {
      axios
        .put(this.url + "/" + this.roleInfo._id, this.roleInfo, this.config)
        .then((res) => {
          this.isModalEdit = false;
          this.isEditingRole = false;
          this.roleInfo = [];
          console.log("updated", res);
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    createRole() {
      axios
        .post(this.url, this.roleInfo, this.config)
        .then((res) => {
          this.isModalEdit = false;
          this.getAllRole();
          console.log("user created", res);
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  },
});
