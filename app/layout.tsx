import { AuthProvider } from '@/context/AuthContext';
import NavBar from '@/components/nav-bar';
import Footer from '@/components/footer';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className="flex flex-col min-h-screen bg-[#121212]">
          <NavBar />
          <main className="flex-grow mt-16">{children}</main>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
}
