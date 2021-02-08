<template>
  <div class="submit-form mt-3 mx-auto">
    <p class="headline">Cadastrar Aluno</p>

    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="student.name"
          :rules="[(v) => !!v && !!v.trim() || 'Name is required']"
          label="Name"
          color="accent"
          required
          >
        </v-text-field>

        <v-text-field
          v-model="student.email"
          :rules="[(v) => !!v && !!v.trim() || 'Email is required']"
          label="Email"
          color="accent"
          required
          >
        </v-text-field>

        <v-text-field
          v-model="student.academicRegister"
          :rules="[(v) => !!v && !!v.trim() || 'Academic Register is required']"
          label="Academic Register"
          color="accent"
          required
          >
        </v-text-field>

        <v-text-field
          v-model="student.document"
          :rules="[(v) => !!v && !!v.trim() || 'Document is required']"
          label="Document"
          color="accent"
          required
          >
        </v-text-field>
      </v-form>

      <div class="text-right">
        <v-btn color="danger" class="mt-2 mr-2" @click="goTolist" >Cancelar</v-btn>
        <v-btn color="success" class="mt-2" @click="saveStudent">Criar</v-btn>
      </div>
    </div>

    <div v-else>
      <v-card class="mx-auto">
        <v-card-title>
          Cadastro realizado com sucesso
        </v-card-title>

        <v-card-subtitle>
          Pressione o botão novo para adicionar outro aluno
        </v-card-subtitle>

        <v-card-actions>
          <v-btn color="success" @click="newStudent">Novo</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import Backend from "../services/Backend";

export default {
  name: "create-student",
  data() {
    return {
      student: {
        id: null,
        name: '',
        email: '',
        academicRegister: '',
        document: '',
      },
      submitted: false,
    };
  },
  methods: {
    saveStudent() {
      var data = {
        name: this.student.name,
        email: this.student.email,
        academicRegister: this.student.academicRegister,
        document: this.student.document,
      };
      Backend.create(data)
        .then((response) => {
          this.student.id = response.data.id;
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    newStudent() {
      this.submitted = false;
      this.student = {};
    },
    goTolist() {
      this.$router.push({ name: "students-list" })
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 70%;
}
</style>

