import React from 'react';
import Form from './components/Form';
import Card from './components/Card';
import NewCard from './components/NewCard';
import './App.css';
import GamePlay from './components/GamePlay';

const cleanState = {
  cardName: '',
  cardDescription: '',
  cardAttr1: '0',
  cardAttr2: '0',
  cardAttr3: '0',
  cardImage: '',
  cardRare: 'normal',
  cardTrunfo: false,
  hasTrunfo: false,
  isSaveButtonDisabled: true,
  nameFilter: '',
  rareFilter: '',
  trufoFilter: false,
  disableField: false,
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
      savedCards: [],
      filteredCards: [],
      nameFilter: '',
      rareFilter: '',
      trunfoFilter: false,
      disableField: false,
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.isSaveButtonDisabled = this.isSaveButtonDisabled.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.filterCards = this.filterCards.bind(this);
    this.saveStorage = this.saveStorage.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem('cardGame')) {
      const game = JSON.parse(localStorage.getItem('cardGame'));
      const trunfo = game.some((item) => item.cardTrunfo);
      this.saveStorage(game, trunfo);
    }
  }

  onInputChange({ target }) {
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value },
      () => this.isSaveButtonDisabled());
  }

  onSaveButtonClick(event) {
    event.preventDefault();
    const { savedCards } = this.state;
    const randomBase = 100;
    const card = {
      ...this.state,
      id1: Math.random() * randomBase,
      id2: Math.random() * randomBase,
    };
    const cards = [...savedCards, card];
    this.setState(cleanState, () => {
      this.setState({
        hasTrunfo: cards.some((item) => item.cardTrunfo),
        savedCards: cards,
        filteredCards: cards,
      });
      localStorage.setItem('cardGame', JSON.stringify(cards));
    });
  }

  saveStorage(game, trunfo) {
    this.setState({
      savedCards: game, filteredCards: game, hasTrunfo: trunfo,
    });
  }

  isSaveButtonDisabled() {
    const { cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3,
      cardImage, cardRare } = this.state;
    let disable = true;
    const maxAttrSum = 210;
    const maxAttr = 90;
    const attrs = [parseInt(cardAttr1, 10),
      parseInt(cardAttr2, 10),
      parseInt(cardAttr3, 10)];
    const isAttrsValid = attrs
      .every((attr) => attr <= maxAttr && attr > 0)
      && (attrs.reduce((acc, attr) => acc + attr) <= maxAttrSum);
    const fields = [cardName, cardDescription, cardImage, cardRare];
    const areFieldsNotEmpty = fields.every((field) => field !== '');
    if (isAttrsValid && areFieldsNotEmpty) disable = false;
    this.setState({
      isSaveButtonDisabled: disable,
    });
  }

  deleteCard(card) {
    const { savedCards } = this.state;
    const newCards = savedCards.filter((item) => item.id1 !== card.id1);
    const trunfo = card.cardTrunfo;
    this.setState({
      hasTrunfo: !trunfo,
      savedCards: newCards,
      filteredCards: newCards,
    });
    localStorage.setItem('cardGame', JSON.stringify(newCards));
    console.log(savedCards);
  }

  filterCards({ target }) {
    const { name, type } = target;
    let value = type === 'checkbox' ? (target.checked) : target.value;
    if (value === '') value = undefined;
    this.setState({
      [name]: value === 'todas' ? '' : value,
      disableField: target.checked,
    }, () => {
      const { savedCards, nameFilter, rareFilter, trunfoFilter } = this.state;
      let cardsFilter = savedCards;
      if (trunfoFilter) {
        cardsFilter = savedCards.filter((item) => item.cardTrunfo);
      } else if (nameFilter && rareFilter) {
        cardsFilter = savedCards.filter((item) => item.cardName.includes(nameFilter)
          && item.cardRare === rareFilter);
      } else if (nameFilter) {
        cardsFilter = savedCards.filter((item) => item.cardName.includes(nameFilter));
      } else if (rareFilter) {
        cardsFilter = savedCards.filter((item) => item.cardRare === rareFilter);
      }
      this.setState({
        filteredCards: cardsFilter,
      });
    });
  }

  render() {
    const { filteredCards, disableField, savedCards } = this.state;
    return (
      <div className="pai-de-todos">
        <h1 className="page-title">Tryunfo</h1>
        <section className="form-parent">
          <Form
            { ...this.state }
            onInputChange={ this.onInputChange }
            onSaveButtonClick={ this.onSaveButtonClick }
          />
          <Card { ...this.state } />
        </section>
        <h1 className="page-title">All cards</h1>
        <section className="saved-sect">
          <section className="filters">
            <h2 className="search-title">Search filters</h2>
            <input
              className="input"
              type="text"
              name="nameFilter"
              data-testid="name-filter"
              placeholder="Card Name"
              onChange={ this.filterCards }
              disabled={ disableField }
            />
            <select
              className="select"
              name="rareFilter"
              data-testid="rare-filter"
              onChange={ this.filterCards }
              disabled={ disableField }
            >
              <option value="todas">Todas</option>
              <option value="normal">Normal</option>
              <option value="raro">Raro</option>
              <option value="muito raro">Muito raro</option>
            </select>
            <label className="checkbox-label" htmlFor="trunfo-filter">
              <input
                className="checkbox"
                type="checkbox"
                id="trunfo-filter"
                name="trunfoFilter"
                data-testid="trunfo-filter"
                onChange={ this.filterCards }
              />
              Super Trybe Trunfo
            </label>
            <p>{`You have ${savedCards.length} cards in your deck`}</p>
          </section>
          <section className="saved-cards">
            {filteredCards.map((card) => (
              <NewCard
                key={ card.id1 }
                value={ card }
                deleteCard={ () => this.deleteCard(card) }
              />
            ))}
          </section>
        </section>
        <section>
          <GamePlay savedCards={ savedCards } />
        </section>
      </div>
    );
  }
}

export default App;
