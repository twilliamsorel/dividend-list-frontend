import { SectionWrapper } from "./SectionWrapper"
import styled from "styled-components"
import { spacing, colors, fontSizes } from "../variables"

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
  /* overflow: hidden; */
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
        onInput={e => searchState.setSearchQuery((e.target as HTMLInputElement).value)} />
    </SearchWrapper>
  )
}

export default function Filters({ searchState }: SearchBarProps) {
  return (
    <SectionWrapper>
      <SearchBar searchState={searchState} />
    </SectionWrapper>
  )
}