// src/component/App/App.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import Game from '../Game/Game';

const App: React.FC = () => {
    const { theme = 'defaultTheme' } = useParams<{ theme: string }>();

    return (
        <div className="App">
            <Game theme={theme} />
        </div>
    );
};

export default App;
