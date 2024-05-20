import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import { Input } from './ui/Input'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Pages', path: '/pages' },
  { name: 'Shop', path: '/shop' },
  { name: 'Projects', path: '/projects' },
  { name: 'News', path: '/news' },
]

const NavBar = () => (
  <nav className="flex gap-10 font-bold text-xl text-greenDark">
    {navLinks.map(({ name, path }) => (
      <Link key={path} href={path}>
        {name}
      </Link>
    ))}
  </nav>
)

const Basket = () => (
  <div className="p-1.5 border rounded-[33px] border-[#E0E0E0] flex items-center gap-2 w-40">
    <Image
      src="/basket.svg"
      alt="basket"
      width={56}
      height={56}
      className="w-14 h-14"
    />
    <div className="font-semibold text-lg text-greenDark">Cart (0)</div>
  </div>
)

const Header = () => (
  <header className="bg-white flex justify-center">
    <MaxWidthWrapper className="max-w-[1595px] py-16 flex justify-between">
      <div className="flex items-center justify-between w-[913px]">
        <div className="flex items-center gap-2">
          <Image
            src="/Logo.svg"
            alt="logo"
            width={36}
            height={53}
            className="w-9 h-[53px]"
          />
          <h1 className="text-[38px] font-bold text-greenDark">Organick</h1>
        </div>
        <NavBar />
      </div>
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-4 border border-[#E0E0E0] rounded-[33px]">
          <Input className="border-0 focus:outline-none" />
          <Image
            src="/search.svg"
            alt="Search"
            width={56}
            height={56}
            className="w-14 h-14 mr-1.5"
          />
        </label>
        <Basket />
      </div>
    </MaxWidthWrapper>
  </header>
)

export default Header
