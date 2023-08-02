<script setup>
import { computed, ref, onMounted, watch } from "vue";
import { mdiEye, mdiTrashCan, mdiPencil } from "@mdi/js";
import CardBoxModal from "@/components/CardBoxModal.vue";
import TableCheckboxCell from "@/components/TableCheckboxCell.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";
import UserAvatar from "@/components/UserAvatar.vue";
import { useUserStore } from "@/stores/user";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import { useRoleStore } from "@/stores/role";
import { storeToRefs } from "pinia";

defineProps({
  checkable: Boolean,
});

const userStore = useUserStore();
const roleStore = useRoleStore();
const { userInfo } = storeToRefs(userStore);

const isModalActive = ref(false);
const roleSelected = ref("");

const isModalDangerActive = ref(false);
const user = ref([]);

const perPage = ref(3);

const currentPage = ref(0);

const checkedRows = ref([]);

const itemsPaginated = computed(() =>
  users.value.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  )
);

const numPages = computed(() => Math.ceil(users.value.length / perPage.value));

const currentPageHuman = computed(() => currentPage.value + 1);

const pagesList = computed(() => {
  const pagesList = [];

  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i);
  }

  return pagesList;
});

const remove = (arr, cb) => {
  const newArr = [];

  arr.forEach((item) => {
    if (!cb(item)) {
      newArr.push(item);
    }
  });

  return newArr;
};

const checked = (isChecked, client) => {
  if (isChecked) {
    checkedRows.value.push(client);
  } else {
    checkedRows.value = remove(
      checkedRows.value,
      (row) => row.id === client.id
    );
  }
};

const users = computed(() => userStore.users);
const titleModal = computed(() =>
  userStore.isEditingUser ? "Edition" : "Créer"
);
const vieUser = (client) => {
  isModalActive.value = true;
  user.value = client;
};

const editUser = (userData) => {
  userStore.isEditingUser = true;
  userStore.isModalEdit = true;
  userStore.userInfo = userData;
};

const removeRole = (role) => {
  userStore.userInfo.roles?.splice(role, 1);
};

const closeModal = () => {
  userStore.isEditingUser = false;
  userStore.isCreateUser = false;
  userStore.userInfo = [];
};

const rolesList = computed(() => roleStore.roles.map((item) => item.role));

const addRole = () => {
  const role = roleStore.roles.find((role) => role.role === roleSelected.value);
  userStore.userInfo.roles.push(role);
  const rolesUpdated = roleStore.roles.filter(
    (item) => item.role !== roleSelected.value
  );
  roleStore.roles = rolesUpdated;
};

const actionSave = () => {
  if (userStore.isEditingUser) {
    userStore.updateUser();
  } else {
    userStore.createUser();
  }
};

onMounted(() => {
  userStore.getAllUser();
  roleStore.getAllRole();
});

watch(userInfo, () => {
  if (userStore.isEditingUser) {
    console.log("ato")
    const roleRemoveFromListRole = userStore.userInfo.roles.map((item) =>
      item.role.toLowerCase()
    );
    const rolesFiltered = roleStore.roles.filter(
      (item) => !roleRemoveFromListRole.includes(item.role.toLowerCase())
    );
    roleStore.roles = rolesFiltered;
  }
});
</script>

<template>
  <CardBoxModal v-model="isModalActive" title="Détails">
    <p>{{ user?.username }}</p>
    <div v-for="role in user.roles" :key="role">
      {{ role.role }}
    </div>
  </CardBoxModal>

  <CardBoxModal
    v-model="userStore.isModalEdit"
    :title="titleModal"
    @cancel="closeModal"
  >
    <FormField label="Email" help="Required. Your name">
      <FormControl
        v-model="userStore.userInfo.username"
        :icon="mdiAccount"
        name="username"
        required
        autocomplete="username"/>
    </FormField>
    <div>Role(s):</div>
      <div>
      <div
        v-for="(roleUser, index) in userStore.userInfo.roles"
        :key="index"
        class="py-1">
          <div class="flex justify-between bg-slate-800 pl-3.5 rounded-md">
            <div>{{ roleUser.role }}</div>
          <div>
            <BaseButton
                color="danger"
              :icon="mdiTrashCan"
              small
              @click="removeRole(index)"
            />
          </div>
        </div>
      </div>
    </div>
    <FormField label="Sélectionner role">
      <FormControl
        v-model="roleSelected"
        :options="rolesList"
        @change="addRole"
      />
    </FormField>
    <FormField
      v-if="userStore.isCreateUser"
      label="Mot de passe"
      help="Password"
    >
      <FormControl
        v-model="userStore.userInfo.password"
        :icon="mdiAccount"
        name="passord"
        required
        autocomplete="password" />
    </FormField>
    <BaseButtons>
      <BaseButton label="Save" color="info" @click="actionSave" />
      <BaseButton
        v-if="hasCancel"
        label="Cancel"
        color="info"
        outline
        @click="cancel"
      />
    </BaseButtons>
  </CardBoxModal>

  <CardBoxModal
    v-model="isModalDangerActive"
    title="Please confirm"
    button="danger"
    has-cancel
  >
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </CardBoxModal>

  <div v-if="checkedRows.length" class="p-3 bg-gray-100/50 dark:bg-slate-800">
    <span
      v-for="checkedRow in checkedRows"
      :key="checkedRow.id"
      class="inline-block px-2 py-1 rounded-sm mr-2 text-sm bg-gray-100 dark:bg-slate-700">
      {{ checkedRow.name }}
    </span>
  </div>

  <table>
    <thead>
      <tr>
        <th v-if="checkable" />
        <th />
        <th>Mail</th>
        <th>Role</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr v-for="client in itemsPaginated" :key="client._id">
        <TableCheckboxCell
          v-if="checkable"
          @checked="checked($event, client)"
        />
        <td class="border-b-0 lg:w-6 before:hidden">
          <UserAvatar
            :username="client.username"
            class="w-24 h-24 mx-auto lg:w-6 lg:h-6"
          />
        </td>
        <td data-label="Name">
          {{ client.username }}
        </td>
        <td data-label="Company">
          <div v-for="(roleUser, index) in client.roles" :key="index">
            {{ roleUser.role }}
          </div>
        </td>
        <td class="before:hidden lg:w-1 whitespace-nowrap">
          <BaseButtons type="justify-start lg:justify-end" no-wrap>
            <BaseButton
              color="info"
              :icon="mdiEye"
              small
              @click="vieUser(client)"
            />
            <BaseButton
              color="info"
              :icon="mdiPencil"
              small
              @click="editUser(client)"
            />
            <BaseButton
              color="danger"
              :icon="mdiTrashCan"
              small
              @click="isModalDangerActive = true"
            />
          </BaseButtons>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
    <BaseLevel>
      <BaseButtons>
        <BaseButton
          v-for="page in pagesList"
          :key="page"
          :active="page === currentPage"
          :label="page + 1"
          :color="page === currentPage ? 'lightDark' : 'whiteDark'"
          small
          @click="currentPage = page"
        />
      </BaseButtons>
      <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
    </BaseLevel>
  </div>
</template>
