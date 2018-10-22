import React from "react";

class GameControls extends React.Component {
  // The default for the game
  defaultValues = {
    maxScore: 5,
    p1Color: "#0d25d5",
    p1Width: 15,
    p1Height: 80,
    p1Vel: 2,
    p2Color: "#dc1408",
    p2Width: 15,
    p2Height: 80,
    p2Vel: 2,
    ballColor: "#dc1408",
    ballWidth: 15,
    ballHeight: 15,
    velX: 1,
    velY: 1
  };
  state = { ...this.defaultValues };

  // When the form is submitted, don't refresh, then send the
  // info to the parent for unloading and instantiating the game
  handleSubmit = e => {
    e.preventDefault();
    let game = { start: true, ...this.state };
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
      <article style={{ textAlign: "center" }}>
        <form onSubmit={this.handleSubmit}>
          Score to Win
          <input
            type="number"
            id="maxScore"
            defaultValue={this.state.maxScore}
            min={1}
            onChange={this.handleChange}
          />
          <br />
          Player 1 Color
          <input
            type="color"
            id="p1Color"
            value={this.state.p1Color}
            onChange={this.handleChange}
          />
          Height
          <input
            type="number"
            id="p1Height"
            defaultValue={this.state.p1Height}
            min={10}
            max={300}
            onChange={this.handleChange}
          />
          Width
          <input
            type="number"
            id="p1Width"
            defaultValue={this.state.p1Width}
            min={1}
            max={100}
            onChange={this.handleChange}
          />
          Speed
          <input
            type="range"
            id="p1Vel"
            min={1}
            max={3}
            defaultValue={1}
            onChange={this.handleChange}
          />
          <br />
          Player 2 Color
          <input
            type="color"
            id="p2Color"
            value={this.state.p2Color}
            onChange={this.handleChange}
          />
          Height
          <input
            type="number"
            id="p2Height"
            defaultValue={this.state.p2Height}
            min={10}
            max={300}
            onChange={this.handleChange}
          />
          Width
          <input
            type="number"
            id="p2Width"
            defaultValue={this.state.p2Width}
            min={1}
            max={100}
            onChange={this.handleChange}
          />
          Speed
          <input
            type="range"
            id="p2Vel"
            min={1}
            max={3}
            defaultValue={1}
            onChange={this.handleChange}
          />
          <br />
          Ball Color
          <input
            type="color"
            id="ballColor"
            value={this.state.ballColor}
            onChange={this.handleChange}
          />
          Height
          <input
            type="number"
            id="ballHeight"
            defaultValue={this.state.ballHeight}
            min={1}
            max={50}
            onChange={this.handleChange}
          />
          Width
          <input
            type="number"
            id="ballWidth"
            defaultValue={this.state.ballWidth}
            min={1}
            max={50}
            onChange={this.handleChange}
          />
          Speed X
          <input
            type="range"
            id="velX"
            min={1}
            max={3}
            defaultValue={1}
            onChange={this.handleChange}
          />
          Y
          <input
            type="range"
            id="velY"
            min={1}
            max={3}
            defaultValue={1}
            onChange={this.handleChange}
          />
          <br />
          <input type="submit" value="New Game" />
        </form>
      </article>
    );
  }
}

export default GameControls;
