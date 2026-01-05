import { create } from 'zustand'

/** Device type categories */
export type Device = 'mobile' | 'tablet' | 'desktop' | ''


/** Global UI store shape */
type UIStore = {
  device: Device
  width: number
  height: number
  mobileMenu: boolean
  computeWindow: (width: number, height: number) => void
  toggleMenu: () => void
}

/** Zustand store definition */
export const useUIStore = create<UIStore>((set) => ({
  device: '',
  width: 0,
  height: 0,
  mobileMenu: false,
  toggleMenu: () => set((state) => ({ mobileMenu: !state.mobileMenu })),
  computeWindow: (width, height) => {
    let device: Device = 'tablet'

    if (width < 768) device = 'mobile'
    else if (width > 1344) device = 'desktop'

    document.getElementById('app')?.setAttribute('class', device)

    set({ device, width, height })
  },
}))
