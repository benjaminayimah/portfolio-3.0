import React, { useRef } from 'react'
import { useUIStore } from '@/store';
import { useScroll, useTransform, motion } from 'framer-motion'
import Magnetic from './Magnetic';

function Footer() {
  const { device } = useUIStore();

  const targetRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end end']
  })

  const translateY = useTransform(scrollYProgress, [0, 1], ['-300px', '0px']);

  return (
    <footer ref={targetRef} className='w-full py-30 bg-black text-white flex items-center justify-center overflow-hidden'>
      <motion.div style={ { translateY } } className='container w-[80vw] sm:w-[88vw] flex flex-col gap-8'>
        <div className='pb-12 flex flex-col items-center gap-8'>
          <h1 className='leading-none text-center font-light mb-12 large-text'>
            Got a project <br />to discuss?
          </h1>
          <Magnetic classes={'inline-block w-full sm:w-auto'}>
            <button data-type="white" className='w-full text-nowrap overflow-hidden relative sm:w-auto rounded-full py-12 px-20 border border-white font-medium text-3xl md:text-4xl button-outline'>
              Let's talk
            </button>
          </Magnetic>
        </div>
        <div className='flex sm:justify-center sm:flex-wrap flex-col sm:flex-row sm:items-center gap-10 sm:mt-10 text-lg'>
            <div className='flex flex-col sm:flex-row gap-5'>
              <a data-type="white" href="mailTo:benjaminayimah@gmail.com" className='border w-full text-center sm:text-left sm:w-auto border-white rounded-full px-6 py-4 relative overflow-hidden button-outline'>
                <div>benjaminayimah@gmail.com</div>
              </a>
              <a data-type="white" href="tel:+233 54 124 7250" className='border w-full text-center sm:text-left sm:w-auto border-white rounded-full px-6 py-4 relative overflow-hidden button-outline'>
                <div>+233 54 124 7250</div>
              </a>
            </div>
            <p className='text-sm md:text-base text-center text-neutral-500'>© {new Date().getFullYear()} Benjamin Ayimah. All rights reserved.</p>
          </div>
      </motion.div>
    </footer>
  )
}

export default Footer