import styled from "styled-components"
import { spacing } from "../variables"

export const SectionWrapper = styled.div`
  max-width: 1200px;
  width: calc(100% - ${spacing[10]}px);
  padding: 0 ${spacing[5]}px;
  margin: 0 auto;
`