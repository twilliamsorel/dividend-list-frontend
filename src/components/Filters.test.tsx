import { expect, it, describe } from 'vitest'
import Filters from './Filters'
import { render, renderHook, RenderHookResult } from '@testing-library/react'
import { useTableStore, TableState } from '../interfaces/stores'


describe('Testing filters', () => {
  it('should render search properly', () => {
    const component = render(<Filters />)
    const element = component.getByPlaceholderText('search')
    expect(element).toBeTruthy()
  })

  it('should render filters', () => {
    const component = render(<Filters />)
    const button = component.findByDisplayValue('Filters')
    expect(button).toBeTruthy()
  })

  it('should render search results', async () => {
    const { result } = renderHook(useTableStore) as RenderHookResult<TableState, unknown>
    result.current.setSearchQuery('TEST')
    const table = render(<Filters />);
    const element = table.getByDisplayValue('TEST')
    expect(element).toBeDefined()
  })
})