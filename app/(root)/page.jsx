'use client'

import React, { useRef, useLayoutEffect, useState } from 'react'
import {
  motion,
  useAnimationFrame,
  useScroll,
  useSpring,
  useVelocity,
  useTransform,
  useMotionValue,
} from 'framer-motion'
import { wrap } from '@motionone/utils'
import Image from 'next/image'
import SpinBadge from '../components/SpinBadge'
import Header from '../components/Header'


function Home() {
  const MotionImage = motion.create(Image)
  const baseX = useMotionValue(0)
  const containerRef = useRef(null)
  const targetRef = useRef(null)
  const [width, setWidth] = useState(0)

  // Measure the width of one text block
  useLayoutEffect(() => {
    if (!containerRef.current) return
    setWidth(containerRef.current.offsetWidth)
  }, [])

  // Page scroll
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)

  // Smooth velocity
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  })

  // Scroll direction + speed
  const velocityFactor = useTransform(
    smoothVelocity,
    [1000, 0, -1000],
    [-5, 0, 5],
    { clamp: false }
  )

  useAnimationFrame((_, delta) => {
    let moveBy = 0.1 * delta
    moveBy += velocityFactor.get() * moveBy

    baseX.set(
      wrap(-width, 0, baseX.get() + moveBy)
    )
  })

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start']
  })

  const translateY = useTransform(scrollYProgress, [0, 1], ['0px', '10vh'])

  return (
    <>
      <section ref={targetRef} className="h-[102vh] bg-[#9DA1A4] relative">
        <div className="flex flex-col h-full justify-between relative overflow-hidden">
          <MotionImage
            style={{ translateY: translateY}}
            src="https://res.cloudinary.com/dl4wyqxbe/image/upload/v1767615399/banner_jrfwqh.png"
            alt='Banner image'
            priority
            width={1920}
            height={1080}
            className="h-full w-auto absolute left-1/2 -translate-x-1/2 object-cover pointer-events-none select-none z-0"
          />
          <Header />
          <div className='flex justify-center'>
            <div className='w-[92vw] sm:w-[90vw] max-w-448 flex justify-between items-center absolute top-1/2 -translate-y-1/2 z-10'>
              <div>
                <SpinBadge />
              </div>
              <div className='max-w-70 text-sm text-white'>
                <p>A UX designer and Engineer  passionate about creating thoughtful, user-centered digital experiences that are both intuitive and accessible.</p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden">
            <motion.div
              className="flex whitespace-nowrap will-change-transform"
              style={{ x: baseX }}
            >
              {/* Measure ONE instance */}
              <div ref={containerRef} className="flex">
                <ScrollerText />
              </div>

              {/* Duplicate for seamless loop */}
              <ScrollerText />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="h-screen" />
    </>
  )
}

export default Home

function ScrollerText() {
  return (
    <div className="flex items-center">
      <h1 className="text-white text-[160px] md:text-[240px] font-medium whitespace-nowrap">
        Benjamin Ayimah<span className="mx-8">—</span>
      </h1>
    </div>
  )
}
