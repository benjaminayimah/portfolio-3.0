'use client'

import React, { useEffect, useRef } from 'react'
import TextReveal from '../TextReveal'
import { motion, useAnimation, useInView } from 'framer-motion'

const words = [
  "Design,", "to", "me,", "is", "the", "art", "of", "making", "complexity", "feel", "effortless.",
  "I", "approach", "problems", "with", "curiosity,", "empathy,", "and", "structure", "—", "balancing", "human", "needs", "with", "technical", "reality.",
  "Through", "iteration", "and", "collaboration,", "I", "craft", "accessible,", "meaningful", "experiences", "that", "are", "built", "to", "last."
]

function HomeAbout() {
  const headingRef = useRef(null)
  const quoteRef = useRef(null)

  const aboutControls = useAnimation()
  const quoteControls = useAnimation()

  const headingInView = useInView(headingRef, { amount: 0.3 })
  const quoteInView = useInView(quoteRef, { amount: 0.3 })

  const lastScrollY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY
      const scrollingDown = currentY > lastScrollY.current

      // ENTERING from bottom → animate
      if (scrollingDown && headingInView) {
        aboutControls.start({
          y: 0,
          opacity: 1,
          transition: { duration: 1 }
        })
      }

      if (scrollingDown && quoteInView) {
        quoteControls.start({
          y: 0,
          opacity: 1,
          transition: { duration: 1 }
        })
      }

      // LEAVING downward → reset
      if (scrollingDown && !headingInView) {
        aboutControls.set({ y: '50px', opacity: 1 })
      }

      if (scrollingDown && !quoteInView) {
        quoteControls.set({ y: '50px', opacity: 1 })
      }

      lastScrollY.current = currentY
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [headingInView, quoteInView, aboutControls, quoteControls])

  return (
    <section id="about" className='shadow-[0_30px_103px_10px_#000] bg-white relative z-1'>
      <div className='flex justify-center'>
        <div className='w-[92vw] sm:w-[77vw] max-w-448 py-25 md:py-50 flex flex-col gap-16 md:gap-24'>
          <motion.h3
            ref={headingRef}
            initial={{ opacity: 1, y: '50px' }}
            animate={aboutControls}
            className='w-full lg:w-[80%] text-2xl md:text-[40px] leading-normal'
          >
            <TextReveal words={words} />
          </motion.h3>

          <div className='flex lg:justify-end'>
            <motion.div
              ref={quoteRef}
              className='text-lg'
              initial={{ opacity: 1, y: '50px' }}
              animate={quoteControls}
            >
              <p className='pb-2'>I design and make.</p>
              <figure>
                <blockquote>
                  <p className='pb-2'>“Designing and Making really should be inseparable”</p>
                </blockquote>
                <figcaption className='text-[#6C6C6C]'>
                  ~ Jony Ive (Ex. Apple’s Design Chief)
                </figcaption>
              </figure>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeAbout
