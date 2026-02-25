import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ProjectCard, type Project } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import mocktestImage from '/mocktest.png';

export const Projects: React.FC = () => {
  const { ref, isVisible } = useScrollReveal(0.2);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: '1',
      title: 'Online Mock Test',
      headline: 'Handles user traffic loading reduced 25%.',
      description:
        'A comprehensive platform build for competitive exam learning student covering Prepare, Practice, Test.',
      technologies: ['PHP', 'Mysql'],
      image: mocktestImage,
      liveUrl: '',
      githubUrl: 'https://github.com/Raamgopal8/PHPsite.git',
      gradient: 'from-blue-600 to-cyan-600',
    },
    {
      id: '2',
      title: 'TutorX',
      headline: 'Scaled to 50K concurrent users with real-time sync',
      description:
        'Builded AI powered online learning platform focused for only personalized learning system. Integrating Adaptive Learning system.',
      technologies: ['Ruby Rails', 'Postgressql', 'Docker', 'Contextual Bandit', 'Python'],
      image: '/placeholder-2.jpg',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/Raamgopal8/Learner.git',
      gradient: 'from-purple-600 to-pink-600',
    }    
  ];

  return (
    <section id="projects" className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore a selection of my recent work—each project solving real-world problems
            with cutting-edge technology and thoughtful design.
          </p>
        </motion.div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpenModal={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
