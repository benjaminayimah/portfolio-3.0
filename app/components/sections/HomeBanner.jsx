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
  const banner_min_base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASEAAADMCAMAAAALbuXBAAAAPFBMVEUAAABHR0dBQUEnJyfU1NQMDAyqqqrQ0NC9vb2xsbGkpKScnJyPj498fHxnZ2dRUVE6OjonJycWFhYBAQGbKPp3AAAAEnRSTlMAL2qr1fH9/////////////v4Nrg/JAAASdElEQVR42u3cDVMU2Za24fteOxOxP2yw//9PfGe6sU8LZO71vDOgIgqePh96JIcrtKgoJaLiibXW3rtIkmfPnj179uzZs2fPnj179uzZs2fPnj179uzZs2fPnj17apRnnxv/Q2rU+VjPz+X7IN+H8hUFBLl10cQOX/R/JKH6JRYPiL/x8298wfETAvGcj0U+lv7bbB51/IQYZ/xd/XsqzQOOn9DZmzP+ov0i/CcU/0n1cAWFT4Us56V87sg1ZP0iD8ijr/5GEj526ITql+IBkcddvJoXzZ1DJzTO+Of8d3PPYefQGfeELwrNO2MU7x05IfnHNJMA8OrsfHDr0Akt3JPmYeFWZl/P/xGAXwbvHDYhX7/iPpsHGW7I3tv1dn29AZwVNw6bUC1yT9QHayeRhBAXsGpe/m1DXhXfyOA/4eyU+0Q/We0FCBg/vBwsOldVvrwOtw5ZQ398YeRIAy2EhnQ33TPdWjZjdVz+AT8DHDWh8YrHJMTQgTTVMwFM0IAGi4y/XY0CjprQI4RIwAhJyBASHQbSRAN1wrr/jfeOt6euM3lQMMwyNQtaWyepmhWmCR/M0dc7wBEn9TiXzwSJGKoCmB4JBAkdc2+Ia9fSDcDhuswzHiIYSEsIUEGJSSe0RIIAAYXTBY5YQ+OUT8T3D6gJ1UJ0JjTYpWAXRAABZO2Gw9XQAyUkgE2ElLg7nXYKzSB2MmkhJNwQzOlywISKhyQAna4kLSMSkR5TE1oMEgQ7QIAXy+G6zHMeVHaAZEdNNxnsCulKSQBsKoB3A7vhWKt9nT84gxIMJOJu7cSB7RTbSOywr5+/6+3qYF32C/cJjUFDbOl9OIea7kbrsoD03GDdyBYhACgw6mA1dDYeqqEuEmwzWWjQXA9TJEYy5yKzApBSr06ChjAvD1VDDj4TIAEkMjpt0ym7ssemr7rYtx7OwGw6ffddOVYN1TmfiISpwdbQEOmaYrKd2ISAScOyL6G2gQLR0Jfha1r4puQzISqpaUJiTIgm1GpoAeMcuLMDFIEUEDBH6rKf+UQjphqCIEbChITEzAaZmRnOMBjMJXdvfZ/H2g/NF3AnJsaWG8aQCvYgdhHoHs0cc+A+GDrHcB8YAOyxbkeaQ+fFPYkQCAEIqVm5GtVlbOk5IsBtKnMwWbc1gNzoXB51DgUjBBMMEbpi97pRZFvrtnbAnTHm2Jcxx5hNECCGfeRQa9lrP44nACRIiB0hwZ5LkhHaffCOmQMAd1Z6ngTitqSvDjSp/fSpEIQWGklAtjFxXKdxcGPOuU9gghmka4mwswQ8UA3VOQDBYLgRbAwhBCBxzqq8X7NIM4C57MOIJBVtsy82XOZwNSTAJAaQpkABDUiKdtTAmkwYYwLsuOOe3o3EsEiF9UBdFu6eSDpAYzUV0KRCA4PtuiFzAQpgwsBhlr2GRKhdynGoLhtnAARSDWAkgDGkbQJJKvuYo7oa5tpQbbTncF/cTsK2GlM605c5Wg0JJgYiQUFEA0VqzG1fJ5PaZqAn1RNJUazkJHJCQKWqxnG67IMAoYEIVHrunVFFrJ7LMrZlXdhWag6YcWHf3RZE2myhgQkO1uPsGMMtIQrQotl7Co4xCWh6sq+49BIoJmZnDUQw9ArGbDVwnQc6l/0AQAQwAiIzQMO0AvG6pNYYd9V9qb126FHECD0rWuHEaOXqOF0WIBACAWJMpzNqLbzuAQRT81plFLD0zj4Ya5DsG2HZa+aaLSHigWpof0EEEClAbWbmDOvoaoqk9pEaYkTDXEYvNTR7ygGm9mFZvaWGb/o4Cf0iiBIDgMSeLVSVsRNk6doXtlLcMrr2FUg0XdyIewXMSN4eaC27ICSADQFD6JTE3kpIOnvcCKtxz7JkYaGD4DIgMOdSaxJk5s8cZ8dInRP4EI4E5zYZYRTlpcxRYFIBUtesENhXgG0QQGRfhq1J/3mgPTX8SoCAiRDjPisN84Ra3kZgjnkCQGBbiQD2mGRSACXD4AL8dx/oXAYXIIgBAkDWqoIiWAAsjCAiLDCImGp1AOqufd17uvc/mkPV0DgLMQYgAHV5wkzvxThlv5IIzBMkEYBIvD7pSs8BUMl8WX+CL672nUPVUAAxACEABeDKsuzIxAALABqFos1JKswBQHTd/3a64E5xuIRCPqlgoTgxg8gAYI9QUh2YiBAyhFlT3Hq5yjKa/WgJBRHlA0WtoPR4iQ1zSYAEG6vtxODMdGTNtq02c47y5GAJEQIQCABSLZ12GZkOFCYIUjbVTUWJBNdd2Rc2RC6Xag+W0AUCiNzKaK0ebPvWy1KZQ1YEiUXbXCMCO2QRV5bRQJauk9ODJZT3X+LdC7Z9vWesUpAsVEgDOBi9QhqzDgPdnT0EGIgnB0zow0MAKqa39cXi/PB6RENMErGBrm1mJjM47v6jgwOd7YGXEVEEBKGrWSrBYr8qulAQ7aIAyV52jQwREwRYGnDsh0roFORuYmvcl8w1IMVsHCgIFFa6DFYDGAACEbAhVPpAXUY+DggBa695KdEwlp5CAqG6mBTBZsBEqHAjQmZv+77VyZESekNyf2xnvK0XXllNp6ogCIEkCNE5KjKYkykx3MhgwMkyPFBCDQYBEYjh5fUyfDstYRmDCQabalIFPTrKDAMJCEaCjBXrhcdJKIB3z0Okso9lmdfXJcl0gZgGZbTLHD1Q6UqgDQERAgGXk+NMarYXAmCQG1KbC9pbpecQETQKjK3keonaXS0qAIIUA4nVh0nIUyNGAQTQcWlBelMUY0zRZdoUWWKCKgIoinGuXI+YXuZREuIlAvm4FnTpVDtXEMEWKGZJAcRkH6blHUGwRk4a9lE1j5LQqQABeUfUXdNL0BgKKYUePWBcjdQc21BFFABhqQrQ0ZoHSWh7IUGEcEssN6u2AYIIYEZ0hGaAtS2GG0YAZC0l6RE4SkJ1ChoEQYhIhjP0spUSEWWmuiDTACVAAEEBqtcABIB5iNUeEvLAJVddJ7OZmKRiTBLafSaVAB3CBxFtQua+z0QOM4fyUgQkvCcAJ4IoAoQywkhXlca910QQBCRmdCam1nY7ws86bpwV0AaAAAGBKJnQGsCw7nRhjyRmW9zGHBCjwcxiITBfFvPt1TH21MAbAIMCciMQSFgCBiC6mQIK6GwrGXMQGtknUNCyzRfM7erqMPshPI18IAGQWzEVIUKlpEPthRnNrAVJhbJmRckCY5vb5XaYPTVwKh+EG0Z5T0QpnIzrUbIkg2Vj7I3OAqrFwFyo5e2e45zLgJfyMT+Z26aC2KVSa8eYOVLWsItiBIqKwFwHlwf69AMgAe9/bm2QW1LRcD2gi7Hbs+JIpcgcmZkbsBMj0FQd6FNYgO0F9wgYPgggK8VoqahWjzkm9GCZoyhEWkA5vTxYDQHI+8dEiSCAoIBdXW+Fnins0eVwX50bRRLZKbAB61gJfUIDRgN32QUqpz3IqIZyGLJsPQY92WWuKIyuUT8e5eqYW57dlRIh99Z6CBCE4kNstvS0q+1e3Fb+98+IzLUW/H0esIYCwr2dNQZQLEmlKljDpHvOXemRMWpbyAm9IDBOSJ8ea1LzUkA+JkZBNBKEUUlGesxCpRK7UnGwV2qvyLLK3Pcxj1VDId7vc0HQGBQBwliWhgyHK7aFYSsqK2YpyKh9v+qD7YduBHz/BGwQghgQXcuedBwbTmeNRUcQx1TNHrIs29V1NduhusxTQcynVQQCGrF6JO5UB6Nxziqx1+uhsWsEF66B2vtwNSQ3VAwBoggoIj1mTIFA0fSiSTt6TRCzwTJ6WaT3Y3WZ3kuJAngfE4CAO9XFgKpOLS69jPIE0psBamWsc+vJ1dXBTh2e4scRBWMFQBABoRmIkKKIJqHtuQwlsK0nM3vDmAeb1EJAEm5I6BQRsERBB93BoiwZFk1gAQIF65hcVwU8WA3VKd4/mhkjRAQEgbYjdGFEIma5rLGNikkWLtPYUvNYNfQqfCKFDbQBgoY2ZUgYSkCwclqc2F5TK3OdyzJHuR+ry0T4dA4lTEITIlhdyChdsgNpkiUNZFq82MrQQ9bs6WN12TgF5C4jiYBdhkoBUIEIIl2Ewm6BSFmLZMcerPPqSNcxAq8KCAACEQwKXRUKg0RETQxEQHtU7HIpit668gP1x36kq4UBBJAPGpBIVae6QUCKwjjailHJWhlWVWpMYeRl3lw0HKuG6tTP40oMmOulEjEGIqFCVEoRFMsRYXZevjm5OtS99G5I5IMgjW0keLKtlS4IkAgpgikAARCRmmOvyWg4Wg39UgLhloDJaIA21YwAYAqiiCAgQEQguI85rq/qUHcbBCjvL/QgZi8AkcweCdAmVIcIhHBDBGLrXNsc7Lc4P5QQ4UYgJGQuHbcTZpFa02oChlIetO8u1Rd9sC7zVISA3BIMdrGtSVnYVQ1YoAjyEIf44vJgCY1TJQoQ5EZE2mUbNkrH0V2JVpV5JKNRvrm+4lhzyJ8BSAQ0QoKY2PNk69qhtafumDlnd9GPXbj+M2ce6c4ot1PoTpAgScQ9WdKVspqm3KOEpH67PPnjBfcIkDd9OZIDTepXAwzvBAwhCYFklrMQRmqvgtYCuAg1eMU7kQ/6gnmILivBV4M7+fBFibA77LE4YW4Z296MZM7uANl/vOAdCQC54DdeHeLOKHUOF/1TGQm3ApgADb2t25qWpOZI7WNkA16ELuefAPXKC84ALn5+wyuIzAs4QpfVOcDk3oELIpCQpDr7EojB2qpZRpN9FM7Rf3JDzi7OEvjjp8qbV+H3ny/CAWrI1wBpwQC5N6gTQu5KoU2WFoSYMrls3qloc/6Gn/7712l1fidPfz9Ur3lP3olEjQKBgNyIaOiFVGofye7GeyHRtz+//N2TN5cvLq7C0z+5jnPuC2AEY4AINnsBUSHCXKrDElJvuc9cX/389lIuA8DT7rL6kE8CEBOMATAQksA2iCaAkdBjrl3byL7zmYIG4OkndBcQNDGEewIJ2RhA6BHbiEAw7Dtf9MS7bJw/fP1i1Puv1iyiagwYpAjZeNzTT2j9hQ/uX3FmgCAAhlBRgCiAgSizedTTT+jXF3DnfixC5FYSQCAKQY0Kf6mEnuzZ3l/51IBAIyQYEAQLCCKBMgm3Jl/ytGvI1zwgEIAICBAyUyESCdz9A9DN4554Qr/yABMAFAgESUtAAFQgAAZ4ec0XPOmE1hc8pJpbvn9MwyyC3FIUROHlVfiSp7sfGmc84jqCQQip9DYACBgDBCMEOF3yXzzuCSfkax51BQJgIkkCc0C4E279BP8VvuCprmVfCoiTSIhpTbI5YRAe8NOE4gue6hwa53yBYxeIBtmwZircERTgB8Hr5gueZpedF1/W1wIYEjcGMffviRoAf4Q5+H886onW0K/ydzg2TJCQKgDkszGkg+hVeNRTrCFf8xfkcl/BdCQIAQJG7qqJH0mP3yaPeJIJ+Zq/5nJbgBAkHxdOEAhofoR9udh41NNby+o1f9HpqTEgtxIFRCEBoIHqV/wdT+kKq3HGX7bCVoAEEAIQMRiAvAAIhkc9rUnt+gv/gOFsAfj4kQogYr8oaL0Mj3pSc6jO+Qf1WwnvhXvMeiLML14h9KS67B8PiPrxz9ZZd/EIQggG5YY86ilN6nHOP+GHk6SUIAAJEHKXjDZf8HTmUJ3zTxljM7F4R4AA6IkQcL3icU9lDvmaf1betuGGQQyQ958wBTIveMyT6bJ/ISD84UXkRvjwBBj8vcX+CSW08K9Yf2xEQCCAAHIrxeOeSJeNM/5F8zLKHACBAPVSCEB+bx7zNGrIM/5V48eXTpgTkBurEELwRx72ZBJ6zb/B+OGHZV3HrHvLrH7pXT6VhAb/HuPkpAoSAF4UhCBQxSOexBzyNf9GSUJ0AK2BCNsbHvBUEvqVryQSA8B+wUOeRpetfC0SIHyxzb7/U8f6iq/IOAfAIwePJ1BD5183IMDwiCeR0Ci+qhgBtPjcE0honPG1tQAon/v+E/KMb1NCwE987rtPyNd8ZSaGx4ro+0/oNV9bIH7hnX7nq/253yAeTXHj5IrPfdc1NIqvToPhxpPrsjrjq0oEwntaPOS7PZf5mq8vQIQIzZvJp77nGlr46oLw4e9T2w/VK746wz0/86nvOaFzvj3lM9/tan8u35pwFT71vdaQxTcQ5U5APvH9JrTwLUi48fSup/YV34oAjx9ev9eEiq8vkEhACOBT6rIzvrYgQADCo77XhOSr8/5olsd8n6v9OOU/5IpPfZ81VHwF4TOKADy1s72v+Ar8NKpIvovlfvnexpDcMvwF32cN8Q2EgHxC7vtOE/omRAh/x//hhMLH4n9yVP9/0lHAouCIE6YAAAAASUVORK5CYII="

  // const banner_min_base64 = "data:image/png;base64,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"

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

  const translateY = useTransform(scrollYProgress, [0, 1], ['0px', '20vh'])
  return (
    <section ref={targetRef} className="h-screen md:h-[102vh] bg-[#9DA1A4] relative z-2">
      <div className="flex flex-col h-full relative overflow-hidden">
        <MotionImage
          style={{ translateY: translateY}}
          src="https://res.cloudinary.com/dl4wyqxbe/image/upload/v1767730217/banner_cqt7a2.png"
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