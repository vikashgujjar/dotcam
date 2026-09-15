"use client"
import React from 'react'
import Navbar from './component/Navbar'
import Footer from './component/Footer'
import CustomCursor from './component/CustomCursor'
import BottomServicesStrip from './component/BottomServicesStrip'
import { usePathname, useRouter } from 'next/navigation'

const InnerLayout = ({ children }) => {
  //   const router = useRouter();
  //   const pathname = router.pathname();
  //   const showNavbarFooter = ;
  //   console.log(router)

  const pathname = usePathname()
  const normalizedPath = pathname.replace(/\/$/, "")
  const isLightFooter = normalizedPath === "/dotcam-studio"
  const hideFooter = normalizedPath === "/auth"


  return (
    <>
      {pathname.includes("admin") ? <>{children}</> : <div className='bg-black pl-0 md:pl-[75px]'>
        <CustomCursor />
        <Navbar />
        <div className="mt-10 md:mt-0"></div>
        {children}
        {!hideFooter && <Footer light={isLightFooter} />}
        <BottomServicesStrip />
      </div>}
    </>
  )
}

export default InnerLayout;
