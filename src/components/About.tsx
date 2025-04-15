'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="aspect-square rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                <Image
                  src="/assets/info/avatar.jpg"
                  alt="My Avatar"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                  priority
                />
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                I am a passionate developer with a strong foundation in modern web technologies.
                My journey in software development started with a curiosity about how things
                work on the web, and it has evolved into a professional career where I create
                elegant solutions to complex problems.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                When I am not coding, you can find me exploring new technologies, contributing
                to open-source projects, or sharing my knowledge with the developer community
                through blog posts and mentoring.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
