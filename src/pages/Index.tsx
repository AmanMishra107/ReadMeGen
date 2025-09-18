import HeroSection from '@/components/HeroSection';
import ReadmeGenerator from '@/components/ReadmeGenerator';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <div id="generator" className="py-12 md:py-20">
        <ReadmeGenerator />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
