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
        const defaultDeposit = +data['default-deposit'];
        const defaultRent = +data['default-rent'];
        const conversionRate = +data['conversion-rate'] / 100;
        const conversionInterestRate = +data['conversion-interest-rate'] / 100;

        let conversionDeposit;
        let conversionRent;
        let deposit;
        let rent;
        // * 임대보증금 증가, 임대료 하락
        if (mode === 'increase') {
            // * 낮출 임대료(감소하는 임대료): 기본임대료 * 전환비율
            conversionRent = defaultRent * conversionRate;
            // * 증가한 임대 보증금: 낮출 임대료 * 12(개월) / 전환이율(기본 6%)
            conversionDeposit = (conversionRent * 12) / conversionInterestRate;
            deposit = defaultDeposit + conversionDeposit;
            rent = defaultRent - conversionRent;
        }
        // * 임대 보증금 감소, 임대료 증가
        if (mode === 'decrease') {
            // * 낮출 임대 보증금(감소하는 임대 보증금): 기본보증금 * 전환비율
            conversionDeposit = defaultDeposit * conversionRate;
            // * 증가한 임대료: 낮출 임대 보증금 * 12(개월) / 전환이율(기본 2.5%)
            conversionRent = (conversionDeposit * conversionInterestRate) / 12;
            deposit = defaultDeposit - conversionDeposit;
            rent = defaultRent + conversionRent;
        }

        setResultData((prevData) => {
            return {
                ...prevData,
                ['deposit']: deposit,
                ['conversion-deposit']: conversionDeposit,
                ['conversion-rate']: +data['conversion-rate'],
                ['conversion-rent']: conversionRent,
                ['rent']: rent,
            };
        });
    };

    useEffect(() => {
        calculateDeposit(depositMode, depositData);
    }, [depositData]);

    return (
        <>
            <Reset />
            <div className="App">
                <MainContainer>
                    <Header modeHandler={modeHandler} depositMode={depositMode}></Header>
                    <DepositInput depositData={depositData} calculateHandler={calculateHandler}></DepositInput>
                    <ConvertDepositInput calculateHandler={calculateHandler} depositMode={depositMode}></ConvertDepositInput>
                    <DepositResult resultData={resultData} depositMode={depositMode}></DepositResult>
                    <p className="notice">
                        본 계산기는 참고용입니다.
                        <br />
                        오차나 오류로 인해 발생하는 문제는 책임지지 않습니다.
                    </p>
                </MainContainer>
            </div>
        </>
    );
}

export default App;
