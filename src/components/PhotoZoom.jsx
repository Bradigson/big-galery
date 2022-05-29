import { Link, useParams, useNavigate } from "react-router-dom";
import Alert from 'sweetalert2';
import { useState, useEffect } from "react";
import '../assets/styles/PhotoZoom.scss';
import '../assets/styles/responsiveDesign/PhotoZoomResponsive.scss';
import AnimatedPage from "../FramerMotion/Animation";
import { app } from "../firebase/credenciales";
import {getFirestore, collection, query, onSnapshot, deleteDoc, doc} from 'firebase/firestore';
const dataBase = getFirestore(app);

const PhotoZoom = ()=>{
    const { photoId } = useParams();
    const [photo, setPhoto] = useState([]);
    // navigate
    const navigate = useNavigate();

    useEffect(()=>{
        const getPhoto = ()=>{
            const collectionRef = collection(dataBase, 'gallery');
            const q = query(collectionRef);
            onSnapshot(q, (queryPhoto)=>{
                setPhoto(queryPhoto.docs.map(doc=>({...doc.data(), id : doc.id})));
            })
        }
        getPhoto();
    },[])

    // delete photo
    const handleDelete = async(id)=>{
        try{
           Alert.fire({
                title: 'Seguro que quiere borrar esta foto?',
                text: "Una vez borrada no podra ser recuperada!",
                icon: 'question',
                showCancelButton: true,
                cancelButtonText : 'Cancelar',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, borrar foto!'
              }).then((result) => {
                if (result.isConfirmed) {
                 Alert.fire({
                     title : 'Eliminada!',
                     text: 'Tu foto ha sido eliminada.',
                     icon : 'success',
                     showConfirmButton : false,
                     timer : '1500'
                 }
                   
                  )
                deleteDoc(doc(dataBase, 'gallery', id));
                navigate('/', {replace : true})
                }
              })
            

        }catch(err){
            console.error(err)
        }
    }

    return(
        <AnimatedPage>
            <div className="photozoom">
                <section className="card-container shadow">
                    {
                        photo.map(p=>{
                            return(
                                
                                p.id === photoId ? (
                                <div className="info-container" key={p.id}>
                                    <div className="info-container__img">
                                        <img src={p.url}/>
                                    </div>
                                    <div className="info-container__info ">
                                        <div className=" d-flex justify-content-end fs-2">
                                            <Link to='/'><i className='bx bxs-share me-4'></i></Link>
                                            <Link to='#' onClick={()=>handleDelete(p.id)}><i className='bx bxs-trash' ></i></Link>
                                        </div>
                                        <div className="card shadow">
                                            <div className="card-body">
                                                <h1 className="fs-3 mt-4">{p.title}</h1>
                                                <p className="mt-4">{p.description}</p>

                                                <div className="card-footer p-0 text-muted ">
                                                <span>{p.fecha}</span><br/>
                                                <span>{p.hora}</span>

                                                </div>
                                                
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                                    ) 
                                    : ('')
                            )
                        })
                    }
                </section>
            </div>
        </AnimatedPage>

    )
}


export default PhotoZoom;