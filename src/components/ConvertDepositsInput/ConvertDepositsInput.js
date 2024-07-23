import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import style from './ConvertDepositsInput.module.css';

const formatter = new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
});

const ConvertDepositInput = (props) => {
    const mode = props.depositMode;
    const conversionUnits = props.conversionUnits;
    const [conversionRate, setConversionRate] = useState('');
    const [conversionAmount, setConversionAmount] = useState(0); // Add state for conversion amount
    const [etcConversionRate, setEtcConversionRate] = useState('');
    const [etcReadonly, setEtcReadonly] = useState(true);

    useEffect(() => {
        setConversionAmount(0);
    }, [mode]);

    const inputChangeHandler = (type, value) => {
        if (conversionUnits === 'ratio') {
            if (type !== 'radio') {
                setEtcConversionRate(value);
            }
            setConversionRate(value);
            props.calculateHandler('conversion-rate', value);
        }
    };

    const onClickHandler = (event) => {
        event.preventDefault();
        console.log(event.target.value);
        props.unitHandler(event.target.value);
    };

    const incrementAmount = () => {
        setConversionAmount((prevAmount) => {
            const newAmount = prevAmount + 1000000;
            if (mode === 'decrease' && newAmount > 0) {
                return prevAmount;
            }

            props.calculateHandler('conversion-amount', newAmount);
            return newAmount;
        });
    };

    const decrementAmount = () => {
        setConversionAmount((prevAmount) => {
            const newAmount = prevAmount - 1000000;
            // if (newAmount >= 0) {
            if (mode === 'increase' && newAmount < 0) {
                return prevAmount;
            }
            props.calculateHandler('conversion-amount', newAmount);
            return newAmount;
        });
    };

    return (
        <Card>
            <div className={`${style['title']}`}>
                <p>보증금 전환</p>
                <div className={`${style['nav']}`}>
                    {/* <p>모드</p> */}
                    <div className={`${style['tab-bar']}`}>
                        <button value="ratio" className={conversionUnits === 'ratio' ? `${style['tab-menu']} ${style['is-active']}` : `${style['tab-menu']}`} onClick={onClickHandler}>
                            <p className={`${style['tab-text']}`}>
                                <span>비율</span>
                            </p>
                        </button>
                        <button value="amount" className={conversionUnits === 'amount' ? `${style['tab-menu']} ${style['is-active']}` : `${style['tab-menu']}`} onClick={onClickHandler}>
                            <p className={`${style['tab-text']}`}>
                                <span>금액</span>
                            </p>
                        </button>
                        <div className={`${style['tab-indicator']}`} style={conversionUnits === 'ratio' ? { left: '0' } : { left: '50%' }}></div>
                    </div>
                </div>
            </div>
            <div className={`${style['input-group']}`}>
                {conversionUnits === 'ratio' && (
                    <div>
                        <p className={`${style['label']}`}>전환 비율</p>
                        <div className={`${style['radio-wrapper']}`}>
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        value="50"
                                        name="conversion-rate"
                                        onChange={(event) => {
                                            setEtcReadonly(true);
                                            inputChangeHandler(event.target.type, event.target.value);
                                        }}
                                    />
                                    50%
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        value="60"
                                        name="conversion-rate"
                                        onChange={(event) => {
                                            setEtcReadonly(true);
                                            inputChangeHandler(event.target.type, event.target.value);
                                        }}
                                    />
                                    60%
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        value="70"
                                        name="conversion-rate"
                                        onChange={(event) => {
                                            setEtcReadonly(true);
                                            inputChangeHandler(event.target.type, event.target.value);
                                        }}
                                    />
                                    70%
                                </label>
                            </div>
                            <div className={`${style['etc']}`}>
                                <label>
                                    <input
                                        type="radio"
                                        name="conversion-rate"
                                        value="etc"
                                        onChange={() => {
                                            setEtcReadonly(false);
                                            if (etcConversionRate) {
                                                inputChangeHandler('radio', etcConversionRate);
                                            }
                                        }}
                                    />
                                    기타
                                </label>
                                <div>
                                    <input
                                        type="number"
                                        id="etc-conversion-rate"
                                        className={`${style['input']}`}
                                        value={etcConversionRate}
                                        onChange={(event) => {
                                            inputChangeHandler(event.target.type, event.target.value);
                                        }}
                                        readOnly={etcReadonly ? true : false}
                                    />
                                    <label htmlFor="">%</label>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {/* <div>
                    <label className={`${style['label']}`} htmlFor="default-rent">
                        <span>전환 보증금</span>
                        <span className={`${style['notice']}`}>100만원 단위로 보증금 전환이 가능합니다.</span>
                    </label>
                    <div className={`${style['input-wrapper']}`}>
                        <span className={`${style['symbol']}`}>+</span>
                        <input className={`${style['input']}`} type="number" id="default-rent" min="0" step="1000000" />
                    </div>
                </div> */}
                {conversionUnits === 'amount' && (
                    <div>
                        <label className={`${style['label']}`} htmlFor="conversion-amount">
                            <span>전환 금액</span>
                            <span className={`${style['notice']}`}>보증금 전환은 100만원 단위로 가능합니다.</span>
                        </label>
                        <div className={`${style['input-wrapper']}`}>
                            <button className={`${style['symbol']}`} onClick={decrementAmount}>
                                -
                            </button>
                            <input
                                className={`${style['input']}`}
                                type="number"
                                id="conversion-amount"
                                value={conversionAmount}
                                // onChange={(event) => {
                                //     inputChangeHandler(event.target.type, event.target.value);
                                // }}
                            />
                            <button className={`${style['symbol']}`} onClick={incrementAmount}>
                                +
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Card>
    );
};

export default ConvertDepositInput;
