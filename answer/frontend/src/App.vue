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
    </v-app-bar>


    <v-main>
    <v-card height="100%">
      <v-navigation-drawer
        absolute
        permanent
        left
        >

        <v-list dense class="mt-10">
          <v-list-item
            v-for="item in items"
            :key="item.title"
            >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <router-view />
    </v-card>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    items: [
      { title: 'Alunos', icon: 'mdi-account-group-outline' },
    ],
  }),
};
</script>
