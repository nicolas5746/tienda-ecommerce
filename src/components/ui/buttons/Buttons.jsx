import PropTypes from 'prop-types';
import { default as Submit } from '@mui/material/Button';
import { Link } from 'react-router-dom';
import './buttons.sass';

export const Button = ({ onClick, onMouseEnter, onMouseLeave, style, text, title }) => {

    return (
        <div className='button' aria-label='button' onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={style} title={title}>
            {text}
        </div>
    );
}

Button.propTypes = {
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    style: PropTypes.object,
    text: PropTypes.string,
    title: PropTypes.string
}

export const HomeButton = ({ style, text, title }) => {

    return (
        <Link to='/' aria-label='home'>
            <div className='home-button' aria-label='home-button' style={style} title={title}>{text}</div>
        </Link>
    );
}

HomeButton.propTypes = {
    style: PropTypes.object,
    text: PropTypes.string,
    title: PropTypes.string
}

export const SubmitButton = ({ disabled, onClick, onMouseEnter, onMouseLeave, style, text, title }) => {

    return (
        <Submit disabled={disabled} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={style} title={title} type='submit'>
            {text}
        </Submit>
    );
}

SubmitButton.propTypes = {
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    style: PropTypes.object,
    text: PropTypes.string,
    title: PropTypes.string
}