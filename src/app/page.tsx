'use client'

import Header from "@/components/Header";
import Sidebar from "@/components/NavBar";
import { useState } from "react";

export default function Home() {

const [open, setOpen] = useState(false)

  return (
    <section>
      <Header setOpen={setOpen}></Header>
      <Sidebar open={open}/>
    </section>
  )
}
