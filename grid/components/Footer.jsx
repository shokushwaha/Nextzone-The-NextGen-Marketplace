import React from 'react'
import { motion } from 'framer-motion'
export default function Footer() {
    return (


        <motion.div className='bg-neutral-800 text-white p-1 flex  items-center justify-center mt-20 '

            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, delay: 0.5 }}>
            &copy; Shobhit Kushwaha || 2023
        </motion.div>

    )
}
