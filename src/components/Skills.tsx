'use client';

import { motion } from 'framer-motion';

const skills = {
  'Frontend': [
    { name: 'Vuejs', level: 90 },
    { name: 'React', level: 85 },
    { name: 'TypeScript', level: 85 },
    { name: 'Bootstrap', level: 90 },
    { name: 'Tailwind CSS', level: 80 },
  ],
  'Backend': [
    { name: 'Node.js', level: 90 },
    { name: 'PHP', level: 90 },
    { name: 'Mysql', level: 90 },
    { name: 'Oracle', level: 75 },
    { name: 'MongoDB', level: 80 },
  ],
  'Tools & Others': [
    { name: 'Git', level: 90 },
    { name: 'Jira', level: 80 },
    { name: 'Docker', level: 75 },
    { name: 'CI/CD', level: 75 },
  ],
};

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Skills & Expertise
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Here's what I bring to the table
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, categorySkills], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                {category}
              </h3>
              <div className="space-y-4">
                {categorySkills.map((skill, index) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
                      <span className="text-gray-600 dark:text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <motion.div
                        className="bg-blue-600 h-2.5 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ delay: index * 0.1, duration: 0.8 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
