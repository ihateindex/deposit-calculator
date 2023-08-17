import style from './Card.module.css';

const Card = (props) => {
    const baseClass = style.card;
    const additionalClass = style[props.className];
    const classes = additionalClass ? `${baseClass} ${additionalClass}` : `${baseClass}`;
    return <div className={classes}>{props.children}</div>;
};

export default Card;
