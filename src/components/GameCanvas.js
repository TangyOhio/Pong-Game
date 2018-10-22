import React, { Component } from "react";

class GameCanvas extends Component {
  constructor() {
    super();
    this.deadBalls = [];
  }

  componentDidMount = () => {
    this._initializeGameCanvas();
  };

  // When the game ends or when in hyper mode, the game will
  // update a lot. If the game updates because it's over, it will
  // reinitalize the canvas. If it's hyper mode, configure the game
  componentDidUpdate = () => {
    if (
      this.p1Score >= this.props.config.maxScore ||
      this.p2Score >= this.props.config.maxScore
    ) {
      this._initializeGameCanvas();
    } else {
      this._configureGame(this.props.config);
    }
  };

  _initializeGameCanvas = () => {
    // initialize canvas element and bind it to our React class
    this.canvas = this.refs.pong_canvas;
    this.ctx = this.canvas.getContext("2d");

    // declare initial variables
    this.p1Score = 0;
    this.p2Score = 0;
    this.keys = {};

    // add keyboard input listeners to handle user interactions
    window.addEventListener("keydown", e => {
      this.keys[e.keyCode] = 1;
      if (e.target.nodeName !== "INPUT") e.preventDefault();
    });
    window.addEventListener("keyup", e => delete this.keys[e.keyCode]);
  };

  // I ripped this out so I could edit everything easier
  _configureGame = config => {
    // instantiate our game elements
    this.player1 = new this.GameClasses.Box({
      x: 10,
      y: 200,

      // I realize I went pretty heavy with checking everything in case they were undefined,
      // but I just wanted to be sure I didn't break it
      width: config.p1Width === undefined ? 15 : config.p1Width,
      height: config.p1Height === undefined ? 80 : config.p1Height,
      color: config.p1Color === undefined ? "#0d25d5" : config.p1Color,
      velocityY: config.p1Vel === undefined ? 2 : config.p1Vel
    });
    this.player2 = new this.GameClasses.Box({
      x: 725,
      y: 200,
      width: config.p2Width === undefined ? 15 : config.p2Width,
      height: config.p2Height === undefined ? 80 : config.p2Height,
      color: config.p2Color === undefined ? "#dc1408" : config.p2Color,
      velocityY: config.p2Vel === undefined ? 2 : config.p2Vel
    });
    this.boardDivider = new this.GameClasses.Box({
      x: this.canvas.width / 2 - 2.5,
      y: -1,
      width: 5,
      height: this.canvas.height + 1,
      color: "#FFF"
    });
    this.gameBall = new this.GameClasses.Box({
      x: this.canvas.width / 2,
      y: this.canvas.height / 2,
      width: config.ballWidth === undefined ? 15 : config.ballWidth,
      height: config.ballHeight === undefined ? 15 : config.ballHeight,
      // Setting the ball color to the same as the background is the best way to play
      color: config.ballColor === undefined ? "#dc1408" : config.ballColor,
      velocityX: config.velX === undefined ? 1 : config.velX,
      velocityY: config.velY === undefined ? 1 : config.velY
    });

    // start render loop
    this._renderLoop();
  };

  // recursively process game state and redraw canvas
  _renderLoop = () => {
    // Check if the game has ended
    this._endGame(this.p1Score, this.p2Score);

    // If the game hasn't ended, keep looping
    if (this.props.start) {
      this._ballCollisionY();
      this._userInput(this.player1);
      this._userInput(this.player2);
      this.frameId = window.requestAnimationFrame(this._renderLoop);
    }
  };

  // watch ball movement in Y dimension and handle top/bottom boundary collisions, then call _ballCollisionX
  _ballCollisionY = () => {
    if (
      this.gameBall.y + this.gameBall.velocityY <= 0 ||
      this.gameBall.y + this.gameBall.velocityY + this.gameBall.height >=
        this.canvas.height
    ) {
      this.gameBall.velocityY = this.gameBall.velocityY * -1;
      this.gameBall.x += this.gameBall.velocityX;
      this.gameBall.y += this.gameBall.velocityY;
    } else {
      this.gameBall.x += this.gameBall.velocityX;
      this.gameBall.y += this.gameBall.velocityY;
    }
    this._ballCollisionX();
  };

