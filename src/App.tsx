import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { Brands } from "./components/sections/Brands";
import { Methodology } from "./components/sections/Methodology";
import { Services } from "./components/sections/Services";
import { Testimonials } from "./components/sections/Testimonials";
import { AboutRuben } from "./components/sections/AboutRuben";
import { Newsletter } from "./components/sections/Newsletter";
import { FAQs } from "./components/sections/FAQs";
import { Contact } from "./components/sections/Contact";
import { SEO } from "./components/common/SEO";

function App() {
  return (
    <div className="min-h-screen bg-negro">
      <SEO/>
      <Header />
      <main>
        <Hero />
        <Brands />
        <Methodology />
        <Services />
        <Testimonials />
        <AboutRuben />
        <Newsletter />
        <FAQs />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
