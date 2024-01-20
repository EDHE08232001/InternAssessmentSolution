import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StopWatch from './StopWatch';
import { act } from '@testing-library/react';

describe('StopWatch', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

    test('initially displays 00:00:00', () => {
        render(<StopWatch />);
        expect(screen.getByText('00:00:00')).toBeInTheDocument();
    });

    test('starts and stops the timer', () => {
        render(<StopWatch />);
        const startStopButton = screen.getByText('Start/Stop');

        act(() => {
            fireEvent.click(startStopButton);
            jest.advanceTimersByTime(1000);
        });

        expect(screen.getByText(/00:00:01/)).toBeInTheDocument();
        fireEvent.click(startStopButton);
        expect(screen.getByText(/00:00:01/)).toBeInTheDocument(); // Check if the timer stops
    });

    test('records laps', () => {
        render(<StopWatch />);
        const startStopButton = screen.getByText('Start/Stop');
        const lapButton = screen.getByText('Lap');
        fireEvent.click(startStopButton);
        jest.advanceTimersByTime(1000);
        fireEvent.click(lapButton);
        expect(screen.getByText('00:00:01')).toBeInTheDocument();
    });
});
