import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import './audience-growth-carousel.css';

const scenes = [
  {
    id: 'leadership', label: 'Working together', title: 'Experienced leadership.', accent: 'Growth we build together.',
    description: '12+ years of digital marketing experience, amplified by AI. A hands-on partner committed to your next stage of growth.',
    principles: ['Clear direction', 'Real collaboration', 'Focused action'],
    poster: '/images/experience/leadership-collaboration.webp',
    alt: 'A woman strategist presents a growth plan to two colleagues beside an easel and a mountain summit.',
  },
  {
    id: 'retreat', label: 'Wellness & retreats', title: 'An experience worth finding.', accent: 'Help the right guests discover it.',
    description: 'For retreat owners and wellness teams: connect your advertising, landing pages, and guest journey to turn interest into more qualified inquiries and bookings.',
    principles: ['Guest-fit messaging', 'Booking journeys', 'Focused testing'],
    poster: '/images/experience/audiences/retreat.webp',
    alt: 'A retreat host and strategist review bookings as guests approach a mountain meditation pavilion.',
  },
  {
    id: 'travel', label: 'Travel & hospitality', title: 'From destination inspiration.', accent: 'To the next meaningful booking.',
    description: 'For travel companies, hotels, and cruise operators: connect the story that attracts travelers with the pages, follow-up, and measurement that help them choose.',
    principles: ['Destination appeal', 'Qualified inquiries', 'Clear measurement'],
    poster: '/images/experience/audiences/travel.webp',
    alt: 'Travel and hospitality leaders plan a connected guest journey linking a traveler, boutique lodge, and cruise vessel.',
  },
  {
    id: 'fitness', label: 'Fitness & multiple locations', title: 'Local demand. Shared direction.', accent: 'Growth across your locations.',
    description: 'For fitness studios and multi-location teams: bring campaigns, creative, landing-page tests, and enrollment reporting into a coordinated plan that respects each local market.',
    principles: ['Local campaigns', 'Enrollment journeys', 'Location-level insights'],
    poster: '/images/experience/audiences/fitness.webp',
    alt: 'A fitness owner and strategist coordinate enrollment growth across three studios while a coach welcomes participants.',
  },
];

function SceneMedia({ scene, suppressClick }: { scene: typeof scenes[number]; suppressClick: React.MutableRefObject<boolean> }) {
  const stage = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const manuallyPaused = useRef(false);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(preference.matches);
    update(); preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (entry.isIntersecting) setLoaded(true);
    }, { threshold: 0.25 });
    if (stage.current) observer.observe(stage.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const media = video.current;
    if (!media) return;
    const syncPlayback = () => {
      if (visible && !document.hidden && !reduced && !manuallyPaused.current && !media.ended) {
        media.play().catch(() => setPlaying(false));
      } else media.pause();
    };
    syncPlayback();
    document.addEventListener('visibilitychange', syncPlayback);
    return () => { document.removeEventListener('visibilitychange', syncPlayback); media.pause(); };
  }, [visible, loaded, reduced]);
  function toggle() {
    if (suppressClick.current) { suppressClick.current = false; return; }
    const media = video.current;
    if (!media) return;
    if (media.paused || media.ended) {
      manuallyPaused.current = false;
      if (media.ended) { media.currentTime = 0; setEnded(false); }
      media.play().catch(() => setPlaying(false));
    } else { manuallyPaused.current = true; media.pause(); }
  }
  return <div className="audience-media" ref={stage}>
    {reduced || failed ? <img src={scene.poster} alt={scene.alt} width="1200" height="900" loading="lazy" /> :
      <button type="button" className="audience-motion" onClick={toggle}
        aria-label={`${ended ? 'Replay' : playing ? 'Pause' : 'Play'} ${scene.label.toLowerCase()} animation`}>
        <video ref={video} src={loaded ? `/videos/audiences/${scene.id}.mp4` : undefined}
          poster={scene.poster} muted playsInline preload="none" aria-hidden="true"
          onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
          onEnded={() => { setEnded(true); setPlaying(false); }} onError={() => setFailed(true)} />
        <span className="sr-only">{scene.alt}</span>
      </button>}
  </div>;
}

export default function AudienceGrowthCarousel() {
  const [index, setIndex] = useState(0);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const suppressClick = useRef(false);
  const scene = scenes[index];
  const move = (step: number) => setIndex(current => (current + step + scenes.length) % scenes.length);
  return <div className="audience-carousel" role="region" aria-roledescription="carousel" aria-label="Who we help grow"
    onKeyDown={event => {
      if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
    }}>
    <div className="home-experience-layout" id="audience-growth-slide" role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${scenes.length}: ${scene.label}`}>
      <div className="home-experience-copy">
        <h2>{scene.title}<br /><span>{scene.accent}</span></h2>
        <p>{scene.description}</p>
        <div className="home-experience-principles" aria-label="Our focus">{scene.principles.map(item => <span key={item}>{item}</span>)}</div>
        <Link className="audience-partnership-link" to="/growth-partnership">Explore the Growth Partnership <ArrowRight size={16} aria-hidden="true" /></Link>
      </div>
      <div className="home-experience-visual" onTouchStart={event => {
        suppressClick.current = false;
        touch.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
      }} onTouchEnd={event => {
        if (!touch.current) return;
        const dx = event.changedTouches[0].clientX - touch.current.x;
        const dy = event.changedTouches[0].clientY - touch.current.y;
        if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
          suppressClick.current = true;
          move(dx < 0 ? 1 : -1);
        }
        touch.current = null;
      }} onTouchCancel={() => { touch.current = null; }}>
        <SceneMedia key={scene.id} scene={scene} suppressClick={suppressClick} />
        <div className="audience-arrows">
          <button type="button" onClick={() => move(-1)} aria-label="Previous audience" aria-controls="audience-growth-slide"><ArrowLeft size={19} aria-hidden="true" /></button>
          <span aria-live="polite" aria-atomic="true">{scene.label} <span className="audience-count">{index + 1} / {scenes.length}</span></span>
          <button type="button" onClick={() => move(1)} aria-label="Next audience" aria-controls="audience-growth-slide"><ArrowRight size={19} aria-hidden="true" /></button>
        </div>
      </div>
    </div>
    <div className="audience-selector" aria-label="Choose an audience">{scenes.map((item, i) =>
      <button key={item.id} type="button" aria-pressed={i === index} aria-controls="audience-growth-slide" onClick={() => setIndex(i)}>{item.label}</button>
    )}</div>
  </div>;
}
