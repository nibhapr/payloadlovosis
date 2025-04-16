import { Homepage, type Media } from '@/payload-types'
import AnimatedHeroSlider from '../slider/animated-slider'

const HeroSection = ({ homepage }: { homepage: Homepage }) => {
  return (
    <section
      style={{ height: 'calc(100vh - 32px)' }}
      className="pb-8 bg-background text-foreground "
    >
      <AnimatedHeroSlider homepage={homepage} />
    </section>
  )
}

export default HeroSection
