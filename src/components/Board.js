import React from 'react';
import Square from './Square'
import Clues from './Clues'

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

    // if there is no guess at index
    if (!this.state.guesses[i]) {
      let guesses = this.state.guesses
      let mistakes = this.state.mistakes

    //if left click
      if (event.button === 0) {
        console.log('made it to left click')
        if (this.state.puzzle[i]) {
          console.log('should change guess')
          guesses[i] = 'o'
        } else {
          guesses[i] = 'x'
          this.setState({mistakes: mistakes+1})
          console.log('should be a mistake')
        }
      // if right click
      } else if (event.button === 2) {
        console.log('made it to right click')
        event.preventDefault();
        if (!this.state.puzzle[i]) {
          guesses[i] = 'o'
        } else {
          guesses[i] = 'x'
          this.setState({mistakes: mistakes+1})
        }
      }
    }
}

  handleSubmit(evt) {
    evt.preventDefault();
    this.newPuzzle()
  }
    //   "\u25A9";

  render() {
    const { handleClick, handleSubmit } = this
    let rows = [(
      <tr key={0}>
        <td></td>
        { Array.from(Array(5), (_, column) => (
          <Clues
            key={'cc' + column}
            orientation = 'columns'
            index={column}
            puzzle={this.props.puzzle}
            guesses={this.props.guesses}
            />
        ))
        }
      </tr>
    )]

    for (let row = 0; row < 5; row++) {
      rows.push(
        <tr key={row + 1}>
          <Clues
            key={'cr' + row}
            orientation='row'
            index={row}
            puzzle={this.props.puzzle}
            guesses={this.props.guesses}
          />
          { Array.from(Array(5), (_, column) => (
              <Square
                key={row + ',' + column}
                box={this.state.puzzle[this.toIndex(row, column)]}
                guess={this.state.guesses[this.toIndex(row, column)]}
                onClick={(event) => handleClick(event, row, column)}
                onContextMenu={(event) => handleClick(event, row, column)}
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
          Mistakes: {this.state.mistakes}
        </div>
      </div>
    )
  }
}
