import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { Stats } from "./components/sections/Stats";
import { Methodology } from "./components/sections/Methodology";
import { Services } from "./components/sections/Services";
import { Testimonials } from "./components/sections/Testimonials";
import { AboutRuben } from "./components/sections/AboutRuben";
import { FAQs } from "./components/sections/FAQs";
import { Contact } from "./components/sections/Contact";
import { SEO } from "./components/common/SEO";

function App() {
  return (
    <div className="min-h-screen bg-negro">
      <SEO />
      <Header />
      <main>
        <Hero />
        <Stats />
        {/* Divider sutil entre Stats y Metodología */}
        <div className="bg-negro">
          <div className="container mx-auto px-6">
            <div className="h-px bg-gradient-to-r from-transparent via-blanco/20 to-transparent"></div>
          </div>
        </div>
        <Methodology />
        <Services />
        <Testimonials />
        <AboutRuben />
        <FAQs />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
