import { Animations, Footer, Navbar } from '@/components';

export default function AnimationsPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-24 md:pt-28">
        <Animations />
      </div>
      <Footer />
    </main>
  );
}
