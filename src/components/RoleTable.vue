<script setup>
import { computed, ref, onMounted } from "vue";
import { mdiTrashCan, mdiPencil } from "@mdi/js";
import CardBoxModal from "@/components/CardBoxModal.vue";
import TableCheckboxCell from "@/components/TableCheckboxCell.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import { useRoleStore } from "@/stores/role";

defineProps({
  checkable: Boolean,
});

const roleStore = useRoleStore();

const isModalActive = ref(false);

const isModalDangerActive = ref(false);
const user = ref([]);

const perPage = ref(6);

const currentPage = ref(0);

const checkedRows = ref([]);

const itemsPaginated = computed(() =>
  roles.value.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  )
);

const numPages = computed(() => Math.ceil(roles.value.length / perPage.value));

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

const roles = computed(() => roleStore.roles);
const titleModal = computed(() =>
  roleStore.isEditingRole ? "Edition" : "Créer"
);

const editRole = (role) => {
  roleStore.isEditingRole = true;
  roleStore.isModalEdit = true;
  roleStore.roleInfo = role;
};

const closeModal = () => {
  roleStore.isEditingRole = false;
  roleStore.roleInfo = [];
  roleStore.getAllRole();
};

const actionSave = () => {
  if (roleStore.isEditingRole) {
    roleStore.updateRole();
  } else {
    roleStore.createRole();
  }
};

onMounted(() => {
  roleStore.getAllRole();
});
</script>

<template>
  <CardBoxModal
    v-model="roleStore.isModalEdit"
    :title="titleModal"
    @cancel="closeModal"
  >
    <FormField label="Role" help="Required. Role">
      <FormControl
        v-model="roleStore.roleInfo.role"
        :icon="mdiAccount"
        name="role"
        required
        autocomplete="username"
      />
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
    title="Confirmation la suppression"
    button="danger"
    has-cancel
  >
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
        <th>Role</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr v-for="role in itemsPaginated" :key="role._id">
        <TableCheckboxCell
          v-if="checkable"
          @checked="checked($event, client)"
        />
        <td data-label="Role">
          {{ role.role }}
        </td>
        <td class="before:hidden lg:w-1 whitespace-nowrap">
          <BaseButtons type="justify-start lg:justify-end" no-wrap>
            <BaseButton
              color="info"
              :icon="mdiPencil"
              small
              @click="editRole(role)"
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
