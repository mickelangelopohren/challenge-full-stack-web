<template>
  <div class="edit-form mt-3 py-3 mx-auto">
    <p class="headline">Edit Student</p>

    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="currentStudent.name"
        :rules="[(v) => !!v  && !!v.trim() || 'Name is required']"
        label="Name"
        color="accent"
        required
        >
      </v-text-field>

      <v-text-field
        v-model="currentStudent.email"
        :rules="[(v) => !!v  && !!v.trim() || 'Email is required']"
        label="Email"
        color="accent"
        required
        >
      </v-text-field>

      <v-text-field
        v-model="currentStudent.academicRegister"
        :rules="[(v) => !!v && !!v.trim() || 'Academic Register is required']"
        label="Academic Register"
        color="accent"
        disabled
        >
      </v-text-field>

      <v-text-field
        v-model="currentStudent.document"
        :rules="[(v) => !!v && !!v.trim() || 'Document is required']"
        label="Document"
        color="accent"
        disabled
        >
      </v-text-field>

      <div class="text-right">
        <v-btn color="danger" small @click="goTolist" class="mr-2" >
          Cancelar
        </v-btn>

          <v-btn color="success" small @click="updateStudent">
            Salvar
          </v-btn>
      </div>
    </v-form>

    <p class="mt-3">{{ message }}</p>
  </div>
</template>

<script>
import Backend from "../services/Backend"

export default {
  name: "student",
  data() {
    return {
      currentStudent: {},
      message: "",
    }
  },
  methods: {
    getStudent(id) {
      Backend.getOne(id)
        .then(({ data }) => {
          this.currentStudent = data
        })
        .catch((e) => {
          console.log(e)
        })
    },
    updateStudent() {
      const name = this.currentStudent?.name;
      const email = this.currentStudent?.email;
      if (!name || !email) {
        return
      }
      Backend.update(this.$route.params.id, { name, email })
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
