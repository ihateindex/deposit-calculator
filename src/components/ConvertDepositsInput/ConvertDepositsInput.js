import { useState } from 'react';
import Card from '../UI/Card';
import style from './ConvertDepositsInput.module.css';

const ConvertDepositInput = (props) => {
    const mode = props.depositMode;
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

    return (
        <Card>
            <div className={`${style['title']}`}>
                <p>보증금 전환</p>
                {/* <div className={`${style['tab-bar']}`}>
                    <div className={`${style['tab-menu']} ${style['is-active']}`}>
                        <p className={`${style['tab-text']}`}>
                            <span>비율</span>
                        </p>
                    </div>
                    <div className={`${style['tab-menu']}`}>
                        <p className={`${style['tab-text']}`}>
                            <span>금액</span>
                        </p>
                    </div>
                    <div className={`${style['tab-indicator']}`}></div>
                </div> */}
            </div>
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
                                        inputChangeHandler(event.target.type, event.target.value);
                                    }}
                                />
                                60%
                            </label>
                        </div>
                        <div>
                            <label className="">
                                <input
                                    type="radio"
                                    value="70"
                                    name="conversion-rate"
                                    onChange={(event) => {
                                        inputChangeHandler(event.target.type, event.target.value);
                                    }}
                                />
                                70%
                            </label>
                        </div>
                        <div>
                            <label className="">
                                <input
                                    type="radio"
                                    value="80"
                                    name="conversion-rate"
                                    onChange={(event) => {
                                        inputChangeHandler(event.target.type, event.target.value);
                                    }}
                                />
                                80%
                            </label>
                        </div>
                        <div className={`${style['etc']}`}>
                            <label className="">
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
