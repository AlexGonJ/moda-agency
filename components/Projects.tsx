'use client'
import { motion } from 'framer-motion'


export default function Projects() {
return (
<section>
<motion.h2
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
>
Selected work
</motion.h2>
</section>
)
}