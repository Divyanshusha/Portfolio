import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import ResumeDetails from './components/ResumeDetails';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

export default function App() {
  return (
    <>
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[400] focus:rounded-md focus:bg-pass focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-[#0a120e]"
      >
        Skip to main content
      </a>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <ResumeDetails />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
