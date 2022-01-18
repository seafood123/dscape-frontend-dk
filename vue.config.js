module.exports = {
  css: {
    loaderOptions: {
      sass: {},
    },
  },
  devServer: {
    port: 8000,
    proxy: "http://localhost:3000"
  },
  publicPath: "/"
};
