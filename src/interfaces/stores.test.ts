import { expect, test, describe } from 'vitest'
import { renderHook, act, RenderHookResult } from "@testing-library/react";
import { TableState, useTableStore } from './stores'

describe('Testing stores', () => {
    test('useTableStore', () => {
        const { result } = renderHook(useTableStore) as RenderHookResult<TableState, unknown>
        expect(result.current.searchQuery).toBe('')
        expect(result.current.page).toBe(0)

        act(() => result.current.setPage(3))
        expect(result.current.page).toBe(3)

        act(() => result.current.setSearchQuery('test'))
        expect(result.current.searchQuery).toBe('test')
    })
})