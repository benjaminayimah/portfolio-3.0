
'use client'

import { useScroll, motion, useTransform } from 'framer-motion';

import React, { useRef } from 'react'


function TextReveal({words}) {
  const targetRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start 0.9', 'start 0.25']
  })
  return (
    <p ref={targetRef} className='flex flex-wrap items-start'>
      {
        words.map((word, i) => {
          if (word.type === 'br') {
            return (
              <motion.span key={`br-${i}`} className="basis-full h-0 mt-8" />
            );
          }
          // Calculate the opacity based on the index and total number of words

          const start = i / words.length;
          const end = Math.min(start + 1 / words.length, 1);
          const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
          // const translateY = useTransform(scrollYProgress, [start, end], [10, 0]);

          return (
            <motion.span
              key={i}
              className='mr-3'
              style={{ opacity }}
            >
              {word}
            </motion.span>
          );
        })
      }
    </p>
  )
}

export default TextReveal