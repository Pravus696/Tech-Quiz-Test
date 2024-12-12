import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    specPattern: "cypress/component/**/*.cy.{js,jsx}",
  },

  e2e: {
    baseUrl: 'http://localhost:3001',
  },
  });
