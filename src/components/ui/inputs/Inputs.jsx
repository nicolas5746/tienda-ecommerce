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
                className='form-inputs'
                name='firstName'
                onChange={onChange}
                pattern='([a-zA-ZÀ-ž\s]+){2,}'
                placeholder='Ingresa tu nombre'
                required
                title={'Ingresa sólo valores alfabéticos. Ejemplo: Juan'}
                type='text'
                value={firstNameValue}
            />
            <input
                className='form-inputs'
                name='lastName'
                onChange={onChange}
                pattern='([a-zA-ZÀ-ž\s]+){2,}'
                placeholder='Ingresa tu apellido'
                required
                title={'Ingresa sólo valores alfabéticos. Ejemplo: Pérez'}
                type='text'
                value={lastNameValue}
            />
            <input
                className='form-inputs'
                name='phone'
                onChange={onChange}
                pattern='^[+]?[0123456789]\d{8,20}$'
                placeholder='Ingresa tu teléfono'
                required
                title={'Ingresa sólo valores numéricos. Sin espacios ni guiones.'}
                type='tel'
                value={phoneValue}
            />
            <input
                className='form-inputs'
                maxLength={80}
                name='email'
                onChange={onChange}
                placeholder='Ingresa tu e-mail'
                required
                title={'Ingresa una dirección de correo electrónico válida. Ejemplo: nombre@mail.com'}
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