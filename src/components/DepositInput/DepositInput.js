import style from './DepositInput.module.css';
import Card from '../UI/Card';

const DepositInput = (props) => {
    const inputChangeHandler = (input, value) => {
        props.calculateHandler(input, value);
        // console.log(input, value);
    };
    return (
        <Card className={`${style['input-group2']}`}>
            <div className={`${style['input-group']}`}>
                <div>
                    <label className={`${style['label']}`} htmlFor="default-deposit">
                        기본 보증금
                    </label>
                    <input
                        className={`${style['input']}`}
                        type="number"
                        id="default-deposit"
                        value={props.depositData['default-deposit']}
                        onChange={(event) => {
                            inputChangeHandler(event.target.id, event.target.value);
                        }}
                    />
                </div>
                <div>
                    <label className={`${style['label']}`} htmlFor="default-rent">
                        기본 임대료
                    </label>
                    <input
                        className={`${style['input']}`}
                        value={props.depositData['default-rent']}
                        type="number"
                        id="default-rent"
                        onChange={(event) => {
                            inputChangeHandler(event.target.id, event.target.value);
                        }}
                    />
                </div>
            </div>
            <div className={`${style['input-group']}`}>
                <div>
                    <label className={`${style['label']}`} htmlFor="conversion-interest-rate">
                        전환 이율 (%)
                    </label>
                    <input
                        className={`${style['input']}`}
                        value={props.depositData['conversion-interest-rate']}
                        type="number"
                        id="conversion-interest-rate"
                        onChange={(event) => {
                            inputChangeHandler(event.target.id, event.target.value);
                        }}
                    />
                </div>
            </div>
        </Card>
    );
};

export default DepositInput;
