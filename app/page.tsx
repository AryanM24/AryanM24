"use client"

import { useState, useRef, useEffect } from "react"
import { Dithering } from "@paper-design/shaders-react"
import { interests, education, experience, projects, research } from "@/lib/portfolio-data"

export default function ResumePage() {
  const [activeSection, setActiveSection] = useState("education")
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [videoPlaying, setVideoPlaying] = useState(true)
  const [showVideoOverlay, setShowVideoOverlay] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  
  const sectionRefs = {
    education: useRef<HTMLDivElement>(null),
    experience: useRef<HTMLDivElement>(null),
    projects: useRef<HTMLDivElement>(null),
    research: useRef<HTMLDivElement>(null),
  }

  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (hoveredItem === 'aidsnap' && videoRef.current) {
      if (videoPlaying) {
        videoRef.current.play().catch(() => {})
      } else {
        videoRef.current.pause()
      }
    }
  }, [hoveredItem, videoPlaying])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["education", "experience", "projects", "research"] as const
      for (const section of sections) {
        const ref = sectionRefs[section]
        if (ref?.current) {
          const rect = ref.current.getBoundingClientRect()
          if (rect.top < 200) {
            setActiveSection(section)
          }
        }
      }
    }

    const handleWheel = (e: WheelEvent) => {
      const scrollContainer = contentRef.current
      if (scrollContainer && window.innerWidth >= 768) { // Only on desktop
        const { scrollTop, scrollHeight, clientHeight } = scrollContainer
        const isAtTop = scrollTop === 0
        const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 1
        
        // Only prevent default if we can actually scroll
        if (!(isAtTop && e.deltaY < 0) && !(isAtBottom && e.deltaY > 0)) {
          e.preventDefault()
          scrollContainer.scrollTop += e.deltaY
        }
      }
    }

    const scrollContainer = contentRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll)
      // Only add wheel handler on desktop
      if (window.innerWidth >= 768) {
        window.addEventListener("wheel", handleWheel, { passive: false })
      }
      return () => {
        scrollContainer.removeEventListener("scroll", handleScroll)
        window.removeEventListener("wheel", handleWheel)
      }
    }
  }, [])

  const sections = [
    { id: "education", label: "Education" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "research", label: "Research" },
  ]

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId)
    const ref = sectionRefs[sectionId as keyof typeof sectionRefs]
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  const ExternalLinkIcon = () => (
    <svg className="w-3 h-3 inline ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
      <polyline points="15 3 21 3 21 9"></polyline>
      <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
  )

  const StarIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoPlaying) {
        videoRef.current.pause()
        setVideoPlaying(false)
        setShowVideoOverlay(true)
      }
    }
  }

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play()
      setVideoPlaying(true)
      setShowVideoOverlay(false)
    }
  }

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
      setVideoPlaying(true)
      setShowVideoOverlay(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col md:flex-row bg-black">

      {/* Mobile dithering section */}
      <div className="md:hidden w-full h-32 overflow-hidden">
        <Dithering
          style={{ height: "100%", width: "100%" }}
          colorBack="hsl(0, 0%, 0%)"
          colorFront="hsl(0, 0%, 100%)"
          shape="cat"
          type="4x4"
          pxSize={3}
          offsetX={0}
          offsetY={0}
          scale={0.8}
          rotation={0}
          speed={0.1}
        />
      </div>

      <div
        className="w-full md:w-1/2 md:fixed md:left-0 md:top-0 md:h-screen p-4 md:p-8 md:pl-12 font-mono relative z-10 overflow-y-auto bg-black text-white custom-scrollbar"
        ref={contentRef}
      >
        <div className="mb-12">
          <h1 className="text-2xl md:text-3xl font-normal mb-4">ARYAN MITTAL</h1>
          <div className="flex flex-wrap gap-2 mb-8">
            {interests.map((interest) => (
              <span key={interest} className="text-xs opacity-60 border border-white/20 px-2 py-1 rounded">
                {interest}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-20" ref={sectionRefs.education}>
          <h4 className="text-sm font-normal mb-4 opacity-70">EDUCATION</h4>
          <div className="space-y-4">
            {education.map((edu, idx) => (
              <div key={idx} className="space-y-6">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img 
                      src="/jpslogo.png" 
                      alt="John P. Stevens High School logo" 
                      className="h-6 w-auto object-contain flex-shrink-0"
                    />
                    <span className="font-normal">{edu.school}</span>
                  </div>
                  <span className="text-sm opacity-70">{edu.period}</span>
                </div>
                <div className="text-sm opacity-70">{edu.grade} • GPA: 4.0/4.33</div>
                
                {(edu as any).coursework && (
                  <div className="space-y-2">
                    <div className="text-sm font-bold uppercase opacity-100">COURSEWORK</div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                      {(edu as any).coursework[0].map((course: string, i: number) => (
                        <div key={i} className="text-sm opacity-70 font-mono flex items-start gap-2">
                          <span className="text-white/50">•</span>
                          <span>{course}</span>
                        </div>
                      ))}
                      {(edu as any).coursework[1].map((course: string, i: number) => (
                        <div key={i} className="text-sm opacity-70 font-mono flex items-start gap-2">
                          <span className="text-white/50">•</span>
                          <span>{course}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {(edu as any).activities && (
                  <div className="space-y-2">
                    <div className="text-sm font-bold uppercase opacity-100">ACTIVITIES AND SOCIETIES</div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                      {(edu as any).activities[0].map((activity: string, i: number) => (
                        <div key={i} className="text-sm opacity-70 font-mono flex items-start gap-2">
                          <span className="text-white/50">•</span>
                          <span>{activity}</span>
                        </div>
                      ))}
                      {(edu as any).activities[1].map((activity: string, i: number) => (
                        <div key={i} className="text-sm opacity-70 font-mono flex items-start gap-2">
                          <span className="text-white/50">•</span>
                          <span>{activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20" ref={sectionRefs.experience}>
          <h4 className="text-sm font-normal mb-4 opacity-70">EXPERIENCE</h4>
          <div className="space-y-4">
            {experience.map((exp, idx) => (
              <div 
                key={idx} 
                className="relative space-y-1 p-6 border border-white/5 rounded-lg bg-white/2 hover:bg-white/5 transition-colors duration-200"
                onMouseEnter={() => exp.company === 'AidSnap' ? setHoveredItem('aidsnap') : null}
                onMouseLeave={() => exp.company === 'AidSnap' ? (setHoveredItem(null), setVideoPlaying(true), setShowVideoOverlay(false)) : null}
              >
                {exp.logo && (
                  <div className="relative flex items-center gap-3 mb-2">
                    <div className={`relative transition-all duration-300 ${hoveredItem === 'aidsnap' ? 'opacity-0 scale-0 rotate-180' : 'opacity-100 scale-100 rotate-0'}`}>
                      <img src={exp.logo} alt={exp.company} className="h-6 w-auto" />
                    </div>
                    {exp.company === 'AidSnap' && (
                      <>
                        <div className={`absolute left-0 transition-all duration-300 ${hoveredItem === 'aidsnap' ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
                          <div className="text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)] animate-pulse">
                            <StarIcon />
                          </div>
                        </div>
                        {hoveredItem === 'aidsnap' && (
                          <div className="fixed left-[calc(50%+2rem)] top-1/2 -translate-y-1/2 z-[100] transition-all duration-500 opacity-100 animate-in fade-in slide-in-from-left-4">
                            <div className="relative bg-gradient-to-br from-black/98 to-black/95 border border-white/30 rounded-2xl p-3 shadow-[0_20px_50px_rgba(0,0,0,0.8)] w-[420px] backdrop-blur-md">
                              <div className="relative rounded-xl overflow-hidden bg-black/50 ring-2 ring-white/10">
                                <video
                                  ref={videoRef}
                                  src="/aidsnap-video.mp4"
                                  className="w-full h-auto cursor-pointer"
                                  loop
                                  muted
                                  playsInline
                                  onClick={handleVideoClick}
                                  autoPlay
                                />
                                {showVideoOverlay && (
                                  <div className="absolute inset-0 bg-black/80 flex items-center justify-center gap-8 animate-in fade-in duration-200">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        handlePlay()
                                      }}
                                      className="p-4 rounded-full bg-white/10 hover:bg-white/20 transition-all backdrop-blur-md border border-white/20 hover:scale-110"
                                    >
                                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z"/>
                                      </svg>
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        handleReplay()
                                      }}
                                      className="p-4 rounded-full bg-white/10 hover:bg-white/20 transition-all backdrop-blur-md border border-white/20 hover:scale-110"
                                    >
                                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
                                      </svg>
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
                <div className="flex justify-between">
                  <div className="font-normal">{exp.company}</div>
                  <span className="text-sm opacity-70">{exp.period}</span>
                </div>
                <div className="text-sm opacity-70">{exp.role}</div>
                <div className="text-sm opacity-60 mt-2">{exp.description}</div>
                {((exp as any).website || (exp as any).app || (exp as any).blogs) && (
                  <div className="text-sm opacity-60 mt-3 pt-2 border-t border-white/10 flex gap-4">
                    {(exp as any).website && (
                      <a
                        href={`https://${(exp as any).website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-100 hover:underline transition-all duration-200 cursor-pointer inline-flex items-center"
                      >
                        Website
                        <ExternalLinkIcon />
                      </a>
                    )}
                    {(exp as any).blogs && (
                      <a
                        href={`https://${(exp as any).blogs}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-100 hover:underline transition-all duration-200 cursor-pointer inline-flex items-center"
                      >
                        Blogs
                        <ExternalLinkIcon />
                      </a>
                    )}
                    {(exp as any).app && (
                      <a
                        href={`https://${(exp as any).app}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-100 hover:underline transition-all duration-200 cursor-pointer inline-flex items-center"
                      >
                        App
                        <ExternalLinkIcon />
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20" ref={sectionRefs.projects}>
          <h4 className="text-sm font-normal mb-4 opacity-70">PROJECTS</h4>
          <div className="space-y-4">
            {projects.map((project, idx) => (
              <div 
                key={idx} 
                className="relative space-y-1 p-6 border border-white/5 rounded-lg bg-white/2 hover:bg-white/5 transition-colors duration-200"
                onMouseEnter={() => project.name === 'KODA Finance' ? setHoveredItem('koda') : null}
                onMouseLeave={() => project.name === 'KODA Finance' ? setHoveredItem(null) : null}
              >
                {project.logo && (
                  <div className="relative flex items-center gap-3 mb-2">
                    <div className={`relative transition-all duration-300 ${hoveredItem === 'koda' ? 'opacity-0 scale-0 rotate-180' : 'opacity-100 scale-100 rotate-0'}`}>
                      <img src={project.logo || "/placeholder.svg"} alt={project.name} className="h-6 w-auto" />
                    </div>
                    {project.name === 'KODA Finance' && (
                      <>
                        <div className={`absolute left-0 transition-all duration-300 ${hoveredItem === 'koda' ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
                          <div className="text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)] animate-pulse">
                            <StarIcon />
                          </div>
                        </div>
                        {hoveredItem === 'koda' && (
                          <div className="fixed left-[calc(50%+2rem)] top-1/2 -translate-y-1/2 z-[100] transition-all duration-500 opacity-100 animate-in fade-in slide-in-from-left-4">
                            <div className="relative bg-gradient-to-br from-black/98 to-black/95 border border-white/30 rounded-2xl p-3 shadow-[0_20px_50px_rgba(0,0,0,0.8)] w-[900px] backdrop-blur-md">
                              <div className="relative rounded-xl bg-black/50 ring-2 ring-white/10 overflow-hidden" style={{ aspectRatio: 'auto' }}>
                                <div className="scale-[1.25] origin-center transform">
                                  <img 
                                    src="/koda-mock-img.png" 
                                    alt="KODA Finance" 
                                    className="w-full h-auto block"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
                <div className="font-normal">{project.name}</div>
                <div className="text-sm opacity-60">{project.description}</div>
                <div className="text-sm opacity-60 mt-3 pt-2 border-t border-white/10 flex gap-4">
                  <a
                    href={`https://${project.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-100 hover:underline transition-all duration-200 cursor-pointer inline-flex items-center"
                  >
                    Website
                    <ExternalLinkIcon />
                  </a>
                  {project.app && (
                    <a
                      href={`https://${project.app}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-100 hover:underline transition-all duration-200 cursor-pointer inline-flex items-center"
                    >
                      App
                      <ExternalLinkIcon />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20" ref={sectionRefs.research}>
          <h4 className="text-sm font-normal mb-4 opacity-70">RESEARCH</h4>
          <div className="space-y-4">
            {research.map((item, idx) => (
              <div key={idx} className="space-y-1 p-6 border border-white/5 rounded-lg bg-white/2 hover:bg-white/5 transition-colors duration-200">
                <div className="font-normal text-sm">{item.title}</div>
                <div className="text-sm opacity-60">{item.description}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="pb-12">
          <div className="flex flex-wrap gap-4 text-sm font-mono opacity-70">
            <a
              href="https://www.linkedin.com/in/aryan-mittal11/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-100 hover:underline transition-all duration-200 cursor-pointer"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/Aryanm24/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-100 hover:underline transition-all duration-200 cursor-pointer"
            >
              GitHub
            </a>
            <a
              href="mailto:aryan.raj.mittal@gmail.com"
              className="hover:opacity-100 hover:underline transition-all duration-200 cursor-pointer"
            >
              Email
            </a>
          </div>
        </div>
      </div>

      {/* Desktop dithering section */}
      <div className="hidden md:block w-1/2 fixed right-0 top-0 h-screen overflow-hidden">
        <Dithering
          style={{ height: "100%", width: "100%" }}
          colorBack="hsl(0, 0%, 0%)"
          colorFront="hsl(0, 0%, 100%)"
          shape="cat"
          type="4x4"
          pxSize={3}
          offsetX={0}
          offsetY={0}
          scale={0.8}
          rotation={0}
          speed={0.1}
        />
      </div>
    </div>
  )
}