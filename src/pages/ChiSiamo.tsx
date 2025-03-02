import React, { useState, useEffect } from 'react';
import { Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import SocialLinks from '../components/SocialLinks';

function ChiSiamo() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    revenue: '',
    budget: '',
    startDate: '',
    website: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Normalizza l'URL del sito web
    let normalizedWebsite = formData.website.trim(); // Rimuovi spazi bianchi

    // Se il campo website è vuoto, non fare nulla
    if (normalizedWebsite) {
      // Rimuovi eventuali "https://" o "http://" se presenti
      normalizedWebsite = normalizedWebsite.replace(/^https?:\/\//, '');
      
      // Rimuovi "www." se presente
      normalizedWebsite = normalizedWebsite.replace(/^www\./, '');
      
      // Aggiungi "https://www." all'inizio
      normalizedWebsite = `https://www.${normalizedWebsite}`;
    }

    try {
      const response = await fetch('https://hook.eu2.make.com/785b6chfkp9eik40ishiktlea2pk7r3c', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          project: formData.project,
          revenue: formData.revenue,
          budget: formData.budget,
          startDate: formData.startDate,
          website: normalizedWebsite,
        }),
      });

      if (!response.ok) throw new Error('Errore nell\'invio dei dati');

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        project: '',
        revenue: '',
        budget: '',
        startDate: '',
        website: '',
      });

      // Scroll al form dopo l'invio
      const formElement = document.querySelector('#contact-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }

    } catch (error) {
      console.error('Errore nell\'invio dei dati:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
};


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-20">Chi siamo</h1>

        <div className="grid md:grid-cols-2 gap-16 max-w-4xl mx-auto mb-20">
          {/* Riccardo */}
          <div className="text-center">
            <div className="mb-6 relative">
              <img
                src="/src/images/riccardo.jpg"
                alt="Riccardo"
                className="w-64 h-64 rounded-full mx-auto object-cover"
              />
            </div>
            <h2 className="text-3xl font-bold mb-2">Riccardo</h2>
            <p className="text-gray-300 mb-4"> Ingegnere informatico</p>
            <p className="text-gray-300 mb-4">Founder</p>
            <p className="text-[#274f36] mb-6 font-bold">riccardo@martes-ai.com</p>
            <SocialLinks person="riccardo" />
          </div>

          {/* Andrea */}
          <div className="text-center">
            <div className="mb-6">
              <img
                src="/src/images/andrea.jpg"
                alt="Andrea"
                className="w-64 h-64 rounded-full mx-auto object-cover"
              />
            </div>
            <h2 className="text-3xl font-bold mb-2">Andrea</h2>
            <p className="text-gray-300 mb-4">Fisico</p>
            <p className="text-gray-300 mb-4">Co-Founder</p>
            <p className="text-[#274f36] mb-6 font-bold">andrea@martes-ai.com</p>
            <SocialLinks person="andrea" />
          </div>
        </div>

        {/* Contact Form */}
        <div id="contact-form" className="max-w-2xl mx-auto bg-black/40 rounded-3xl p-8">
          <h2 className="text-4xl font-bold text-center mb-4">
            Hai un progetto in mente?
          </h2>
          <p className="text-center text-xl mb-8">
            Contattaci per condividere con noi la tua idea
          </p>

          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg text-center">
              Grazie per averci contattato! Ti risponderemo al più presto.
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-center">
              Si è verificato un errore. Per favore riprova più tardi o contattaci direttamente via email.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Nome*</label>
              <input
                type="text"
                name="name"
                required
                placeholder="Inserisci il tuo nome"
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:border-[#274f36] focus:ring-1 focus:ring-[#274f36] transition"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email*</label>
              <input
                type="email"
                name="email"
                required
                placeholder="Inserisci la tua email"
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:border-[#274f36] focus:ring-1 focus:ring-[#274f36] transition"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Parlaci del tuo progetto: dove vorresti applicare l'intelligenza
                artificiale per migliorare il tuo lavoro?*
              </label>
              <textarea
                name="project"
                required
                rows={4}
                placeholder="Inserisci qui i dettagli"
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:border-[#274f36] focus:ring-1 focus:ring-[#274f36] transition"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Quanto fattura la tua azienda?*
              </label>
              <input
                type="text"
                name="revenue"
                required
                placeholder="Inserisci un numero indicativo"
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:border-[#274f36] focus:ring-1 focus:ring-[#274f36] transition"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Budget per il progetto*
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="budget"
                    value="800-1200"
                    className="mr-2"
                    onChange={handleChange}
                  />
                  800€ - 1200€
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="budget"
                    value="1200-3000"
                    className="mr-2"
                    onChange={handleChange}
                  />
                  1200€ - 3000€
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="budget"
                    value="3000-5000"
                    className="mr-2"
                    onChange={handleChange}
                  />
                  3000€ - 5000€
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="budget"
                    value=">5000"
                    className="mr-2"
                    onChange={handleChange}
                  />
                  Più di 5000€
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Quando vorresti iniziare il progetto?*
              </label>
              <input
                type="text"
                name="startDate"
                required
                placeholder="Es: Il prima possibile, Tra 2 mesi, etc."
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:border-[#274f36] focus:ring-1 focus:ring-[#274f36] transition"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Sito internet della tua azienda
              </label>
              <input
                type="url"
                name="website"
                placeholder="Inserisci qui il link"
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:border-[#274f36] focus:ring-1 focus:ring-[#274f36] transition"
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-[#274f36] hover:bg-[#1a3524] text-white py-3 px-6 rounded-full text-lg font-semibold transition duration-300 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Invio in corso...' : 'Invia messaggio'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChiSiamo;