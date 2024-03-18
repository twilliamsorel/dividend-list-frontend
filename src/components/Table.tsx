import styled from "styled-components"
import { breakpoints, colors, fontSizes, spacing } from "../variables"
import { SectionWrapper } from "./SectionWrapper"
import { useEffect, useState } from "react"
import { getRequest } from "../utils"
import { useMediaQuery } from "react-responsive"

const DefaultTable = styled.table`
  border-collapse: collapse;
  text-transform: uppercase;
  border: 1px solid ${colors['neutral-700']};
  width: 100%;
  max-width: 100%;
  margin: ${spacing[6]}px 0;

  thead {
    tr {
      background: ${colors['neutral-900']};
      border-bottom: 1px solid ${colors['neutral-700']};
      
      th {
        padding: ${spacing[3]}px 0;
        text-align: left;
        font-size: ${fontSizes[0]}px;
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

interface DataProps {
  ticker: string,
  company: string,
  stock_type: string,
  frequency: number,
  dividend_records: number,
  dividend_volatility: number,
  percentage_yield: number,
  median_percentage_yield: number
}

interface TableBodyProps {
  isBigScreen: boolean,
  searchQuery: string
}

const TableBody = ({isBigScreen, searchQuery}: TableBodyProps) => {
  const [pagination, setPagination] = useState(0)
  const [data, setData] = useState([])

  useEffect(() => {
    if (searchQuery.length > 0) {
      (async function () {
        const res = await getRequest(`${import.meta.env.VITE_SERVER_URL}/stocks/search/${searchQuery}`)

        setPagination(0)
        setData(JSON.parse(res))
      }())
    } else {
      (async function () {
        const res = await getRequest(`${import.meta.env.VITE_SERVER_URL}/stocks/paginate/${pagination}`)
        
        setData((data) => pagination === 0 ? JSON.parse(res) : data.concat(JSON.parse(res)))
      }())
    }

    const scrollEvent = () => {
      if (window.innerHeight - document.body.getBoundingClientRect().bottom >= 0 && searchQuery.length === 0) {
        setPagination(pagination + 1)
      }
    }

    window.addEventListener('scroll', scrollEvent)

    return () => window.removeEventListener('scroll', scrollEvent)
  }, [pagination, searchQuery])

  return (
    <Rows>
      {data.map((item: DataProps, index: number) => {
        if (!item.stock_type) return
        if (!item.percentage_yield) return

        return (
          <tr key={index}>
            <td>
              {item.ticker}<br />
              <label className="inline-block">{item.company}</label>
            </td>
            {isBigScreen && (<td>{item.stock_type}</td>)}
            {isBigScreen && (<td>{item.frequency}</td>)}
            {isBigScreen && (
              <td>
                {item.dividend_records}<label> | {(item.dividend_records / 12).toLocaleString(undefined, {maximumFractionDigits:2})} yrs</label>
              </td>
            )}
            <td>{item.dividend_volatility.toLocaleString(undefined, {maximumFractionDigits:2})}</td>
            <td>{item.percentage_yield.toLocaleString(undefined, {maximumFractionDigits:2})}%</td>
            <td>{item.median_percentage_yield.toLocaleString(undefined, {maximumFractionDigits:2})}%</td>
          </tr>
        )
      })}
    </Rows>
  )
}

interface SearchQueryProps {
  searchQuery: string
}

export default function Table ({searchQuery}: SearchQueryProps) {
  const isBigScreen = useMediaQuery({ query: `(min-width: ${breakpoints['screen-md']})`})

  return (
    <SectionWrapper>
      <DefaultTable>
        <thead>
          <tr>
            <th>ticker</th>
            {isBigScreen && (<th>stock type</th>)}
            {isBigScreen && (<th>frequency</th>)}
            {isBigScreen && (<th>div records</th>)}
            <th>div vol<span style={isBigScreen ? {display: 'inline'} : {display: 'none'}}>atility</span></th>
            <th>apy</th>
            <th>median apy</th>
          </tr>
        </thead>
        <TableBody isBigScreen={isBigScreen} searchQuery={searchQuery} />
      </DefaultTable>
    </SectionWrapper>
  )
}