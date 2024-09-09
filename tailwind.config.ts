import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      gray400: 'var(--gray-400)', /* ligthGreyText */
      gray700: 'var(--gray-700)', /* darkGreyBg */
      blue900: 'var(--blue-900)', /* blue600Bg */
      gray800: 'var(--gray-800)', /* componentBg */
      gray50Opacity: 'var(--gray-50-opacity)', /* hoverBg */
      black: 'var(--black)', /* blackColor */
      gray500: 'var(--gray-500)', /* ligthTextColor */
      blue500: 'var(--blue-500)', /* linkColorBlue */
      blue600: 'var(--blue-600)', /* blue600 */
      gray100: 'var(--gray-100)', /* nav-textColor */
      gray100Opacity: 'var(--gray-100-opacity)', /* gray100Opacity */
      gray700Bg: 'var(--gray-700-bg)', /* profileHeaderBg */
      gray200: 'var(--gray-200)', /* profileTextColor */
      gray400Bg: 'var(--gray-400-bg)', /* nodeInputBg */
      gray600HoverBg: 'var(--gray-600-hover-bg)', /* dashboardHoverColorBg */
      gray500Icon: 'var(--gray-500-icon)', /* iconsColor */
      red500: 'var(--red-500)', /* iconsColor */
      white: 'var(--white)',
    },
    fontFamily: {
      roboto: 'var(--font-roboto)',
      openSans: 'var(--font-open-sans)',
      yellowtail: 'var(--font-yellowtail)',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

export default config
