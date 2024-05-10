import {expect, it, describe } from 'vitest'
import Filters from './Filters'
import { render } from '@testing-library/react'
import React from 'react'


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
})