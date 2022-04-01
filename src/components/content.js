import React, { useState, useEffect } from 'react';
import "../styles/content.css"
import mapChamp from "./champion";
const Content = () => {

    const [level, setLevel] = useState(1);
    const Champions = mapChamp();
    let gameOver = false;
    const [champion, setChampion] = useState(Champions.getLevel(level)());
    const [clicked, setClicked] = useState([]);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);

    const checkAlreadyClicked = (name) => {
        if (clicked.includes(name)) {
            return true;
        }
        return false;
    }
    const checkBestScore = () => {
        if (score >= bestScore) {
            setBestScore(score);
        }
    }
    const checkLevel = () => {
        if (score < 5) {
            setLevel(1);
        }
        else if (score >= 5 && score < 10) {
            setLevel(2);
        }
        else if (score >= 10 && score < 20) {
            setLevel(3);
        }
        else if (score >= 20 && score < 30) {
            setLevel(4);
        }
        else if (score >= 30 && score < 40) {
            setLevel(5);
        }
        else if (score >= 40) {
            setLevel(6);
        }
    }
    const checkWinCondition = () => {
        if (score == 50) {
            gameOver = true;
            alert("YOU WIN! GODLIKE MEMORY!");
            setLevel(1);
            setScore(0);
        }
    }
    const clickHandler = (e) => {
        if (checkAlreadyClicked(e.target.alt)) {
            gameOver = true;
            alert("game over. try again!");
        }
        if (gameOver) {
            setClicked([]);
            setScore(0);
        }
        else {
            setScore(score + 1);
            setClicked([...clicked, e.target.alt]);
        }
    }

    useEffect(() => {
        const allChamps = document.querySelectorAll('.champion');
        allChamps.forEach(champ => {
            champ.addEventListener('click', clickHandler);
        });

        return () => {
            allChamps.forEach(champ => {
                champ.removeEventListener('click', clickHandler);
            })
        }
    });

    useEffect(() => {
        checkBestScore();
        checkLevel();
        checkWinCondition();
        setChampion(Champions.getLevel(level)());
    }, [score, level])


    return (
        <div className="content">
            <p className="score">Score: {score}</p>
            <p className="best-score">Best Score: {bestScore}</p>
            {champion.map((champ, index) => {
                return (
                    <div key={index} className="champion">
                        <img src={champ.url} alt={champ.name} />
                        <h3>{champ.name}</h3>
                    </div>

                )
            })}
        </div>
    )
}

export default Content;