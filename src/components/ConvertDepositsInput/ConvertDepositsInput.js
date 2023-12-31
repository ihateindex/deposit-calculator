import { useState } from 'react';
import Card from '../UI/Card';
import style from './ConvertDepositsInput.module.css';

const ConvertDepositInput = (props) => {
    const mode = props.depositMode;
    const conversionUnits = props.conversionUnits;
    const [conversionRate, setConversionRate] = useState('');
    const [etcConversionRate, setEtcConversionRate] = useState('');
    const [etcReadonly, setEtcReadonly] = useState(true);

    const inputChangeHandler = (type, value) => {
        if (type !== 'radio') {
            setEtcConversionRate(value);
        }
        setConversionRate(value);
        props.calculateHandler('conversion-rate', value);
    };

    // const onClickHandler = (event) => {
    //     event.preventDefault();
    //     // console.log(event.target.value);
    //     props.unitHandler(event.target.value);
    // };

    return (
        <Card>
            {/* <div className={`${style['title']}`}>
                <p>보증금 전환</p>
                <div className={`${style['nav']}`}>
                    <p>단위</p>
                    <div className={`${style['tab-bar']}`}>
                        <button value="1M" className={conversionUnits === '1M' ? `${style['tab-menu']} ${style['is-active']}` : `${style['tab-menu']}`} onClick={onClickHandler}>
                            <p className={`${style['tab-text']}`}>
                                <span>100만</span>
                            </p>
                        </button>
                        <button value="10K" className={conversionUnits === '10K' ? `${style['tab-menu']} ${style['is-active']}` : `${style['tab-menu']}`} onClick={onClickHandler}>
                            <p className={`${style['tab-text']}`}>
                                <span>1만</span>
                            </p>
                        </button>
                        <div className={`${style['tab-indicator']}`} style={conversionUnits === '1M' ? { left: '0' } : { left: '50%' }}></div>
                    </div>
                </div>
            </div> */}
            <div className={`${style['input-group']}`}>
                <div>
                    <p className={`${style['label']}`}>전환 비율</p>
                    <div className={`${style['radio-wrapper']}`}>
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
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    value="80"
                                    name="conversion-rate"
                                    onChange={(event) => {
                                        setEtcReadonly(true);
                                        inputChangeHandler(event.target.type, event.target.value);
                                    }}
                                />
                                80%
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
            </div>
        </Card>
    );
};

export default ConvertDepositInput;
