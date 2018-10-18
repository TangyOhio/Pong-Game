import React, { Component } from "react";

import GameCanvas from "./components/GameCanvas";
import GameControls from "./components/GameControls";

class GameInterface extends Component {
  state = {
    start: false,
    maxScore: 5,
    ballVel: 1,
    p1Color: "#fff",
    p2Color: "#fff",
    ballColor: "red"
  };

  updateGame = game => {
    this.setState({
      start: true,
      maxScore: parseInt(game.maxScore),
      ballVel: parseInt(game.ballVel),
      p1Color: game.p1Color,
      p2Color: game.p2Color,
      ballColor: game.ballColor
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
          />
          <GameControls callback={this.updateGame} />
        </section>
      </main>
    );
  }
}

export default GameInterface;
