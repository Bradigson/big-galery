import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { app } from "../firebase/credenciales";
import {getFirestore, collection, query, onSnapshot, orderBy} from 'firebase/firestore';
const dataBase = getFirestore(app);
const Header = ()=>{
    
    const [photo, setPhotos] = useState([]);
    useEffect(()=>{
        const getGallery = ()=>{
            const collectionRef = collection(dataBase, 'gallery');
            const q = query(collectionRef, orderBy('timestamp', 'asc'));
            onSnapshot(q, (queryPhoto)=>{
                setPhotos(queryPhoto.docs.map((doc)=>({...doc.data(), id : doc.id})));
            })
        }
        getGallery();
    },[])

    
    return(
        <nav className="nav position-fixed w-100  d-flex align-items-center justify-content-between p-3 shadow " style={{ zIndex : '99'}}>
            <div>
                <h1 className="fs-4">Bradigson</h1>
            </div>
            <span className="text-muted">Amount : <strong className="text-primary">{photo.length}</strong></span>
            <Link to='upload-photos' className="nav-link me-3 "> Add Photo</Link>
            

            <style>
                {
                    `
                    nav{
                        transition: all 1s;
                        background:#eee;
                        // margin-top:-10rem;
                        top:0;
                    }
                    
                    `
                }
            </style>
        </nav>
    )
}

export default Header;

window.addEventListener("scroll", ()=>{
    let header = document.querySelector("nav");
    header.classList.toggle("bg-primary", window.scrollY > 0);
});