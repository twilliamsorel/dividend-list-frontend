import {expect, it, describe} from 'vitest'
import Filters from './Filters'
import { render } from '@testing-library/react'
import React from 'react'


describe('Testing filters', () => {
  it('should render properly', () => {
    const component = render(<Filters searchState={{ 'searchQuery': 'placeholder' }} />)
    const element = component.getByPlaceholderText('search')
    expect(element).toBeTruthy()
  })

  it('should pass props', () => {
    const component = render(<Filters searchState={{ 'searchQuery': 'placeholder' }} />)
    const element = component.getByDisplayValue('placeholder')
    expect(element).toBeTruthy()
  })
})