import { SectionWrapper } from "./SectionWrapper"
import styled from "styled-components"
import { spacing, colors, fontSizes, breakpoints } from "../variables"
import DownArrow from "../assets/DownArrow"
import { useState } from "react"
import { useTableStore } from "../interfaces/stores"
import { slugify } from "../utils"

const SectionWrapperExt = styled(SectionWrapper)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${spacing[2]}px;

  @media screen and (min-width: ${breakpoints['screen-md']}) {
    margin-top: ${spacing[8]}px;
  }
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
  margin: 0 0 0 ${spacing[3]}px;

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
  max-width: 640px;
  margin-top: -${spacing[6]}px;
  padding: ${spacing[11]}px;
  border: 1px solid ${colors['neutral-500']};
  background: ${colors['neutral-1000']};
  display: grid;
  row-gap: ${spacing[6]}px;
  column-gap: ${spacing[6]}px;
  grid-template-columns: repeat(2, 1fr);

  @media screen and (min-width: ${breakpoints['screen-sm']}) {
    grid-template-columns: repeat(4, 1fr);
  }
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

const FilterItemDiv = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${spacing[1]}px;
`

const FilterInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: ${spacing[3]}px;
`

const FilterInputLabel = styled.label`
  text-transform: uppercase;
`

const FilterNumberInput = styled.input`
  text-transform: uppercase;
  width: 100%;
  max-width: ${spacing[12]}px;
  height: ${spacing[7]}px;
  border-radius: ${spacing[1]}px;
  border: 1px solid ${colors['neutral-700']}; 
  text-align: center;
  padding: ${spacing[1]}px;
`

const FilterSelectInput = styled.select`
  border: 1px solid ${colors['neutral-700']};
  border-radius: ${spacing[1]}px;
  text-transform: uppercase;

  option{
    padding: ${spacing[1]}px ${spacing[2]}px;
    &:checked {
      background: ${colors['primary-300']};
      color: ${colors['neutral-1100']};
    }
  }
`

const SearchBar = () => {
  const searchQuery = useTableStore((state) => state.searchQuery) as string
  const setSearchQuery = useTableStore((state) => state.setSearchQuery)

  return (
    <SearchWrapper>
      <SearchIcon>
        <span className="material-symbols-outlined">search</span>
      </SearchIcon>
      <Search value={searchQuery}
        type="text"
        placeholder="search"
        onChange={e => setSearchQuery((e.target as HTMLInputElement).value)} />
    </SearchWrapper>
  )
}

const FilterNumberItem = ({ label }: { label: string }) => {
  return (
    <FilterItemDiv>
      <FilterInputLabel>{label}</FilterInputLabel>
      <FilterInputWrapper>
        <FilterNumberInput type="number" placeholder="min" name={slugify(label) + '-min'} />
        <FilterNumberInput type="number" placeholder="max" name={slugify(label) + '-max'} />
      </FilterInputWrapper>
    </FilterItemDiv>
  )
}

const FilterSelectItem = ({ label, options }: { label: string, options: string[] }) => {
  return (
    <FilterItemDiv>
      <FilterInputLabel>{label}</FilterInputLabel>
      <FilterSelectInput multiple>
        {options.map((option) => (
          <option>{option}</option>
        ))}
      </FilterSelectInput>
    </FilterItemDiv>
  )
}

const FiltersPanel = () => {
  return (
    <FilterPanelContainer data-test="panel">
      <FilterNumberItem label="dividend yield" />
      <FilterNumberItem label="div volatility" />
      <FilterNumberItem label="stock price" />
      <FilterNumberItem label="stock volatility" />
      <FilterNumberItem label="apy" />
      <FilterNumberItem label="median apy" />
      <FilterNumberItem label="div records" />
      <FilterNumberItem label="volume" />
      <FilterSelectItem label="stock types" options={['ph', 'one', 'two']} />
      <FilterSelectItem label="frequenct" options={['all', 'quartly', 'monthly']} />
    </FilterPanelContainer>
  )
}

export default function Filters() {
  const [panelOpen, setPanelState] = useState(false)

  return (
    <>
      <SectionWrapperExt>
        <FiltersButton onClick={() => setPanelState(!panelOpen)} className={panelOpen ? 'open' : 'closed'}>Filters <DownArrow color="#FFF" /></FiltersButton>
        <SearchBar />
      </SectionWrapperExt>
      <SectionWrapper>
        {panelOpen && <FiltersPanel />}
      </SectionWrapper>
    </>
  )
}