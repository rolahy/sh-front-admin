<script setup>
import { mdiAccount, mdiAsterisk } from "@mdi/js";
import SectionFullScreen from "@/components/SectionFullScreen.vue";
import CardBox from "@/components/CardBox.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import LayoutGuest from "@/layouts/LayoutGuest.vue";
import { useAuthStore } from "@/stores/auth";
import * as yup from "yup";
import { reactive, watch } from "vue";

const auth = useAuthStore();

const schema = yup.object().shape({
  username: yup.string().required("Ce champ est requis"),
  password: yup.string().required("Ce champ est requis"),
});

const validations = reactive({
  username: {
    fn: (value) =>
      schema.validateAt("username", {
        username: value,
      }),
    msg: "required",
    error: "",
  },
  password: {
    fn: (value) =>
      schema.validateAt("password", {
        password: value,
      }),
    msg: "required",
    error: "",
  },
});

const handleLogin = async () => {
  try {
    // Valider le champ "Login"
    await validations.username.fn(auth.user.username);
    await validations.password.fn(auth.user.password);
    // Si la validation réussit, appeler auth.login
    await auth.login();
  } catch (error) {
    validations.username.error = error.message;
    validations.password.error = error.message;
  }
};

const createValidationWatcher = (property, key) => {
  return watch(
    () => property,
    (newValue) => {
      console.log("niova e ");
      if (newValue !== "") {
        validations[key].error = "";
      }
    }
  );
};

createValidationWatcher(auth.user.username, "username");
createValidationWatcher(auth.user.password, "password");
</script>

<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
      <CardBox :class="cardClass">
        <FormField label="Login" :help="validations['username'].error">
          <FormControl
            v-model="auth.user.username"
            :icon="mdiAccount"
            name="login"
            autocomplete="username"
          />
        </FormField>

        <FormField label="Password" :help="validations['password'].error">
          <FormControl
            v-model="auth.user.password"
            :icon="mdiAsterisk"
            type="password"
            name="password"
            autocomplete="current-password"
          />
        </FormField>
        <template #footer>
          <BaseButtons>
            <BaseButton
              type="submit"
              color="info"
              label="Login"
              @click="handleLogin"
            />
            <BaseButton color="info" outline label="Signup" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
</template>
