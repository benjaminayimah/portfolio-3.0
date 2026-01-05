import React from 'react'
import { motion } from 'framer-motion'

const wordVariants = {
  hidden: {
    y: 300,
  },
  visible: {
    y: 0,
  },
}

function StaggeredText({ data, index }) {
  return (
    <span className={`${data.spanStyle} inline-block align-middle overflow-hidden`}>
      <motion.span
        className={`inline-block ${data.style}`}
        variants={wordVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 50,
          delay: index * 0.1,
        }}
      >
        {data.word}
      </motion.span>
    </span>
  )
}

export default StaggeredText
