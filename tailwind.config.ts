import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      white: 'var(--color-white)',
      greenDark: 'var(--color-green-dark)',
      greenMedium: 'var(--color-green-medium)',
      greenLight: 'var(--color-green-light)',
      yellow: 'var(--color-yellow)',
      grayDark: 'var(--color-gray-dark)',
      grayMedium: 'var(--color-gray-medium)',
      grayLight: 'var(--color-gray-light)',
    },

    fontFamily: {
      openSans: 'var(--font-open-sans)',
      roboto: 'var(--font-roboto)',
      yellowtail: 'var(--font-yellowtail)',
    },

    extend: {
      backgroundImage: {
        'gradient-radial':
          'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
