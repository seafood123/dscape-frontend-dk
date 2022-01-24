<template lang="pug">
#sign-up-page
  .sign-up-box
    .sign-up-box-contents
      .sign-up-row
        .title
          span ID
        .content
          .id
            input.borderless(
              :class="{ error: hasError.userId.status, correct: idConfirmFlag && !hasError.userId.status }",
              name="id",
              v-model="user.userId",
              @input="resetFlag"
            )
            .length-calculator {{ idLength }} / 30
            .button.mini(@click="isDuplicateUser")
              span 중복확인
          .error-message(v-if="hasError.userId.status") {{ hasError.userId.message }}
      .sign-up-row
        .title
          span PASSWORD
        .content
          input.borderless(
            name="password",
            type="password",
            v-model="user.password",
            @input="resetErrorStatus('password')"
          )
      .sign-up-row
        .title
          span PASSWORD 확인
        .content
          input.borderless(
            name="confirm-password",
            type="password",
            v-model="user.confirmPassword",
            :class="{ correct: matchPassword }"
          )
          .error-message(v-if="hasError.password.status") {{ hasError.password.message }}
      .sign-up-row
        .title
          span NAME
        .content
          input.borderless(name="name", type="text", v-model="user.name")
      .sign-up-row
        .title
          span PHONE
        .content
          input.borderless(
            type="phone",
            name="phoneNo",
            v-model="user.phoneNo",
            placeholder="010-1234-5678"
          )
      .sign-up-row
        .title
          span EMAIL
        .content
          input.borderless(
            type="email",
            name="email",
            :class="{ error: emailError }",
            v-model="user.email",
            placeholder="example@sample.com",
            @input="resetErrorStatus('email')"
          )
          .error-message(v-if="hasError.email.status") {{ hasError.email.message }}
    .sign-up-box-footer
      .button(@click="submit")
        span 가입하기
</template>
<script>
import { isEmpty } from "lodash";
export default {
  data() {
    return {
      idConfirmFlag: false,
      user: {
        userId: "",
        password: "",
        confirmPassword: "",
        name: "",
        phoneNo: "",
        email: "",
      },
      hasError: {
        password: {
          status: false,
          message: "",
        },
        email: {
          status: false,
          message: "",
        },
        userId: {
          status: "",
          message: "",
        },
      },
    };
  },
  methods: {
    isEmpty: isEmpty,
    async signUpUser() {
      await this.$axios.post("/user/create", {
        user: this.user,
      });
    },
    async isDuplicateUser() {
      this.idConfirmFlag = true;
      const result = await this.$axios.get(
        "http://localhost:3000/user/duplicate",
        {
          params: {
            userId: this.user.userId,
          },
        }
      );

      if (result.data.errorCode === 451) {
        this.hasError.userId.status = true;
        this.hasError.userId.message = "이미 존재하는 ID 입니다.";
      } else {
        this.resetErrorStatus("userId");
      }
    },
    validateEmail(value) {
      // if the field is empty
      if (!value) {
        return false;
      }
      // if the field is not a valid email
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!regex.test(value)) {
        return false;
      }
      // All is good
      return true;
    },
    async submit() {
      // 1. ID 중복 확인을 했는가..!
      if (!this.idConfirmFlag) {
        this.hasError.userId.status = true;
        this.hasError.userId.message = "ID 중복확인을 해주세요.";
        return;
      }

      // 2. password 확인과 같나.
      if (isEmpty(this.user.password)) {
        this.hasError.password.status = true;
        this.hasError.password.message = "비밀번호를 입력하세요.";
        return;
      }
      if (this.hasError.password.status) {
        return;
      }

      // 3. email 형식이 맞는가 ?
      if (!this.validateEmail(this.user.email)) {
        this.hasError.email = {
          status: true,
          message: "email 형식이 맞지 않습니다.",
        };
        return;
      }

      const result = await this.$axios.post("/user/create", {
        ...this.user,
      });

      console.log(result);
    },
    resetFlag() {
      this.hasError.userId.status = false;
      this.idConfirmFlag = false;
    },
    resetErrorStatus(key) {
      this.hasError[key].status = false;
    },
  },
  computed: {
    idLength() {
      return this.user.userId.length || 0;
    },
    matchPassword(e) {
      console.log(e);
      if (isEmpty(this.user.password)) return;
      if (isEmpty(this.user.confirmPassword)) return true;
      return this.user.password === this.user.confirmPassword;
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
        height: 100%;
        width: 100%;
        justify-content: space-around;
        align-items: center;
        & > .title {
          width: 50%;
          text-align: center;
          border-right: 2px solid black;
        }
        & > .content {
          display: flex;
          flex-direction: row;
          margin-left: 50px;
          width: 50%;
          .id {
            display: flex;
            .length-calculator {
              margin-top: auto;
              margin-left: 5px;
              width: 35px;
              font-size: 5px;
            }
          }
          .error-message {
            font-size: 5px;
            color: red;
            margin-top: auto;
            margin-left: 5px;
          }
        }
        .mini {
          width: 50px;
          font-size: 10px;
          height: 20px;
          margin: auto 0 auto 10px;
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
