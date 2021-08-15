import React from 'react';
import Square from './Square'

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(25).fill(null),
      mistakes: 0,
      puzzle: Array(25).fill(false),
      guesses: Array(25).fill(false)
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.newPuzzle()
  }

  toIndex(row, column) {
    return row * 5 + column
  }

  newPuzzle() {
    // console.log('new game')
    let mistakes = this.state.mistakes
    let puzzle = this.state.puzzle
    let guesses = this.state.guesses
    this.setState({mistakes: 0});
    this.setState({puzzle: (Array.from(Array(25), () => Math.random(1)<0.5))});
    this.setState({guesses: (Array.from(Array(25).fill(false)))})
  }

  handleClick(event, row, column) {
    console.log(this.state)
    let i = this.toIndex(row, column)
    let squares = this.state.squares

    // if there is no guess at index
    if (!this.state.guesses[i]) {
      let guesses = this.state.guesses
      let mistakes = this.state.mistakes

    //if left click
      if (event.button === 0) {
        if (this.state.puzzle[i]) {
          guesses[i] = 'o'
          squares[i] = '\u25A9'
          this.setState({squares: squares})
        } else {
          guesses[i] = 'x'
          squares[i] = 'x'
          this.setState({mistakes: mistakes+1})
        }
      // if right click
      } else if (event.button === 2) {
        event.preventDefault();
        if (!this.state.puzzle[i]) {
          guesses[i] = 'o'
          squares[i] = 'x'
        } else {
          guesses[i] = 'x'
          squares[i] = '\u25A9'
          this.setState({mistakes: mistakes+1})
        }
      }
    }
}

  handleSubmit(evt) {
    evt.preventDefault();
    this.newPuzzle()
  }

  createCluesRow(row) {
    return 1
    // console.log(row)
    let rowArr = []

    for (let i = 0; i < 5; i++){
      rowArr.push(this.state.puzzle[row + i])
    }
    // console.log(rowArr)
    let clueArr = [];
    let counter = 0;

    for (let j = 0; j < 5; j++) {
      if (rowArr[j] === true) {
        // console.log(rowArr[j])
        counter++

      } else {
        clueArr.push(counter)
        counter = 0
      }

      // console.log (clueArr)
      return clueArr
    }
  }

  render() {
    const { handleClick, handleSubmit } = this
    let rows = [(
      <tr key={0} className="column">
        <td></td>
        {Array.from(Array(5), () => 1)}
      </tr>
    )]

    for (let row = 0; row < 5; row++) {
      rows.push(
        <tr key={row + 1}>
          {this.createCluesRow(row)}
          {/* <Clues
            key={'cr' + row}
            orientation='row'
            index={row}
            puzzle={this.props.puzzle}
            guesses={this.props.guesses}
          /> */}
          { Array.from(Array(5), (_, column) => (
              <Square
                key={row + ',' + column}
                guess={this.state.guesses[this.toIndex(row, column)]}
                onClick={(event) => handleClick(event, row, column)}
                onContextMenu={(event) => handleClick(event, row, column)}
                value={this.state.squares[row * 5 + column]}
              />
            ))
          }
        </tr>
      );
    }
    return (
      <div>
        <div>
          <table className="puzzle">
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
        <div>
          <button className="newGameButton" onClick={handleSubmit}>
            New Game
          </button>
          <br />
          Mistakes: {this.state.mistakes}
        </div>
      </div>
    )
  }
}
