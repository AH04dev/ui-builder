import {
  Animations,
  CTA,
  ComponentShowcase,
  FeatureCards,
  Features,
  Footer,
  Hero,
  Navbar,
  Platforms,
} from '@/components';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <FeatureCards />
      <Platforms />
      <ComponentShowcase previewOnly />
      <Features />
      <Animations previewOnly />
      <CTA />
      <Footer />
    </main>
  );
}
