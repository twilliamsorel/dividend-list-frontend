import styled from "styled-components"
import { breakpoints, colors, fontSizes, misc, spacing } from "../variables"
import { SectionWrapper } from "./SectionWrapper"
import { useMediaQuery } from "react-responsive"
import { DataProps } from "../interfaces/stocks"
import { useTableStore } from "../interfaces/stores"

const DefaultTable = styled.table`
  border-collapse: collapse;
  text-transform: uppercase;
  border: 1px solid ${colors['neutral-700']};
  width: 100%;
  max-width: 100%;
  margin: ${spacing[6]}px 0;

  thead {
    position: sticky;
    top: ${misc['title-height-small']};

    @media screen and (min-width: ${breakpoints['screen-md']}) {
      top: ${misc['title-height-large']};
    }

    tr {
      background: ${colors['neutral-900']};
      border-bottom: 1px solid ${colors['neutral-700']};
      
      th {
        padding: ${spacing[3]}px 0;
        text-align: left;
        font-size: ${fontSizes[0]}px;

        &:not([data-tooltip="false"]) {
          cursor: pointer;
        }

        &.asc::after {
          content: '${String.fromCharCode(9207)}';
          width: ${spacing[6]}px;
          height: ${spacing[6]}px;
          margin-left: ${spacing[1]}px;
        }

        &.desc::after {
          content: '${String.fromCharCode(9206)}';
          width: ${spacing[6]}px;
          height: ${spacing[6]}px;
          margin-left: ${spacing[1]}px;
        }
      }
    }
  }

  span {
    display: inline;
  }

  td, th {
    &:nth-child(1) {
      width: 25%;
      padding-left: ${spacing[4]}px;
      padding-right: ${spacing[5]}px;
      font-weight: 600;

      @media screen and (min-width: ${breakpoints['screen-md']}) {
        padding-left: ${spacing[9]}px;
        padding-right: ${spacing[9]}px;
      }
    }
    &:nth-child(2) {
      width: 12%;
    }
    &:nth-child(3) {
      width: 13%;
    }
    &:nth-child(4) {
      width: 15%;
    }
    &:nth-child(5) {
      width: 15%;
    }
    &:nth-child(6) {
      width: 10%;
    }
    &:nth-child(7) {
      width: 15%;
      padding-right: ${spacing[4]}px;
      text-align: right;

      @media screen and (min-width: ${breakpoints['screen-md']}) {
        padding-right: ${spacing[9]}px;
      }
    }
  }
`

const Rows = styled.tbody`
  background: ${colors['neutral-1100']};

  td {
    padding: ${spacing[3]}px 0;
    font-size: ${fontSizes[3]}px;
    font-weight: 300;
    border-bottom: 1px solid ${colors['neutral-700']};

    label {
      font-size: ${fontSizes[0]}px;
      text-transform: capitalize;
      font-weight: 300;
      line-height: 1.5;
      color: ${colors['neutral-200']};

      &.inline-block {
        display: inline-block;
      }
    }

    a {
      color: inherit;
    }
  }

  hr {
    width: 100%;
    margin: 0 auto;
    border: .5px solid ${colors['neutral-700']};
  }
`

export default function Table() {
  const isBigScreen = useMediaQuery({ query: `(min-width: ${breakpoints['screen-md']})` })
  const sortDirection = useTableStore((state) => state.sortDirection)
  const data = useTableStore((state) => state.data)
  const activeSort = useTableStore((state) => state.sort)
  const setPage = useTableStore((state) => state.setPage)
  const setSort = useTableStore((state) => state.setSort)
  const setSortDirection = useTableStore((state) => state.setSortDirection)

  const toggleSort = (sort: number) => {
    const direction = sortDirection === 'desc' ? 'asc' : 'desc'
    setPage(0)
    setSort(sort)
    setSortDirection(direction)
  }

  const checkState = (tabSort: number) => tabSort === activeSort ? sortDirection : ''

  return (
    <SectionWrapper>
      <DefaultTable>
        <thead>
          <tr>
            <th onClick={() => toggleSort(0)}
              className={checkState(0)}>
              ticker
            </th>
            {isBigScreen && (<th data-tooltip={false}>stock type</th>)}
            {isBigScreen && (<th onClick={() => toggleSort(1)}
              className={checkState(1)}>
              frequency
            </th>)}
            {isBigScreen && (<th onClick={() => toggleSort(2)}
              className={checkState(2)}>
              div records
            </th>)}
            <th onClick={() => toggleSort(3)}
              className={checkState(3)}>div vol<span style={isBigScreen ? { display: 'inline' } : { display: 'none' }}>atility</span>
            </th>
            <th onClick={() => toggleSort(4)}
              className={checkState(4)}>apy</th>
            <th onClick={() => toggleSort(5)} className={checkState(5)}>median apy</th>
          </tr>
        </thead>
        <Rows>
          {data.map((item: DataProps, index: number) => {
            if (!item.stock_type) return
            if (!item.percentage_yield) return

            return (
              <tr key={index}>
                <td data-test="ticker">
                  {item.ticker}<br />
                  <label className="inline-block">{item.company}</label>
                </td>
                {isBigScreen && (<td>{item.stock_type}</td>)}
                {isBigScreen && (<td>{item.frequency}</td>)}
                {isBigScreen && (
                  <td>
                    {item.dividend_records}<label> | {(item.dividend_records / 12).toLocaleString(undefined, { maximumFractionDigits: 2 })} yrs</label>
                  </td>
                )}
                <td>{item.dividend_volatility.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                <td>{item.percentage_yield.toLocaleString(undefined, { maximumFractionDigits: 2 })}%</td>
                <td>{item.median_percentage_yield.toLocaleString(undefined, { maximumFractionDigits: 2 })}%</td>
              </tr>
            )
          })}
        </Rows>
      </DefaultTable>
    </SectionWrapper>
  )
}