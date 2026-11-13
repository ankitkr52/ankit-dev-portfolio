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
      { title: "Ankit Kumar — Full-Stack MERN Developer" },
      {
        name: "description",
        content:
          "Computer Science & Engineering graduate from Sarvepalli Radhakrishnan University, Bhopal. Building production-grade MERN applications with secure APIs, AI integrations, and payment systems.",
      },
      { name: "keywords", content: "Full Stack Developer, MERN Stack, React Developer, Node.js, MongoDB, AI Integration, Gemini API, Freelance Developer India, Next.js Developer" },
      { property: "og:title", content: "Ankit Kumar — Full-Stack MERN Developer" },
      { property: "og:description", content: "Building scalable web products with React, Node.js, and MongoDB." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Ankit Kumar — Full-Stack MERN Developer" },
      { name: "twitter:description", content: "Building scalable web products with React, Node.js, and MongoDB." },
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
            name: "Sarvepalli Radhakrishnan University (RKDF Institute of Science & Technology), Bhopal",
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
