<script setup>
import { onMounted, ref } from 'vue';
import { remult } from 'remult';
import App from '../App.vue';

const username = ref('');
const signedIn = ref(false);

const signIn = async () => {
  const result = await fetch('/api/signIn', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: username.value }),
  });
  if (result.ok) {
    remult.user = (await result.json()).user;
    signedIn.value = true;
  } else {
    alert((await result.json()).message);
  }
};
const signOut = async () => {
  const result = await fetch('/api/signOut', {
    method: 'POST',
  });
  if (result.ok) {
    remult.user = undefined;
    signedIn.value = false;
  } else {
    alert((await result.json()).message);
  }
};

onMounted(async () => {
  const result = await fetch('/api/currentUser');
  if (result.ok) {
    remult.user = await result.json();
    signedIn.value = remult.authenticated();
  }
});
</script>

<template>
  <div v-if="signedIn">
    Hello {{ remult.user?.name }}
    <button @click="signOut()">Sign Out</button>
    <App />
  </div>
  <div v-else>
    <h1>ToDos</h1>
    <main>
      <form @submit.prevent="signIn()">
        <input
          v-model="username"
          placeholder="Username maybe: (Jane, John or Admin)"
        />
        <button>Sign in</button>
      </form>
    </main>
  </div>
</template>
