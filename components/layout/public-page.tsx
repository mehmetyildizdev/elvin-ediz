import { Footer } from './footer';
import { Header } from './header';

export function PublicPage({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
