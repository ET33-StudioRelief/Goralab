import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initTagsAppear() {
  const tags = document.querySelectorAll<HTMLElement>('.tag');

  tags.forEach((tag) => {
    gsap.from(tag, {
      scrollTrigger: {
        trigger: tag,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
      x: -16,
      opacity: 0,
      duration: 0.8,
      ease: 'power1.out',
    });
  });
}

export function initAboutTextAppear() {
  const section = document.querySelector<HTMLElement>('.section_about');
  const content = section?.querySelector<HTMLElement>('.text-rich-text');

  if (!section || !content) return;

  gsap.from(content, {
    scrollTrigger: {
      trigger: section, // on déclenche sur toute la section_about
      start: 'top 40%',
      toggleActions: 'play none none none',
    },
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: 'power1.out',
  });
}

export function initEngagementParallax() {
  const section = document.querySelector<HTMLElement>('.section_engagement');
  if (!section) return;

  const image = section.querySelector<HTMLElement>('.engagement_img-wrap img');
  if (!image) return;

  gsap.to(image, {
    yPercent: -25,
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top 30%',
      end: 'bottom 40%',
      scrub: true,
    },
  });
}

export function initIntelligenceEllipses() {
  const circle = document.querySelector<SVGCircleElement>('[trigger="ellipse-path"]');
  const orbit = document.querySelector<SVGGElement>('#ellipse-orbit');
  if (!circle || !orbit) return;

  const cx = parseFloat(circle.getAttribute('cx') ?? '0');
  const cy = parseFloat(circle.getAttribute('cy') ?? '0');
  const r = parseFloat(circle.getAttribute('r') ?? '0');
  if (!r) return;

  const images = orbit.querySelectorAll<SVGImageElement>('image');
  const count = images.length;
  if (!count) return;

  // Répartition égale des images sur le cercle
  images.forEach((img, index) => {
    const angle = (index / count) * Math.PI * 2; // 0 → 2π

    const widthAttr = img.getAttribute('width');
    const heightAttr = img.getAttribute('height');
    const w = widthAttr ? parseFloat(widthAttr) : 40;
    const h = heightAttr ? parseFloat(heightAttr) : 40;

    const x = cx + r * Math.cos(angle) - w / 2;
    const y = cy + r * Math.sin(angle) - h / 2;

    img.setAttribute('x', String(x));
    img.setAttribute('y', String(y));
  });

  // Rotation continue de l'orbite complète
  gsap.to(orbit, {
    rotation: 360,
    duration: 60,
    ease: 'none',
    repeat: -1,
    svgOrigin: `${cx} ${cy}`,
  });
}
