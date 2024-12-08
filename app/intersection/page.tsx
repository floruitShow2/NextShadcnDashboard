'use client'
import { useEffect, useRef, useState } from 'react'
import Intro from './components/intro'
import ProjectOne from './components/one'

function InterSectionPage() {
  const [visibleSections, setVisibleSections] = useState<HTMLDivElement[]>([])
  const introRef = useRef<HTMLDivElement>()
  const projectOneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sections = [introRef, projectOneRef]

    const intersectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = entry.target as HTMLDivElement
            observer.unobserve(section)

            if (visibleSections.includes(section)) return
            setVisibleSections((prevSections) => [...prevSections, section])
          }
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    )

    sections.forEach((section) => {
      if (section.current) intersectionObserver.observe(section.current)
    })

    return () => {
      intersectionObserver.disconnect()
    }
  }, [visibleSections])

  return (
    <div className="w-full h-[100vh] overflow-auto">
      <Intro sectionRef={introRef} />
      <ProjectOne
        sectionRef={projectOneRef}
        visible={visibleSections.includes(projectOneRef.current!)}
      />
    </div>
  )
}

export default InterSectionPage
