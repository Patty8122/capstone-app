import React from 'react';
import Image from 'next/image';
import styles from './nav.module.css';

const Nav = () => {
    return (
        <div className={styles.navbarCustom}>
            {/* add zero padding and margin below */}
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm p-0 m-0">
                <div class="container-fluid">
                    <a href="#" class="navbar-brand">
                        <Image src="/images/logo_white.png" width="216" height="46" alt="" className="d-inline-block align-middle mr-2" />
                        {/* <span class="text-uppercase font-weight-bold">Features</span> */}
                    </a>

                    <button type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler"><span class="navbar-toggler-icon"></span></button>
{/* only right padding */}
                    <div id="navbarSupportedContent" className="collapse navbar-collapse justify-content-end ">
                        {/* add more space between */}
                        <ul className="navbar-nav ml-auto ">
                            <li className="nav-item active"><a href="#" class="nav-link">Features</a></li>
                            {/* add className={styles.li-custom} to nav-link */}
                            <li className="nav-item align-items-end "><a href="#" className="nav-link">Contact
                            </a></li>
                        </ul>
                            <a href="#" className="btn btn-outline-light justify-content-end">Chat now</a>
                    </div>
                </div>
            </nav>

            {/* <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Navbar scroll</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarScroll">
                        <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Link
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled">Link</a>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav> */}

        </div>
    )
}

export default Nav;