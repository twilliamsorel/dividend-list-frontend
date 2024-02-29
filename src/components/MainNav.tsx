import styled from "styled-components"
import { spacing, colors, fontSizes, breakpoints, misc } from "../variables"
import logo from '../assets/logo.svg'
import { NavLink, Link } from "react-router-dom"
import TitleSection from "./TitleSection"
import { toggleNav } from "../utils"

// TODO: Shring padding when scrolling on larger screen sizes.
//       Will need to use a media query to target the element.
const Spacer = styled.div`
  height: ${misc['nav-height-small']};

  @media screen and (min-width: ${breakpoints['screen-md']}) {
    height: ${misc['nav-height-large']};
  }
`

const ScrollWrapper = styled.div`
  width: 100%;
  
  &.sticky {
    position: fixed;
    z-index: 3;
  }
`

const NavWrapper = styled.div`
  width: 100%;
  background: ${colors['neutral-1100']};
`

const InnerWrapper = styled.div`
  padding: ${spacing[3]}px ${spacing[5]}px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;

  @media screen and (min-width: ${breakpoints['screen-md']}) {
    padding: ${spacing[12]}px ${spacing[5]}px;
  }
`

const LogoWrapper = styled.div`
  .link {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    column-gap: ${spacing[6]}px;
    color: inherit;
    text-decoration: none;

    @media screen and (min-width: ${breakpoints['screen-md']}) {
      column-gap: ${spacing[9]}px;
    }
  }

  img {
    width: 72px;

    @media screen and (min-width: ${breakpoints['screen-md']}) {
      width: initial;
    }
  }

  h1 {
    font-size: ${fontSizes[6]}px;

    @media screen and (min-width: ${breakpoints['screen-md']}) {
      font-size: ${fontSizes[8]}px;
    }
  }
`

const Nav = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: none;

  @media screen and (min-width: ${breakpoints['screen-md']}) {
    display: block;
  }

  li {
    display: inline-block;
    margin-left: ${spacing[10]}px;
    font-size: ${fontSizes[5]}px;

    a {
      color: inherit;
      text-decoration: none;

      &:hover, &.active {
        text-decoration: underline;
      }
    }
  }
`

export const MobileNavButton = styled.div`
  display: block;
  cursor: pointer;
  
  span {
    font-size: ${fontSizes[10]}px;
    line-height: 1.5;
  }

  @media screen and (min-width: ${breakpoints['screen-md']}) {
    display: none;
  }
`

const toggleStickyNav = () => {
  const nav = document.querySelector('#main-nav')

  if (window.scrollY > 0 && !nav?.classList.contains('sticky')) {
    nav?.classList.add('sticky')
  } else if (window.scrollY <= 1) {
    nav?.classList.remove('sticky')
  }
}
window.addEventListener('scroll', toggleStickyNav)

interface Props {
  title: string
}

export default function MainNav({ title }: Props) {
  return (
    <Spacer>
      <ScrollWrapper id="main-nav">
        <NavWrapper>
          <InnerWrapper className="inner-wrapper">
            <LogoWrapper>
              <Link className="link" to='/'>
                <img src={logo} />
                <h1>Dividend List</h1>
              </Link>
            </LogoWrapper>

            <div>
              <MobileNavButton onClick={toggleNav}>
                <span className="material-symbols-outlined">menu_open</span>
              </MobileNavButton>
              <nav>
                <Nav>
                  <li>
                    <NavLink
                        to={`/`}
                        className={({ isActive, isPending }) =>
                          isActive ? "active" : isPending ? "pending" : ""
                        }> Discover </NavLink>
                  </li>
                  <li><a href=''>Guides</a></li>
                  <li>
                    <NavLink
                      to={`/about`}
                      className={({ isActive, isPending }) =>
                        isActive ? "active" : isPending ? "pending" : ""
                      }> About </NavLink>
                  </li>
                  <li><a href=''>Dashboard</a></li>
                </Nav>
              </nav>
            </div>
          </InnerWrapper>
        </NavWrapper>
        <TitleSection title={title} />
      </ScrollWrapper>
    </Spacer>
  )
}