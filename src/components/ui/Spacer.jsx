import PropTypes from 'prop-types';

const Spacer = ({ value }) => {

    return (
        <div style={{ margin: value + '%' }} />
    );
}

Spacer.propTypes = { value: PropTypes.number }

export default Spacer;