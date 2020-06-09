module.exports = {
  webpack: {
    configure: {
      target: "electron-renderer"
    }
  },
  eslint: {
    configure: {
      rules: {
        "no-control-regex": 0
      }
    }
  }
};
