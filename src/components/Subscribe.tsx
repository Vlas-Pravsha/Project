import Image from 'next/image'
import React from 'react'
import { Input } from './ui/Input'
import Button from './ui/Button'

const Subscribe = () => {
  return (
    <div className="flex justify-center mt-[140px]">
      <div className="bg-[url('/subscribe.jpg')] w-[1400px] h-[323px] p-[72px]">
        <div className="flex flex-row items-center justify-between h-full">
          <h3 className="text-5xl leading-tight font-extrabold text-white max-w-[357px]">
            Subscribe to our Newsletter
          </h3>
          <div className="flex flex-row items-center gap-1.5">
            <Input
              placeholder="Your Email Address"
              className="bg-white w-[349px] rounded-xl h-[80px]"
            />
            <Button variant="secondary">Subscribe</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Subscribe
