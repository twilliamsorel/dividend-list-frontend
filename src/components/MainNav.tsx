import styled from "styled-components"
import { spacing, colors, fontSizes } from "../variables"
import logo from '../assets/logo.svg'
import { NavLink, Link } from "react-router-dom"
import TitleSection from "./TitleSection"

const NavWrapper = styled.div`
  width: 100%;
  background: ${colors['neutral-1100']};
`

const InnerWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`

const LogoWrapper = styled.div`
  .link {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    column-gap: ${spacing[9]}px;
    color: inherit;
    text-decoration: none;
  }

  h1 {
    font-size: ${fontSizes[8]}px;
  }
`

const Nav = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

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

interface Props {
  title: string
}

export default function MainNav({ title }: Props) {
  return (
    <>
      <NavWrapper>
        <InnerWrapper>
          <LogoWrapper>
            <Link className="link" to='/'>
              <img src={logo} />
              <h1>Dividend List</h1>
            </Link>
          </LogoWrapper>

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
        </InnerWrapper>
      </NavWrapper>
      <TitleSection title={title} />
    </>
  )
}