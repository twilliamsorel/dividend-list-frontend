import { SectionWrapper } from "./SectionWrapper"
import styled from "styled-components"
import { spacing, colors, fontSizes, breakpoints } from "../variables"
import DownArrow from "../assets/downArrow"
import { useState } from "react"

const SectionWrapperExt = styled(SectionWrapper)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${spacing[8]}px;
`

const SearchWrapper = styled.div`
  border-radius: ${spacing[1]}px;
  border-style: none;
  border: 1px solid ${colors['neutral-500']};
  max-width: 332px;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  padding-left: ${spacing[3]}px;
  background: ${colors['neutral-1100']};
  margin: 0 ${spacing[3]}px 0 ${spacing[3]}px;

  @media screen and (min-width: ${breakpoints['screen-md']}) {
    margin: 0;
  }
`

const SearchIcon = styled.div`
  display: inline-block;
  width: 24px;
  height: 24px;
`

const Search = styled.input`
  border-radius: ${spacing[1]}px;
  background: inherit;
  border: none;
  padding: ${spacing[3]}px ${spacing[4]}px ${spacing[3]}px ${spacing[3]}px;
  font-size: ${fontSizes[3]}px;
  font-weight: 300;
  width: 100%;
`

const FilterPanelContainer = styled.div`
  width: 100%;
  max-width: 640px;
  margin-top: -${spacing[6]}px;
  padding: ${spacing[11]}px;
  border: 1px solid ${colors['neutral-500']};
  background: ${colors['neutral-1000']};
`

const FiltersButton = styled.div`
  padding: ${spacing[2]}px ${spacing[4]}px;
  background: ${colors['primary-200']};
  border-radius: ${spacing[1]}px;
  margin: 0;
  color: ${colors['neutral-1100']};
  text-transform: uppercase;
  cursor: pointer;
  transition: 400ms background;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  column-gap: ${spacing[2]}px;

  &:hover {
    background: ${colors['primary-300']};
  }

  &.open {
    svg {
      transform: rotate(180deg);
    }
  }
`

interface SearchBarProps {
  searchState: {
    searchQuery: string,
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>
  }
}

const SearchBar = ({ searchState }: SearchBarProps) => {
  return (
    <SearchWrapper>
      <SearchIcon>
        <span className="material-symbols-outlined">search</span>
      </SearchIcon>
      <Search value={searchState.searchQuery} 
        type="text" 
        placeholder="search" 
        onChange={e => searchState.setSearchQuery((e.target as HTMLInputElement).value)} />
    </SearchWrapper>
  )
}

const FiltersPanel = () => {
  return (
    <FilterPanelContainer data-test="panel">placeholder</FilterPanelContainer>
  )
}

export default function Filters({ searchState }: SearchBarProps) {
  const [panelOpen, setPanelState] = useState(false)

  return (
    <>
      <SectionWrapperExt>
        <FiltersButton onClick={() => setPanelState(!panelOpen)} className={panelOpen ? 'open' : 'closed'}>Filters <DownArrow color="#FFF" /></FiltersButton>
        <SearchBar searchState={searchState} />
      </SectionWrapperExt>
      <SectionWrapper>
        {panelOpen && <FiltersPanel />}
      </SectionWrapper>
    </>
  )
}