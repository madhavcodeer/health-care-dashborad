/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                med: {
                    bg: "#F4F7FE", // Soft background from image
                    primary: "#4318FF", // Vibrant Royal Blue
                    secondary: "#6AD2FF", // Light Blue
                    card: "#ffffff",
                    text: "#2B3674", // Dark Navy
                    muted: "#A3AED0", // Gray text
                    success: "#05CD99", // Green
                    warning: "#FFB547", // Orange
                    danger: "#EE5D50", // Red
                }
            },
            fontFamily: {
                sans: ['"DM Sans"', '"Inter"', 'sans-serif'], // DM Sans is very common in these modern dashboards
            },
            boxShadow: {
                'soft': '0px 18px 40px rgba(112, 144, 176, 0.12)',
                'card': '0px 3px 20px rgba(112, 144, 176, 0.08)',
            },
            borderRadius: {
                '3xl': '24px',
                '4xl': '32px',
            }
        },
    },
    plugins: [],
}
