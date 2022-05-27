import {useState} from 'react';
import '../assets/styles/UploadPhoto.scss';
import Clouds from '../assets/styles/DesignComponent/Cloud';
import Balls from '../assets/styles/DesignComponent/Balls';
import storage from '../firebase/credenciales';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase/credenciales';
import {getFirestore, collection, addDoc, serverTimestamp} from 'firebase/firestore';
const dataBase = getFirestore(app);
const UploadPhotos = ()=>{

    const [file, setFile] = useState('');
    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('');

    // date destrcting
    let dt= new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const fecha = dt.toLocaleDateString(undefined, options); 
    const hora = dt.toLocaleTimeString('en-US');


    // get img and all info
    const handlePhoto = async(e)=>{
        setFile(e.target.files[0]);
    }

    const handleeTitle = (e)=>{
        setTitle(e.target.value);
    }

    const handleeDate = (e)=>{
        setDate(e.target.value);
    }

    const handleeTime = (e)=>{
        setTime(e.target.value);
    }

    const handleeDescription = (e)=>{
        setDescription(e.target.value);
    }

    // function upload img
    const handleUploadPhoto = async(e)=>{
        e.preventDefault();
        try{
            const fileRef = ref(storage, `gallery/${file.name}`);
            uploadBytes(fileRef, file);
        }catch(err){
            console.log(err)

        }
    }

    // create gallery
    const handleCreateGallery = async(e)=>{
        e.preventDefault();
        
        getDownloadURL(ref(storage,  `gallery/${file.name}`)).then((url)=>{
            setUrl(url);
             addDoc(collection(dataBase, 'gallery'),{
                url, timestamp : serverTimestamp(), title, date, time, description, fecha, hora
            })
            setTitle('');
            setDate('');
            setTime('');
            setDescription('');
        });
    }
    return(
        <div className="form-container">
            <form className="row g-3 needs-validation shadow">
                    {/* Upload img */}
                    <div className="col-md-4  d-flex align-items-center w-50">
                        <div>
                            <label htmlFor="validationCustom01" className="form-label">Upload Photo</label>
                            <input type="file" className="form-control" id="validationCustom01" required onChange={handlePhoto}/>
                        </div>
                        <div className='ms-4 mt-4'>
                            <button className='btn btn-outline-success' onClick={handleUploadPhoto}>Upload Photo</button>
                        </div>
                       
                    </div>
                    <div className="col-md-4">
                    </div>

                    {/* Title */}
                    <div className="col-md-4">
                        <label htmlFor="validationCustom02" className="form-label">Photo Title</label>
                        <input type="text" className="form-control" id="validationCustom02" placeholder='Title' required value={title} onChange={handleeTitle}/>
                    </div>

                    {/* Photo Date */}
                    <div className="col-md-4">
                        <label htmlFor="validationCustomUsername" className="form-label">Photo Date</label>
                        <input type="date" className="form-control" id="validationCustomUsername"  required value={date} onChange={handleeDate}/>
                    </div>

                    {/* Photo Time */}
                    <div className="col-md-6">
                        <label htmlFor="validationCustom03" className="form-label">Photo Time</label>
                        <input type="time" className="form-control" id="validationCustom03" required value={time} onChange={handleeTime}/>
                    </div>

                    {/*Photo description  */}
                    <div className="col-md-3">
                        <label htmlFor="validationCustom04" className="form-label">Photo Description</label>
                        <textarea id='validationCustom04' className="form-control" placeholder='Description' 
                        value={description} onChange={handleeDescription}></textarea>
                    </div>
                   
                    <div className="col-12">
                        <button className="btn btn-primary" type="submit" onClick={handleCreateGallery}>Create Gallery</button>
                    </div>
            </form>
            <Clouds/>
            <Balls/>
        </div>
    )
}

export default UploadPhotos;