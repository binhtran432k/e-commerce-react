/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			keyframes: {
				appear: {
					"0%": { opacity: 0, transform: "scale(.3,.3)" },
					"100%": { opacity: 1, transform: "scale(1,1)" },
				},
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
				appear: "appear .3s forwards",
				fadeIn: "fadeIn .3s forwards",
				fadeOut: "fadeOut .3s forwards",
				moveUp: "moveUp .3s forwards",
			},
		},
	},
	plugins: [],
};
