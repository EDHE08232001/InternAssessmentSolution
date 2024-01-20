import React, { useState, useEffect } from 'react';
import StopWatchButton from './StopWatchButton';
import './styles/StopWatchStyles.css';

/**
 * Stopwatch component that tracks time in milliseconds and records laps.
 */
export default function StopWatch() {
    // State variables to track time, running status, and laps
    const [milliseconds, setMilliseconds] = useState(0);
    const [running, setRunning] = useState(false);
    const [laps, setLaps] = useState<string[]>([]);

    /**
     * Sets up an interval to update the time every 10 milliseconds
     * when the stopwatch is running.
     */
    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | null = null;

        if (running) {
            interval = setInterval(() => {
                setMilliseconds(prevMilliseconds => prevMilliseconds + 10);
            }, 10);
        } else if (interval) {
            clearInterval(interval);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [running]);

    /**
     * Formats the time into hours, minutes, seconds, and milliseconds.
     */
    const formatTime = () => {
        const hours = Math.floor(milliseconds / 3600000);
        const minutes = Math.floor((milliseconds % 3600000) / 60000);
        const seconds = Math.floor((milliseconds % 60000) / 1000);

        return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    /**
     * Toggles the running state of the stopwatch.
     */
    const startStop = () => {
        setRunning(!running);
    };

    /**
     * Records the current lap time.
     */
    const recordLap = () => {
        if (running) {
            setLaps(prevLaps => [...prevLaps, formatTime()]);
        }
    };

    /**
     * Resets the stopwatch, clearing the time and laps.
     */
    const reset = () => {
        setRunning(false);
        setMilliseconds(0);
        setLaps([]);
    };

    return (
        <div className="stopwatch-container">
            <div className="stopwatch-section">
                <h2>Stopwatch</h2>
                <div className="timer-display">
                    {formatTime()}
                    <span className="milliseconds">
                        .{milliseconds % 1000 < 10 ? `00${milliseconds % 1000}` : milliseconds % 1000 < 100 ? `0${milliseconds % 1000}` : milliseconds % 1000}
                    </span>
                </div>
                <StopWatchButton onStartStopClick={startStop} onLapClick={recordLap} onResetClick={reset} />
            </div>
            <div className="laps-section">
                <h3>Laps</h3>
                <div className="laps-container">
                    {laps.length > 0 ? (
                        laps.map((lap, index) => <div key={index}>{lap}</div>)
                    ) : (
                        <div className="no-laps">No laps recorded</div>
                    )}
                </div>
            </div>
        </div>
    );
}

