import { ArrowDown, BriefcaseBusiness, CodeXml, Mail } from 'lucide-react'

function SiteFooter() {
	return (
		<footer className="mx-auto flex max-w-[1440px] flex-col gap-6 border-t border-[#30312b] px-6 py-7 text-xs text-[#92938a] sm:px-10 md:flex-row md:items-center md:justify-between lg:px-16">
			<p>© 2026 Biswajit Rout. Made with care.</p>
			<div className="flex items-center gap-5">
				<a href="https://github.com/biswajitrout45" target="_blank" rel="noreferrer" aria-label="GitHub profile" className="transition-colors hover:text-[#c7f36b]"><CodeXml size={17} /></a>
				<a href="https://www.linkedin.com/in/biswajit-rout-01118231a" target="_blank" rel="noreferrer" aria-label="LinkedIn profile" className="transition-colors hover:text-[#c7f36b]"><BriefcaseBusiness size={17} /></a>
				<a href="mailto:routbiswajit475@gmail.com" aria-label="Email" className="transition-colors hover:text-[#c7f36b]"><Mail size={17} /></a>
				<a href="#home" className="ml-3 inline-flex items-center gap-1 transition-colors hover:text-[#c7f36b]">Back to top <ArrowDown className="rotate-180" size={14} /></a>
			</div>
		</footer>
	)
}

export default SiteFooter