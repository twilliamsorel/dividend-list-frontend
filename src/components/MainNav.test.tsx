import {expect, it, describe} from 'vitest'
import MainNavComponent from './MainNav'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'


describe('Testing main nav', () => {
  it('should render properly', () => {
    const component = render(<MainNavComponent title="Discover" />, {wrapper: BrowserRouter})
    const element = component.getAllByText('Discover')
    expect(element).toBeTruthy()
  })
})