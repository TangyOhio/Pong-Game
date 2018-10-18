import React from "react";

class GameControls extends React.Component {
  defaultValues = {
    maxScore: 5,
    ballVel: 1,
    p1Color: "#fff",
    p2Color: "#fff",
    ballColor: "red"
  };
  state = { ...this.defaultValues };

  handleSubmit = e => {
    e.preventDefault();
    let game = { ...this.state };
    this.props.callback(game);
  };

  handleChange = e => {
    let {
      target: { id, value }
    } = e;
    this.setState({ [id]: value });
  };

  render() {
    return (
      <article>
        <form onSubmit={this.handleSubmit}>
          Score to Win
          <input
            type="number"
            id="maxScore"
            defaultValue={this.state.maxScore}
            min={1}
            onChange={this.handleChange}
          />
          Ball Speed 1
          <input
            type="radio"
            id="ballVel"
            value={1}
            checked={this.state.ballVel == 1}
            onChange={this.handleChange}
          />
          2
          <input
            type="radio"
            id="ballVel"
            value={2}
            checked={this.state.ballVel == 2}
            onChange={this.handleChange}
          />
          3
          <input
            type="radio"
            id="ballVel"
            value={3}
            checked={this.state.ballVel == 3}
            onChange={this.handleChange}
          />
          Player 1 Color
          <input type="color" id="p1Color" onChange={this.handleChange} />
          Player 2 Color
          <input type="color" id="p2Color" onChange={this.handleChange} />
          Ball Color
          <input type="color" id="ballColor" onChange={this.handleChange} />
          <input type="submit" value="New Game" />
        </form>
      </article>
    );
  }
}

export default GameControls;
