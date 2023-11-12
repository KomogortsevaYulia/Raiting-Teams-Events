import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { fileURLToPath, URL } from "node:url";
import { loadEnv } from "vite";

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    define:{
      'process.env':{
        BITRIX_CLIENT_ID:env.BITRIX_CLIENT_ID,
        CAMPUS_LOGIN:env.CAMPUS_LOGIN
      }
    },
    plugins: [vue(), vueJsx()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      port: Number(env.PORT),
      proxy: {
        "/api": env.PROXY,
      },
    },
  };
});
