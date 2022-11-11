import React from 'react'
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import styles from "./InfoPage.module.css"

export default function InfoPage() {

    const [hamster, setHamster] = useState()
    const location = useLocation();

    async function getHamstersh() {
        const response = await fetch('http://localhost:5000/getHamsters', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json()
        setHamster(data.find(obj => obj._id === location.state._id))
    };

    useEffect(() => {
        getHamstersh()
    }, [])



    return (
        <section className={styles.container}>
            <section>

                {hamster && <article className={styles.infoContainer}>

                    <h1>{hamster.name}</h1>
                    <img src={hamster.imgName} alt="" />
                    <p>Ålder: {hamster.age}</p>
                    <p>Favoritmat: {hamster.favFood}</p>
                    <p>Hobby: {hamster.loves}</p>
                    <p>Antal matcher:{hamster.games}</p>
                    <p>Vinster:{hamster.wins}</p>
                    <p>Förluster:{hamster.defeats}</p>

                </article>}

                <article className={styles.btnContainer}>
                    <Link to={"/"}>
                        <button className={styles.newFight}>Ny match</button>
                    </Link>
                </article>
            </section>

        </section>

    )
}
