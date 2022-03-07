import React from 'react';
import PropTypes from 'prop-types';

class InputText extends React.Component {
  render() {
    const { className, name, type, id, testId, label, value, onInputChange } = this.props;
    return (
      <label className="label" htmlFor={ id }>
        { label }
        <input
          className={ className }
          value={ value }
          onChange={ onInputChange }
          name={ name }
          type={ type }
          data-testid={ testId }
          id={ id }
        />
      </label>
    );
  }
}

InputText.propTypes = {
  className: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

InputText.defaultProps = {
  type: 'text',
  label: null,
};

export default InputText;
