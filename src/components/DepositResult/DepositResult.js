import style from './DepositResult.module.css';
import Card from '../UI/Card';

const formatter = new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
});

const DepositResult = (props) => {
    const mode = props.depositMode;
    const conversionUnits = props.conversionUnits;
    return (
        <Card>
            <div className={`${style['result']}`}>
                <div className={`${style['item']}`}>
                    <p className={`${style['title']}`}>보증금</p>
                    <p className={`${style['number']}`}>{formatter.format(+props.resultData['deposit'])}</p>
                    {+props.resultData['conversion-deposit'] !== 0 && (
                        <div className={mode === 'increase' ? `${style['badge']} ${style['up']}` : `${style['badge']} ${style['down']}`}>
                            <span>{formatter.format(+props.resultData['conversion-deposit'])}</span>
                            {mode === 'increase' && (
                                <svg className={`${style['up']}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" fill="none">
                                    <path d="M0 6L1.0575 7.0575L5.25 2.8725L5.25 12H6.75L6.75 2.8725L10.935 7.065L12 6L6 0L0 6Z" fill="#464D52" />
                                </svg>
                            )}
                            {mode === 'decrease' && (
                                <svg className={`${style['down']}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" fill="none">
                                    <path d="M12 6L10.9425 4.9425L6.75 9.1275L6.75 -4.5897e-07L5.25 -5.90104e-07L5.25 9.1275L1.065 4.935L5.24537e-07 6L6 12L12 6Z" fill="#464D52" />
                                </svg>
                            )}
                        </div>
                    )}
                </div>
                <div className={`${style['item']}`}>
                    <p className={`${style['title']}`}>임대료</p>
                    <p className={`${style['number']}`}>{formatter.format(+props.resultData['rent'])}</p>
                    {+props.resultData['conversion-rent'] !== 0 && (
                        <div className={mode === 'increase' ? `${style['badge']} ${style['down']}` : `${style['badge']} ${style['up']}`}>
                            <span>{formatter.format(+props.resultData['conversion-rent'])}</span>
                            {mode === 'increase' && (
                                <svg className={`${style['down']}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" fill="none">
                                    <path d="M12 6L10.9425 4.9425L6.75 9.1275L6.75 -4.5897e-07L5.25 -5.90104e-07L5.25 9.1275L1.065 4.935L5.24537e-07 6L6 12L12 6Z" fill="#464D52" />
                                </svg>
                            )}
                            {mode === 'decrease' && (
                                <svg className={`${style['up']}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" fill="none">
                                    <path d="M0 6L1.0575 7.0575L5.25 2.8725L5.25 12H6.75L6.75 2.8725L10.935 7.065L12 6L6 0L0 6Z" fill="#464D52" />
                                </svg>
                            )}
                        </div>
                    )}
                </div>
                {conversionUnits === 'ratio' ? (
                    <>
                        <div className={`${style['item']}`}>
                            <p className={`${style['title']}`}>전환 비율</p>
                            <p className={`${style['number']}`}>
                                <span>{+props.resultData['conversion-rate']}</span>
                                <span>%</span>
                            </p>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={`${style['item']}`}></div>
                    </>
                )}
                <div className={`${style['item']}`}>
                    <p className={`${style['title']}`}>전환 보증금</p>
                    <p className={`${style['number']}`}>{formatter.format(+props.resultData['conversion-deposit'])}</p>
                </div>
            </div>
        </Card>
    );
};

export default DepositResult;
