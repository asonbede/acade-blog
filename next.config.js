const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: "bede",
        mongodb_password: "bede1974",
        mongodb_clustername: "cluster0",
        mongodb_database: "my-blog-site-dev",
        env_watch: "dev",
      },
    };
  }

  return {
    env: {
      mongodb_username: "bede",
      mongodb_password: "bede1974",
      mongodb_clustername: "cluster0",
      mongodb_database: "my-blog-site-prod",
      env_watch: "prod",
    },
  };
};
