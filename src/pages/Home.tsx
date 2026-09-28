import Hero from '@/sections/Hero'
import WhoWeAre from '@/sections/WhoWeAre'
import WhatWeDo from '@/sections/WhatWeDo'
import PlatformTeaser from '@/sections/PlatformTeaser'
import StatsSection from '@/sections/StatsSection'
import Clients from '@/sections/Clients'
import CTA from '@/sections/CTA'

export default function Home() {
  return (
    <>
      <Hero />
      <WhoWeAre />
      <WhatWeDo />
      <PlatformTeaser />
      <StatsSection />
      <Clients />
      <CTA />
    </>
  )
}
