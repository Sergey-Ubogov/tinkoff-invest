import React from 'react';
import './App.css';

export function App() {
    return (
        <div className="App">
            <input
                className="token"
                type="text"
                onChange={onChangeToken}
                placeholder="токен-шмокен"
            />
        </div>
    );
    function onChangeToken(event: React.ChangeEvent<HTMLInputElement>) {
        console.info(event.target.value);
    }
}
