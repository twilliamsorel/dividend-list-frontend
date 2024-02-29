import styled from "styled-components"
import { colors, spacing, fontSizes, breakpoints } from "../variables"

const OuterWrapper = styled.div`
  width: 100%;
  background: ${colors['primary-100']};
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
    padding: ${spacing[6]}px ${spacing[5]}px;
  }
`

interface Props {
  title: string
}

export default function TitleSection ({ title }: Props) {
  return (
    <OuterWrapper data-tag="title">
      <InnerWrapper>
        {title}
      </InnerWrapper>
    </OuterWrapper>
  )
}