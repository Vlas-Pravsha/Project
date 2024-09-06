import Footer from '@/components/layout/Footer'
import MainLayout from '@/components/layout/MainLayout'

export default function Home() {
  const currentYear = new Date().getFullYear()

  return (
    <MainLayout>

      <div className="flex flex-col gap-4">
        <div className="w-3/6 h-96 bg-componentBg border border-borderColor rounded-xl p-6">Hello World!</div>
        <Footer />
        <div className="text-center text-lightGreyText text-base">
          {`© ${currentYear} Dashboard.com. My Best Project.`}
        </div>
      </div>

    </MainLayout>
  )
}
