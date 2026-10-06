import AboutSection from './components/AboutSection'
import ContactSection from './components/ContactSection'
import HeroSection from './components/HeroSection'
import ProjectsSection from './components/ProjectsSection'
import SiteFooter from './components/SiteFooter'
import SiteHeader from './components/SiteHeader'

function App() {
	return (
		<main className="overflow-hidden bg-[#11120f] text-[#f2f0e9] selection:bg-[#c7f36b] selection:text-[#11120f]">
			<SiteHeader />
			<HeroSection />
			<ProjectsSection />
			<AboutSection />
			<ContactSection />
			<SiteFooter />
		</main>
	)
}

export default App