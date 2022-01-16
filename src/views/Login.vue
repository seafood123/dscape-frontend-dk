<template lang="pug">
#loginPage
  .login-box
    .login-box-left
      //- img(src="minions-login.png")
    .login-box-right
      .login-area
        .area
          span ID
          input(type="text", placeholder="id")
        .area
          span PASSWORD
          input.borderless(type="text", placeholder="PASSWORD")
        .btn-area
          .button(@click="loginPromise")
            span 로그인
          .button 
            span 계정 찾기
</template>

<script>
import axios from "axios";
export default {
  methods: {
    loginPromise: async () => {
      const data = await axios.get("/user/lists");
      alert(data);
    },
    login: () => {
      axios
        .get("/user/lists")
        .then((res) => {
          console.log(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style scoped lang="scss">
#loginPage {
  display: flex;
  height: 100%;
  width: 100%;
  .login-box {
    width: 70%;
    height: 500px;
    border: 1px solid #35495e;
    display: flex;
    margin: auto;
    &-left {
      width: 50%;
      height: 100%;
      background-color: white;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      background-image: url("../assets/images/minions-login.png");
    }
    &-right {
      width: 100%;
      background-color: #ffd365;
      display: flex;
      & > .login-area {
        font-size: 14px;
        width: 50%;
        display: flex;
        flex-direction: column;
        margin: auto;
        & > .area {
          width: 100%;
          display: flex;
          padding: 5px 0;
          height: 30px;
          span {
            margin: auto;
            width: 100%;
          }
          input {
            width: 100%;
          }
        }
        & > .btn-area {
          & > .button {
            width: 100%;
            height: 30px;
            display: flex;
            span {
              margin: auto;
            }
          }
          .button + .button {
            margin-top: 4px;
          }
        }
      }
    }
  }
}
</style>
