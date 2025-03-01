import Hero from '../components/Hero';
import ComparisonSection from '../components/ComparisonSection';
import ServicesSection from '../components/ServicesSection';
//import YouTubeSection from '../components/YouTubeSection';
import CalendlyWidget from '../components/CalendlyWidget';
import { Helmet } from 'react-helmet-async';

function Home() {
  return (
    <>
      <Helmet>
        <title>Martes AI - Soluzioni di Intelligenza Artificiale per il Business</title>
        <meta name="description" content="Martes AI offre soluzioni innovative di intelligenza artificiale per automatizzare e ottimizzare i processi aziendali. Scopri come l'AI può trasformare il tuo business." />
        <meta name="keywords" content="intelligenza artificiale, AI, automazione, business, chatbot, machine learning, digital transformation" />
        <meta property="og:title" content="Martes AI - Soluzioni AI per il Business" />
        <meta property="og:description" content="Scopri come l'intelligenza artificiale può trasformare il tuo business con Martes AI." />
        <meta property="og:image" content="/path/to/your/image.jpg" />
        <link rel="canonical" href="https://www.martes-ai.com" />
      </Helmet>
      <div className="flex flex-col items-center w-full">
      <Hero />
        <ComparisonSection />
        <ServicesSection />
        {/* <YouTubeSection /> */}
        <section id="calendly" className="py-20 w-full">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Prenota una Chiamata
          </h2>
            <div className="max-w-4xl mx-auto">
              <CalendlyWidget />
            </div>
          </div>
        </section>
        </div>
    </>
  );
}

export default Home;