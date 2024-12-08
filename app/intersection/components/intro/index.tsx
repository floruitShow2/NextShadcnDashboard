import { Section } from '@/components/section'
import { Transition } from '@/components/transition'
import { cs } from '@/utils/className'
import styles from './index.module.css'

function Intro(props: { sectionRef: any }) {
  const { sectionRef } = props
  return (
    <Section as="section" ref={sectionRef}>
      <Transition in key="home-intro" timeout={3000}>
        {({ visible, status }) => (
          <div className={cs('w-full h-full', 'flex items-center justify-center', styles.name)} data-visible={visible}>
            intro section {status}
          </div>
        )}
      </Transition>
    </Section>
  )
}

export default Intro
