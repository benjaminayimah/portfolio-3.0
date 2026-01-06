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
import SpinBadge from '../SpinBadge'

function Banner() {
  const [loaded, setLoaded] = useState(false)
  const banner_min_base64 = "data:image/png;base64,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"

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
    <section ref={targetRef} className="h-screen md:h-[102vh] bg-[#9DA1A4] relative">
      <div className="flex flex-col h-full relative overflow-hidden">
        <MotionImage
          style={{ translateY: translateY}}
          src="https://res.cloudinary.com/dl4wyqxbe/image/upload/v1767615399/banner_jrfwqh.png"
          blurDataURL={banner_min_base64}
          alt='Banner image'
          placeholder="blur"
          onLoadingComplete={() => setLoaded(true)}
          data-loaded={loaded}
          className={`
            h-full w-auto absolute left-1/2 -translate-x-1/2 object-cover pointer-events-none select-none z-0 will-change-transform
            ${loaded ? 'scale-100 blur-0' : 'scale-105 blur-sm'}
          `}
          width={1920}
          height={1080}
        />
        <div className='flex justify-center absolute bottom-20 md:bottom-1/2 left-1/2 translate-y-1/2 -translate-x-1/2 z-10'>
          <div className='w-[92vw] sm:w-[90vw] max-w-448 flex justify-between items-center md:flex-row-reverse'>
            <div className='max-w-70 text-sm text-white'>
              <p>A UX designer and Engineer  passionate about creating thoughtful, user-centered digital experiences that are both intuitive and accessible.</p>
            </div>
            <div>
              <SpinBadge />
            </div>
          </div>
        </div>

        <div className="overflow-hidden absolute bottom-1/3 md:bottom-8 w-full">
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
  )
}

export default Banner


function ScrollerText() {
  return (
    <div className="flex items-center">
      <h1 className="text-white text-[160px] md:text-[240px] font-medium whitespace-nowrap">
        Benjamin Ayimah<span className="mx-8">—</span>
      </h1>
    </div>
  )
}