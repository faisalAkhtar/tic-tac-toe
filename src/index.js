import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      isNext: true
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares || squares[i])) {
      return;
    }
    if (squares[i] != null) {
      return;
    }
    squares[i] = this.state.isNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      isNext: !this.state.isNext
    });
  }

  restart() {
    window.location.reload(false)
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares)
    let status, sel;
    if (winner) {
      if (winner === 'I') {
        status = 'Game Draw'
        sel = null
      } else {
        status = 'Winner: '
        sel = winner
      }
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}{this.renderSquare(1)}{this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}{this.renderSquare(4)}{this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}{this.renderSquare(7)}{this.renderSquare(8)}
          </div>
          <div className="status">{status} <span>{sel}</span></div>
          <button class="restart" onClick={() => this.restart()}>Restart</button>
        </div>
      );
    } else {
      status = 'Next player: ';
      sel = (this.state.isNext ? 'X' : 'O')
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}{this.renderSquare(1)}{this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}{this.renderSquare(4)}{this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}{this.renderSquare(7)}{this.renderSquare(8)}
          </div>
          <div className="status">{status} <span>{sel}</span></div>
        </div>
      );
    }
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game-board">
        <Board />
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  let nFlag = false;
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] == null) nFlag = true;
  }
  if (!nFlag) return 'I';

  return null;
}
