module.exports = {
  css: {
    loaderOptions: {
      sass: {},
    },
  },
  devServer: {
    proxy: "http://localhost:3000"
  }
};
