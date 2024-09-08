import { Facebook, Github, Instagram, Linkedin, Twitter } from 'lucide-react'
import React from 'react'

const footerData = [
  { id: crypto.randomUUID(), value: 'Terms and conditions' },
  { id: crypto.randomUUID(), value: 'Privacy Policy' },
  { id: crypto.randomUUID(), value: 'Licensing' },
  { id: crypto.randomUUID(), value: 'Cookie Policy' },
  { id: crypto.randomUUID(), value: 'Contact' },
]

const footerDataImg = [
  { id: crypto.randomUUID(), Img: Github },
  { id: crypto.randomUUID(), Img: Twitter },
  { id: crypto.randomUUID(), Img: Linkedin },
  { id: crypto.randomUUID(), Img: Facebook },
  { id: crypto.randomUUID(), Img: Instagram },
]

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full flex justify-between items-center bg-componentBg border border-borderColor rounded-lg p-8 dark:bg-white dark:border-gray-200">
        <div className="flex items-center flex-wrap gap-6 md:gap-4">
          {footerData.map(item => (
            <div key={item.id} className="text-sm font-light text-gray-400 hover:cursor-pointer dark:text-gray-600">
              {item.value}
            </div>
          ))}
        </div>
        <div className="flex gap-6 md:gap-4">
          {footerDataImg.map(item => (
            <div key={item.id}>
              <item.Img className="w-5 h-5 text-gray-400 hover:cursor-pointer dark:text-gray-500" />
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
