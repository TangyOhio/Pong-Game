import React from "react";

class GameControls extends React.Component {
  // The default for the game, would be more efficient to set the GameInterface state from here as well
  defaultValues = {
    maxScore: 5,
    ballVel: 1,
    p1Color: "#0d25d5",
    p2Color: "#dc1408",
    ballColor: "#dc1408"
  };
  state = { ...this.defaultValues };

  // When the form is submitted, don't refresh, then send the info to the parent for unloading and instantiating the game
  handleSubmit = e => {
    e.preventDefault();
    let game = { ...this.state };
    this.props.callback(game);
  };

  // Update state to be whatever the user inputs
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
          <input
            type="color"
            id="p1Color"
            value={this.state.p1Color}
            onChange={this.handleChange}
          />
          Player 2 Color
          <input
            type="color"
            id="p2Color"
            value={this.state.p2Color}
            onChange={this.handleChange}
          />
          Ball Color
          <input
            type="color"
            id="ballColor"
            value={this.state.p2Color}
            onChange={this.handleChange}
          />
          <input type="submit" value="New Game" />
        </form>
      </article>
    );
  }
}

export default GameControls;
