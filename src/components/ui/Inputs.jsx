import PropTypes from 'prop-types';

export const FormInputs = ({ emailValue, firstNameValue, lastNameValue, onChange, phoneValue }) => {

    const formClass = 'relative text-left text-squid-ink w-full mb-[5%] p-[2%] focus:placeholder:bg-azure focus:placeholder:text-transparent focus:placeholder:-m-[5%] focus:placeholder:p-[5%] rounded-lg border border-solid border-tomato-sauce'

    return (
        <div className='inputs'>
            <h1 className='text-center text-base text-tomato-sauce font-roboto font-medium first-letter:uppercase m-0 p-[5%]'>completa tus datos</h1>
            <input
                className={formClass}
                name='firstName'
                onChange={onChange}
                pattern='([a-zA-ZÀ-ž\s]+){2,}'
                placeholder='Ingresa tu nombre'
                required
                title='Ingresa sólo valores alfabéticos. Ejemplo: Juan'
                type='text'
                value={firstNameValue}
            />
            <input
                className={formClass}
                name='lastName'
                onChange={onChange}
                pattern='([a-zA-ZÀ-ž\s]+){2,}'
                placeholder='Ingresa tu apellido'
                required
                title='Ingresa sólo valores alfabéticos. Ejemplo: Pérez'
                type='text'
                value={lastNameValue}
            />
            <input
                className={formClass}
                name='phone'
                onChange={onChange}
                pattern='^[+]?[0123456789]\d{8,20}$'
                placeholder='Ingresa tu teléfono'
                required
                title='Ingresa sólo valores numéricos. Sin espacios ni guiones.'
                type='tel'
                value={phoneValue}
            />
            <input
                className={formClass}
                maxLength={80}
                name='email'
                onChange={onChange}
                placeholder='Ingresa tu e-mail'
                required
                title='Ingresa una dirección de correo electrónico válida. Ejemplo: nombre@mail.com'
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
    phoneValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export const SearchInput = ({ className, label, name, onChange, placeholder, type, value }) => {

    return (
        <div className={className}>
            <label className='font-medium px-2' htmlFor={name}>{label}</label>
            <input id={name} name={name} onChange={onChange} placeholder={placeholder} type={type} value={value} />
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