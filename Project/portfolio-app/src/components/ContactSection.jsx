import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import Reveal from './Reveal'

function ContactSection() {
	const shouldReduceMotion = useReducedMotion()

	return (
		<section id="contact" className="mx-auto max-w-[1440px] px-6 pb-20 sm:px-10 md:pb-28 lg:px-16">
			<Reveal>
				<div className="relative overflow-hidden rounded-[4px] bg-[#c7f36b] px-6 py-12 text-[#11120f] sm:px-10 sm:py-16 md:px-16 md:py-20">
					<div className="absolute -right-12 -top-20 h-64 w-64 rounded-full border border-[#11120f]/15 sm:right-8 sm:top-1/2 sm:-translate-y-1/2 sm:h-80 sm:w-80" />
					<p className="relative mb-4 text-xs font-bold uppercase tracking-[0.18em]">Have a good one in mind?</p>
					<div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
						<h2 className="max-w-3xl font-['Space_Grotesk'] text-5xl font-medium leading-[0.98] tracking-normal sm:text-6xl md:text-7xl">Let&apos;s make<br />something matter.</h2>
						<motion.a
							href="mailto:routbiswajit475@gmail.com"
							whileHover={shouldReduceMotion ? undefined : { x: 4 }}
							className="inline-flex shrink-0 items-center gap-3 rounded-full bg-[#11120f] px-6 py-4 text-sm font-semibold text-[#f2f0e9]"
						>
							Email me <ArrowRight size={17} />
						</motion.a>
					</div>
				</div>
			</Reveal>
		</section>
	)
}

export default ContactSection