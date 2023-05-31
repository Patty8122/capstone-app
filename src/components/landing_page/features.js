import React from "react";
import styles from './features.module.css';
import Link from 'next/link';

const Features = () => {
    return (
        <div className="">

            {/* dark background container with white text and 5 cards inside with margin-top */}
            <div className="container-fluid bg-dark  m-0 p-0" >
                {/* <div className="row">
                    <div className="offset-2 pt-3 white">
                        <h5 className={styles.featuresHead}>Features</h5>
                    </div>
                </div> */}
                {/* add left padding */}
                <div className="row p-5 justify-content-center" >
                    <div className="col-sm-2 ">
                        <div className="card white h-100">
                            <div className="card-body">
                                <div className="text-center">
                                    <h7 className="card-title">Organizes thoughts into reports</h7>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-9 p-3 ">
                                        <img src="/images/features1.png" alt="" className={styles.featureImages} />
                                    </div>
                                </div>
                                <div className="text-center">
                                    <a href="#" className="btn btn-primary ">Your Reports</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <div className="card white h-100">
                            <div className="card-body" >
                                <div className="text-center">
                                    <h7 className="card-title">Breaks down tasks into checklists</h7>
                                </div>
                                {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" className="btn btn-primary">Go somewhere</a> */}
                                <div className="row justify-content-center">
                                    <div className="col-9 p-3 ">
                                        <div className="">
                                            <img src="/images/features2.png" alt="" className={styles.featureImages} />
                                        </div>
                                    </div>
                                </div>
                                {/* <a href="" className="btn btn-primary">Create AI checklists</a> */}
                                <div className="text-center">
                                    <Link href="/checklistPage" className="btn btn-primary"> AI checklists </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <div className="card white h-100">
                            <div className="card-body">
                                <div className="text-center">
                                    <h7 className="card-title">Enforces therapy goals through reminders</h7>
                                </div>
                                {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" className="btn btn-primary">Go somewhere</a> */}
                                <div className="row justify-content-center">
                                    <div className="col-9 p-3 ">
                                        <div className="">
                                            <img src="/images/features3.png" alt="" className={styles.featureImages} />
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <a href="#" className="btn btn-primary">Create Reminders</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <div className="card white h-100">
                            <div className="card-body">
                                <div className="text-center">
                                    <h7 className="card-title">Reports reviews by therapists</h7>
                                </div>
                                {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" className="btn btn-primary">Go somewhere</a> */}
                                <div className="row justify-content-center">
                                    <div className="col-9 p-3 ">
                                        <div className="">
                                            <img src="/images/features4.png" alt="" className={styles.featureImages} />
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <a href="#" className="btn btn-primary">Subscribe</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <div className="card white h-100">
                            <div className="card-body">
                                <div className="text-center">
                                    <h7 className="card-title justify-content-center">Log your mood diary everyday</h7>
                                </div>
                                {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" className="btn btn-primary">Go somewhere</a> */}
                                <div className="row justify-content-center">
                                    <div className="col-9 p-3 ">
                                        <div className="">
                                            <img src="/images/features5.png" alt="" className={styles.featureImages} />
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <a href="#" className="btn btn-primary">Fill today</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Features;

