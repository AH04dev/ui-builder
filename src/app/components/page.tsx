import { ComponentShowcase, Footer, Navbar } from '@/components';

export default function ComponentsPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-24 md:pt-28">
        <ComponentShowcase />
      </div>
      <Footer />
    </main>
  );
}
