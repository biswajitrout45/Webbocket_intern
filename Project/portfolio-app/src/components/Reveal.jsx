import { motion, useReducedMotion } from 'motion/react'

function Reveal({ children, className = '', delay = 0 }) {
	const shouldReduceMotion = useReducedMotion()

	return (
		<motion.div
			initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.16 }}
			transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
			className={className}
		>
			{children}
		</motion.div>
	)
}

export default Reveal