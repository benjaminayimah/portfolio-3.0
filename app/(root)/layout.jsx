'use client'

import React, { useRef, useState, useEffect } from 'react'
import { useUIStore } from '@/store';
import { ReactLenis } from 'lenis/react'
import Cursor from '../components/Cursor';
import Hamburger from "../components/Hamburger";
import Menu from "../components/Menu";

function RootLayout({ children }) {
  const { device, mobileMenu, toggleMenu } = useUIStore();
  const logoRef = useRef(null);
  const menuRef = useRef(null);

  const [showHamburger, setShowHamburger] = useState(device === 'mobile')

  

   useEffect(() => {
    // Always visible on mobile
    if (device === 'mobile' && mobileMenu) {
      setShowHamburger(true)
      return
    }

    const handleScroll = () => {
      setShowHamburger(window.scrollY >= 80)
    }

    handleScroll() // run once on mount
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [device, mobileMenu])


  return (
    <ReactLenis root options={{ smooth: true, lerp: 0.1 }}>
      <main id="app">
        <Cursor stickyElements={[logoRef]} />
        { showHamburger && (
          <Hamburger ref={menuRef} mobileMenu={mobileMenu} toggleMenu={toggleMenu} />
        )}
        {/* <Hamburger ref={menuRef} handleToggle={handleToggle} menuIsActive={isActive} /> */}
        <Menu mobileMenu={mobileMenu} toggleMenu={toggleMenu} />
          {children}
      </main>
    </ReactLenis>
  )
}

export default RootLayout