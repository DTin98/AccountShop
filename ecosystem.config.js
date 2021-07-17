module.exports = {
  apps: [
    {
      name: "AccountShop",
      script: "./dist/main.js",
      exec_mode: "cluster_mode",
      instances: 2,
      autorestart: true,
    },
  ],
};
