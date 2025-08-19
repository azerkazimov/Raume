import About from "@/components/pages/main/components/about";
import Hero from "@/components/pages/main/components/hero";
import Project from "@/components/pages/main/components/project";
import WhyChooseUs from "@/components/pages/main/components/why-choose-us/why-choose-us";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <WhyChooseUs />
      <Project />
    </>
  );
}
