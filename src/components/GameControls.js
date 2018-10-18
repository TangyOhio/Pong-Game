import React from "react";

class GameControls extends React.Component {
  render() {
    return (
      <article>
        <form>
          Score to Win
          <input type="number" defaultValue="5" min="1" />
          Ball Speed
          <input type="radio" name="1" value="1" defaultChecked />
          <input type="radio" name="1" value="1" />
          <input type="radio" name="1" value="1" />
          Player 1 Color
          <input type="color" />
          Player 2 Color
          <input type="color" />
          Ball Color
          <input type="color" />
          <input
            type="button"
            value="New Game"
            onClick={() => {
              this.props.callback();
            }}
          />
        </form>
      </article>
    );
  }
}

export default GameControls;
