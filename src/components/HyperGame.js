import React from "react";
import axios from "axios";

class HyperGame extends React.Component {
  hyper = () => {
    axios
      .get("https://wwwforms.suralink.com/pong.php?accessToken=pingPONG")
      .then(
        res => {
          console.log(res.data.gameData);
          let {
            data: { gameData }
          } = res;
          let game = {
            // Player 1 Stuff
            p1Color:
              "color" in gameData.paddle1
                ? gameData.paddle1.color.hex
                : "#0d25d5",
            p1Width: parseInt(gameData.paddle1.width, 10),
            p1Height: parseInt(gameData.paddle1.height, 10),
            p1Vel: parseInt(gameData.paddle1.velocityY, 10),
            // Player 2 Stuff
            p2Color:
              "color" in gameData.paddle1
                ? gameData.paddle1.color.hex
                : "#dc1408",
            p2Width: parseInt(gameData.paddle2.width, 10),
            p2Height: parseInt(gameData.paddle2.height, 10),
            p2Vel: parseInt(gameData.paddle2.velocityY, 10),
            // Ball Stuff
            ballColor:
              "color" in gameData.paddle1
                ? gameData.paddle1.color.hex
                : "#dc1408",
            ballWidth: parseInt(gameData.ball.width, 10),
            ballHeight: parseInt(gameData.ball.height, 10),
            velX: parseInt(gameData.ball.velocityX, 10),
            velY: parseInt(gameData.ball.velocityY, 10)
          };
          console.log(game);
          this.props.callback(game);
        },
        err => {
          console.log(err);
        }
      );
  };

  render() {
    return <input type="button" value="Hyper Mode" onClick={this.hyper} />;
  }
}

export default HyperGame;
