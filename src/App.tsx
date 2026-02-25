import { ThemeProvider } from './app/context/ThemeContext';
import { Navigation } from './app/components/Navigation';
import { Hero } from './app/components/Hero';
import { About } from './app/components/About';
import { Projects } from './app/components/Projects';
import { Contact } from './app/components/Contact';
import { BackgroundEffects } from './app/components/BackgroundEffects';
import { CursorEffect } from './app/components/CursorEffect';

/**
 * Main App component - Portfolio single-page application
 * Features smooth scrolling, theme switching, and scroll-based animations
 */
function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-500 relative">
        {/* Special Background Effects */}
        <BackgroundEffects />

        {/* Interactive Cursor Effect */}
        <CursorEffect />

        {/* Glassmorphism Navigation */}
        <Navigation />

        {/* Main Content */}
        <main className="relative z-10">
          {/* Hero Section with Gradient Text Animation */}
          <Hero />

          {/* About Section with Problem-Solution-Result */}
          <About />

          {/* Projects Section with Microinteraction Cards */}
          <Projects />

          {/* Contact Section */}
          <Contact />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
