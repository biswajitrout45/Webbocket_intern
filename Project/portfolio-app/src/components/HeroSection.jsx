import { motion, useReducedMotion } from 'motion/react'
import { ArrowDown, Braces, CodeXml } from 'lucide-react'
import { heroImage } from '../data/portfolio'
import Reveal from './Reveal'

function HeroSection() {
	const shouldReduceMotion = useReducedMotion()

	return (
		<section id="home" className="mx-auto grid max-w-[1440px] gap-12 px-6 pb-24 pt-16 sm:px-10 md:grid-cols-[1.25fr_0.75fr] md:items-center md:gap-8 md:pb-32 md:pt-20 lg:px-16 lg:pt-24">
			<Reveal className="relative z-10" delay={0.08}>
				<p className="mb-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#c7f36b]">
					<CodeXml size={16} aria-hidden="true" />
					MERN stack developer · Odisha, India
				</p>
				<h1 className="max-w-4xl font-['Space_Grotesk'] text-5xl font-medium leading-[0.91] tracking-normal sm:text-7xl lg:text-8xl">
					Thoughtful web,
					<span className="mt-2 block text-[#c7f36b]">made human.</span>
				</h1>
				<div className="mt-9 flex max-w-xl flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
					<p className="max-w-sm text-base leading-7 text-[#aaa99f]">Hey, I&apos;m <span className="text-[#f2f0e9]">Biswajit Rout</span>. I build full-stack web experiences with MongoDB, Express, React, and Node.js.</p>
					<motion.a
						href="#work"
						aria-label="Scroll to selected work"
						whileHover={shouldReduceMotion ? undefined : { y: 4 }}
						whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
						className="group flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#c7f36b] text-[#11120f]"
					>
						<ArrowDown size={19} />
					</motion.a>
				</div>
				<div className="mt-8 flex items-center gap-2 text-xs text-[#92938a]">
					<Braces size={15} className="text-[#c7f36b]" />
					<span>Building with the MERN stack</span>
				</div>
			</Reveal>

			<Reveal className="relative mx-auto w-full max-w-[440px] md:justify-self-end" delay={0.2}>
				<div className="absolute -right-5 -top-5 h-28 w-28 rounded-full border border-[#c7f36b]/40 sm:-right-8 sm:-top-8 sm:h-36 sm:w-36" />
				<div className="relative aspect-square overflow-hidden rounded-full bg-[#272922]">
					<motion.img
						src={heroImage}
						alt="A portrait representing Biswajit Rout"
						initial={shouldReduceMotion ? false : { scale: 1.08 }}
						animate={{ scale: 1 }}
						transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
						className="h-full w-full object-cover"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-[#11120f]/50 via-transparent to-transparent" />
					<span className="absolute bottom-5 left-5 rounded-full border border-white/20 bg-black/20 px-4 py-2 text-xs text-white backdrop-blur-sm">Open to opportunities</span>
				</div>
				<div className="absolute -bottom-7 -left-6 hidden -rotate-6 items-center gap-2 rounded-sm bg-[#f2f0e9] px-4 py-3 text-xs font-semibold text-[#11120f] shadow-xl sm:flex">
					<span className="text-base">✳</span> Build with intention
				</div>
			</Reveal>
		</section>
	)
}

export default HeroSection