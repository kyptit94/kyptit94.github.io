'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const projects = [
  {
    title: 'VNPT School Admission site',
    description: 'The admission site for School, using to register students before entering the school',
    tags: ['Vue.js', 'Laravel', 'MySql'],
    image: '/assets/info/tsdc.png',
    link: 'https://sandbox.tsdc.vnedu.vn',
  },
  {
    title: 'VNPT OneBSS',
    description: 'The ERP system for VNPT, using to manage all business processes',
    tags: ['React'],
    image: '/assets/info/onebss.png',
    link: 'https://onebss.vnpt.vn',
  },
  {
    title: 'Booking Core',
    description: 'The core system for booking, using to book the room, manage the reservation, and generate reports',
    tags: ['Laravel', 'MySql', 'Vuejs'],
    image: '/assets/info/booking.png',
    link: 'https://sandbox.bookingcore.co/intro',
  },
  {
    title: 'IOC (Intelligent Operation Center)',
    description: 'The system for managing and monitoring the operation of the Vietnam school network',
    tags: ['Angular', 'Laravel', 'MySql'],
    image: '/assets/info/ioc.png',
    link: 'https://sgdnghean.ioc.edu.vn',
  },
  {
    title: 'Personal Portfolio',
    description: 'My personal portfolio website, built with Next.js and Tailwind CSS',
    tags: ['Next.js', 'Tailwind CSS'],
    image: '/assets/info/portfolio.png',
    link: 'https://kevinpham.pro',
  },
  {
    title: 'Monkey Junior',
    description: 'I am building a CRM and back-office system to create, manage, and organize educational content for the Monkey Junior English learning app.',
    tags: ['Vuejs', 'Laravel', 'MongoDB', 'Redis', 'Mysql'],
    image: '/assets/info/monkey.png',
    link: 'https://monkeyjunior.com',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            My Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Here are some of my recent works
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg"
            >
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 relative">
                {project.image ? (
                  <Image src={project.image}
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                  alt={project.title}
                  className="object-cover"/>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500" />
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <motion.a
                  href={project.link}
                  className="inline-block px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Project
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
