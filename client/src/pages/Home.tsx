/**
 * QUIET CULT OBJECT — Lungo × EIDEN premium presentation.
 * Every screen carries one memorable idea, one visual gesture, and one clear proof.
 * The system blends independent food editorial, Moroccan material culture, and strategy publishing.
 */
import { ArrowDown, ArrowUp, Expand, Minimize, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { wallImage } from "@/generated/wallImage";
import { cookieImage, matchaImage } from "@/generated/productImages";
import {
  calmProof,
  craftProof,
  dropProof,
  drinkProof,
  peopleProof,
  processProof,
  roomProof,
  streetProof,
  tableProof,
  toteProof,
  voiceProof,
} from "@/generated/editorialImages";

const ASSETS = {
  matcha: matchaImage,
  cookie: cookieImage,
  wall: wallImage,
  roomProof,
  craftProof,
  tableProof,
  calmProof,
  dropProof,
  processProof,
  voiceProof,
  peopleProof,
  streetProof,
  drinkProof,
  toteProof,
  visualCraft: craftProof,
  visualTable: tableProof,
  visualCalm: roomProof,
  visualPlace: streetProof,
};

const slides = [
  ["opening", "Opening", "A voice as good as the coffee"],
  ["respect", "What already exists", "You built the hard part"],
  ["gap", "The perception gap", "Room versus feed"],
  ["idea", "The idea", "Make the craft felt"],
  ["position", "The position", "Agadir’s taste house"],
  ["product", "The real product", "The cup and the room"],
  ["system", "The story system", "Craft, Table, Calm"],
  ["desire", "Product desire", "Worth crossing town for"],
  ["voice", "The voice", "Short, warm, sure"],
  ["table", "The signature format", "The Lungo Table"],
  ["rhythm", "The content rhythm", "Fewer posts, more meaning"],
  ["role", "EIDEN’s role", "One team holding the voice"],
  ["ninety", "The first 90 days", "Code, Drop, Table"],
  ["success", "What success feels like", "Become unmistakable"],
  ["offer", "The offer", "One clear start"],
  ["close", "The shared ambition", "Give the place its voice"],
] as const;

const pad = (value: number) => String(value).padStart(2, "0");

function LungoWordmark({ inverse = false }: { inverse?: boolean }) {
  return (
    <span className={`lungo-wordmark${inverse ? " is-inverse" : ""}`} aria-label="Lungo">
      <span className="wm-l">L</span><span className="wm-rest">ungo</span><i>.</i>
    </span>
  );
}

export default function Home() {
  const [active, setActive] = useState(0);
  const [indexOpen, setIndexOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const deckRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((requested: number) => {
    const next = Math.max(0, Math.min(slides.length - 1, requested));
    const target = document.getElementById(slides[next][0]);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${slides[next][0]}`);
    setIndexOpen(false);
  }, []);

  const slideClass = useCallback(
    (index: number, classes: string) =>
      `slide ${classes}${active === index ? " is-active" : ""}`,
    [active],
  );

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-slide]"));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(Number((visible.target as HTMLElement).dataset.index));
      },
      { threshold: [0.35, 0.55, 0.75] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    const initial = slides.findIndex(([id]) => id === hash);
    if (initial > 0) requestAnimationFrame(() => goTo(initial));
  }, [goTo]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIndexOpen(false);
        return;
      }
      if (["ArrowDown", "ArrowRight", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        goTo(active + 1);
      }
      if (["ArrowUp", "ArrowLeft", "PageUp"].includes(event.key)) {
        event.preventDefault();
        goTo(active - 1);
      }
      if (event.key === "Home") {
        event.preventDefault();
        goTo(0);
      }
      if (event.key === "End") {
        event.preventDefault();
        goTo(slides.length - 1);
      }
    };
    const onFullscreen = () => setIsFullscreen(Boolean(document.fullscreenElement));
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("fullscreenchange", onFullscreen);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("fullscreenchange", onFullscreen);
    };
  }, [active, goTo]);

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
    else await document.exitFullscreen();
  };

  const progress = useMemo(() => ((active + 1) / slides.length) * 100, [active]);

  return (
    <div className="deck" ref={deckRef}>
      <div className="paper-grain" aria-hidden="true" />

      <header className="deck-nav" aria-label="Presentation controls">
        <button className="brand-lockup" onClick={() => goTo(0)} aria-label="Go to first slide">
          <LungoWordmark />
          <i />
          <span className="brand-partner">EIDEN</span>
        </button>
        <div className="nav-center" aria-live="polite">
          <span>{pad(active + 1)}</span>
          <p>{slides[active][1]}</p>
        </div>
        <div className="nav-actions">
          <button className="index-trigger" onClick={() => setIndexOpen(true)}>
            <span>Index</span><i />
          </button>
          <button className="icon-button" onClick={toggleFullscreen} aria-label={isFullscreen ? "Exit full screen" : "Enter full screen"}>
            {isFullscreen ? <Minimize size={16} /> : <Expand size={16} />}
          </button>
        </div>
      </header>

      <div className="progress-track" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress / 100})` }} />
      </div>

      <main>
        <section id="opening" data-slide data-index="0" className={slideClass(0, "slide-opening paper-slide")}>
          <div className="opening-copy slide-pad">
            <p className="micro-label reveal">Brand direction · Agadir · 08/2026</p>
            <div className="opening-signature reveal d1"><LungoWordmark /><span>AGADIR’S TASTE HOUSE</span></div>
            <h1 className="opening-title reveal d1">A voice<br />as good as<br /><em>the coffee.</em></h1>
            <span className="ink-stroke reveal d2" />
            <p className="opening-sub reveal d3">Make the outside catch up with what already happens inside.</p>
          </div>
          <figure className="opening-photo reveal d1">
            <img src={ASSETS.matcha} alt="A guest carrying two layered Lungo matcha drinks" />
            <figcaption><b>THE TABLE</b><span>Matcha · Ube · Made here</span></figcaption>
            <div className="photo-index">L/001</div>
          </figure>
          <div className="opening-stamp reveal d3"><span>Proposal</span><strong>LUNGO × EIDEN</strong><small>One voice · one world</small></div>
          <p className="scroll-note">Scroll / use arrow keys</p>
        </section>

        <section id="respect" data-slide data-index="1" className={slideClass(1, "slide-respect paper-slide")}>
          <div className="respect-ghost" aria-hidden="true">already.</div>
          <div className="slide-pad respect-grid">
            <div className="respect-head">
              <p className="micro-label reveal">01 · Start with the truth</p>
              <h2 className="headline reveal d1">You already built<br /><em>the hard part.</em></h2>
              <p className="body-copy reveal d2">Lungo does not need a new personality. It needs a clearer one.</p>
            </div>
            <div className="proof-ledger reveal d2">
              <figure className="respect-photo-proof"><img src={ASSETS.roomProof} alt="Warm Lungo interior in natural light" /><figcaption>THE ROOM · ALREADY THERE</figcaption></figure>
              <article><span>01</span><div><strong>A room people choose.</strong><p>Warm, calm, made for slow mornings and long stays.</p></div></article>
              <article><span>02</span><div><strong>Products people mention.</strong><p>Matcha, ube, cookies, and combinations they cannot find next door.</p></div></article>
              <article><span>03</span><div><strong>A pace people remember.</strong><p>Nobody is pushing them through the door.</p></div></article>
            </div>
            <p className="margin-note reveal d3">Most cafés spend years trying to become memorable. Lungo already is.</p>
          </div>
        </section>

        <section id="gap" data-slide data-index="2" className={slideClass(2, "slide-gap ink-slide")}>
          <div className="gap-beam" aria-hidden="true" />
          <div className="slide-pad gap-grid">
            <div className="gap-room reveal">
              <p className="micro-label light">02 · The gap</p>
              <span className="side-word">THE ROOM</span>
              <figure className="message-photo gap-room-photo"><img src={ASSETS.visualCalm} alt="Quiet sunlit coffee room with one table" /><figcaption>THE ROOM / THE REASON TO STAY</figcaption></figure>
              <h2>The room tells<br />a richer story.</h2>
              <ul><li>Original products</li><li>Real standards</li><li>A point of view</li></ul>
            </div>
            <div className="gap-feed reveal d1">
              <span className="side-word">THE FEED</span>
              <h3>Online, that story gets smaller.</h3>
              <p>It can look like another good café. Pretty, calm, easy to miss.</p>
              <div className="gap-verdict"><b>Not a product gap.</b><strong>A perception gap.</strong></div>
            </div>
          </div>
        </section>

        <section id="idea" data-slide data-index="3" className={slideClass(3, "slide-idea olive-slide")}>
          <div className="idea-orbit" aria-hidden="true" />
          <div className="slide-pad idea-layout">
            <p className="micro-label light reveal">03 · The idea</p>
            <figure className="message-photo idea-photo reveal d1"><img src={ASSETS.visualCraft} alt="Hands preparing coffee and matcha with care" /><figcaption>CRAFT / MADE HERE</figcaption></figure>
            <h2 className="idea-title reveal d1">Make the craft<br /><em>felt.</em> Not loud.</h2>
            <span className="idea-brush reveal d2" />
            <p className="idea-copy reveal d2">No louder feed. No borrowed trends. A sharper world that lets people see why Lungo is worth choosing.</p>
            <blockquote className="idea-quote reveal d3">The calm is not what is missing.<br /><strong>The calm is the luxury.</strong></blockquote>
            <p className="idea-darija reveal d3" lang="ar" dir="rtl">و عووم بحرك</p>
          </div>
        </section>

        <section id="position" data-slide data-index="4" className={slideClass(4, "slide-position plaster-slide")}>
          <div className="position-watermark" aria-hidden="true">TASTE<br />HOUSE</div>
          <div className="slide-pad position-grid">
            <div className="position-copy">
              <p className="micro-label reveal">04 · The position</p>
              <figure className="message-photo position-photo reveal d1"><img src={ASSETS.visualPlace} alt="Warm Agadir street scene with a takeaway coffee" /><figcaption>AGADIR / A SENSE OF PLACE</figcaption></figure>
              <h2 className="headline reveal d1">Lungo is Agadir’s<br /><em>taste house.</em></h2>
              <p className="body-copy reveal d2">Not for everybody. For people who notice. Every bean, drink, cookie, collaboration, and detail has earned its place.</p>
            </div>
            <div className="trait-stack reveal d2">
              <article><span>01</span><strong>Considered</strong><small>Nothing random.</small></article>
              <article><span>02</span><strong>Original</strong><small>Worth seeking out.</small></article>
              <article><span>03</span><strong>Unhurried</strong><small>Time is part of it.</small></article>
            </div>
            <div className="position-seal reveal d3"><span>AGADIR</span><b>L.</b><small>For people who notice</small></div>
          </div>
        </section>

        <section id="product" data-slide data-index="5" className={slideClass(5, "slide-product paper-slide")}>
          <div className="slide-pad product-grid">
            <div className="product-heading">
              <p className="micro-label reveal">05 · The real product</p>
              <h2 className="headline reveal d1">They order a drink.<br /><em>They leave with a feeling.</em></h2>
            </div>
            <div className="product-side cup-side reveal d2">
              <span className="product-word">CUP</span>
              <div className="product-orbit"><i /><b>Taste</b><b>Choice</b><b>Detail</b></div>
              <p>What they can hold.</p>
            </div>
            <div className="product-center reveal d2"><span>WHAT THEY<br />RETURN FOR</span></div>
            <div className="product-side room-side reveal d2">
              <span className="product-word">ROOM</span>
              <div className="product-orbit"><i /><b>Time</b><b>Ease</b><b>Belonging</b></div>
              <p>What they carry out.</p>
            </div>
            <p className="product-close reveal d3"><strong>The combination is the product.</strong> One without the other is just coffee.</p>
          </div>
        </section>

        <section id="system" data-slide data-index="6" className={slideClass(6, "slide-system ink-slide")}>
          <div className="system-intro slide-pad-top">
            <p className="micro-label light reveal">06 · The story system</p>
            <h2 className="headline light-title reveal d1">Three stories.<br /><em>One unmistakable Lungo.</em></h2>
          </div>
          <div className="system-strips">
            <article className="story-strip story-craft reveal d1"><img src={ASSETS.craftProof} alt="Lungo coffee craft detail" /><span>01</span><div className="story-strip-copy"><h3>The Craft</h3><p>Show the care behind the cup.</p><small>Origin · process · standards</small></div></article>
            <article className="story-strip story-table reveal d2"><img src={ASSETS.tableProof} alt="People sharing a table inside Lungo" /><span>02</span><div className="story-strip-copy"><h3>The Table</h3><p>Make the products impossible to forget.</p><small>Drinks · cookies · seasonal drops</small></div></article>
            <article className="story-strip story-calm reveal d3"><img src={ASSETS.peopleProof} alt="Lungo exterior and its calm material character" /><span>03</span><div className="story-strip-copy"><h3>The Calm</h3><p>Turn the pace into a reason to return.</p><small>Light · people · slow mornings</small></div></article>
          </div>
        </section>

        <section id="desire" data-slide data-index="7" className={slideClass(7, "slide-desire paper-slide")}>
          <figure className="desire-photo reveal"><img src={ASSETS.cookie} alt="Lungo matcha cookies finished with raspberry" /><figcaption>PRODUCT NOTE / 001</figcaption></figure>
          <div className="desire-copy slide-pad">
            <p className="micro-label reveal">07 · Product desire</p>
            <h2 className="headline reveal d1">Give people something<br /><em>worth crossing town for.</em></h2>
            <div className="desire-lines reveal d2"><p><span>01</span>The ube is ours.</p><p><span>02</span>Matcha, properly.</p><p><span>03</span>A cookie with a signature.</p></div>
            <p className="body-copy reveal d3">We turn the things only Lungo does into names people ask for.</p>
            <div className="berry-swatch reveal d3"><i /><span>One product.<br />One strong memory.</span></div>
          </div>
        </section>

        <section id="voice" data-slide data-index="8" className={slideClass(8, "slide-voice ink-slide")}>
          <div className="voice-copy slide-pad">
            <p className="micro-label light reveal">08 · How Lungo sounds</p>
            <h2 className="headline light-title reveal d1">Short. Warm.<br /><em>Sure of itself.</em></h2>
            <p className="voice-rule reveal d2">No hype. No filler. No hard sell.</p>
            <div className="voice-notes">
              <blockquote className="paper-note note-one reveal d2">“Matcha, done properly.<br />Slow whisk. No shortcuts.”</blockquote>
              <blockquote className="paper-note note-two reveal d3">“Fresh from the oven.<br />Gone when it’s gone.”</blockquote>
              <blockquote className="paper-note note-three reveal d3">“Come for the cup. Stay because nobody is moving you on.”</blockquote>
            </div>
          </div>
          <figure className="voice-photo reveal d1"><img src={ASSETS.wall} alt="Lungo’s handmade think positive wall" /><figcaption><b>ENGLISH</b> brings the edge. <b>DARIJA</b> brings the soul.</figcaption></figure>
        </section>

        <section id="table" data-slide data-index="9" className={slideClass(9, "slide-table plaster-slide")}>
          <div className="slide-pad table-grid">
            <div className="table-copy">
              <p className="micro-label reveal">09 · The signature format</p>
              <h2 className="headline reveal d1">The Lungo Table.</h2>
              <p className="table-lead reveal d2">Small tasting sessions. Chosen guests. One origin or product at a time.</p>
              <blockquote className="table-quote reveal d3">Not an event for reach.<br /><strong>A ritual for reputation.</strong></blockquote>
            </div>
            <figure className="message-photo table-photo reveal d1"><img src={ASSETS.visualTable} alt="Small tasting table shared by a few guests" /><figcaption>THE CIRCLE / 04—08 GUESTS</figcaption></figure>
            <div className="roundtable-wrap reveal d2" aria-label="The Lungo Table format">
              <div className="roundtable"><span>L.</span><small>01 STORY<br />04—08 GUESTS</small></div>
              <i className="seat seat-a" /><i className="seat seat-b" /><i className="seat seat-c" /><i className="seat seat-d" /><i className="seat seat-e" /><i className="seat seat-f" />
              <p className="seat-label label-a">Curious</p><p className="seat-label label-b">Maker</p><p className="seat-label label-c">Regular</p>
            </div>
            <div className="table-outputs reveal d3"><span>Every table becomes</span><b>01 calm film</b><b>01 portrait series</b><b>01 origin note</b><b>01 real conversation</b></div>
          </div>
        </section>

        <section id="rhythm" data-slide data-index="10" className={slideClass(10, "slide-rhythm paper-slide")}>
          <div className="slide-pad rhythm-grid">
            <div className="rhythm-head">
              <p className="micro-label reveal">10 · The content rhythm</p>
              <h2 className="headline reveal d1">Fewer posts.<br /><em>More meaning.</em></h2>
              <p className="body-copy reveal d2">One considered monthly shoot. Four clear chapters.</p>
            </div>
            <div className="contact-sheet reveal d2">
              <article className="frame frame-hero"><img src={ASSETS.dropProof} alt="A layered Lungo iced coffee held in hand" /><span>01 / DROP</span><div className="frame-copy"><strong>Make one product impossible to miss.</strong><small>Hero film + product stills</small></div></article>
              <article className="frame"><img src={ASSETS.processProof} alt="Matcha whisking process at Lungo" /><span>02 / CRAFT</span><div className="frame-copy"><strong>Show why it is different.</strong><small>Hands + process</small></div></article>
              <article className="frame"><img src={ASSETS.voiceProof} alt="Lungo’s positive point of view" /><span>03 / POINT OF VIEW</span><div className="frame-copy"><strong>Say something worth keeping.</strong><small>Voice + philosophy</small></div></article>
              <article className="frame"><img src={ASSETS.tableProof} alt="People sharing a table inside Lungo" /><span>04 / THE TABLE</span><div className="frame-copy"><strong>Make the circle visible.</strong><small>People + event</small></div></article>
              <article className="frame"><img src={ASSETS.drinkProof} alt="An iced matcha Lungo drink on a table with the room alive behind it" /><span>05 / IN THE ROOM</span><div className="frame-copy"><strong>Let the room talk for itself.</strong><small>Product + atmosphere</small></div></article>
            </div>
            <p className="rhythm-close reveal d3">The feed stops asking for attention. <strong>It starts earning it.</strong></p>
          </div>
        </section>

        <section id="role" data-slide data-index="11" className={slideClass(11, "slide-role")}>
          <div className="role-half role-lungo">
            <div className="role-inner reveal"><p className="micro-label light">11 · The partnership</p><span className="role-owner">LUNGO OWNS</span><h2>The taste.<br />The standards.<br />The final yes.</h2><p>You protect what makes the place worth choosing.</p></div>
          </div>
          <div className="role-bridge reveal d2"><span>ONE<br />SHARED<br />EYE</span></div>
          <div className="role-half role-eiden">
            <div className="role-inner reveal d1"><span className="role-owner">EIDEN HOLDS</span><h2>The strategy.<br />The voice.<br />The work.</h2><p>We direct, shoot, write, publish, host, and keep the whole brand in tune.</p></div>
          </div>
          <p className="role-close reveal d3">Lungo protects the taste. <strong>EIDEN protects the way the world sees it.</strong></p>
        </section>

        <section id="ninety" data-slide data-index="12" className={slideClass(12, "slide-ninety olive-slide")}>
          <div className="slide-pad ninety-grid">
            <div className="ninety-head"><p className="micro-label light reveal">12 · The first 90 days</p><h2 className="headline light-title reveal d1">From good instinct<br /><em>to a living system.</em></h2></div>
            <div className="timeline-route reveal d2" aria-hidden="true"><i /><i /><i /></div>
            <div className="phase-row reveal d2">
              <article><span>Days 01—30</span><b>01</b><h3>The Code</h3><p>Lock the position, voice, look, and monthly plan.</p><small>Proof: one clear playbook</small></article>
              <article><span>Days 31—60</span><b>02</b><h3>The First Drop</h3><p>Shoot, publish, and make one product impossible to miss.</p><small>Proof: people ask by name</small></article>
              <article><span>Days 61—90</span><b>03</b><h3>The First Table</h3><p>Host the signature tasting, tell the story, and refine.</p><small>Proof: the right room fills</small></article>
            </div>
            <p className="ninety-note reveal d3">One decision maker. Honest feedback. Access to the space, the team, and the real story.</p>
          </div>
        </section>

        <section id="success" data-slide data-index="13" className={slideClass(13, "slide-success paper-slide")}>
          <div className="success-stamp reveal d3">UNMISTAKABLE</div>
          <div className="slide-pad success-grid">
            <div className="success-head"><p className="micro-label reveal">13 · What success looks like</p><h2 className="headline reveal d1">The right people start<br /><em>saying the right things.</em></h2><figure className="success-proof reveal d2"><img src={ASSETS.streetProof} alt="Agadir street scene near Lungo" /><figcaption>FROM AGADIR · FOR PEOPLE WHO NOTICE</figcaption></figure></div>
            <div className="success-points reveal d2">
              <article><span>01</span><p>They can describe Lungo in one clear sentence.</p></article>
              <article><span>02</span><p>They ask for products by name.</p></article>
              <article><span>03</span><p>They save and share because the content gives them something.</p></article>
              <article><span>04</span><p>The Lungo Table fills without chasing.</p></article>
            </div>
            <p className="success-close reveal d3">The goal is not to look active. <strong>It is to become unmistakable.</strong></p>
          </div>
        </section>

        <section id="offer" data-slide data-index="14" className={slideClass(14, "slide-offer ink-slide")}>
          <div className="slide-pad offer-grid">
            <div className="offer-head"><p className="micro-label light reveal">14 · One clear start</p><h2 className="headline light-title reveal d1">One senior creative system<br /><em>around Lungo.</em></h2><p className="offer-note reveal d2">Not a content factory. A voice, an eye, and a team that stays close.</p></div>
            <div className="price-block reveal d2"><span>Investment · to begin</span><strong>6,000 <i>MAD</i></strong><small>per month</small><img className="offer-proof-img" src={ASSETS.toteProof} alt="Lungo think positive tote bag" /></div>
            <div className="scope-ledger reveal d2">
              <article><span>01</span><p>Strategy + artistic direction</p></article><article><span>02</span><p>Monthly photo + film shoot</p></article><article><span>03</span><p>Social + community care</p></article><article><span>04</span><p>First signature event</p></article><article><span>05</span><p>Consistency across useful brand surfaces</p></article>
            </div>
            <p className="offer-close reveal d3">We begin focused, learn together, and expand only when the system earns it.</p>
          </div>
        </section>

        <section id="close" data-slide data-index="15" className={slideClass(15, "slide-close paper-slide")}>
          <div className="close-mark reveal" aria-label="Lungo L monogram"><span>L.</span></div>
          <div className="close-orbit" aria-hidden="true" />
          <div className="slide-pad close-grid">
            <p className="micro-label reveal">Lungo × EIDEN · Agadir</p>
            <div className="close-signature reveal d1"><LungoWordmark /><span>GOOD COFFEE · GOOD PEOPLE · GOOD MOMENTS</span></div>
            <h2 className="close-title reveal d1">Lungo is already<br />the place.<br /><em>Let’s give it the voice.</em></h2>
            <span className="close-stroke reveal d2" />
            <p className="close-sub reveal d2">Make the outside catch up with what happens inside.</p>
            <div className="close-slogan reveal d3"><span>think positive</span><i /><b lang="ar" dir="rtl">و عووم بحرك</b></div>
            <p className="close-credit reveal d3">Prepared by EIDEN Group · 2026</p>
          </div>
        </section>
      </main>

      <div className="deck-folio" aria-live="polite"><b>{pad(active + 1)}</b><i /><span>{pad(slides.length)}</span></div>
      <div className="deck-arrows">
        <button onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Previous slide"><ArrowUp size={16} /></button>
        <button onClick={() => goTo(active + 1)} disabled={active === slides.length - 1} aria-label="Next slide"><ArrowDown size={16} /></button>
      </div>

      {indexOpen && (
        <div className="index-overlay" role="dialog" aria-modal="true" aria-label="Presentation index">
          <div className="index-header"><div><LungoWordmark inverse /><small>Presentation index</small></div><button onClick={() => setIndexOpen(false)} aria-label="Close index"><X size={19} /></button></div>
          <nav className="index-list">
            {slides.map(([id, label, title], index) => (
              <button key={id} onClick={() => goTo(index)} className={index === active ? "active" : ""}>
                <span>{pad(index + 1)}</span><div><strong>{label}</strong><small>{title}</small></div><i />
              </button>
            ))}
          </nav>
          <div className="index-footer"><span>Use ↑ ↓ or ← → to navigate</span><strong>{pad(active + 1)} / {pad(slides.length)}</strong></div>
        </div>
      )}
    </div>
  );
}