  // watch ball movement in X dimension and handle paddle collisions and score setting/ball resetting, then call _drawRender
  _ballCollisionX = () => {
    if (
      (this.gameBall.x + this.gameBall.velocityX <=
        this.player1.x + this.player1.width &&
        this.gameBall.y + this.gameBall.velocityY > this.player1.y &&
        this.gameBall.y + this.gameBall.velocityY <=
          this.player1.y + this.player1.height) ||
      (this.gameBall.x + this.gameBall.width + this.gameBall.velocityX >=
        this.player2.x &&
        this.gameBall.y + this.gameBall.velocityY > this.player2.y &&
        this.gameBall.y + this.gameBall.velocityY <=
          this.player2.y + this.player2.height)
    ) {
      this.gameBall.velocityX = this.gameBall.velocityX * -1;
    } else if (
      this.gameBall.x + this.gameBall.velocityX <
      this.player1.x - 15
    ) {
      this.p2Score += 1;
      this.deadBalls.push(this.gameBall);
      this.gameBall = new this.GameClasses.Box({
        x: this.canvas.width / 2,
        y: this.canvas.height / 2,
        width:
          this.props.config.ballWidth === undefined
            ? 15
            : this.props.config.ballWidth,
        height:
          this.props.config.ballHeight === undefined
            ? 15
            : this.props.config.ballHeight,
        color:
          this.props.config.ballColor === undefined
            ? "#dc1408"
            : this.props.config.ballColor,
        velocityX:
          this.props.config.velX === undefined ? 1 : this.props.config.velX,
        velocityY:
          this.props.config.velY === undefined ? 1 : this.props.config.velY
      });
    } else if (
      this.gameBall.x + this.gameBall.velocityX >
      this.player2.x + this.player2.width
    ) {
      this.p1Score += 1;
      this.deadBalls.push(this.gameBall);
      this.gameBall = new this.GameClasses.Box({
        x: this.canvas.width / 2,
        y: this.canvas.height / 2,
        width:
          this.props.config.ballWidth === undefined
            ? 15
            : this.props.config.ballWidth,
        height:
          this.props.config.ballHeight === undefined
            ? 15
            : this.props.config.ballHeight,
        color:
          this.props.config.ballColor === undefined
            ? "#dc1408"
            : this.props.config.ballColor,
        velocityX:
          this.props.config.velX === undefined ? -1 : -this.props.config.velX,
        velocityY:
          this.props.config.velY === undefined ? 1 : this.props.config.velY
      });
    } else {
      this.gameBall.x += this.gameBall.velocityX;
      this.gameBall.y += this.gameBall.velocityY;
    }

    this._drawRender();
  };

  // clear canvas and redraw according to new game state
  _drawRender = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this._displayScore1();
    this._displayScore2();
    this._drawBox(this.player1);
    this._drawBox(this.player2);
    this._drawBox(this.boardDivider);
    this._drawBox(this.gameBall);
  };

  // take in game object and draw to canvas
  _drawBox = box => {
    this.ctx.fillStyle = box.color;
    this.ctx.fillRect(box.x, box.y, box.width, box.height);
  };

  // render player 1 score
  _displayScore1 = () => {
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "rgb(255, 255, 255)";
    this.ctx.fillText(
      this.p1Score,
      this.canvas.width / 2 - (this.p1Score > 9 ? 55 : 45),
      30
    );
  };

  // render player 2 score
  _displayScore2 = () => {
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "rgb(255, 255, 255)";
    this.ctx.fillText(this.p2Score, this.canvas.width / 2 + 33, 30);
  };

  // If the player score meets the max score requirement, end the game
  _endGame = (p1, p2) => {
    if (p1 >= this.props.config.maxScore) {
      // End the game
      this.props.callback();
      // Clear canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      // Display the winner
      this.ctx.font = "50px Comic Sans";
      this.ctx.fillStyle = "rgb(255, 255, 255)";
      this.ctx.fillText(
        "Player 1 Wins!",
        this.canvas.width / 3,
        this.canvas.height / 2
      );
    } else if (p2 >= this.props.config.maxScore) {
      // Same as above, wet but effective ¯\_(ツ)_/¯
      this.props.callback();
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.font = "50px Papyrus";
      this.ctx.fillStyle = "rgb(255, 255, 255)";
      this.ctx.fillText(
        "Player 2 Wins!",
        this.canvas.width / 3,
        this.canvas.height / 2
      );
    }
  };

  //track user input
  _userInput = () => {
    if (87 in this.keys) {
      if (this.player1.y - this.player1.velocityY > 0)
        this.player1.y -= this.player1.velocityY;
    } else if (83 in this.keys) {
      if (
        this.player1.y + this.player1.height + this.player1.velocityY <
        this.canvas.height
      )
        this.player1.y += this.player1.velocityY;
    }

    if (38 in this.keys) {
      if (this.player2.y - this.player2.velocityY > 0)
        this.player2.y -= this.player2.velocityY;
    } else if (40 in this.keys) {
      if (
        this.player2.y + this.player2.height + this.player2.velocityY <
        this.canvas.height
      )
        this.player2.y += this.player2.velocityY;
    }
  };

  GameClasses = (() => {
    return {
      Box: function Box(opts) {
        let { x, y, width, height, color, velocityX, velocityY } = opts;
        this.x = x || 10;
        this.y = y || 10;
        this.width = width || 40;
        this.height = height || 50;
        this.color = color || "#FFF";
        this.velocityX = velocityX || 2;
        this.velocityY = velocityY || 2;
      }
    };
  })();

  render() {
    return (
      <canvas
        id="pong_canvas"
        ref="pong_canvas"
        width="750"
        height="500"
        style={{ background: "#12260e", border: "4px solid #FFF" }}
      />
    );
  }
}

export default GameCanvas;
