<script setup>
import { mdiTableBorder, mdiGithub } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import TableSampleClients from "@/components/TableSampleClients.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import BaseButton from "@/components/BaseButton.vue";
import CardBoxComponentEmpty from "@/components/CardBoxComponentEmpty.vue";
import { computed } from "vue";
// importation store
import { useMainStore } from "@/stores/main";
import { useUserStore } from "@/stores/user";
import { useRoleStore } from "@/stores/role";

const mainStore = useMainStore();
const userStore = useUserStore();
const roleStore = useRoleStore();

const addUser = () => {
  userStore.isCreateUser = true;
  userStore.isModalEdit = true;
  roleStore.getAllRole();
};

const items = computed(() => mainStore.clients);
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiTableBorder"
        title="Utilisateurs"
        main
      >
        <BaseButton
          :icon="mdiGithub"
          label="Créer"
          color="contrast"
          rounded-full
          small
          @click="addUser"
        />
      </SectionTitleLineWithButton>
      <!-- <NotificationBar color="info" :icon="mdiMonitorCellphone">
        <b>Responsive table.</b> Collapses on mobile
      </NotificationBar> -->

      <!-- Table User -->
      <CardBox v-if="items.length > 0" class="mb-6" has-table>
        <TableSampleClients checkable />
      </CardBox>

      <!-- <SectionTitleLineWithButton :icon="mdiTableOff" title="Empty variation" /> -->

      <!-- <NotificationBar color="danger" :icon="mdiTableOff">
        <b>Empty table.</b> When there's nothing to show
      </NotificationBar> -->

      <CardBox v-show="items.length == 0">
        <CardBoxComponentEmpty />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
