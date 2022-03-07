import React from 'react';
import PropTypes from 'prop-types';

class NewCard extends React.Component {
  render() {
    const {
      value: {
        cardName,
        cardDescription,
        cardAttr1,
        cardAttr2,
        cardAttr3,
        cardImage,
        cardRare,
        cardTrunfo,
      },
      deleteCard,
    } = this.props;
    return (
      <section className="eachCard">
        <section className="card">
          <section className="name-sect">
            <h2 className="card-name" data-testid="name-card">{ cardName }</h2>
          </section>
          <section className="image-sect">
            <img
              className="image"
              src={ cardImage }
              alt={ cardName }
              data-testid="image-card"
            />
          </section>
          <section className="desc-sect">
            <p
              className="card-desc"
              data-testid="description-card"
            >
              { cardDescription }
            </p>
          </section>
          <ul className="list">
            <li className="card-attr" data-testid="attr1-card">{ cardAttr1 }</li>
            <li className="card-attr" data-testid="attr2-card">{ cardAttr2 }</li>
            <li className="card-attr" data-testid="attr3-card">{ cardAttr3 }</li>
          </ul>
          <p className="rarity" data-testid="rare-card">{ cardRare }</p>
          {cardTrunfo
            && <p className="super-trunfo" data-testid="trunfo-card">Super Trunfo</p>}
        </section>
        <button
          className="close-btn"
          onClick={ deleteCard }
          type="button"
          data-testid="delete-button"
        >
          Excluir
        </button>
      </section>
    );
  }
}

NewCard.propTypes = {
  value: PropTypes.shape({
    cardName: PropTypes.string,
    cardDescription: PropTypes.string,
    cardAttr1: PropTypes.string,
    cardAttr2: PropTypes.string,
    cardAttr3: PropTypes.string,
    cardImage: PropTypes.string,
    cardRare: PropTypes.string,
    cardTrunfo: PropTypes.bool,
  }).isRequired,
  deleteCard: PropTypes.func.isRequired,
};

export default NewCard;
