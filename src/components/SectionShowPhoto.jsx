import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../assets/styles/SectionShowPhoto.scss';
import '../assets/styles/responsiveDesign/SectionShowPhotoResponsive.scss';
import AnimatedHome from "../FramerMotion/AnimationHome";
import { app } from "../firebase/credenciales";
import {getFirestore, collection, query, onSnapshot, orderBy} from 'firebase/firestore';
const dataBase = getFirestore(app);

const Section = ({ photoCount })=>{

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
        <AnimatedHome>
            <section className="section">
                <article className="section__article">
                    {
                        photo.map(photo=>{
                            return(
                                <div className="photo-container shadow "  key={photo.id}>
                                    <img src={photo.url} className="card-img-top" alt=""/>
                                    <div className="card-cover">
                                        <div className=" d-flex justify-content-end align-items-center  text-light">
                                        <i className='bx bxs-trash fs-4 me-4 mt-4' ></i>
                                        <Link to={`zoom/${photo.id}`}><i className='bx bx-right-arrow-alt fs-3 me-3 mt-4 '></i></Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                </article>
            </section>
        </AnimatedHome>
    )
}

export default Section;