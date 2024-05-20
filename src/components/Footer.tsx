import Image from 'next/image'
import React from 'react'

const ContactItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col items-end pb-7">
    <div className="font-bold text-grayDark text-xl">{label}</div>
    <p className="text-lg text-grayDark font-normal">{value}</p>
  </div>
)

const Logo = () => (
  <div className="flex flex-row gap-2 items-center justify-center">
    <Image src="/Logo.svg" alt="logo" width={36} height={54} />
    <h3 className="font-bold text-4xl text-greenDark">Organick</h3>
  </div>
)

const SocialIcons = () => (
  <div className="flex flex-row gap-4 justify-center">
    <Image src="/instagram.svg" alt="instagram" width={60} height={60} />
    <Image src="/Facebook.svg" alt="facebook" width={60} height={60} />
    <Image src="/Twitter.svg" alt="Twitter" width={60} height={60} />
    <Image src="/email.svg" alt="email" width={60} height={60} />
  </div>
)

const UtilityPages = () => (
  <>
    <UtilityPageItem text="Style Guide" />
    <UtilityPageItem text="404 Not Found" />
    <UtilityPageItem text="Password Protected" />
    <UtilityPageItem text="Licenses" />
    <UtilityPageItem text="Changelog" />
  </>
)

const UtilityPageItem = ({ text }: { text: string }) => (
  <p className="text-lg text-grayDark font-normal pb-3">{text}</p>
)

const Footer = () => {
  return (
    <footer className="mt-28">
      <div className="flex flex-row gap-10 justify-center pb-[138px]">
        <div className="flex flex-col items-end pr-10 border-r-[1px] border-grayMedium">
          <h4 className="font-bold text-3xl text-greenDark pb-8">Contact Us</h4>
          <ContactItem label="Email" value="needhelp@Organia.com" />
          <ContactItem label="Phone" value="666 888 888" />
          <ContactItem label="Address" value="88 road, borklyn street, USA" />
        </div>
        <div className="flex flex-col items-center gap-6 max-w-[543px] pr-10 border-r-[1px] border-grayMedium">
          <Logo />
          <p className="font-normal text-lg text-grayDark font-openSans text-center pb-6">
            Simply dummy text of the printing and typesetting industry. Lorem
            Ipsum simply dummy text of the printing
          </p>
          <SocialIcons />
        </div>
        <div className="flex flex-col items-start">
          <h4 className="font-bold text-3xl text-greenDark pb-8">
            Utility Pages
          </h4>
          <UtilityPages />
        </div>
      </div>
      <div className="text-center text-lg text-grayDark font-normal pt-6 pb-4 border-t-[1px] border-grayMedium font-openSans">
        Copyright © <span className="font-bold">Organick</span>
      </div>
    </footer>
  )
}

export default Footer
