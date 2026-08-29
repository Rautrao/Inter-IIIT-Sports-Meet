import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "9th Inter IIIT Sports Meet 2026",
  description: "The 9th Inter IIIT Sports Meet 2026, celebrating unity, sportsmanship, and excellence across all Indian Institutes of Information Technology.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
