import AnimatedHeroSlider from '../slider/animated-slider'

const HeroSection = (Props: any) => {
  const { homepage } = Props
  const { heroImage } = homepage?.docs[0] || {}
  const url = heroImage?.url || '/images/hero.jpg'
  return (
    <section
      style={{ height: 'calc(100vh - 32px)' }}
      className="pt-24 bg-background text-foreground"
    >
      <AnimatedHeroSlider heroimage={url} />
    </section>
  )
}

export default HeroSection
