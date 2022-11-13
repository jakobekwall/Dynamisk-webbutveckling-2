import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import styles from "./GalleryPage.module.css"
import { baseURL } from '../UTLS/baseURL';


export default function GalleryPage() {

    const location = useLocation();
    console.log(location.state);


    const [gallery, setGallery] = useState()
    const [name, setName] = useState("")
    const [favFood, setFavFood] = useState("")
    const [age, setAge] = useState(0)
    const [loves, setLoves] = useState("")
    const [img, setimg] = useState("")
    const [games, setGames] = useState(0)
    const [wins, setWins] = useState(0)
    const [defeats, setDefeats] = useState(0)


    async function getHamstersh() {
        const response = await fetch(`${baseURL}/getHamsters `, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json()
        setGallery(data)
    };


    async function createHamster() {
        let newHamster = {
            name: name,
            age: age,
            favFood: favFood,
            loves: loves,
            imgName: img,
            games: games,
            wins: wins,
            defeats: defeats

        }
        const response = await fetch(`${baseURL}/createNewHamster `, {
            method: 'POST',
            body: JSON.stringify(newHamster),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json()
        console.log(data)
        window.location.reload()
    };




    async function removeHamster(id) {
        const response = await fetch(`${baseURL}/deleteHamster `, {
            method: 'DELETE',
            body: JSON.stringify({ id }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json()
        console.log(data);
        window.location.reload()
    };



    useEffect(() => {
        getHamstersh()
    }, [])

    return (
        <section >

            <article className={styles.addHamsterContainer}>
                <Link to={"/"}> <button className={styles.backToStart}>Tillbaka till start</button></Link>

                <h1>Lägg till hamster</h1>
                <input placeholder='Namn' defaultValue={name} onChange={(e) => setName(e.target.value)}></input>
                <input placeholder='Favoritmat' defaultValue={favFood} onChange={(e) => setFavFood(e.target.value)}></input>
                <input placeholder='Hobby' defaultValue={loves} onChange={(e) => setLoves(e.target.value)}></input>
                <input placeholder='Ålder' defaultValue={age} onChange={(e) => setAge(e.target.value)}></input>
                <input placeholder='Bild-URL' onChange={(e) => setimg(e.target.value)} type="text" />

                <button className={styles.addHamster} onClick={() => createHamster()}>Lägg till</button>

            </article>
            <section className={styles.galleryWrapper}>
                {gallery &&
                    gallery.map((hamster, id) => (
                        <article className={styles.galleryContainer}>
                            <Link className={styles.linkStyling} to={"/InfoPage"} state={hamster}>
                                < img src={hamster.imgName} alt="" />
                                <h2>{hamster.name}</h2>
                            </Link>
                            <button className={styles.removeHamster} onClick={() => removeHamster(hamster._id)}>Ta bort</button>
                        </article>
                    ))
                }


            </section>

        </section>




    )
}
