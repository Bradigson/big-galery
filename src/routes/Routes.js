import {Routes, Route, useLocation} from 'react-router-dom';
import Home from '../components/Home';
import PhotoZoom from '../components/PhotoZoom';
import UploadPhotos from '../components/UploadPhoto';
import { AnimatePresence } from 'framer-motion';

const Rutas = ()=>{
    const location = useLocation();
    
    return(
        <AnimatePresence exitBeforeEnter>
             <Routes key={location.pathname} location={location}>
                <Route path='/' element={<Home/>}/>
                <Route path='upload-photos' element={<UploadPhotos/>}/>
                <Route path='zoom/:photoId' element={<PhotoZoom/>}/>
            </Routes>

        </AnimatePresence>
      
    )
}

export default Rutas;