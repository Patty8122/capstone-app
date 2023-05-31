import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import utilStyles from '../styles/utils.module.css';

import { useEffect } from 'react';
import Sidebar from '../components/sidebar';
import RootLayout from './layout';

import Nav from '../components/landing_page/nav';
import Center from '../components/landing_page/center';
import Features from '../components/landing_page/features';
import Animation from '../components/wavesanimation';


import ChecklistPage from './checklistPage';
import { render } from 'react-dom';



// make scrollable page with a fixed header
// https://stackoverflow.com/questions/56238356/next-js-9-1-4-scrollable-page-with-a-fixed-header

const Home = () => {
  // useEffect(() => {
  //   window.addEventListener('scroll', isSticky);
  //   return () => {
  //     window.removeEventListener('scroll', isSticky);
  //   };
  // });

  // /* Method that will fix header after a specific scrollable */
  // const isSticky = (e) => {
  //   const header = document.querySelector('#header-section');
  //   header.classList.add('is-sticky')
  //   //     const scrollTop = window.scrollY;
  //   // scrollTop >= 250 ? header.classList.add('is-sticky') : header.classList.remove('is-sticky');
  // };
//   render (
//     <div>
//         <Animation />
//     </div>
// )

return (
  <>
  <Nav />
  <Center />
  <Features />
  {/* <RootLayout /> */}
    
  
  {/* </RootLayout> */}
  {/* <div className="footer-dark">
        <div className="container">
            <div className="row">
                <div className="col-md-4 col-xl-3">
                    <h5 className="text-center">You First</h5>
                    <p className="text-center"><a href="http://www.supercc.com">www.supercc.com</a></p>
                </div>

                <div className="col-md-4 col-xl-3">
                    <h5 className="text-center">Telephone</h5>
                    <p className="text-center">(847) 562-0600</p>
                </div>
                <div className="col">
                    <h5 className="text-center">Email</h5>
                    <p className="text-center"><a href="mailto:izzy@supercc.com"><span >izzy@supercc.com</span></a>&nbsp;</p>
                </div>
            </div>
        </div>
        <footer>
            <div className="container">
                <p className="copyright">Copyright © Super Computer Consulting, Inc. 2023</p>
            </div>
        </footer>
    </div> */}
  </>
);



}

export default Home;