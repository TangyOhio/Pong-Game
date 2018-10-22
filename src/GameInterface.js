import React, { Component } from "react";

import GameCanvas from "./components/GameCanvas";
import GameControls from "./components/GameControls";
import HyperGame from "./components/HyperGame";

class GameInterface extends Component {
  state = {
    start: false,
    config: {}
  };

  // Callback function for the game menu,
  // sets state with what comes from the api
  updateGame = game => {
    this.setState({
      start: game.start,
      config: {
        maxScore: "maxScore" in game ? game.maxScore : 5,
        // Player 1 Stuff
        p1Color: game.p1Color,
        p1Width: parseInt(game.p1Width, 10),
        p1Height: parseInt(game.p1Height, 10),
        p1Vel: parseInt(game.p1Vel, 10),
        // Player 2 Stuff
        p2Color: game.p2Color,
        p2Width: parseInt(game.p2Width, 10),
        p2Height: parseInt(game.p2Height, 10),
        p2Vel: parseInt(game.p2Vel, 10),
        // Ball Stuff
        ballColor: game.ballColor,
        ballWidth: parseInt(game.ballWidth, 10),
        ballHeight: parseInt(game.ballHeight, 10),
        velX: parseInt(game.ballVel, 10),
        velY: parseInt(game.ballVel, 10)
      }
    });
  };

  // Callback function for the endGame in the game canvas
  endGame = () => {
    this.setState({
      start: false
    });
  };

  render() {
    const { start, config } = this.state;

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
          <HyperGame callback={this.updateGame} start={start} />
          <GameCanvas start={start} config={config} callback={this.endGame} />
          <GameControls callback={this.updateGame} />
        </section>
      </main>
    );
  }
}

export default GameInterface;
