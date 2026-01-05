'use client'

import React, { useEffect, useRef, useState } from 'react'
import { animate, motion, useMotionValue, useSpring } from 'framer-motion'
import { useUIStore } from '@/app/store'



function Cursor({stickyElements}) {

  const { device } = useUIStore();
  const isMobile = device === 'mobile';

  const cursorRef = useRef(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false); 

  const cursorSize = !isVisible ? 0 : (isHovered ? 60 : 10);


  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0)
  }

  const smoothOptions = {
    damping: 20,
    mass: 0.5,
    stiffness: 200
  }
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions)
  }

  const scale = {
    x: useMotionValue(1),
    y: useMotionValue(1)
  }

  const manageMouseMove = (e) => {
    setIsVisible(true);

    const {clientX, clientY} = e;

    mouse.x.set(clientX - cursorSize / 2);
    mouse.y.set(clientY - cursorSize / 2);
  }
  const manageMouseOver = () => {
    setIsHovered(true);
    console.log('hovered')
  }
  const manageMouseLeave = () => {
    setIsHovered(false);
    animate(cursorRef.current, { scaleX: 1, scaleY: 1 }, { duration: 0.1 }, {type: 'spring'});  
  }

  const handleEnterPage = () => setIsVisible(true);
  const handleLeavePage = () => setIsVisible(false);

  useEffect(() => {
    if (!isMobile) {
        window.addEventListener('mousemove', manageMouseMove);

      // Attach event listeners to all sticky elements
      stickyElements.forEach(stickyElement => {
          stickyElement?.current?.addEventListener('mouseover', manageMouseOver);
          stickyElement?.current?.addEventListener('mouseleave', manageMouseLeave);
      });

      document.body.addEventListener('mouseenter', handleEnterPage);
      document.body.addEventListener('mouseleave', handleLeavePage);

      return () => {
          window.removeEventListener('mousemove', manageMouseMove);

          // Cleanup all sticky element listeners
          stickyElements.forEach(stickyElement => {
              stickyElement?.current?.removeEventListener('mouseover', manageMouseOver);
              stickyElement?.current?.removeEventListener('mouseleave', manageMouseLeave);
          });

          document.body.removeEventListener('mouseenter', handleEnterPage);
          document.body.removeEventListener('mouseleave', handleLeavePage);
      }
      
    }
  })

  return (
      <motion.div
        ref={cursorRef}
        className="fixed pointer-events-none rounded-3xl bg-black z-100 -left-3"
        style={{
            left: smoothMouse.x,
            top: smoothMouse.y,
            scaleX: scale.x,
            scaleY: scale.y
        }}
        animate={{width: cursorSize, height: cursorSize}}
      >
      </motion.div>
  )
}

export default Cursor