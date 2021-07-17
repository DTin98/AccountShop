module.exports = {
  apps: [
    {
      name: "AccountShop",
      script: "npm start",
      exec_mode: "cluster_mode",
      instances: 2,
      autorestart: true,
    },
  ],
  deploy: {
    production: {
      host: "0.0.0.0",
      user: "deploy",
      ssh_options: ["ForwardAgent=yes"],
      ref: "origin/master",
      repo: "git@github:repo/repo.git",
      path: "/path/to/project",
      env: {
        NODE_ENV: "production",
      },
    },
  },
};
