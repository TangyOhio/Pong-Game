import React from "react";
import axios from "axios";

class HyperGame extends React.Component {
  state = { counter: 1 };
  hyper = () => {
    axios
      .get("https://wwwforms.suralink.com/pong.php?accessToken=pingPONG")
      .then(
        res => {
          let {
            data: { gameData }
          } = res;
          this.delay = gameData.newDelay;
          // This code is really messy, but really weird values got through
          // when I didn't set defaults
          let game = {
            // Player 1 Stuff
            p1Color:
              "color" in gameData.paddle1
                ? gameData.paddle1.color.hex
                : "#0d25d5",
            p1Width:
              "width" in gameData.paddle1
                ? parseInt(gameData.paddle1.width, 10)
                : 15,
            p1Height:
              "height" in gameData.paddle1
                ? parseInt(gameData.paddle1.height, 10)
                : 80,
            p1Vel:
              "velocityY" in gameData.paddle1
                ? parseInt(gameData.paddle1.velocityY, 10)
                : 2,
            // Player 2 Stuff
            p2Color:
              "color" in gameData.paddle2
                ? gameData.paddle2.color.hex
                : "#dc1408",
            p2Width:
              "width" in gameData.paddle2
                ? parseInt(gameData.paddle2.width, 10)
                : 15,
            p2Height:
              "height" in gameData.paddle2
                ? parseInt(gameData.paddle2.height, 10)
                : 80,
            p2Vel:
              "velocityY" in gameData.paddle2
                ? parseInt(gameData.paddle2.velocityY, 10)
                : 2,
            // Ball Stuff
            ballColor:
              "color" in gameData.ball ? gameData.ball.color.hex : "#dc1408",
            ballWidth:
              "width" in gameData.ball ? parseInt(gameData.ball.width, 10) : 15,
            ballHeight:
              "height" in gameData.ball
                ? parseInt(gameData.ball.height, 10)
                : 15,
            velX:
              "velocityX" in gameData.ball
                ? parseInt(gameData.ball.velocityX, 10)
                : 15,
            velY:
              "velocityY" in gameData.ball
                ? parseInt(gameData.ball.velocityY, 10)
                : 15
          };
          this.setupGame(game);
        },
        err => {
          console.log(err);
        }
      );
  };

  setupGame = game => {
    if (this.state.counter === 1) {
      // console.log(`Start New Game with timer of ${this.delay}`);
      let newGame = { ...game, start: true };
      this.props.callback(newGame);
      this.setState({ counter: 2 });
      this.timer = setTimeout(this.hyper, this.delay);
    } else if (this.state.counter === 2) {
      if (this.props.start) {
        // console.log(`Update Game because ${this.props.start}`);
        // console.log(game);
        this.timer = setTimeout(this.hyper, this.delay);
        // this.props.callback(game);
      } else {
        // console.log("End Timer Loop");
        clearTimeout(this.timer);
        this.setState({ counter: 1 });
      }
    } else {
      console.log("You broke it");
    }
  };

  render() {
    // console.log(this.props.start);
    return <input type="button" value="Hyper Mode" onClick={this.hyper} />;
  }
}

export default HyperGame;
