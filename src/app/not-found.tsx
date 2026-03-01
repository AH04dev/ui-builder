import Link from 'next/link';
import { Footer, Navbar } from '@/components';

export default function NotFound() {
  return (
    <main>
      <Navbar />
      <section className="ui-section pt-28">
        <div className="ui-container">
          <div className="glass-panel mx-auto max-w-2xl rounded-3xl p-8 text-center md:p-10">
            <p className="section-kicker">404</p>
            <h1 className="font-display mt-4 text-4xl font-semibold text-white md:text-5xl">
              Page not found
            </h1>
            <p className="mt-4 text-sm text-[var(--text-secondary)] md:text-base">
              The page you requested does not exist or was moved.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/"
                className="rounded-full px-5 py-2.5 text-sm font-semibold"
                style={{
                  color: '#04070f',
                  background: 'linear-gradient(135deg, var(--accent) 0%, #6fffe9 100%)',
                }}
              >
                Back home
              </Link>
              <Link
                href="/docs"
                className="rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-[var(--text-secondary)] transition hover:text-white"
              >
                Open docs
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}


