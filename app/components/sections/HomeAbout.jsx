'use client'

import React from 'react'
import TextReveal from '../TextReveal'
import { motion } from 'framer-motion'

const words = [
  "Design,", "to", "me,", "is", "the", "art", "of", "making", "complexity", "feel", "effortless.",
  "I", "approach", "problems", "with", "curiosity,", "empathy,", "and", "structure", "—", "balancing", "human", "needs", "with", "technical", "reality.",
  "Through", "iteration", "and", "collaboration,", "I", "craft", "accessible,", "meaningful", "experiences", "that", "are", "built", "to", "last."
]

function HomeAbout() {
  return (
    <section>
      <div className='flex justify-center'>
        <div className='w-[92vw] sm:w-[77vw] max-w-448 py-25 md:py-50 flex flex-col gap-16 md:gap-24'>
          <motion.h3
            initial={{ opacity: 1, y: '50px'}}
            whileInView={{ y: '0px', transition: {duration: 1}}}
            viewport={{
              once: false,
              amount: 0.3
            }}
            className='w-full lg:w-[80%] text-2xl md:text-[40px] leading-normal'
            >
            <TextReveal words={words} />
          </motion.h3>
          <div className='flex lg:justify-end'>
            <motion.div
              className='text-lg'
              initial={{ opacity: 1, y: '50px'}}
              whileInView={{ y: '0px', transition: {duration: 1}}}
              viewport={{
                once: false,
                amount: 0.3
              }}
              >
              <p className='pb-2'>I design and make.</p>
              <figure>
                <blockquote>
                  <p className='pb-2'>“Designing and Making really should be inseparable”</p>
                </blockquote>
                <figcaption className='text-[#6C6C6C]'>~ Jony Ive (Ex. Apple’s Design Chief)</figcaption>
              </figure>
            </motion.div>
          </div>
          
        </div>
      </div>
      
      </section>
  )
}

export default HomeAbout