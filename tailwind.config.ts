import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        gray100: 'var(--gray-100)', /* nav-text-color */
        gray400: 'var(--gray-400)', /* ligth-grey-text */
        gray500: 'var(--gray-500)', /* ligth-text-color */
        gray700: 'var(--gray-700)', /* dark-grey-bg */
        gray900: 'var(--gray-900)', /* dark-blue-bg */
        gray800: 'var(--gray-800)', /* component-bg */
        gray50Opacity: 'var(--gray-50-opacity)', /* hover-bg */
        blue500: 'var(--blue-500)', /* link-color-blue */
        blue600: 'var(--blue-600)', /* dark-blue */
        gray100Opacity: 'var(--gray-100-opacity)', /* border-color */
        gray700Bg: 'var(--gray-700-bg)', /* profile-header-bg */
        gray200: 'var(--gray-200)', /* profile-text-color */
        gray400Bg: 'var(--gray-400-bg)', /* node-input-bg */
        gray600HoverBg: 'var(--gray-600-hover-bg)', /* dashboard-hover-color-bg */
        gray500Icon: 'var(--gray-500-icon)', /* icons-color */
        red500: 'var(--red-500)', /* iconsColor */
      },
      fontFamily: {
        roboto: 'var(--font-roboto)',
        openSans: 'var(--font-open-sans)',
        yellowtail: 'var(--font-yellowtail)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-out': 'fadeOut 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}

export default config
