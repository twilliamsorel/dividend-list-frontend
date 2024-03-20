import {expect, it, describe} from 'vitest'
import MainNavComponent from './MainNav'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'


describe('Testing main nav', () => {
  it('should render properly on full screen', () => {
    global.innerWidth = 1200
    const component = render(<MainNavComponent title="Discover" />, {wrapper: BrowserRouter})
    const element = component.getAllByText('Dashboard')
    expect(element).toBeTruthy()
  })

  it('should render properly on small screens', () => {
    global.innerWidth = 1200
    const component = render(<MainNavComponent title="Discover" />, {wrapper: BrowserRouter})
    const element = component.getAllByText('Dashboard')
    expect(element).not.toContain('Dashboard')
  })
})