import Link from "next/link"
import { usePathname } from 'next/navigation';
import { useState } from "react";
import NavLink from "./NavLink";



const menus = [
    { name: 'Home', url: '/#' },
    { name: 'Projects', url: '/#projects' },
    { name: 'About', url: '/#about' },
    { name: 'Contact', url: '/#contact' },
]
const socials = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/benjaminayimah'},
    { name: 'Behance', url: 'https://www.behance.net/benjaminayimah'},
    { name: 'Instagram', url: 'https://www.instagram.com/ben.tekk'},
    { name: 'Twitter', url: 'https://x.com/benayimah'},
    { name: 'Bluesky', url: 'https://bsky.app/profile/bentekk.bsky.social'},
    { name: 'GitHub', url: 'https://github.com/benjaminayimah'},
]
const Menu = ({mobileMenu, toggleMenu}) => {
    const pathname = usePathname();

    const [isSelected, setIsSelected] = useState(pathname);

    const handleClick = (url) => {
        setIsSelected(url);
        toggleMenu();
    }

    return (
        <>
        <aside className={`${mobileMenu ? 'menu-open' : 'menu-close'}`}>
            {/* Menu */}
            <div className="h-full menu-wrapper">
                <div className="flex flex-col justify-between h-full px-4">
                    <div>
                        <h5 className="text-neutral-500 text-[0.8rem] mb-5">NAVIGATION</h5>
                        <nav>
                            <ul className="flex flex-col" data-type="menu">
                                { menus.map((data, index) => (
                                <NavLink
                                        key={index} 
                                        data={{...data}}
                                        isActive={isSelected == data.url}
                                        handleClick={handleClick}
                                    />
                                ))}
                            </ul>
                        </nav>
                    </div>
                    <div>
                        <h5 className="text-neutral-500 text-[0.8rem] whitespace-nowrap mb-6">SOCIAL MEDIA</h5>
                        <div className="flex gap-16 sm:gap-32 transition-[gap] duration-1000 ease" >
                            <ul className="flex flex-col gap-2" data-type="socials">
                                {
                                    socials.slice(0, 3).map((social) => (
                                        <Link key={social.name} href={social.url} target="_blank" className="text-base">
                                            <span className="overflow-hidden relative swap-text">
                                                <div>{social.name}</div>
                                                <p className="absolute">{social.name}</p>
                                            </span>
                                        </Link>
                                    ))
                                }
                            </ul>
                            <ul className="flex flex-col gap-2" data-type="socials">
                                {
                                    socials.slice(3, 6).map((social) => (
                                        <Link key={social.name} href={social.url} target="_blank" className="text-base">
                                            <span className="overflow-hidden relative swap-text">
                                                <div>{social.name}</div>
                                                <p className="absolute">{social.name}</p>
                                            </span>
                                        </Link>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
        <div onClick={toggleMenu} className={`overlay ${mobileMenu ? 'show-overlay' : ''}`}/>
        </>
    )
}

export default Menu