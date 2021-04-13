<template>
  <div>
    <!-- <button @click="getReq">submit</button>
    <textarea cols="30" rows="10" v-model="getMd"></textarea>

    <button @click="postReq">submit</button>
    <textarea cols="30" rows="10" v-model="postMd"></textarea>
    

    <button @click="putReq">submit</button>
    <textarea cols="30" rows="10" v-model="putMd"></textarea>


    <button @click="delReq">submit</button>
    <textarea cols="30" rows="10" v-model="delMd"></textarea> -->
    <v-card
      class="mx-auto"
      max-width="344"
      v-for="u in users" :key="u._id"
    >
      <v-img
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        height="200px"
      ></v-img>

      <v-card-title>
        {{u.name}}
      </v-card-title>

      <v-card-subtitle>
        {{u.age}}
      </v-card-subtitle>

      <v-card-actions>
        <v-btn
          color="orange"
          text
          @click="putDialog(u)"
        >
          수정
        </v-btn>
        <v-btn
          color="error"
          text
          @click="delUser(u._id)"
        >
          삭제
        </v-btn>

        <v-spacer></v-spacer>

      </v-card-actions>

    </v-card>
    
    <v-btn
      v-show="!hidden"
      color="pink"
      fab
      dark
      small
      absolute
      bottom
      right
      @click="modalUp"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="name*"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                  v-model="userName"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  :items="userAges"
                  label="Age*"
                  required
                  v-model="userAge"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="putUser"
          >
            수정
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            닫기
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="postUser"
          >
            저장
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar"
    >
      {{ sbMsg }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>

</template>

<script>
import axios from 'axios'

console.log(process.env.NODE_ENV)

export default {

    data () {
      return {
        users: [],
        getMd: '',
        postMd: '',
        putMd: '',
        delMd: '',
        dialog: false,
        userAges: [
        ],
        userAge: 0,
        userName: '',
        snackbar: false,
        sbMsg: '',
        hidden: false,
        putId: '',
      }

    },
    mounted() {
        for (let i = 10; i < 40; i++) this.userAges.push(i)
        this.getUsers()
    },

    methods: {
      getReq () {
        axios.get('/api/user')

        .then((r) => {
            this.getMd = JSON.stringify(r.data)
        })
        .catch((e) => {
            console.error(e.message)
        })
      },
      postReq () {
        axios.post('/api/user', {
          name: '가정', age: 444
        })

        .then((r) => {
            this.postMd = JSON.stringify(r.data)
        })
        .catch((e) => {
            console.error(e.message)
        })
      },
      putReq () {
        axios.put('/api/user')

        .then((r) => {
            this.putMd = JSON.stringify(r.data)
        })
        .catch((e) => {
            console.error(e.message)
        })
      },
      delReq () {
        axios.delete('/api/user')

        .then((r) => {
            this.delMd = JSON.stringify(r.data)
        })
        .catch((e) => {
            console.error(e.message)
        })
      },
      modalUp() {
        this.dialog = true
        this.userName = ''
        this.userAge = ''
        this.putId = ''
      },
      postUser() {
        this.dialog = false
        console.log(this.userName, this.userAge)
        axios.post(`${this.$apiRootPath}user`, {
          name: this.userName, age: this.userAge
        })

        .then(() => {
          this.pop('사용자 등록 완료.')
          this.getUsers()
        })
        .catch((e) => {
          this.pop(e.message)
        })
      },
      getUsers () {
        axios.get(`${this.$apiRootPath}user`)

        .then((r) => {
            this.users = r.data.users
        })
        .catch((e) => {
          this.pop(e.message)
        })
      },
      putDialog (user) {
        this.userName = user.name
        this.userAge = user.age
        this.putId = user._id
        this.dialog = true
      },
      putUser() {
        this.dialog = false
        axios.put(`${this.$apiRootPath}user/${this.putId}`, {
          name: this.userName, age: this.userAge
        })

        .then(() => {
          this.pop('사용자 수정 완료.')
          this.getUsers()
        })
        .catch((e) => {
          this.pop(e.message)
        })
      },
      delUser(id) {
        axios.delete(`${this.$apiRootPath}user/${id}`)

        .then(() => {
          this.pop('사용자 삭제 완료.')
          this.getUsers()
        })
        .catch((e) => {
          this.pop(e.message)
        })
      },
      pop (msg) {
        this.snackbar = true
        this.sbMsg = msg
      }
    }
}
</script>

<style>

</style>