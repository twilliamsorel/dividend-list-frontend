import { expect, test, describe } from 'vitest'
import { useThrottle } from './utils'
import { renderHook } from "@testing-library/react";


describe('Testing utils', () => {
    test('useThrottle', () => {
        const { result } = renderHook(useThrottle)
        let sideEffect = false

        result.current(() => {
            sideEffect = true
        }, 1000)
        expect(sideEffect).toBe(false)

        setTimeout(() => {
            expect(sideEffect).toBe(true)
        }, 1000)
    })
})