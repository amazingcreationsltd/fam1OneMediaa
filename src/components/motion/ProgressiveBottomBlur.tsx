import React, { useEffect, useState } from 'react';

/**
 * ProgressiveBottomBlur
 * Exact progressive gradient blur ramp from redstone.software.
 * Stacks 8 layers of doubling backdrop-filter blurs (0.5px -> 36px)
 * with overlapping linear-gradient masks so content smoothly dissolves
 * into the bottom viewport edge as the user scrolls.
 */
export const ProgressiveBottomBlur: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger reveal once scrolled past 60px
      const scrolled = window.scrollY > 60;
      setIsVisible(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <>
      <style>{`
        .progressive-bottom-blur {
          position: fixed;
          z-index: 40;
          inset: auto 0 0 0;
          pointer-events: none;
          width: 100%;
          height: 20vh;
          max-height: 180px;
          min-height: 90px;
          transform: translateY(100%);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform;
        }

        .progressive-bottom-blur.is-visible {
          transform: translateY(0%);
        }

        .progressive-bottom-blur::before,
        .progressive-bottom-blur::after {
          content: "";
          position: absolute;
          inset: 0;
        }

        /* Layer 1 — 0.5px */
        .progressive-bottom-blur::before {
          z-index: 1;
          backdrop-filter: blur(0.5px);
          -webkit-backdrop-filter: blur(0.5px);
          -webkit-mask: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgb(0,0,0) 12.5%, rgb(0,0,0) 25%, rgba(0,0,0,0) 37.5%);
          mask: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgb(0,0,0) 12.5%, rgb(0,0,0) 25%, rgba(0,0,0,0) 37.5%);
        }

        /* Layer 8 — 36px */
        .progressive-bottom-blur::after {
          z-index: 8;
          backdrop-filter: blur(36px);
          -webkit-backdrop-filter: blur(36px);
          -webkit-mask: linear-gradient(to bottom, rgba(0,0,0,0) 87.5%, rgb(0,0,0) 100%);
          mask: linear-gradient(to bottom, rgba(0,0,0,0) 87.5%, rgb(0,0,0) 100%);
        }

        .progressive-bottom-blur-slice {
          position: absolute;
          inset: 0;
        }

        /* Layer 2 — 1px */
        .progressive-bottom-blur-slice:nth-of-type(1) {
          z-index: 2;
          backdrop-filter: blur(1px);
          -webkit-backdrop-filter: blur(1px);
          -webkit-mask: linear-gradient(to bottom, rgba(0,0,0,0) 12.5%, rgb(0,0,0) 25%, rgb(0,0,0) 37.5%, rgba(0,0,0,0) 50%);
          mask: linear-gradient(to bottom, rgba(0,0,0,0) 12.5%, rgb(0,0,0) 25%, rgb(0,0,0) 37.5%, rgba(0,0,0,0) 50%);
        }

        /* Layer 3 — 2px */
        .progressive-bottom-blur-slice:nth-of-type(2) {
          z-index: 3;
          backdrop-filter: blur(2px);
          -webkit-backdrop-filter: blur(2px);
          -webkit-mask: linear-gradient(to bottom, rgba(0,0,0,0) 25%, rgb(0,0,0) 37.5%, rgb(0,0,0) 50%, rgba(0,0,0,0) 62.5%);
          mask: linear-gradient(to bottom, rgba(0,0,0,0) 25%, rgb(0,0,0) 37.5%, rgb(0,0,0) 50%, rgba(0,0,0,0) 62.5%);
        }

        /* Layer 4 — 4px */
        .progressive-bottom-blur-slice:nth-of-type(3) {
          z-index: 4;
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          -webkit-mask: linear-gradient(to bottom, rgba(0,0,0,0) 37.5%, rgb(0,0,0) 50%, rgb(0,0,0) 62.5%, rgba(0,0,0,0) 75%);
          mask: linear-gradient(to bottom, rgba(0,0,0,0) 37.5%, rgb(0,0,0) 50%, rgb(0,0,0) 62.5%, rgba(0,0,0,0) 75%);
        }

        /* Layer 5 — 8px */
        .progressive-bottom-blur-slice:nth-of-type(4) {
          z-index: 5;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          -webkit-mask: linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgb(0,0,0) 62.5%, rgb(0,0,0) 75%, rgba(0,0,0,0) 87.5%);
          mask: linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgb(0,0,0) 62.5%, rgb(0,0,0) 75%, rgba(0,0,0,0) 87.5%);
        }

        /* Layer 6 — 16px */
        .progressive-bottom-blur-slice:nth-of-type(5) {
          z-index: 6;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          -webkit-mask: linear-gradient(to bottom, rgba(0,0,0,0) 62.5%, rgb(0,0,0) 75%, rgb(0,0,0) 87.5%, rgba(0,0,0,0) 100%);
          mask: linear-gradient(to bottom, rgba(0,0,0,0) 62.5%, rgb(0,0,0) 75%, rgb(0,0,0) 87.5%, rgba(0,0,0,0) 100%);
        }

        /* Layer 7 — 28px */
        .progressive-bottom-blur-slice:nth-of-type(6) {
          z-index: 7;
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          -webkit-mask: linear-gradient(to bottom, rgba(0,0,0,0) 75%, rgb(0,0,0) 87.5%, rgb(0,0,0) 100%);
          mask: linear-gradient(to bottom, rgba(0,0,0,0) 75%, rgb(0,0,0) 87.5%, rgb(0,0,0) 100%);
        }
      `}</style>

      <div
        className={`progressive-bottom-blur ${isVisible ? 'is-visible' : ''}`}
        aria-hidden="true"
      >
        <div className="progressive-bottom-blur-slice" />
        <div className="progressive-bottom-blur-slice" />
        <div className="progressive-bottom-blur-slice" />
        <div className="progressive-bottom-blur-slice" />
        <div className="progressive-bottom-blur-slice" />
        <div className="progressive-bottom-blur-slice" />
      </div>
    </>
  );
};
