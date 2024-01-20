import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import StopWatch from './StopWatch';
import '@testing-library/jest-dom';

// Mocking timers for the setInterval in the StopWatch component
beforeEach(() => {
    jest.useFakeTimers();
});

afterEach(() => {
    jest.useRealTimers();
});

describe('StopWatch Component', () => {
    test('should start and stop counting when start/stop button is clicked', () => {
        render(<StopWatch />);
        const startStopButton = screen.getByText('Start/Stop');

        // Start the stopwatch
        fireEvent.click(startStopButton);
        act(() => {
            jest.advanceTimersByTime(1000);
        });
        let display = screen.getByText(/0:00:01/);
        expect(display).toBeInTheDocument();

        // Stop the stopwatch
        fireEvent.click(startStopButton);
        act(() => {
            jest.advanceTimersByTime(1000);
        });
        display = screen.getByText(/0:00:01/); // Time should still be 1 second
        expect(display).toBeInTheDocument();
    });

    test('should record lap times correctly', () => {
        render(<StopWatch />);
        const startStopButton = screen.getByText('Start/Stop');
        const lapButton = screen.getByText('Lap');

        // Start and record a lap
        fireEvent.click(startStopButton);
        act(() => {
            jest.advanceTimersByTime(5000);
        });
        fireEvent.click(lapButton);

        // Assuming lap times are displayed in a specific container
        const lapTimes = screen.getAllByText(/0:00:05/);
        expect(lapTimes.length).toBe(2); // or whatever number is expected
    });

    test('should reset the time and laps when reset button is clicked', () => {
        render(<StopWatch />);
        const startStopButton = screen.getByText('Start/Stop');
        const resetButton = screen.getByText('Reset');

        // Start the stopwatch and then reset
        fireEvent.click(startStopButton);
        act(() => {
            jest.advanceTimersByTime(1000);
        });
        fireEvent.click(resetButton);

        const display = screen.getByText(/0:00:00/); // Expect time to be reset to 0
        expect(display).toBeInTheDocument();
    });

    test('should display time in the correct format', () => {
        render(<StopWatch />);
        const startStopButton = screen.getByText('Start/Stop');

        // Start the stopwatch and check the display format
        fireEvent.click(startStopButton);
        act(() => {
            jest.advanceTimersByTime(3661000); // 1 hour, 1 minute, and 1 second
        });

        const display = screen.getByText(/01:01:01/);
        expect(display).toBeInTheDocument();
    });
});
