import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    users: [],
    url: "http://localhost:3001/users",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN1cGVyX2FkbWluQHNoLmNvbSIsInN1YiI6IjY0YmNlM2YzMDdmYWY0OTZlYmI0YWIyOSIsImlhdCI6MTY5MDMwOTk0MiwiZXhwIjoxNjkwNTY5MTQyfQ.Pv3x3FI8fJcBGYNkffCX4QdqLXgymVXnWBGf0IlhDvw",
    config: {
      headers: {
        Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN1cGVyX2FkbWluQHNoLmNvbSIsInN1YiI6IjY0YmNlM2YzMDdmYWY0OTZlYmI0YWIyOSIsImlhdCI6MTY5MDMwOTk0MiwiZXhwIjoxNjkwNTY5MTQyfQ.Pv3x3FI8fJcBGYNkffCX4QdqLXgymVXnWBGf0IlhDvw"}`,
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
          console.log("zezezeze", error);
        });
    },
  },
});
