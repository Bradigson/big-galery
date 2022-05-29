import { Link } from "react-router-dom"
const Header = ()=>{
    return(
        <nav className="nav position-fixed w-100  d-flex align-items-center justify-content-between p-3" style={{ zIndex : '99'}}>
            <div>
                <h1 className="fs-4">Bradigson</h1>
            </div>
            <Link to='upload-photos' className="nav-link me-3 "> Add Photo</Link>

            <style>
                {
                    `
                    nav{
                        transition: all 1s;
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
    header.classList.toggle("shadow", window.scrollY > 0);
});