import React from 'react';
import PropTypes from 'prop-types';
import BackCard from './BackCard';
import Card from './Card';
import '../GamePlay.css';

class GamePlay extends React.Component {
  constructor() {
    super();
    this.state = {
      index: null,
      display: true,
      gameSarted: false,
      cardGames: [],
      gameFinished: false,
    };
  }

  startGame = () => {
    const { savedCards } = this.props;
    const random = 0.5;
    this.setState({
      index: 0,
      gameSarted: true,
      cardGames: savedCards.sort(() => Math.random() - random),
      display: false,
    });
  }

  restartGame = () => {
    this.setState({
      gameSarted: false,
      gameFinished: false,
    });
  }

  nextCard = () => {
    const { index, cardGames } = this.state;
    if (index === cardGames.length - 1) {
      this.setState({ gameFinished: true,
        index: null,
        display: true });
    } else {
      this.setState((prevSt) => ({
        index: prevSt.index + 1,
      }));
    }
  }

  render() {
    const { savedCards } = this.props;
    const { gameFinished, index, display, cardGames, gameSarted } = this.state;
    const leftCards = (savedCards.length - 1) - index;
    return (
      <section className="game-sect">
        {!gameSarted
          && <button onClick={ this.startGame } type="button">Start game</button>}
        {gameFinished
          && <button onClick={ this.restartGame } type="button">Replay</button>}
        <section className="game-cards-sect">
          <section className="curr-card">
            <Card { ...cardGames[index] } />
            <button
              type="button"
              onClick={ this.nextCard }
              disabled={ display }
            >
              Next card
            </button>
          </section>
          <section className="deck-sect">
            <BackCard />
            <p className="leftCards">{ `You have ${leftCards} left` }</p>
          </section>
        </section>
      </section>
    );
  }
}

GamePlay.propTypes = {
  savedCards: PropTypes.arrayOf(
    PropTypes.shape({
      cardName: PropTypes.string,
      cardDescription: PropTypes.string,
      cardAttr1: PropTypes.string,
      cardAttr2: PropTypes.string,
      cardAttr3: PropTypes.string,
      cardImage: PropTypes.string,
      cardRare: PropTypes.string,
      cardTrunfo: PropTypes.bool,
    }),
  ).isRequired,
};

export default GamePlay;
