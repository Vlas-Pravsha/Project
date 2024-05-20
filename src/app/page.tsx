import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Button from '@/components/ui/Button'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <div className="flex items-center justify-center relative">
        <div className=" bg-[url('/Banner.jpg')] w-[1920px] h-[898px]">
          <Image
            src="/organicBackground.svg"
            alt="Background Images"
            width={1920}
            height={898}
            className="w-[1920px] h-[898px] absolute"
          />
          <MaxWidthWrapper className="max-w-[530px] m-0 flex items-start justify-center flex-col ml-60 ">
            <h5 className="text-4xl font-normal text-greenMedium font-yellowtail pb-2">
              100% Natural Food
            </h5>
            <h2 className="text-7xl leading-[1.15] font-extrabold text-greenDark pb-6">
              Choose the best healthier way <br />
              of life
            </h2>
            <Button arrow>Explore Now</Button>
          </MaxWidthWrapper>
        </div>
      </div>
      <section className="w-full flex justify-center items-center gap-9 mt-36">
        <div className="bg-[url('/pink.jpg')] w-[682px] h-[367px] flex flex-col justify-center">
          <MaxWidthWrapper className="max-w-64 flex  justify-center flex-col ml-10 gap-1.5">
            <h6 className="font-yellowtail text-4xl text-white font-normal">
              Natural!!
            </h6>
            <p className="text-[40px] leading-[1.15] text-white font-extrabold">
              Get Garden Fresh Fruits
            </p>
          </MaxWidthWrapper>
        </div>
        <div className="bg-[url('/grey.jpg')] w-[682px] h-[367px] flex flex-col justify-center">
          <MaxWidthWrapper className="max-w-[16.5rem] flex  justify-center flex-col ml-10 gap-1.5">
            <h6 className="font-yellowtail text-4xl text-greenMedium font-normal">
              Offer!!
            </h6>
            <p className="text-[40px] leading-[1.15] text-greenDark font-extrabold">
              Get 10% off on Vegetables
            </p>
          </MaxWidthWrapper>
        </div>
      </section>
      <section className="mt-36 bg-grayLight">
        <div className="flex items-center justify-center">
          <Image
            src="/bg.png"
            alt="Background Images"
            width={911}
            height={867}
            className="w-[911px] h-[867px]"
          />
          <MaxWidthWrapper className="max-w-[702px] m-0">
            <div className="flex flex-col">
              <h6 className="font-yellowtail text-4xl text-greenMedium font-normal pb-2">
                About Us
              </h6>
              <h2 className="text-5xl leading-tight font-extrabold text-greenDark pb-3.5">
                We Believe in Working Accredited Farmers
              </h2>
              <p className="font-openSans text-lg font-normal text-grayDark pb-11">
                Simply dummy text of the printing and typesetting industry.
                Lorem had ceased to been the industry&apos;s standard dummy text
                ever since the 1500s, when an unknown printer took a galley.
              </p>
            </div>
            <MaxWidthWrapper className="max-w-[564px] m-0">
              <div className="flex flex-row gap-5 pb-7">
                <div className="bg-white w-[100px] h-[100px] flex items-center justify-center rounded-2xl">
                  <Image
                    src="./Group.svg"
                    alt="Group Image"
                    width={46}
                    height={46}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="font-extrabold text-2xl text-greenDark">
                    Organic Foods Only
                  </h4>
                  <p className="font-openSans text-lg font-normal tracking-wide text-grayDark">
                    Simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-5 pb-12">
                <div className="bg-white w-[100px] h-[100px] flex items-center justify-center rounded-2xl">
                  <Image
                    src="./Group2.svg"
                    alt="Group Image"
                    width={56}
                    height={52}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="font-extrabold text-2xl text-greenDark">
                    Quality Standards
                  </h4>
                  <p className="font-openSans text-lg font-normal tracking-wide text-grayDark">
                    Simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum
                  </p>
                </div>
              </div>
              <Button arrow variant="secondary">
                Shop Now
              </Button>
            </MaxWidthWrapper>
          </MaxWidthWrapper>
        </div>
      </section>
    </>
  )
}
