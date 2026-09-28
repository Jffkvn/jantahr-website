import PlatformHero from '@/sections/platform/PlatformHero'
import FeatureShowcase from '@/sections/platform/FeatureShowcase'
import AiIntelligenceSection from '@/sections/platform/AiIntelligenceSection'
import WorkforceOpsSection from '@/sections/platform/WorkforceOpsSection'
import PayeCalculator from '@/components/PayeCalculator'
import SecuritySection from '@/sections/platform/SecuritySection'
import PlatformCTA from '@/sections/platform/PlatformCTA'

export default function Platform() {
  return (
    <>
      <PlatformHero />
      <FeatureShowcase />
      <AiIntelligenceSection />
      <WorkforceOpsSection />
      <PayeCalculator />
      <SecuritySection />
      <PlatformCTA />
    </>
  )
}
