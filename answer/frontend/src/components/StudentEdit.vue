<template>
  <div v-if="currentStudent" class="edit-form py-3">
    <p class="headline">Edit Student</p>

    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="currentStudent.name"
        :rules="[(v) => !!v || 'Name is required']"
        label="Name"
        color="accent"
        required
      ></v-text-field>

      <v-text-field
        v-model="currentStudent.email"
        :rules="[(v) => !!v || 'email is required']"
        label="Email"
        color="accent"
        required
      ></v-text-field>

      <div class="text-right">
        <v-btn color="primary" small @click="goTolist" class="mr-2" >
          Cancelar
        </v-btn>

        <v-btn color="success" small @click="updateStudent">
          Salvar
        </v-btn>
      </div>
    </v-form>

    <p class="mt-3">{{ message }}</p>
  </div>

  <div v-else>
    <p>Please click on a Student...</p>
  </div>
</template>

<script>
import Backend from "../services/Backend"

export default {
  name: "student",
  data() {
    return {
      currentStudent: null,
      message: "",
    }
  },
  methods: {
    getStudent(id) {
      Backend.getOne(id)
        .then(({ data }) => {
          const { name, email } = data
          this.currentStudent = { name, email }
        })
        .catch((e) => {
          console.log(e)
        })
    },
    updateStudent() {
      Backend.update(this.$route.params.id, this.currentStudent)
        .then(() => {
          this.goTolist()
        })
        .catch((e) => {
          console.log(e)
        })
    },
    goTolist() {
      this.$router.push({ name: "students-list" })
    },
  },
  mounted() {
    this.message = ""
    this.getStudent(this.$route.params.id)
  },
}
</script>

<style>
.edit-form {
  max-width: 70%;
  margin: auto;
}
</style>
