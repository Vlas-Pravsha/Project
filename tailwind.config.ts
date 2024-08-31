import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      lightGreyText: 'var(--ligth-grey-text)',
      darkGreyBg: 'var(--dark-grey-bg)',
      darkBlueBg: 'var(--dark-blue-bg)',
      componentBg: 'var(--component-bg)',
      hoverBg: 'var(--hover-bg)',
      blackColor: 'var(--black-color)',
      lightTextColor: 'var(--ligth-text-color)',
      linkColorBlue: 'var(--link-color-blue)',
      darkBlue: 'var(--dark-blue)',
      navTextColor: 'var(--nav-text-color)',
      borderColor: 'var(--border-color)',
      profileHeaderBg: 'var(--profile-header-bg)',
      profileTextColor: 'var(--profile-text-color)',
      nodeInputBg: 'var(--node-input-bg)',
      buttonColorText: 'var(--button-color-text)',
      dashboardHoverColorBg: 'var(--dashboard-hover-color-bg)',
      iconsColor: 'var(--icons-color)',
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
