import { expect, it, describe } from 'vitest'
import MobileNav from './MobileNav'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'


describe('Testing mobile nav', () => {
    it('should render properly', () => {
        const component = render(<BrowserRouter><MobileNav /></BrowserRouter>)
        const element = component.findByText('Discover')
        expect(element).toBeTruthy()
    })
})