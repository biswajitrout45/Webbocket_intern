import { motion, useReducedMotion } from 'motion/react'

function SiteHeader() {
	const shouldReduceMotion = useReducedMotion()

	return (
		<motion.header
			initial={shouldReduceMotion ? false : { opacity: 0, y: -12 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.55, ease: 'easeOut' }}
			className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-6 sm:px-10 lg:px-16"
		>
			<a href="#home" aria-label="Biswajit Rout home" className="font-['Space_Grotesk'] text-lg font-bold tracking-normal">
				BR<span className="text-[#c7f36b]">.</span>
			</a>
			<nav aria-label="Main navigation" className="flex items-center gap-5 text-sm text-[#c4c4bb] sm:gap-9">
				<a className="transition-colors hover:text-[#c7f36b]" href="#work">Work</a>
				<a className="transition-colors hover:text-[#c7f36b]" href="#about">About</a>
				<a className="rounded-full border border-[#3a3b34] px-4 py-2 text-[#f2f0e9] transition-colors hover:border-[#c7f36b] hover:text-[#c7f36b]" href="#contact">Let&apos;s talk <span aria-hidden="true">↗</span></a>
			</nav>
		</motion.header>
	)
}

export default SiteHeader