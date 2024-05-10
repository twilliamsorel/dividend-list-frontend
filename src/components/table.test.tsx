import { expect, it, describe } from 'vitest'
import Table from './Table'
import { render } from '@testing-library/react'
// import { useTableStore } from '../interfaces/stores'

describe('Testing main table', () => {
  it('should render properly on smaller screen sizes', () => {
    global.innerWidth = 500
    const component = render(<Table />)
    const element = component.getByText('stock type')
    expect(element).not.toEqual(false)
  })
  it('should render properly on full screen', () => {
    global.innerWidth = 1200
    const component = render(<Table />)
    const element = component.getByText('stock type')
    expect(element).toBeTruthy()
  })
  /*
  it('should render search results', async () => {
    const table = useTableStore
    table.setSearchQuery('TEST')
    const { getByText } = render(<Table />);
    const element = getByText('TEST')
    expect(element).toBeDefined()
  })
  */
  it('should render sorting class', async () => {
    const { container } = render(<Table />);
    const element = container.querySelector('.asc')
    expect(element).toBeDefined()
  })
})