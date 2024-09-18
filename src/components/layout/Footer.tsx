import { footerMenuItems, footerSocialIcons } from '@/constants/footer'
import React from 'react'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full flex justify-between items-center bg-gray-darkest  border border-opacity-medium rounded-lg p-8 ">
        <div className="flex items-center flex-wrap gap-6 md:gap-4">
          {footerMenuItems.map(item => (
            <div key={item.id} className="text-sm font-light text-gray-400 hover:cursor-pointe">
              {item.value}
            </div>
          ))}
        </div>
        <div className="flex gap-6 md:gap-4">
          {footerSocialIcons.map(item => (
            <div key={item.id}>
              <item.Img className="w-5 h-5 text-gray-400 hover:cursor-pointer" />
            </div>
          ))}
        </div>

      </div>
      <div className="text-center text-lightGreyText text-base">
        {`© ${currentYear} Dashboard.com. My Best Project.`}
      </div>
    </div>
  )
}

export default Footer
