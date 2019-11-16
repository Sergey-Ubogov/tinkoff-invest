import React, {useEffect, useState} from 'react';
import './App.css';
import OpenAPI from '@tinkoff/invest-openapi-js-sdk/build/openApi';
const apiURL = 'https://api-invest.tinkoff.ru/openapi';
const socketURL = 'wss://api-invest.tinkoff.ru/openapi/md/v1/md-openapi/ws';

export function App() {
    const [portfolio, setPortfolio] = useState(null);
    const [secretToken, setToken] = useState(null);
    useEffect(() => {
        async function loadPortfolio() {
            if (!secretToken) return;
            const api = new OpenAPI({ apiURL, secretToken, socketURL });
            const portfolio = await api.portfolio();
            setPortfolio(portfolio);
        }
        loadPortfolio();
    }, [secretToken]);

    return (
        <div className="App">
            <input className="token" type="text" onChange={onChangeToken} placeholder="токен"/>
            {renderPortfolio(portfolio)}
        </div>
    );
    function onChangeToken(event) {
        setToken(event.target.value);
    }
}


function renderPortfolio(portfolio) {
    return <div>
        {renderRow({
            ticker: 'Тикер',
            balance: 'Количество',
            currency: 'Валюта',
            value: 'Доходность'
        })}
        {
            portfolio && portfolio.positions.map(
                ({ticker, balance, expectedYield: {currency, value}}) => renderRow({
                    ticker,
                    balance,
                    currency,
                    value
                })
            )
        }
    </div>
}

function renderRow({ticker, balance, currency, value}) {
    return <div key={ticker} className="row">
        <div className="ticker">{ticker}</div>
        <div className="balance">{balance}</div>
        <div className="value">{value}</div>
        <div className="currency">{currency}</div>
    </div>
}

