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
    yPercent: -15,
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

  // On place d'abord les images dans le SVG pour pouvoir mesurer leur bbox
  images.forEach((img) => {
    orbit.appendChild(img);
  });

  // Répartition égale des images sur le cercle, centrées sur leur propre bbox
  images.forEach((img, index) => {
    const angle = (index / count) * Math.PI * 2; // 0 → 2π

    // Taille réelle de l'image dans le repère SVG
    const bbox = img.getBBox();
    const w = bbox.width || 40;
    const h = bbox.height || 40;

    const xCenter = cx + r * Math.cos(angle);
    const yCenter = cy + r * Math.sin(angle);

    // On positionne l'image de façon à ce que son centre tombe sur le cercle
    img.setAttribute('x', String(xCenter - w / 2));
    img.setAttribute('y', String(yCenter - h / 2));
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

export function initFeaturesStack() {
  ScrollTrigger.matchMedia({
    '(min-width: 993px)': () => {
      const sections = Array.from(document.querySelectorAll<HTMLElement>('.section_features'));
      if (sections.length < 2) return;

      // Effet 3D entre features (1→2, 2→3, etc.)
      sections.forEach((section, index) => {
        const next = sections[index + 1];
        if (!next) return;

        gsap.fromTo(
          section,
          { scale: 1, z: 0 },
          {
            scale: 0.9,
            z: -120,
            ease: 'none',
            scrollTrigger: {
              trigger: next,
              start: 'top bottom',
              end: 'top top',
              scrub: true,
            },
          }
        );
      });

      // Effet pour la dernière feature quand la section engagement arrive (si tu l’as gardé)
      const lastFeature = sections[sections.length - 1];
      const engagement = document.querySelector<HTMLElement>('.section_engagement');

      if (lastFeature && engagement) {
        gsap.fromTo(
          lastFeature,
          { scale: 1, z: 0 },
          {
            scale: 0.9,
            z: -160,
            ease: 'none',
            scrollTrigger: {
              trigger: engagement,
              start: 'top bottom',
              end: 'top top',
              scrub: true,
            },
          }
        );
      }

      return () => {
        // cleanup auto des ScrollTriggers créés dans ce bloc quand on sort du breakpoint
      };
    },
  });
}

export function initHeroScale() {
  const img = document.querySelector<HTMLElement>('.hero_bg-wrap img');
  const section = document.querySelector<HTMLElement>('.section_hero');
  if (!img || !section) return;

  gsap.fromTo(
    img,
    { scale: 1.15 }, // légèrement zoomé en haut de page
    {
      scale: 1, // revient à 1 en fin de hero
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    }
  );
}

export function initIntelligenceTextAppear() {
  const trigger = document.querySelector<HTMLElement>('.section_intelligence');
  const container = document.querySelector<HTMLElement>('.intelligence_txt-content');
  if (!trigger || !container) return;

  const children = Array.from(container.children) as HTMLElement[];
  if (!children.length) return;

  gsap.from(children, {
    opacity: 0,
    y: 20,
    duration: 0.6,
    ease: 'power2.out',
    stagger: 0.15,
    scrollTrigger: {
      trigger,
      start: 'top 60%',
      toggleActions: 'play none none none',
    },
  });
}
