import { create } from 'zustand';

const useMacbookStore = create((set) => ({
    color: '#adb5bd',
    setColor: (color) => set({color}),

    scale: 0.08,
    setScale: (scale) => set({scale}),

    texture: '/video/feature-1.mp4',
    setTexture: (texture) => set({ texture }),

    reset: () => set({ color: '#2e2c3e',scale: 0.08, texture: '/video/feature-1.mp4'}),
}))

export default useMacbookStore;