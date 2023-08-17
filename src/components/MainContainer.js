import style from './MainContainer.module.css';

const MainContainer = (props) => {
    return <div className={`${style['container']}`}>{props.children}</div>;
};

export default MainContainer;
