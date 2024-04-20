/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			keyframes: {
				fadeIn: {
					"0%": { opacity: 0, display: "none" },
					"100%": { opacity: 1 },
				},
				fadeOut: {
					"0%": { opacity: 1 },
					"100%": { opacity: 0, display: "none" },
				},
				moveUp: {
					"0%": { transform: "translateY(0)" },
					"100%": { transform: "translateY(-100%)" },
				},
			},
			animation: {
				fadeIn: "fadeIn 300ms forwards",
				fadeOut: "fadeOut 300ms forwards",
				moveUp: "moveUp 300ms forwards",
			},
		},
	},
	plugins: [],
};
