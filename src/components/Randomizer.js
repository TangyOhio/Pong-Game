import React from "react";

class Randomizer extends React.Component {
  // Just assign a random value to everything
  random = () => {
    let game = {
      start: true,
      maxScore: Math.ceil(Math.random() * 10),
      p1Color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      p1Width: Math.ceil(Math.random() * 150) + 5,
      p1Height: Math.ceil(Math.random() * 250) + 10,
      p1Vel: Math.ceil(Math.random() * 10),
      p2Color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      p2Width: Math.ceil(Math.random() * 150) + 5,
      p2Height: Math.ceil(Math.random() * 250) + 10,
      p2Vel: Math.ceil(Math.random() * 10),
      ballColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      ballWidth: Math.ceil(Math.random() * 50) + 5,
      ballHeight: Math.ceil(Math.random() * 50) + 5,
      velX: Math.ceil(Math.random() * 10),
      velY: Math.ceil(Math.random() * 10)
    };
    this.props.callback(game);
  };

  render() {
    return <input type="button" value="Random Mode" onClick={this.random} />;
  }
}

export default Randomizer;
