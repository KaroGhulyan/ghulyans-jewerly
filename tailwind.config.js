/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: "#faf8f3",
                    100: "#f5f0e6",
                    200: "#e8dcc4",
                    300: "#d9c5a0",
                    400: "#c9ad7c",
                    500: "#b8935a",
                    600: "#9a7847",
                    700: "#7a5f39",
                    800: "#5c4830",
                    900: "#3e3228",
                },
            },
            backgroundImage: {
                "gradient-gold": "linear-gradient(135deg, #b8935a 0%, #9a7847 100%)",
            },
        },
    },
    plugins: [],
}