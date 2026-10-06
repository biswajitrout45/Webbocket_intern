import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../data/portfolio'
import Reveal from './Reveal'

function ProjectsSection() {
	const shouldReduceMotion = useReducedMotion()

	return (
		<section id="work" className="border-y border-[#30312b] bg-[#171813]">
			<div className="mx-auto max-w-[1440px] px-6 py-20 sm:px-10 md:py-28 lg:px-16">
				<Reveal className="mb-12 flex flex-wrap items-end justify-between gap-5 md:mb-16">
					<div>
						<p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#c7f36b]">Selected GitHub projects</p>
						<h2 className="font-['Space_Grotesk'] text-4xl font-medium tracking-normal sm:text-5xl">Selected work<span className="text-[#c7f36b]">.</span></h2>
					</div>
					<span className="text-sm text-[#92938a]">2025 — 2026</span>
				</Reveal>
				<div className="grid gap-5 lg:grid-cols-3">
					{projects.map((project, index) => (
						<Reveal key={project.number} delay={shouldReduceMotion ? 0 : index * 0.1}>
							<motion.article
								whileHover={shouldReduceMotion ? undefined : { y: -5 }}
								transition={{ duration: 0.2 }}
								className="group h-full overflow-hidden rounded-[4px] border border-[#34352e] bg-[#1d1e19] transition-colors hover:border-[#686b5d]"
							>
								<div className={`relative aspect-[1.45] overflow-hidden ${project.color}`}>
									<img src={project.image} alt={project.imageAlt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
									<span className="absolute left-4 top-4 rounded-full bg-[#11120f]/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur">GitHub project</span>
									<a href={project.repoUrl} target="_blank" rel="noreferrer" aria-label={`View ${project.name} on GitHub`} className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#c7f36b] text-[#11120f] transition-transform group-hover:rotate-45">
										<ArrowUpRight size={18} />
									</a>
								</div>
								<div className="p-5 sm:p-6">
									<div className="mb-4 flex items-center justify-between gap-4">
										<h3 className="font-['Space_Grotesk'] text-2xl font-medium">{project.name}</h3>
										<span className="text-xs text-[#8e9086]">/{project.number}</span>
									</div>
									<p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#c7f36b]">{project.category}</p>
									<p className="text-sm leading-6 text-[#aaa99f]">{project.description}</p>
									<div className="mt-5 flex gap-5 text-xs font-semibold text-[#f2f0e9]">
										<a href={project.repoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 transition-colors hover:text-[#c7f36b]">Source code <ArrowUpRight size={14} /></a>
										{project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 transition-colors hover:text-[#c7f36b]">Live demo <ArrowUpRight size={14} /></a>}
									</div>
								</div>
							</motion.article>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	)
}

export default ProjectsSection