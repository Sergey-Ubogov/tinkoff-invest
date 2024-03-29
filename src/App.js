import React, { useEffect, useState, useCallback } from 'react';
import './App.css';
const socketURL = 'wss://api-invest.tinkoff.ru/openapi/md/v1/md-openapi/ws';

export function App() {
    const [portfolio, setPortfolio] = useState(null);
    const [secretToken, setToken] = useState(null);

    const loadPortfolio = useCallback(async () => {
        if (!secretToken) return;
        const api = new OpenAPI({ apiURL, secretToken, socketURL });
        setPortfolio(await api.portfolio());
    }, [secretToken]);
    useEffect(() => {
        loadPortfolio();
    }, [loadPortfolio]);

    return (
        <div className="App">
            <input
                className="token"
                type="text"
                onChange={onChangeToken}
                placeholder="токен"
            />
            {renderPortfolio(portfolio)}
        </div>
    );
    function onChangeToken(event) {
        setToken(event.target.value);
    }
}

function renderPortfolio(portfolio) {
    return (
        <div>
            {renderRow({
                ticker: 'Тикер',
                balance: 'Количество',
                currency: 'Валюта',
                value: 'Доходность',
            })}
            {portfolio &&
                portfolio.positions.map(
                    ({ ticker, balance, expectedYield: { currency, value } }) =>
                        renderRow({
                            ticker,
                            balance,
                            currency,
                            value,
                        })
                )}
        </div>
    );
}

function renderRow({ ticker, balance, currency, value }) {
    return (
        <div key={ticker} className="row">
            <div className="ticker">{ticker}</div>
            <div className="balance">{balance}</div>
            <div className="value">{value}</div>
            <div className="currency">{currency}</div>
        </div>
    );
}
