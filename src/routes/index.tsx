import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { Services } from "@/components/portfolio/Services";
import { Projects } from "@/components/portfolio/Projects";
import { About } from "@/components/portfolio/About";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { Cursor } from "@/components/portfolio/Cursor";
import { SmoothScroll } from "@/components/portfolio/SmoothScroll";
import { Loader } from "@/components/portfolio/Loader";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ankit Kumar — Full-Stack Developer & MERN Stack Engineer" },
      {
        name: "description",
        content:
          "Computer Science graduate from Mahakaushal University. Building production-grade web apps with React, Node.js, MongoDB, and Google Gemini AI. Open to full-time roles and freelance projects.",
      },
      { name: "keywords", content: "Full Stack Developer, MERN Stack, React Developer, Node.js, MongoDB, AI Integration, Gemini API, Freelance Developer India, Next.js Developer" },
      { property: "og:title", content: "Ankit Kumar — Full-Stack Developer" },
      { property: "og:description", content: "Shipping production-grade web applications." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Ankit Kumar — Full-Stack Developer" },
      { name: "twitter:description", content: "Shipping production-grade web applications." },
    ],
    links: [
      { rel: "canonical", href: "/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Ankit Kumar",
          jobTitle: "Full-Stack Developer",
          alumniOf: {
            "@type": "CollegeOrUniversity",
            name: "Mahakaushal University, Jabalpur",
          },
          knowsAbout: ["React", "Node.js", "MongoDB", "Express.js", "Gemini AI", "REST APIs", "JWT Authentication"],
          sameAs: [
            "https://linkedin.com/in/ankit-kumar-2b3381355",
            "https://github.com/ankitkr52",
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Loader />
      <SmoothScroll />
      <Cursor />
      <ScrollProgress />
      <Nav />
      <main className="relative">
        <Hero />
        <Services />
        <Projects />
        <About />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
