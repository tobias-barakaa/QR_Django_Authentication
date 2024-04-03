import React from 'react';
import { Link } from 'react-router-dom';


export const Nav = () => {
    return(
        <>
        <header className="p-3 bg-dark text-white">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <Link to ="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
          <use xlinkHref="#bootstrap"></use></svg>
        </Link>

        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
        <li><Link to="/" className="nav-link px-2 text-secondary" style={{background: 'none', border: 'none'}}>Home</Link></li>
          </ul>

       

        <div className="text-end">
            
          <Link to="login" type="button" className="btn btn-outline-light me-2">Login</Link>
          <Link to="register" type="button" className="btn btn-outline-light">Register</Link>
        </div>
      </div>
      </header>
        </>
    )
}