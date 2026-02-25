import React from 'react';
import { motion } from 'motion/react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Code2, Rocket, Target } from 'lucide-react';

/**
 * About section with Problem-Solution-Result storytelling
 * Uses scroll-based reveal animations for engaging experience
 */
export const About: React.FC = () => {
  const { ref, isVisible } = useScrollReveal(0.2);

  const stories = [
    {
      icon: Target,
      title: 'Problem',
      description:
        'Businesses struggle with disjointed systems and clunky interfaces that slow down operations and frustrate users.',
      color: 'from-red-500 to-orange-500',
    },
    {
      icon: Code2,
      title: 'Solution',
      description:
        'I architect full-stack applications using React, Node.js, and cloud technologies, creating unified platforms with intuitive UX.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Rocket,
      title: 'Result',
      description:
        'Delivered systems that increased operational efficiency by 40%, reduced customer support tickets by 60%, and boosted user satisfaction.',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <section id="about" className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        {/* Story Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {stories.map((story, index) => (
            <motion.div
              key={story.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15, ease: 'easeOut' }}
              className="relative group"
            >
              <div className="h-full p-8 rounded-2xl bg-white/5 dark:bg-black/20 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300">
                {/* Gradient orb */}
                <div
                  className={`absolute -top-6 left-8 w-12 h-12 rounded-xl bg-gradient-to-br ${story.color} flex items-center justify-center shadow-lg`}
                >
                  <story.icon className="w-6 h-6 text-white" />
                </div>

                <div className="mt-8">
                  <h3 className="text-2xl font-semibold mb-4">{story.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {story.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Personal Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            With 1+ years of experience building scalable web applications, I specialize in
            creating performant, user-centric solutions. My expertise spans the full stack—from
            crafting responsive frontends with React and TypeScript to architecting robust
            backends with Node.js, PostgreSQL, and AWS.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            I'm passionate about clean code, modern design patterns, and shipping products that
            make a real impact. Let's build something extraordinary together.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
