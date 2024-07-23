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
    'conversion-interest-rate': '7',
    'conversion-rate': '',
    'conversion-amount': '0',
    'conversion-deposit': '',
    'conversion-rent': '',
    deposit: '',
    rent: '',
};

function App() {
    const [depositMode, setDepositMode] = useState('increase');
    const [conversionUnits, setConversionUnits] = useState('ratio');
    const [depositData, setDepositData] = useState(INITIAL_DEPOSIT_DATA);
    const [resultData, setResultData] = useState(INITIAL_DEPOSIT_DATA);
    const modeHandler = (mode) => {
        setDepositMode(mode);

        if (mode === 'increase') {
            setDepositData((prevData) => {
                return {
                    ...prevData,
                    ['conversion-interest-rate']: '7',
                    ['conversion-amount']: '0',
                };
            });
        }
        if (mode === 'decrease') {
            setDepositData((prevData) => {
                return {
                    ...prevData,
                    ['conversion-interest-rate']: '3.5',
                    ['conversion-amount']: '0',
                };
            });
        }
    };

    const unitHandler = (unit) => {
        setResultData(INITIAL_DEPOSIT_DATA);
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
        const defaultDeposit = +data['default-deposit'];
        const defaultRent = +data['default-rent'];
        const conversionRate = +data['conversion-rate'] / 100;
        const conversionAmount = +data['conversion-amount'];
        const conversionInterestRate = +data['conversion-interest-rate'] / 100;

        let conversionDeposit;
        let conversionRent;
        let deposit;
        let rent;
        if (conversionUnits === 'ratio') {
            // * 임대보증금 증가, 임대료 하락
            if (mode === 'increase') {
                conversionRent = defaultRent * conversionRate;
                conversionDeposit = (conversionRent * 12) / conversionInterestRate;
                deposit = defaultDeposit + conversionDeposit;
                rent = defaultRent - conversionRent;
            }
            // * 임대 보증금 감소, 임대료 증가
            if (mode === 'decrease') {
                conversionDeposit = defaultDeposit * conversionRate;
                conversionRent = (conversionDeposit * conversionInterestRate) / 12;
                deposit = defaultDeposit - conversionDeposit;
                rent = defaultRent + conversionRent;
            }
        } else if (conversionUnits === 'amount') {
            conversionDeposit = conversionAmount;
            conversionRent = (Math.abs(conversionAmount) * conversionInterestRate) / 12;
            deposit = defaultDeposit + conversionDeposit;
            rent = conversionAmount > 0 ? defaultRent - conversionRent : defaultRent + conversionRent;
        }

        // ! calculateDeposit 함수는 depositData 변경되면 발생하므로 변경될때 보증금,임대료,전환 비율,전환 보증금이 0보다 크다면 정상적으로 계산 시도한 것
        // TODO: 정상 계산 시도시에 GA 이벤트 발생하도록 추가

        setResultData((prevData) => {
            return {
                ...prevData,
                ['deposit']: deposit,
                ['conversion-deposit']: conversionDeposit,
                ['conversion-rate']: +data['conversion-rate'],
                ['conversion-amount']: +data['conversion-amount'],
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
                    <ConvertDepositInput
                        depositData={depositData}
                        calculateHandler={calculateHandler}
                        depositMode={depositMode}
                        conversionUnits={conversionUnits}
                        unitHandler={unitHandler}
                    ></ConvertDepositInput>
                    <DepositResult resultData={resultData} depositMode={depositMode} conversionUnits={conversionUnits}></DepositResult>
                    <p className="notice">
                        본 계산기는 참고용입니다.
                        <br />
                        오차나 오류로 인해 발생하는 문제는 책임지지 않습니다.
                    </p>
                    <div className="contact_us">
                        <p>개선사항이나 문의는 이메일로 보내주세요😃</p>
                        <a href="mailto:'raheeseong@gmail.com'">raheeseong@gmail.com</a>
                    </div>
                </MainContainer>
            </div>
        </>
    );
}

export default App;
