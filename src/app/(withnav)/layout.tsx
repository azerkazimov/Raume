import Footer from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

interface WithNavLayoutProps {
  children: React.ReactNode;
}

export default function WithNavLayout({ children }: WithNavLayoutProps) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
