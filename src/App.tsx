import "./styles.css";
import { IPlayer } from "./types/IPlayer";
import { ICard } from "./types/ICard";
import { useState } from "react";

export default function App() {
  const [newPlayerName, setNewPlayerName] = useState("");
  const [players, setPlayers] = useState([]);
  const [loadMorePlayers, setLoadMorePlayers] = useState(true);
  const [currentStage, setCurrentStage] = useState("players");
  let cards: ICard[] = [];

  const addPlayer = () => {
    console.log("button pressed");
    let newPlayer: IPlayer = {
      name: newPlayerName,
      cards: []
    };
    setLoadMorePlayers(false);
    setPlayers([...players, newPlayer]);
    setNewPlayerName("");
  };

  const shuffleCards = () => {
    for (let i = 0; i < players.length * 20; i++) {
      let card: ICard = {
        value: i
      };
      cards.push(card);
    }
    let shuffledArray = [...cards];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i]
      ];
    }
    return shuffledArray;
  };

  const shuffle = () => {
    const shuffledDeck = shuffleCards();
    for (let counter = 0; counter < 5; counter++) {
      for (
        let playerNumber = 0;
        playerNumber < players.length;
        playerNumber++
      ) {
        players[playerNumber].cards.push(shuffledDeck.pop());
      }
    }
    setCurrentStage("playGame");
  };

  return (
    <>
      {currentStage !== "playGame" && players && players.length > 0 && (
        <div>
          <h1>PLayers</h1>
          {players.map((player: IPlayer) => {
            return <div>{player.name}</div>;
          })}

          {currentStage === "players" && (
            <div>
              <h2>Would you like to load more players?</h2>
              <div>
                <button
                  className="btn btn-primary"
                  onClick={() => setLoadMorePlayers(true)}
                >
                  Yes
                </button>
              </div>
              <div>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setLoadMorePlayers(false);
                    setCurrentStage("shuffle");
                  }}
                >
                  No
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      {(!players || players.length === 0 || loadMorePlayers) && (
        <div>
          <label>Enter player name</label>
          <input
            type="text"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
          />
          <button className="btn btn-primary" onClick={addPlayer}>
            Add Player
          </button>
        </div>
      )}
      {currentStage === "shuffle" && (
        <button className="btn btn-primary" onClick={shuffle}>
          Shuffle and Deal the Cards
        </button>
      )}
      {currentStage === "playGame" && (
        <div>
          <h1>Players and hands</h1>
          {players.map((player: IPlayer) => {
            return (
              <div>
                <h3>{player.name}</h3>
                <h4>Number of cards left: {player.cards.length}</h4>
                {player.cards.map((card: ICard) => {
                  return <div>Card value: {card.value}</div>;
                })}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
