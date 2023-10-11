require('dotenv/config')

// eslint-disable-next-line no-undef
module.exports = {
  client: {
    service: {
      name: "social",
      url: process.env.VITE_API_URL,
      headers: {
        Secret: process.env.secret ?? "",
        accept:
          "application/graphql-response+json, application/json, multipart/mixed",
      },
    },
  },
};
