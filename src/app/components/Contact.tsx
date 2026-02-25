import React from 'react';
import { motion } from 'motion/react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Mail } from 'lucide-react';

/**
 * Contact section with social links and call-to-action
 * Features smooth scroll reveal animations
 */
export const Contact: React.FC = () => {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section id="contact" className="py-20 px-6 relative">
      <div className="max-w-4xl mx-auto text-center" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let's Build Something Amazing
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities
            to be part of your vision. Let's connect!
          </p>
        </motion.div>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          className="mb-12"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
            href="mailto:raamgopal2369@gmail.com"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300"
          >
            <Mail className="w-6 h-6" />
            Get In Touch
          </motion.a>
        </motion.div>
      
        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8, ease: 'easeOut' }}
          className="mt-20 pt-8 border-t border-white/10"
        >
          <p className="text-sm text-muted-foreground">
            © Developed by Raamgopal.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
