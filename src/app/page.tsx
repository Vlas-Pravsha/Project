import Footer from '@/components/layout/Footer'
import MainLayout from '@/components/layout/MainLayout'

export default function Home() {
  return (
    <MainLayout>
      <div className="flex flex-col gap-4">
        <div className="w-3/6 h-96 bg-componentBg border border-borderColor rounded-xl p-6">Hello World!</div>
        <Footer />
      </div>
    </MainLayout>
  )
}
