import heroImage from '../assets/Myimg.png'

export { heroImage }

export const projects = [
	{
		number: '01',
		name: 'ImagePost',
		category: 'MongoDB · Express · React · Node.js',
		description: 'A full-stack image-sharing app for creating captioned posts, uploading images with ImageKit, and browsing a MongoDB-backed feed.',
		image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=85',
		imageAlt: 'People capturing and sharing a live event',
		repoUrl: 'https://github.com/biswajitrout45/ImagePost_Project',
		color: 'bg-[#c7f36b]',
	},
	{
		number: '02',
		name: 'Weather App',
		category: 'JavaScript · OpenWeatherMap API',
		description: 'A city weather lookup that displays current temperature, humidity, wind speed, and weather conditions.',
		image: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1200&q=85',
		imageAlt: 'Clouds in a changing sky',
		repoUrl: 'https://github.com/biswajitrout45/Weather-App',
		color: 'bg-[#f3d4c3]',
	},
	{
		number: '03',
		name: 'Personal Portfolio',
		category: 'HTML · CSS · JavaScript',
		description: 'A personal portfolio presenting your profile, education, technical skills, resume, and ways to connect.',
		image: heroImage,
		imageAlt: 'Portrait used in the personal portfolio project',
		repoUrl: 'https://github.com/biswajitrout45/CodeSoft/blob/main/MyPortfolio/portfolio.html',
		color: 'bg-[#d4e3ef]',
	},
]