/* ═══════════════════════════════════════════════════════════════════════════
   GOLGOTHA ACADEMY · HyperFrames Animation Utilities
   Requires: GSAP 3.x (https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js)
   ═══════════════════════════════════════════════════════════════════════════ */

const Animations = {

  /* ── Configuration ─────────────────────────────────────────────────────── */
  defaults: {
    duration:     0.6,
    easeIn:       'power2.in',
    easeOut:      'power2.out',
    easeInOut:    'power2.inOut',
    staggerDelay: 0.15,
    distance:     60,
  },


  /* ── Entrance Animations ───────────────────────────────────────────────── */

  /** Fade in from transparent. */
  fadeIn(element, delay = 0) {
    return gsap.fromTo(element,
      { opacity: 0 },
      { opacity: 1, duration: this.defaults.duration, delay, ease: this.defaults.easeOut }
    );
  },

  /** Fade out to transparent. */
  fadeOut(element, delay = 0) {
    return gsap.to(element,
      { opacity: 0, duration: this.defaults.duration, delay, ease: this.defaults.easeIn }
    );
  },

  /** Slide in from the left. */
  slideInLeft(element, delay = 0) {
    return gsap.fromTo(element,
      { x: -this.defaults.distance, opacity: 0 },
      { x: 0, opacity: 1, duration: this.defaults.duration, delay, ease: this.defaults.easeOut }
    );
  },

  /** Slide in from the right. */
  slideInRight(element, delay = 0) {
    return gsap.fromTo(element,
      { x: this.defaults.distance, opacity: 0 },
      { x: 0, opacity: 1, duration: this.defaults.duration, delay, ease: this.defaults.easeOut }
    );
  },

  /** Slide in from below. */
  slideInUp(element, delay = 0) {
    return gsap.fromTo(element,
      { y: this.defaults.distance, opacity: 0 },
      { y: 0, opacity: 1, duration: this.defaults.duration, delay, ease: this.defaults.easeOut }
    );
  },

  /** Slide in from above. */
  slideInDown(element, delay = 0) {
    return gsap.fromTo(element,
      { y: -this.defaults.distance, opacity: 0 },
      { y: 0, opacity: 1, duration: this.defaults.duration, delay, ease: this.defaults.easeOut }
    );
  },

  /** Slide out to the left. */
  slideOutLeft(element, delay = 0) {
    return gsap.to(element,
      { x: -this.defaults.distance, opacity: 0, duration: this.defaults.duration, delay, ease: this.defaults.easeIn }
    );
  },

  /** Slide out to the right. */
  slideOutRight(element, delay = 0) {
    return gsap.to(element,
      { x: this.defaults.distance, opacity: 0, duration: this.defaults.duration, delay, ease: this.defaults.easeIn }
    );
  },


  /* ── Scale Animations ──────────────────────────────────────────────────── */

  /** Scale up from 0 → 1 with fade. */
  scaleIn(element, delay = 0) {
    return gsap.fromTo(element,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.7, delay, ease: 'back.out(1.4)' }
    );
  },

  /** Scale down to 0 with fade. */
  scaleOut(element, delay = 0) {
    return gsap.to(element,
      { scale: 0, opacity: 0, duration: 0.5, delay, ease: this.defaults.easeIn }
    );
  },


  /* ── Stagger ───────────────────────────────────────────────────────────── */

  /**
   * Apply an animation to multiple elements with staggered timing.
   * @param {string|Element[]} elements  CSS selector or array of elements
   * @param {'fadeIn'|'slideInLeft'|'slideInRight'|'slideInUp'|'slideInDown'|'scaleIn'} animation
   * @param {number} staggerDelay  Delay between each element (seconds)
   * @param {number} initialDelay  Delay before the first element starts
   */
  stagger(elements, animation = 'fadeIn', staggerDelay = 0.15, initialDelay = 0) {
    const els = typeof elements === 'string' ? document.querySelectorAll(elements) : elements;
    const tweens = [];

    const propsByAnimation = {
      fadeIn:       { from: { opacity: 0 },                                    to: { opacity: 1 } },
      slideInLeft:  { from: { x: -this.defaults.distance, opacity: 0 },        to: { x: 0, opacity: 1 } },
      slideInRight: { from: { x:  this.defaults.distance, opacity: 0 },        to: { x: 0, opacity: 1 } },
      slideInUp:    { from: { y:  this.defaults.distance, opacity: 0 },        to: { y: 0, opacity: 1 } },
      slideInDown:  { from: { y: -this.defaults.distance, opacity: 0 },        to: { y: 0, opacity: 1 } },
      scaleIn:      { from: { scale: 0, opacity: 0 },                          to: { scale: 1, opacity: 1 } },
    };

    const props = propsByAnimation[animation] || propsByAnimation.fadeIn;

    els.forEach((el, i) => {
      tweens.push(
        gsap.fromTo(el,
          { ...props.from },
          {
            ...props.to,
            duration: this.defaults.duration,
            delay: initialDelay + i * staggerDelay,
            ease: animation === 'scaleIn' ? 'back.out(1.4)' : this.defaults.easeOut,
          }
        )
      );
    });

    return tweens;
  },


  /* ── Text Animations ───────────────────────────────────────────────────── */

  /** Reveal text via clip-path wipe from left. */
  revealText(element, delay = 0) {
    return gsap.fromTo(element,
      { clipPath: 'inset(0 100% 0 0)' },
      { clipPath: 'inset(0 0% 0 0)', duration: 0.8, delay, ease: this.defaults.easeOut }
    );
  },

  /** Typewriter effect — reveals text character by character. */
  typewriter(element, delay = 0) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    const text = el.textContent;
    const totalDuration = Math.min(text.length * 0.04, 3);

    el.textContent = '';
    el.style.opacity = '1';

    return gsap.to(el, {
      duration: totalDuration,
      delay,
      ease: 'none',
      onUpdate() {
        const progress = this.progress();
        const charsToShow = Math.floor(progress * text.length);
        el.textContent = text.substring(0, charsToShow);
      }
    });
  },


  /* ── Shape / SVG Animations ────────────────────────────────────────────── */

  /** Animate an SVG line or path from 0 to full length. */
  drawLine(element, delay = 0) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;

    // Works for elements with a width property (div-based lines)
    return gsap.fromTo(el,
      { width: '0%' },
      { width: '100%', duration: 0.8, delay, ease: this.defaults.easeInOut }
    );
  },

  /** Animate a progress bar fill from 0% → target%. */
  progressBar(element, duration = 2, targetPercent = 100) {
    return gsap.to(element, {
      width: targetPercent + '%',
      duration,
      ease: this.defaults.easeInOut,
    });
  },


  /* ── Branded Sequences ─────────────────────────────────────────────────── */

  /**
   * Intro sequence: logo scale-in → divider draw → title slide-up → subtitle fade.
   * @param {Element|string} logoEl      Brand wordmark element
   * @param {Element|string} dividerEl   Green divider line element
   * @param {Element|string} titleEl     Course title element
   * @param {Element|string} subtitleEl  Subtitle element
   * @returns {gsap.core.Timeline}
   */
  brandIntro(logoEl, dividerEl, titleEl, subtitleEl) {
    const tl = gsap.timeline({ defaults: { ease: this.defaults.easeOut } });

    tl.fromTo(logoEl,
        { scale: 0.6, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.3)' }
      )
      .fromTo(dividerEl,
        { width: 0, opacity: 0 },
        { width: 80, opacity: 1, duration: 0.5 },
        '-=0.2'
      )
      .fromTo(titleEl,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.15'
      )
      .fromTo(subtitleEl,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        '-=0.1'
      );

    return tl;
  },

  /**
   * Outro sequence: logo scale-in → CTA slide up → social links fade.
   * @param {Element|string} logoEl   Brand wordmark element
   * @param {Element|string} ctaEl    Call-to-action button
   * @param {Element|string} socialEl Social links row (optional)
   * @returns {gsap.core.Timeline}
   */
  brandOutro(logoEl, ctaEl, socialEl) {
    const tl = gsap.timeline({ defaults: { ease: this.defaults.easeOut } });

    tl.fromTo(logoEl,
        { scale: 0.6, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.3)' }
      )
      .fromTo(ctaEl,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        '-=0.2'
      );

    if (socialEl) {
      tl.fromTo(socialEl,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        '-=0.1'
      );
    }

    return tl;
  },


  /**
   * Quiz reveal: highlight correct option green, mark others incorrect.
   * @param {Element|string} correctEl      The correct option element
   * @param {Element[]|string} incorrectEls The incorrect option elements
   * @param {Element|string} explanationEl  The explanation element (optional)
   * @returns {gsap.core.Timeline}
   */
  quizReveal(correctEl, incorrectEls, explanationEl) {
    const tl = gsap.timeline({ defaults: { ease: this.defaults.easeOut } });

    // 1. Flash correct option
    tl.call(() => {
      const el = typeof correctEl === 'string' ? document.querySelector(correctEl) : correctEl;
      el.classList.add('quiz-option--correct');
    })
    .fromTo(correctEl,
      { scale: 1 },
      { scale: 1.03, duration: 0.3, yoyo: true, repeat: 1 }
    );

    // 2. Mark incorrect options
    const incEls = typeof incorrectEls === 'string'
      ? document.querySelectorAll(incorrectEls)
      : incorrectEls;

    tl.call(() => {
      incEls.forEach(el => {
        const elem = typeof el === 'string' ? document.querySelector(el) : el;
        elem.classList.add('quiz-option--incorrect');
      });
    }, null, '-=0.1');

    // 3. Show explanation
    if (explanationEl) {
      tl.fromTo(explanationEl,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        '+=0.3'
      );
    }

    return tl;
  },


  /* ── Lower Third ───────────────────────────────────────────────────────── */

  /**
   * Lower third: slide in → hold → slide out.
   * @param {Element|string} el       The .lower-third element
   * @param {number}         holdTime Seconds to display (default 4)
   * @returns {gsap.core.Timeline}
   */
  lowerThird(el, holdTime = 4) {
    const tl = gsap.timeline({ defaults: { ease: this.defaults.easeOut } });

    tl.fromTo(el,
        { x: -300, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }
      )
      .to(el, { duration: holdTime })                  // hold
      .to(el, { x: -300, opacity: 0, duration: 0.4, ease: this.defaults.easeIn });

    return tl;
  },


  /* ── Subtitle Overlay ──────────────────────────────────────────────────── */

  /**
   * Subtitle: fade in → hold → fade out.
   * @param {Element|string} el       The .subtitle-overlay element
   * @param {number}         holdTime Seconds to display
   * @returns {gsap.core.Timeline}
   */
  subtitle(el, holdTime = 3) {
    const tl = gsap.timeline({ defaults: { ease: this.defaults.easeOut } });

    tl.fromTo(el,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      )
      .to(el, { duration: holdTime })
      .to(el, { opacity: 0, duration: 0.3, ease: this.defaults.easeIn });

    return tl;
  },


  /* ── Utility ───────────────────────────────────────────────────────────── */

  /**
   * Create a master timeline that runs multiple scenes sequentially.
   * @param {Function[]} sceneFns  Array of functions each returning a timeline
   * @returns {gsap.core.Timeline}
   */
  sequence(sceneFns) {
    const master = gsap.timeline();
    sceneFns.forEach(fn => master.add(fn()));
    return master;
  },

  /** Set initial hidden state for elements that will be animated. */
  hideAll(...selectors) {
    selectors.forEach(sel => {
      gsap.set(sel, { opacity: 0 });
    });
  },
};
