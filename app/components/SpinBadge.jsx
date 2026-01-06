'use client'

import styles from '@/styles/spinBadge.module.css'
import Magnet from './Magnetic'

const text = `• GOOGLE CERTIFIED • UI/UX DESIGNER `

export default function SpinBadge() {
  return (
    <Magnet>
      <a
        href="https://www.credly.com/badges/6dd916d0-b88f-4a16-b34d-14962999f1d5"
        target="_blank"
        title="Google UX Design"
        className={styles.link}
      >
        <div className={`relative flex justify-center items-center ${styles.circleWrapper}`}>
          <div className={`flex justify-center items-center ${styles.isoWrapper}`}>
            {/* Google logo */}
            <svg
              className={styles.googleLogo}
              xmlns="http://www.w3.org/2000/svg"
              width="29.65"
              height="30.25"
              viewBox="0 0 29.645 30.249"
            >
              <path d="M15.124,0A14.51,14.51,0,0,1,25.243,3.946L20.912,8.277a8.252,8.252,0,0,0-5.788-2.255,9.03,9.03,0,0,0-8.469,6.223v.006a8.816,8.816,0,0,0,0,5.747l-.018.014h.016a9.095,9.095,0,0,0,13.571,4.771h0l.295-.208a6.952,6.952,0,0,0,2.743-4.344h-8.14V12.375H29.37a17.376,17.376,0,0,1,.274,3.094,14.778,14.778,0,0,1-4.51,11.124h0a14.436,14.436,0,0,1-10.009,3.656,15.111,15.111,0,0,1-13.5-8.332V21.9a14.976,14.976,0,0,1,0-13.554l.241-.46A15.092,15.092,0,0,1,15.124,0Z" />
            </svg>

            {/* Arrow */}
            <svg
              className={styles.arrow}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 19.956 19.956"
            >
              <path d="M18.708,0a1.255,1.255,0,0,1,.244.022,1.235,1.235,0,0,1,.356.136,1.241,1.241,0,0,1,.283.207,1.241,1.241,0,0,1,.2.28A1.232,1.232,0,0,1,19.931,1a1.252,1.252,0,0,1,.024.246V18.708a1.247,1.247,0,0,1-2.494,0V4.258L2.129,19.59A1.247,1.247,0,0,1,.365,17.827L15.7,2.494H1.247A1.247,1.247,0,0,1,1.247,0Z" />
            </svg>
          </div>

          {/* Circular text */}
          <p className={styles.circleText}>
            {text.split('').map((char, index) => (
              <span key={index} style={{ '--i': index }}>
                {char}
              </span>
            ))}
          </p>
        </div>
      </a>

    </Magnet>
  )
}
