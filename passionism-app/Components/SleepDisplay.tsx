import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const SleepDisplay: React.FC = () => {
    const sleep = useSelector((state: RootState) => state.game.sleep);

    return (
        <div>
            <h2>Sleep: {sleep}</h2>
        </div>
    );
}

export default SleepDisplay;