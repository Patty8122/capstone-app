import styles from "../styles/utils.module.css";
import Link from "next/link"


export default function RootLayout({ children }) {

  return (
    <>
      {/* add styles of fixed width to the div below */}
      {/* <div className={styles.sidebar}> */}
      <div className="row h-100">
            <div className="col-sm-12 h-100">
      <div className="row p-3 bg-dark m-0 h-100">
        <div className="col-md-12 bg-dark m-0 p-0 h-100">
          <a href="/" className="col-4 h-100 align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none text-white">
            {/* <svg className="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg> */}
            <span className="fs-4">Sidebar</span>
          </a>
          <hr />
          <ul className="nav nav-pills flex-column mb-auto ">
            <li className="nav-item">
              <a href="#" className="nav-link active" aria-current="page">
                {/* <svg className="bi me-2" width="16" height="16"> */}
                {/* <use xlink:href="#home"></use></svg> */}
                Checklist
              </a>
            </li>
            <li>
              <a href="#" className="nav-link link-dark text-white">
                {/* <svg className="bi me-2" width="16" height="16"><use xlink:href="#speedometer2"></use></svg> */}
                Mood Diary
              </a>
            </li>
            <li>
              <a href="#" className="nav-link link-dark text-white">
                {/* <svg className="bi me-2" width="16" height="16"><use xlink:href="#table"></use></svg> */}
                Reports
              </a>
            </li>
            <li>
              <a href="#" className="nav-link link-dark text-white">
                {/* <svg className="bi me-2" width="16" height="16"><use xlink:href="#grid"></use></svg> */}
                User Profile
              </a>
            </li>
            <li>
              <a href="#" className="nav-link link-dark text-white">
                {/* <svg className="bi me-2" width="16" height="16"><use xlink:href="#people-circle"></use></svg> */}
                About
              </a>
            </li>
          </ul>
          <hr />
          <div className="dropdown">
            <a href="#" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
              {/* <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" /> */}
              <strong>mdo</strong>
            </a>
            <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
              <li><a className="dropdown-item" href="#">New project...</a></li>
              <li><a className="dropdown-item" href="#">Settings</a></li>
              <li><a className="dropdown-item" href="#">Profile</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#">Sign out</a></li>
            </ul>
          </div>
        </div>
      </div>
      </div>
      </div>
    </>

  );
}

