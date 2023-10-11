import { CodegenConfig } from "@graphql-codegen/cli";
import "dotenv/config";

const config: CodegenConfig = {
  schema: [
    {
      [process.env.VITE_API_URL ?? ""]: {
        headers: {
          Secret: process.env.secret ?? "",
          accept:
            "application/graphql-response+json, application/json, multipart/mixed",
        },
      },
    },
  ],
  documents: ["src/**/*.ts", "src/**/*.tsx"],
  generates: {
    "./src/__generated__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
      config: {
        scalars: {
          DateTime: "string",
        },
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
