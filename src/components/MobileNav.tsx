import styled from "styled-components"
import { breakpoints, colors, fontSizes, spacing } from "../variables"
import { MobileNavButton, NavItems } from "./MainNav"
import { toggleNav } from "../utils"

const NavWrapper = styled.div`
  position: fixed;
  right: -100%;
  top: 0;
  height: 100%;
  width: 100%;
  max-width: 400px;
  background: ${colors['neutral-800']};
  transition: 400ms right;
  overflow-y: scroll;
  z-index: 4;

  @media screen and (min-width: ${breakpoints['screen-md']}) {
    display: none;
  }
`

const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${spacing[4]}px ${spacing[8]}px ${spacing[4]}px ${spacing[10]}px;
  border-bottom: 1px solid ${colors['neutral-600']};

  h2 {
    font-size: ${fontSizes[6]}px;
  }
`

const Nav = styled.nav`
  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    a {
      display: block;
      color: inherit;
      text-decoration: none;
      font-size: ${fontSizes[5]}px;
      border-bottom: 1px solid ${colors['neutral-600']};
      padding: ${spacing[3]}px ${spacing[8]}px ${spacing[3]}px ${spacing[10]}px;
      transition: 100ms background;

      &.active {
        background: ${colors['neutral-900']};
      }

      &:hover {
        background: ${colors['neutral-700']};
      }
    }
  }
`

export default function MobileNav () {
  return (
    <NavWrapper id="mobile-nav">
      <Header>
        <h2>Menu</h2>
        <MobileNavButton rotated={true} />
      </Header>
      <Nav onClick={toggleNav}>
        <NavItems />
      </Nav>
    </NavWrapper>
  )
}