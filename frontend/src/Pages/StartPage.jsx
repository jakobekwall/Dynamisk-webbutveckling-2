import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import InfoPage from './InfoPage';
import GalleryPage from './GalleryPage';
import styles from "./StartPage.module.css"
import { baseURL } from '../UTLS/baseURL';

export default function StartPage() {

    const [start, setStart] = useState(true);
    const [gallery, setGallery] = useState()

    const [hamsters, setHamsters] = useState([]);
    const [playerOne, setPlayerOne] = useState();
    const [playerTwo, setPlayerTwo] = useState();
    const [winnerHamster, setWinnerHamster] = useState(false);
    const [loserHamster, setLoserHamster] = useState(false)
    const [nextGame, setNextGame] = useState(false);
    const [myChoosen, setMyChoosen] = useState();
    const [showStats, setShowStats] = useState(false);



    async function getHamstersh() {
        const response = await fetch(`${baseURL}/getHamsters `, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json()
        setHamsters(data)
    };

    async function addVictory(hamster) {

        let hamsterStats = {
            winner: hamster,
            loser: playerOne._id === hamster._id ? playerTwo : playerOne
        }

        const response = await fetch(`${baseURL}/hamsterChampion`, {
            method: 'PUT',
            body: JSON.stringify(hamsterStats),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json()
        setHamsters(data)
        console.log("winner winner", data);
    };


    // console.log(playerOne, playerTwo);

    function startGame() {
        setStart(false)
        startBattle()
    }

    function startBattle() {
        setPlayerOne(hamsters[Math.floor(Math.random() * 31)]);
        setPlayerTwo(hamsters[Math.floor(Math.random() * 31)]);
        setNextGame(true)
        setShowStats(false)

    }

    useEffect(() => {
        if (playerOne && playerOne._id === playerTwo._id) {
            setPlayerTwo(hamsters[Math.floor(Math.random() * 31)]);
        }
    }, [playerTwo])

    function nextBattle(hamster) {
        setNextGame(false)
        setMyChoosen(hamster)
        setShowStats(true)
        setWinnerHamster(true)
        setLoserHamster(true)
        addVictory(hamster)
    }

    console.log(hamsters);
    console.log(playerOne);


    useEffect(() => {
        getHamstersh()
    }, [])

    return (

        <section>

            <section>
                <article className={styles.gameContainer}>
                    {start && <button className={styles.startBtn} onClick={() => startGame()}>Start spelet</button>}

                    <Link to={"/GalleryPage"} state={hamsters}>
                        <button className={styles.galleryBtn}>Galleri</button>
                    </Link>
                </article>

                {start && <h1 className={styles.startDescription}>R??sta och v??lj vilken hamster DU tycker ??r s??tast genom att klicka p?? den! :-) </h1>}

            </section>


            {nextGame &&
                <section className={styles.competingHamsters}>
                    <article onClick={() => nextBattle(playerOne)}>
                        <p>{playerOne && playerOne.name}</p>
                        <img src={playerOne && playerOne.imgName} alt="" />
                    </article>

                    <article onClick={() => nextBattle(playerTwo)}>
                        <p>{playerTwo && playerTwo.name}</p>
                        <img src={playerTwo && playerTwo.imgName} alt="" />
                    </article>

                </section>
            }

            <section>

                {showStats && winnerHamster && loserHamster && <section>
                    <article className={styles.playerOne}>
                        <Link className={styles.linkStyling} to={"/InfoPage"} state={playerOne}>
                            <h1>{playerOne && playerOne.name}</h1>
                            <img src={playerOne.imgName} alt="" />

                            <article className={styles.showStats}>
                                <h2>Vinster {myChoosen._id === playerOne._id ? playerOne.wins + 1 : playerOne.wins}</h2>
                                <h2>F??rluster {myChoosen._id !== playerOne._id ? playerOne.defeats + 1 : playerOne.defeats}</h2>
                                <h2>Antal matcher {playerOne.games + 1}</h2>
                            </article>

                        </Link>
                    </article>


                    <article className={styles.playerTwo}>
                        <Link className={styles.linkStyling} to={"/InfoPage"} state={playerTwo}>
                            <h1>{playerTwo && playerTwo.name}</h1>
                            <img src={playerTwo.imgName} alt="" />

                            <article className={styles.showStats}>
                                <h2>Vinster {myChoosen._id === playerTwo._id ? playerTwo.wins + 1 : playerTwo.wins}</h2>
                                <h2>F??rluster {myChoosen._id !== playerTwo._id ? playerTwo.defeats + 1 : playerTwo.defeats}</h2>
                                <h2> Antal matcher{playerTwo.games + 1}</h2>
                            </article>

                        </Link>
                    </article>

                    <section>
                        <article className={styles.showWinner}>
                            <section>
                                <h2>{myChoosen.name} VANN</h2>
                                <img src={myChoosen.imgName} alt="" />
                            </section>

                        </article>
                    </section>



                </section >}

                {showStats && !start && <button className={styles.nextBattleBtn} onClick={() => startBattle()}>N??sta match</button>}

            </section>

        </section>

    )
}
