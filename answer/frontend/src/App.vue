<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      >
      <div class="d-flex align-center">
        <v-img
          alt="Grupo A Logo"
          class="shrink mr-2"
          contain
          src="./assets/logo.webp"
          transition="scale-transition"
          width="100"
          />
      </div>

      <v-spacer></v-spacer>

    </v-app-bar>

    <v-main>
      <StudentsList/>
    </v-main>
  </v-app>
</template>

<script>
import StudentsList from './components/StudentsList';

export default {
  name: 'App',

  components: {
    StudentsList,
  },

  data: () => ({
    //
  }),
};
</script>
