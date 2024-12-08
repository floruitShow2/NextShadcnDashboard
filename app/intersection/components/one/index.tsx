import { Section } from '@/components/section'
import { Transition } from '@/components/transition'
import styles from './index.module.css'
import { cs } from '@/utils/className'

function ProjectOne(props: { sectionRef: any, visible: boolean }) {
  const { sectionRef, visible } = props
  return (
    <Section as="section" ref={sectionRef}>
      <Transition in={visible} key="home-one" timeout={3000}>
        {({ visible, status }) => (
          <div className={cs('w-full h-full', 'flex items-center justify-center', styles.name)} data-visible={visible}>
            page one section {status}
          </div>
        )}
      </Transition>
    </Section>
  )
}

export default ProjectOne
