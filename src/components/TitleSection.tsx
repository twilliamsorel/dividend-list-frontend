import styled from "styled-components"
import { colors, spacing, fontSizes } from "../variables"

const OuterWrapper = styled.div`
  width: 100%;
  background: ${colors['primary-100']};
`

const InnerWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${spacing[5]}px;
  color: ${colors['neutral-900']};
  font-size: ${fontSizes[7]}px;
  font-weight: 600;
`

interface Props {
  title: string
}

export default function TitleSection ({ title }: Props) {
  return (
    <OuterWrapper>
      <InnerWrapper>
        {title}
      </InnerWrapper>
    </OuterWrapper>
  )
}