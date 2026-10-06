import { motion, useReducedMotion } from 'motion/react'
import { ArrowDownRight, Braces, CodeXml, Database, GitBranch, Server, Workflow } from 'lucide-react'
import Reveal from './Reveal'

const skills = [
	{ name: 'MongoDB', Icon: Database },
	{ name: 'Express.js', Icon: Server },
	{ name: 'React', Icon: CodeXml },
	{ name: 'Node.js', Icon: Workflow },
	{ name: 'JavaScript', Icon: Braces },
	{ name: 'REST APIs', Icon: GitBranch },
	{ name: 'Git', Icon: GitBranch },
]

function AboutSection() {
	const shouldReduceMotion = useReducedMotion()

	return (
		<section id="about" className="mx-auto grid max-w-[1440px] gap-12 px-6 py-20 sm:px-10 md:grid-cols-[0.7fr_1.3fr] md:gap-20 md:py-28 lg:px-16">
			<Reveal>
				<p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#c7f36b]">A little about me</p>
				<h2 className="font-['Space_Grotesk'] text-4xl font-medium leading-tight tracking-normal sm:text-5xl">Curious by nature.<br />Careful by choice.</h2>
			</Reveal>
			<Reveal delay={0.1}>
				<p className="max-w-2xl text-lg leading-8 text-[#c2c1b8]">I&apos;m a full-stack developer working across the MERN stack, building responsive React interfaces and connecting them to Node.js and Express APIs backed by MongoDB. I enjoy taking a product from the first idea through to a working experience.</p>
				<div className="mt-9 flex flex-wrap gap-2.5">
					{skills.map(({ name, Icon }, index) => (
						<motion.span
							key={name}
							initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.3, delay: shouldReduceMotion ? 0 : index * 0.045 }}
							whileHover={shouldReduceMotion ? undefined : { y: -2 }}
							className="inline-flex items-center gap-2 rounded-full border border-[#3a3b34] px-3.5 py-2 text-xs text-[#d4d3cb]"
						>
							<Icon size={14} className="text-[#c7f36b]" aria-hidden="true" />
							{name}
						</motion.span>
					))}
				</div>
				<a href="#contact" className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-[#c7f36b] transition-colors hover:text-white">More about me <ArrowDownRight size={17} /></a>
			</Reveal>
		</section>
	)
}

export default AboutSection