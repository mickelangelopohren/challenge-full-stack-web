<template>
  <v-row align="center" class="list px-3 mx-auto">

    <v-col cols="12 mt-4" sm="12" >
      <v-card class="mx-auto" tile>

        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            >
          </v-text-field>

            <v-btn
              color="primary"
              dark
              class="mb-2"
              @click="createStudent()"
              >
              Cadastrar Aluno
            </v-btn>
        </v-card-title>

        <v-dialog v-model="dialogDelete" max-width="540px">
          <v-card class="text-right">
            <v-card-title class="headline">Tem certeza de que deseja excluir este aluno</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="deleteConfirm">Confirmar</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

      <v-data-table
        :headers="headers"
        :items="students"
        :search="search"
        hide-default-footer
        >

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editStudent(item.id)">mdi-pencil</v-icon>
        <v-icon small @click="deleteStudent(item.id)">mdi-delete</v-icon>
        </template>
      </v-data-table>

      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Backend from "../services/Backend"

export default {
  name: "studants-list",
  data() {
    return {
      search: '',
      students: [],
      headers: [
        { text: "Registro acadêmico", value: "academicRegister" },
        { text: "Nome", value: "name" },
        { text: "CPF", value: "document" },
        { text: 'Ações', value: 'actions', sortable: false },
      ],
      dialogDelete: false,
      studentIdToDelete: '',
    }
  },
  methods: {
    retrieveStudents() {
      Backend.getAll()
        .then((response) => {
          this.students = response.data
        })
        .catch((e) => {
          console.log(e)
        })
    },
    refreshList() {
      this.retrieveStudents()
    },
    editStudent(id) {
      this.$router.push({ name: "student-edit", params: { id: id } })
    },
    deleteStudent(id) {
      this.dialogDelete = true
      this.studentIdToDelete = id
    },
    deleteConfirm () {
      Backend.remove(this.studentIdToDelete)
        .then(() => {
          this.refreshList()
        })
        .catch((e) => {
          console.log(e)
        })
      this.closeDelete()
    },
    closeDelete () {
      this.dialogDelete = false
      this.studentIdToDelete = ''
    },
    createStudent() {
      this.$router.push({ name: "student-create" })
    },
  },
  mounted() {
    this.retrieveStudents()
  },
  watch: {
    dialogDelete (value) {
      value || this.closeDelete()
    },
  },
}
</script>

<style>
.list {
  max-width: 70%;
}
</style>

