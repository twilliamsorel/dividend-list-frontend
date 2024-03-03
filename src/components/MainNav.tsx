import styled from "styled-components"
import { spacing, colors, fontSizes, breakpoints} from "../variables"
import logo from '../assets/logo.svg'
import { NavLink, Link } from "react-router-dom"
import TitleSection from "./TitleSection"
import { toggleNav } from "../utils"

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
    padding: ${spacing[8]}px ${spacing[5]}px;
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

const NavButton = styled.div`
  display: block;
  cursor: pointer;

  &.rotated {
    transform: rotate(180deg);
  }
  
  span {
    font-size: ${fontSizes[10]}px;
    line-height: 1.5;
  }

  @media screen and (min-width: ${breakpoints['screen-md']}) {
    display: none;
  }
`

const Nav = styled.nav`
  ul {
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
  }
`

interface MobileNavButtonProps {
  rotated?: boolean
}

export function MobileNavButton ({rotated = false}: MobileNavButtonProps) {
  return (
    <NavButton onClick={toggleNav} className={rotated? 'rotated' : ''}>
      <span className="material-symbols-outlined">menu_open</span>
    </NavButton>
  )
}

export function NavItems () {
  return (
    <ul>
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
    </ul>
  )
}

export function MainNav () {
  return (
    <div>
      <MobileNavButton />
      <Nav>
        <NavItems />
      </Nav>
    </div>
  )
}

interface Props {
  title: string
}

export default function MainNavComponent({ title }: Props) {
  return (
    <>
      <NavWrapper id="main-nav">
        <InnerWrapper>
          <LogoWrapper>
            <Link className="link" to='/'>
              <img src={logo} />
              <h1>Dividend List</h1>
            </Link>
          </LogoWrapper>

          <MainNav />
        </InnerWrapper>
      </NavWrapper>
      <TitleSection title={title} />
    </>
  )
}