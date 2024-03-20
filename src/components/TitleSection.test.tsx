import { describe, it, expect } from "vitest";
import TitleSection from "./TitleSection";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe('Testing title section', () => {
    it('renders title', () => {
        render(<BrowserRouter><TitleSection title="Test" /></BrowserRouter>)
        const element = screen.getByText('Test')
        expect(element).toBeDefined()
    })
})