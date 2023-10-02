import PropTypes from 'prop-types';
import './inputs.sass';

export const FormInputs = ({
    emailValue,
    firstNameValue,
    lastNameValue,
    onChange,
    phoneValue
}) => {

    return (
        <div className='inputs'>
            <h1>{`completa tus datos`}</h1>
            <input
                className='formInputs'
                name='firstName'
                onChange={onChange}
                pattern='([a-zA-ZÀ-ž\s]+){2,}'
                placeholder='Ingresa tu nombre'
                required
                title={`Ingresa sólo valores alfabéticos. \n Ejemplo: Juan`}
                type='text'
                value={firstNameValue}
            />
            <input
                className='formInputs'
                name='lastName'
                onChange={onChange}
                pattern='([a-zA-ZÀ-ž\s]+){2,}'
                placeholder='Ingresa tu apellido'
                required
                title={`Ingresa sólo valores alfabéticos. \n Ejemplo: Pérez`}
                type='text'
                value={lastNameValue}
            />
            <input
                className='formInputs'
                name='phone'
                onChange={onChange}
                pattern='([0-9]+){6,}'
                placeholder='Ingresa tu teléfono'
                required
                title={`Ingresa sólo valores numéricos. \n Ejemplo: 123456`}
                type='tel'
                value={phoneValue}
            />
            <input
                className='formInputs'
                name='email'
                onChange={onChange}
                placeholder='Ingresa tu e-mail'
                required
                title={`Ingresa una dirección de correo electrónico válida. \n Ejemplo: nombre@mail.com`}
                type='email'
                value={emailValue}
            />
        </div>
    );
}

FormInputs.propTypes = {
    emailValue: PropTypes.string,
    firstNameValue: PropTypes.string,
    lastNameValue: PropTypes.string,
    onChange: PropTypes.func,
    phoneValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
}

export const SearchInput = ({
    className,
    label,
    name,
    onChange,
    placeholder,
    type,
    value
}) => {

    return (
        <div className={className}>
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                name={name}
                onChange={onChange}
                placeholder={placeholder}
                type={type}
                value={value}
            />
        </div>
    );
}

SearchInput.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string
}