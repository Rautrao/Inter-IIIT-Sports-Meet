import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "9th Inter-IIIT Sports Meet 2026 | IIITDM Kancheepuram",
  description: "The 9th All India Inter-IIIT Sports Meet 2026, hosted by IIITDM Kancheepuram. 19–23 December 2026. 2,000+ athletes, 25+ IIITs, 15+ sporting disciplines.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col" style={{ background: '#faf6ee' }}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
