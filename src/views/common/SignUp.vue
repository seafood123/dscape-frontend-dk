<template lang="pug">
#sign-up-page
  .sign-up-box
    .sign-up-box-contents
      .sign-up-row
        .title
          span ID
        .content
          input(type="text", v-model="user.userId")
      .sign-up-row
        .title
          span PASSWORD
        .content
          input(type="password", v-model="user.password")
      .sign-up-row
        .title
          span NAME
        .content
          input(type="text", v-model="user.name")
      .sign-up-row
        .title
          span PHONE
        .content
          input(
            type="text",
            v-model="user.phoneNo",
            placeholder="010-1234-5678"
          )
      .sign-up-row
        .title
          span EMAIL
        .content
          input(
            type="text",
            v-model="user.email",
            placeholder="example@sample.com"
          )
    .sign-up-box-footer
      .button(@click="signUpUser") 가입하기
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      user: {
        userId: "",
        password: "",
        name: "",
        phoneNo: "",
        email: "",
      },
    };
  },
  methods: {
    async signUpUser() {
      console.log(this.user);
      await axios.post("/user/create", {
        user: this.user,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
#sign-up-page {
  display: flex;
  height: 100%;
  width: 100%;
  .sign-up-box {
    width: 70%;
    height: 500px;
    border: 1px solid #35495e;
    height: 70%;
    display: flex;
    flex-direction: column;
    margin: auto;
    &-contents {
      padding: 20px 30px;
      display: flex;
      flex-direction: column;
      height: 70%;
      .sign-up-row {
        display: flex;
        flex-direction: row;
        margin: auto;
        width: 100%;
        justify-content: space-around;
        & > .title {
          width: 30%;
          text-align: center;
          border-right: 2px solid black;
        }
      }
    }
    &-footer {
      height: auto;
      margin: auto;
    }
  }
}
</style>
