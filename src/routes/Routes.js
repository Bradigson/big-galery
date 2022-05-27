import {Routes, Route} from 'react-router-dom';
import UploadPhotos from '../components/UploadPhoto';

const Rutas = ()=>{
    return(
       <Routes>
           <Route path='/' element={<h1>Home</h1>}/>
           <Route path='upload-photos' element={<UploadPhotos/>}/>
       </Routes>
    )
}

export default Rutas;