<script setup>
import { mdiTableBorder, mdiGithub } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import RoleTable from "@/components/RoleTable.vue"
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import BaseButton from "@/components/BaseButton.vue";
import CardBoxComponentEmpty from "@/components/CardBoxComponentEmpty.vue";
import { computed } from "vue";
// importation store
import { useMainStore } from "@/stores/main";
import { useRoleStore } from "@/stores/role";

const mainStore = useMainStore();
const roleStore = useRoleStore();

const addRole = () => {
  roleStore.isCreateRole = true;
  roleStore.isModalEdit = true;
  roleStore.getAllRole();
};

const items = computed(() => mainStore.clients);
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiTableBorder" title="Roles" main>
        <BaseButton
          :icon="mdiGithub"
          label="Créer"
          color="contrast"
          rounded-full
          small
          @click="addRole"
        />
      </SectionTitleLineWithButton>

      <!-- Table Role -->
      <CardBox class="mb-6" has-table>
        <RoleTable checkable />
      </CardBox>

      <CardBox v-show="items.length == 0">
        <CardBoxComponentEmpty />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
