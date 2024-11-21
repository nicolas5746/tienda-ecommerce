import PropTypes from 'prop-types';
import { default as Submit } from '@mui/material/Button';
import { Link } from 'react-router-dom';

export const Button = ({ onClick, onMouseEnter, onMouseLeave, style, text, title }) => {

    return (
        <div
            className='block text-center text-5xs sm:text-2sm first-letter:uppercase font-poppins m-[5% auto 2%] cursor-pointer'
            aria-label='button' onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={style}
            title={title}
        >{text}</div>
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
        <Link to='../' aria-label='home'>
            <div
                className='block text-center text-base text-windows-blue link:text-windows-blue visited:text-medium-blue hover:bg-dark-white hover:text-royal-blue
                            active:text-blue-whale first-letter:uppercase font-lato bg-gainsboro m-[0 auto] cursor-pointer border border-solid border-windows-blue'
                aria-label='home-button'
                style={style}
                title={title}
            >{text}</div>
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