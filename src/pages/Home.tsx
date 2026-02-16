import { useEffect, useState } from 'react';
import HeroSection from '../sections/HeroSection';
import WhoWeAreSection from '../sections/WhoWeAreSection';
import WhatWeDoSection from '../sections/WhatWeDoSection';
import ApproachSection from '../sections/ApproachSection';
import WhyChooseSection from '../sections/WhyChooseSection';
import ClientsSection from '../sections/ClientsSection';
import CTASection from '../sections/CTASection';

const Home = () => {
  const [showDeferredSections, setShowDeferredSections] = useState(false);

  useEffect(() => {
    let timeoutId: number | undefined;
    let idleCallbackId: number | undefined;

    const hasIdleCallback = typeof window.requestIdleCallback === 'function';

    if (hasIdleCallback) {
      idleCallbackId = window.requestIdleCallback(
        () => {
          setShowDeferredSections(true);
        },
        { timeout: 800 },
      );
    } else {
      timeoutId = window.setTimeout(() => {
        setShowDeferredSections(true);
      }, 350);
    }

    return () => {
      if (typeof idleCallbackId === 'number' && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleCallbackId);
      }
      if (typeof timeoutId === 'number') {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <div className="bg-offwhite">
      <HeroSection />
      {showDeferredSections ? (
        <>
          <WhoWeAreSection />
          <WhatWeDoSection />
          <ApproachSection />
          <WhyChooseSection />
          <ClientsSection />
          <CTASection />
        </>
      ) : null}
    </div>
  );
};

export default Home;
