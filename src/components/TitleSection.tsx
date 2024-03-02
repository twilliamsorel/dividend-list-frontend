import styled from "styled-components"
import { colors, spacing, fontSizes, breakpoints, misc } from "../variables"
import { useEffect, useState } from "react"

const StickyWrapper = styled.div`
  width: 100%;
  positition: relative;
  height: ${misc['title-height-small']};

  @media screen and (min-width: ${breakpoints['screen-md']}) {
    height: ${misc['title-height-large']};
  }
`

const OuterWrapper = styled.div`
  width: 100%;
  background: ${colors['primary-100']};

  &.sticky {
    position: fixed;
    top: 0;
  }
`

const InnerWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${spacing[3]}px ${spacing[5]}px;
  color: ${colors['neutral-900']};
  font-size: ${fontSizes[6]}px;
  font-weight: 600;

  @media screen and (min-width: ${breakpoints['screen-md']}) {
    font-size: ${fontSizes[7]}px;
    padding: ${spacing[4]}px ${spacing[5]}px;
  }
`

interface Props {
  title: string
}

export default function TitleSection ({ title }: Props) {
  const [sticky, setSticky] = useState(false)

  useEffect(() => { 
    const toggleStickyNav = () => {
      const mainNav = document.querySelector('#main-nav')
      const navPosition = mainNav?.getBoundingClientRect().bottom
      const isInPosition = () => { 
        if (navPosition) {
          return navPosition <= 0 
        } else {
          return false
        }
      }

      setSticky(isInPosition)
    }

    window.addEventListener('scroll', toggleStickyNav) 
    return () => window.removeEventListener('scroll', toggleStickyNav)
  })

  return (
    <StickyWrapper>
      <OuterWrapper id="title-nav" className={sticky ? "sticky" : ""}>
        <InnerWrapper className="title-section-inner-wrapper">
          {title}
        </InnerWrapper>
      </OuterWrapper>
    </StickyWrapper>
  )
}