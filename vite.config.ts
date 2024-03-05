import { URL, fileURLToPath } from "url";
import react from "@vitejs/plugin-react-swc";
import million from "million/compiler";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	base: "./",
	resolve: {
		alias: [
			{
				find: "@",
				replacement: fileURLToPath(new URL("./src", import.meta.url)),
			},
		],
	},
	plugins: [million.vite({ auto: true }), react()],
});
