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
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { ref } from "vue";

const auth = useAuthStore();

const requiredNameLength = ref(6);

const rules = {
  username: { required, email },
  password: { required, minLength: minLength(requiredNameLength.value) },
};

const v$ = useVuelidate(rules, auth.user);

const handleLogin = async () => {
  const result = await v$.value.$validate();
  if (result) {
    auth.login();
  }
};
</script>

<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
      <CardBox :class="cardClass">
        <FormField label="Login">
          <FormControl
            v-model="auth.user.username"
            :icon="mdiAccount"
            name="login"
            autocomplete="username"
          />
        </FormField>
        <div
          v-for="error of v$.username.$errors"
          :key="error.$uid"
          class="input-errors"
        >
          <div class="text-red-800">{{ error.$message }}</div>
        </div>
        <FormField label="Password">
          <FormControl
            v-model="auth.user.password"
            :icon="mdiAsterisk"
            type="password"
            name="password"
            autocomplete="current-password"
          />
        </FormField>
        <div
          v-for="error of v$.password.$errors"
          :key="error.$uid"
          class="input-errors"
        >
          <div class="text-red-800">{{ error.$message }}</div>
        </div>

        <!-- <FormCheckRadio
          v-model="form.remember"
          name="remember"
          label="Remember"
          :input-value="true"
        /> -->

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
