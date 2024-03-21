import {expect, it, describe } from 'vitest'
import Table from './Table'
import { render } from '@testing-library/react'
import { DataProps } from '../interfaces/stocks'
import { SortProps } from '../interfaces/stocks'

const mockData: DataProps[] = [{
  ticker: 'TEST',
  stock_type: 'TCD',
  percentage_yield: 25,
  company: 'Test company, LTD',
  frequency: 12, 
  dividend_records: 50, 
  dividend_volatility: .3,
  median_percentage_yield: 7
}]


const mockFilterProps = {
  setPagination: (page: number)  => page,
  sort: {
    activeSort: { category: 0, direction: 'desc' },
    setActiveSort: ({category, direction}: SortProps) => {return { category, direction }}
  }
}

describe('Testing main table', () => {
  it('should render properly on smaller screen sizes', () => {
    global.innerWidth = 500
    const component = render(<Table data={[]} filters={mockFilterProps} />)
    const element = component.getByText('stock type')
    expect(element).not.toEqual(false)
  })
  it('should render properly on full screen', () => {
    global.innerWidth = 1200
    const component = render(<Table data={[]} filters={mockFilterProps} />)
    const element = component.getByText('stock type')
    expect(element).toBeTruthy()
  })
  it('should render search results', async () => {
    const { getByText } = render(<Table data={mockData} filters={mockFilterProps} />);
    const element = getByText('TEST')
    expect(element).toBeDefined()
  })
  it('should render sorting class', async () => {
    const { container } = render(<Table data={mockData} filters={mockFilterProps} />);
    const element = container.querySelector('.desc')
    expect(element).toBeDefined()
  })
})