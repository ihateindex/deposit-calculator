import Card from '../UI/Card';
import style from './Header.module.css';

const Header = (props) => {
    const mode = props.depositMode;
    const onClickHandler = (event) => {
        event.preventDefault();
        // console.log(event.target.value);
        props.modeHandler(event.target.value);
    };

    return (
        <Card className="">
            <header className={`${style['header']}`}>
                <h1 className={`${style['header__title']}`}>보증금 상호전환 계산기</h1>
                <div className={`${style['header__tab-bar']}`}>
                    <button className={mode === 'increase' ? `${style['header__tab-menu']} ${style['is-active']}` : `${style['header__tab-menu']}`} value="increase" onClick={onClickHandler}>
                        <p className={`${style['header__tab-text']}`}>
                            <span>보증금</span>
                            <svg className={`${style['up']}`} xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M0 6L1.0575 7.0575L5.25 2.8725L5.25 12H6.75L6.75 2.8725L10.935 7.065L12 6L6 0L0 6Z" fill="#464D52" />
                            </svg>
                        </p>
                        <p className={`${style['header__tab-text']}`}>
                            <span>임대료</span>
                            <svg className={`${style['down']}`} xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M12 6L10.9425 4.9425L6.75 9.1275L6.75 -4.5897e-07L5.25 -5.90104e-07L5.25 9.1275L1.065 4.935L5.24537e-07 6L6 12L12 6Z" fill="#464D52" />
                            </svg>
                        </p>
                    </button>
                    <button className={mode === 'decrease' ? `${style['header__tab-menu']} ${style['is-active']}` : `${style['header__tab-menu']}`} value="decrease" onClick={onClickHandler}>
                        <p className={`${style['header__tab-text']}`}>
                            <span>보증금</span>
                            <svg className={`${style['down']}`} xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M12 6L10.9425 4.9425L6.75 9.1275L6.75 -4.5897e-07L5.25 -5.90104e-07L5.25 9.1275L1.065 4.935L5.24537e-07 6L6 12L12 6Z" fill="#464D52" />
                            </svg>
                        </p>
                        <p className={`${style['header__tab-text']}`}>
                            <span>임대료</span>
                            <svg className={`${style['up']}`} xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M0 6L1.0575 7.0575L5.25 2.8725L5.25 12H6.75L6.75 2.8725L10.935 7.065L12 6L6 0L0 6Z" fill="#464D52" />
                            </svg>
                        </p>
                    </button>
                    <div className={`${style['header__tab-indicator']}`} style={mode === 'increase' ? { left: '0' } : { left: '50%' }}></div>
                </div>
            </header>
        </Card>
    );
};

export default Header;
