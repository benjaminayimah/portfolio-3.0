'use client'

import React, { useRef } from 'react'
import { useUIStore } from '@/app/store';
import { ReactLenis } from 'lenis/react'
import Cursor from '../components/Cursor';

function RootLayout({ children }) {
  const { device } = useUIStore();
  const logoRef = useRef(null);

  return (
    <ReactLenis
      root
      autoRaf={device !== 'mobile'}
      options={{
        duration: 1.2,
        smoothWheel: device !== 'mobile',
        smoothTouch: false,
        lerp: 0.08,
      }}
    >
      <main id="app">
        <Cursor stickyElements={[logoRef]} />
          {children}
      </main>
    </ReactLenis>
  )
}

export default RootLayout