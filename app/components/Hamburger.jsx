'use client'

import styles from '@/styles/hamburger.module.css'
import { forwardRef } from 'react'
import Magnetic from './Magnetic';


const Hamburger = forwardRef(({mobileMenu, toggleMenu}, ref) => {

    return (
        <div className={`flex fixed top-4 md:top-9 items-center md:gap-2 text-[1.1rem] ${styles.hamburgerWrapper}`}>
            <Magnetic>
                <button
                    onClick={toggleMenu}
                    className={`${styles.hamburger_menu} ${mobileMenu && styles.collapse} flex flex-col items-center relative justify-center`}
                    arial-control="mobile_navigation"
                    aria-label='Menu trigger' 
                    aria-expanded={mobileMenu}
                    role='menu'
                    >
                    <div className='menu' />
                    <span ref={ref} className={styles.bounds} />
                </button>
            </Magnetic>
        </div>
    )
})

export default Hamburger