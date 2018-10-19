import React, { Component } from "react";

import GameCanvas from "./components/GameCanvas";
import GameControls from "./components/GameControls";

class GameInterface extends Component {
  // Default Game stats
  state = {
    start: false,
    maxScore: 5,
    ballVel: 1,
    p1Color: "#0d25d5",
    p2Color: "#dc1408",
    ballColor: "#dc1408"
  };

  // Callback function for the game controls, to set the state
  updateGame = game => {
    this.setState({
      start: true,
      maxScore: parseInt(game.maxScore, 10),
      ballVel: parseInt(game.ballVel, 10),
      p1Color: game.p1Color,
      p2Color: game.p2Color,
      ballColor: game.ballColor
    });
  };

  // Callback function for the endGame in the game canvas
  // It's not optimal to hard code start in this function and the one above,
  // but I haven't run into a problem with this implementation
  endGame = () => {
    this.setState({
      start: false
    });
  };

  render() {
    const {
      start,
      maxScore,
      ballVel,
      p1Color,
      p2Color,
      ballColor
    } = this.state;

    return (
      <main
        style={{
          width: "100vw",
          height: "100vh",
          background: "#000",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <GameCanvas
            start={start}
            maxScore={maxScore}
            ballVel={ballVel}
            p1Color={p1Color}
            p2Color={p2Color}
            ballColor={ballColor}
            callback={this.endGame}
          />
          <GameControls callback={this.updateGame} />
        </section>
      </main>
    );
  }
}

export default GameInterface;