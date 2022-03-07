import React from 'react';
import PropTypes from 'prop-types';
import InputText from './InputText';
import RaritySelect from './RaritySelect';

class Form extends React.Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
    } = this.props;
    return (
      <form>
        <InputText
          className="input2"
          name="cardName"
          id="name-input"
          testId="name-input"
          label="Name:"
          onInputChange={ onInputChange }
          value={ cardName }
        />
        <label className="label" htmlFor="description">
          Description:
          <textarea
            className="textarea"
            name="cardDescription"
            id="description"
            data-testid="description-input"
            onChange={ onInputChange }
            value={ cardDescription }
          />
        </label>
        <section className="attr-sect">
          <InputText
            className="attr"
            name="cardAttr1"
            type="number"
            id="attr1"
            testId="attr1-input"
            label="Attribute 1: "
            onInputChange={ onInputChange }
            value={ cardAttr1 }
          />
          <InputText
            className="attr"
            name="cardAttr2"
            type="number"
            id="attr2"
            testId="attr2-input"
            label="Attribute 2: "
            onInputChange={ onInputChange }
            value={ cardAttr2 }
          />
          <InputText
            className="attr"
            name="cardAttr3"
            type="number"
            id="attr3"
            testId="attr3-input"
            label="Attribute 3: "
            onInputChange={ onInputChange }
            value={ cardAttr3 }
          />
        </section>
        <InputText
          className="input2"
          name="cardImage"
          id="image-url"
          testId="image-input"
          label="Image: "
          onInputChange={ onInputChange }
          value={ cardImage }
        />
        <RaritySelect
          className="select2"
          onInputChange={ onInputChange }
          value={ cardRare }
        />
        {hasTrunfo ? (
          <p>Você já tem um Super Trunfo em seu baralho</p>
        ) : (
          <label className="label" htmlFor="special">
            <input
              className="checkbox2"
              type="checkbox"
              name="cardTrunfo"
              id="special"
              data-testid="trunfo-input"
              onChange={ onInputChange }
              checked={ cardTrunfo }
            />
            Super Trybe Trunfo
          </label>
        )}
        <button
          className="save-btn"
          type="submit"
          data-testid="save-button"
          disabled={ isSaveButtonDisabled }
          onClick={ onSaveButtonClick }
        >
          Save
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};

export default Form;
