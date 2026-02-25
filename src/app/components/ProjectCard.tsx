import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  headline: string;
  description: string;
  technologies: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
  gradient: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenModal: (project: Project) => void;
}

/**
 * Project card with microinteractions:
 * - Scale and glow border on hover
 * - Ripple effect on click
 * - Opens modal with project details
 */
export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onOpenModal }) => {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    // Add ripple
    setRipples((prev) => [...prev, { x, y, id }]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
    }, 600);

    // Open modal
    setTimeout(() => {
      onOpenModal(project);
    }, 150);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      whileHover={{ scale: 1.05 }}
      className="relative group cursor-pointer overflow-hidden rounded-2xl"
      onClick={handleClick}
    >
      {/* Animated glow border on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />

      <div className="relative h-full bg-card border border-border group-hover:border-transparent rounded-2xl overflow-hidden transition-all duration-300">
        {/* Project Image */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-500/20">
          <img
            src={project.image}
            alt={`${project.title} preview`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-45`} />
        </div>

        {/* Project Info */}
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-500 transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-sm font-medium text-blue-500 mb-3">{project.headline}</p>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="text-xs px-2 py-1 rounded-full bg-white/5 dark:bg-black/20 border border-white/10"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-xs px-2 py-1 rounded-full bg-white/5 dark:bg-black/20 border border-white/10">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>

          {/* Quick Links */}
          <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-400 transition-colors duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-4 h-4" />
              Live
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="w-4 h-4" />
              Code
            </a>
          </div>
        </div>

        {/* Ripple Effects */}
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.span
              key={ripple.id}
              initial={{ scale: 0, opacity: 0.5 }}
              animate={{ scale: 4, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="absolute pointer-events-none rounded-full bg-white/30 dark:bg-white/20"
              style={{
                left: ripple.x,
                top: ripple.y,
                width: 100,
                height: 100,
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
