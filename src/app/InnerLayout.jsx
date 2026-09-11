"use client"
import React from 'react'
import Navbar from './component/Navbar'
import Footer from './component/Footer'
import { usePathname, useRouter } from 'next/navigation'

const InnerLayout = ({ children }) => {
//   const router = useRouter();
//   const pathname = router.pathname();
//   const showNavbarFooter = ;
//   console.log(router)

const pathname = usePathname()


  return (
    <>
{pathname.includes("admin")?  <>{children}</>:<div className='bg-black pl-0 md:pl-[75px]'>
       <Navbar />
              <div className="mt-10 md:mt-0"></div>
              {children}
              <Footer />
              </div>}

    
    </>
  )
}

export default InnerLayout;
