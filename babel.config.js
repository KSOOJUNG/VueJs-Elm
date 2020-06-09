module.exports = {
  presets: ["@vue/app"],
  plugins: [
    ["component", 
    {
      "libraryName": "mint-ui",
      "style": true
    }
  ],
],
ignore: ["./src/assets/mui/js/mui.js"]
};
