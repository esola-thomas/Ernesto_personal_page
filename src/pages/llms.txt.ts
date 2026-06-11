import type { APIContext } from "astro";
import { getEssays, essaySlug } from "../lib/writing";

export async function GET(context: APIContext) {
  const essays = await getEssays("en");
  const site = (context.site ?? new URL("https://ernesto.solathomas.com")).href;

  const essayLines = essays
    .map((e) => `- [${e.data.title}](${site}writing/${essaySlug(e)}/): ${e.data.description}`)
    .join("\n");

  const text = `# Ernesto Sola-Thomas

> Personal site of Ernesto Sola-Thomas: silicon verification engineer at Microsoft (AI accelerator chips, UVM, formal verification), founder of Huitzo (a self-hosted AI runtime for regulated enterprises), and IEEE-published researcher in assistive robotics and post-quantum cryptography. Based in Raleigh, NC. Bilingual: English and Spanish.

Key facts:
- Role: Silicon verification engineer at Microsoft, working on AI accelerator silicon (floating-point pipelines, UVM environments, coverage closure).
- Founder of Huitzo (https://huitzo.com), "The Operating System for Intelligence", a self-hosted AI runtime that lets regulated enterprises (insurance, healthcare, financial services, government, legal) run AI applications inside their own infrastructure. Independent of Microsoft.
- Founder of Sola-Thomas Solutions LLC, a consulting studio for architecture, prototyping, and cloud infrastructure.
- Education: Clarkson University (undergraduate and graduate). Master's thesis: post-quantum secured file transfer protocol with blockchain auditability (arXiv:2504.07938).
- Publications: six papers across IEEE conferences and arXiv, including autonomous wheelchair navigation (IEEE SoutheastCon 2021), wearable stereo vision for blind navigation, FPGA-based prosthetic hand control, and ECG-based emotion recognition.
- Contact: ernesto@solathomas.com

## Pages

- [Home](${site}): Profile, experience, projects, and how to collaborate.
- [Writing](${site}writing/): Essays on AI in regulated industries, silicon to software, and the founder journey. RSS: ${site}rss.xml
- [Research & Publications](${site}research/): Full publication list with links to IEEE and arXiv.
- [Speaking & Media](${site}speaking/): Speaker bios, suggested topics, booking.
- [Huitzo](${site}huitzo/): What Huitzo is, the problem, the stage, and the vision.
- [My Journey](${site}journey/): Story, lessons, and resources for students and early-career engineers.
- [Spanish version](${site}es/): Full site in Spanish.

## Essays
${essayLines ? `\n${essayLines}` : "\n(coming soon)"}

## Profiles

- GitHub: https://github.com/esola-thomas
- LinkedIn: https://www.linkedin.com/in/sola-thomas
- IEEE author page: https://ieeexplore.ieee.org/author/37089713498
`;

  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
}
