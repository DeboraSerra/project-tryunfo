import React from 'react';
import PropTypes from 'prop-types';

class RaritySelect extends React.Component {
  render() {
    const { value, onInputChange } = this.props;
    return (
      <label className="label" htmlFor="rarity">
        Rarity:
        <select
          className="select2"
          name="cardRare"
          id="rarity"
          data-testid="rare-input"
          value={ value }
          onChange={ onInputChange }
        >
          <option value="normal">Normal</option>
          <option value="raro">Raro</option>
          <option value="muito raro">Muito raro</option>
        </select>
      </label>
    );
  }
}

RaritySelect.propTypes = {
  value: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default RaritySelect;
