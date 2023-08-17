import { useState, useEffect } from 'react';
import { Reset } from 'styled-reset';
import './App.css';
import Header from './components/Header/Header';
import MainContainer from './components/MainContainer';
import DepositInput from './components/DepositInput/DepositInput';
import ConvertDepositInput from './components/ConvertDepositsInput/ConvertDepositsInput';
import DepositResult from './components/DepositResult/DepositResult';

const INITIAL_DEPOSIT_DATA = {
    'default-deposit': '',
    'default-rent': '',
    'conversion-interest-rate': '6',
    'conversion-rate': '',
    'conversion-deposit': '',
    'conversion-rent': '',
    deposit: '',
    rent: '',
};

function App() {
    const [depositMode, setDepositMode] = useState('increase');
    const [conversionUnits, setConversionUnits] = useState('1M');
    const [depositData, setDepositData] = useState(INITIAL_DEPOSIT_DATA);
    const [resultData, setResultData] = useState(INITIAL_DEPOSIT_DATA);
    const modeHandler = (mode) => {
        setDepositMode(mode);

        if (mode === 'increase') {
            setDepositData((prevData) => {
                return {
                    ...prevData,
                    ['conversion-interest-rate']: '6',
                };
            });
        }
        if (mode === 'decrease') {
            setDepositData((prevData) => {
                return {
                    ...prevData,
                    ['conversion-interest-rate']: '2.5',
                };
            });
        }
    };
    const unitHandler = (unit) => {
        setConversionUnits(unit);
    };

    const calculateHandler = (input, value) => {
        // console.log(input, value);

        setDepositData((prevData) => {
            return {
                ...prevData,
                [input]: value,
            };
        });
    };

    const calculateDeposit = (mode, data) => {
        // console.log(mode, data);
        const defaultDeposit = +data['default-deposit'];
        const defaultRent = +data['default-rent'];
        const conversionRate = +data['conversion-rate'] / 100;
        const conversionInterestRate = +data['conversion-interest-rate'] / 100;
        function formatMillion(number) {
            return Math.floor(number / 1000000) * 1000000;
        }
        function formatTenThousand(number) {
            return Math.floor(number / 10000) * 10000;
        }
        function formatTen(number) {
            return Math.floor(number / 10) * 10;
        }

        const conversionDeposit = (defaultRent * conversionRate * 12) / conversionInterestRate;

        let conversionRent;
        if (conversionUnits === '1M') {
            conversionRent = (formatMillion(conversionDeposit) * conversionInterestRate) / 12;
        } else {
            conversionRent = (formatTenThousand(conversionDeposit) * conversionInterestRate) / 12;
        }

        let deposit;
        let rent;
        if (mode === 'increase') {
            if (conversionUnits === '1M') {
                deposit = defaultDeposit + formatMillion(conversionDeposit);
            } else {
                deposit = defaultDeposit + formatTenThousand(conversionDeposit);
            }
            rent = defaultRent - conversionRent;
        }
        if (mode === 'decrease') {
            if (conversionUnits === '1M') {
                deposit = defaultDeposit - formatMillion(conversionDeposit);
            } else {
                deposit = defaultDeposit - formatTenThousand(conversionDeposit);
            }
            rent = defaultRent + conversionRent;
        }

        setResultData((prevData) => {
            return {
                ...prevData,
                ['deposit']: deposit,
                ['conversion-deposit']: conversionUnits === '1M' ? formatMillion(conversionDeposit) : formatTenThousand(conversionDeposit),
                ['conversion-rate']: +data['conversion-rate'],
                ['conversion-rent']: conversionUnits === '1M' ? formatTen(conversionRent) : conversionRent,
                ['rent']: conversionUnits === '1M' ? formatTen(rent) : rent,
            };
        });
    };

    useEffect(() => {
        calculateDeposit(depositMode, depositData);
    }, [depositData, conversionUnits]);

    return (
        <>
            <Reset />
            <div className="App">
                <MainContainer>
                    <Header modeHandler={modeHandler} depositMode={depositMode}></Header>
                    <DepositInput depositData={depositData} calculateHandler={calculateHandler}></DepositInput>
                    <ConvertDepositInput calculateHandler={calculateHandler} depositMode={depositMode} conversionUnits={conversionUnits} unitHandler={unitHandler}></ConvertDepositInput>
                    <DepositResult resultData={resultData} depositMode={depositMode}></DepositResult>
                </MainContainer>
            </div>
        </>
    );
}

export default App;
