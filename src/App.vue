<template>
  <div id="nav">
    <router-link class="link" to="/">Home</router-link>
    <router-link class="link" to="/about">About</router-link>
    <router-link class="link" to="/login">로그인</router-link>
  </div>
  <router-view />
</template>

<style lang="scss">
@import "styles/global.scss";
body {
  height: 100vh;
  width: 100vw;
}

#app {
  font-family: "suit medium";
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
#nav {
  height: 20%;
  width: 80%;
  margin: auto;
  display: flex;
  & > .link {
    margin: auto;
    height: 50px;
  }
}
</style>
