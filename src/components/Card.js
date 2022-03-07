import React from 'react';
import PropTypes from 'prop-types';

class Card extends React.Component {
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
    } = this.props;
    return (
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
          <p className="card-desc" data-testid="description-card">{ cardDescription }</p>
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
    );
  }
}

Card.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
};

export default Card;
