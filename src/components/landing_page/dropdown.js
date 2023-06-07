import styles from './dropdown.module.css'; // Import your custom CSS styles
import Link from 'next/link';
import { useState } from 'react';
import { signIn, signOut } from 'next-auth/react';

const Dropdown = ({ userdata , signInOut}) => {
    const [isOpen, setIsOpen] = useState(false);
    

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        console.log("isOpen: ", isOpen);
    };


    if (userdata.data === undefined) {
        return (
            <a href="#" className="btn btn-outline-light justify-content-end"
                onClick={() => signIn()}
            >Sign In</a>
            );
    }
    else {
        return (
            <div className={styles.dropdown}>
                <button
                    className="btn text-white"
                    onClick={toggleDropdown}
                >
                    {userdata.data.user.image === null ? (
                        <img
                            src="/images/profile.jpg"
                            style={{ borderRadius: '50%' }}
                            width="46"
                            height="46"
                            alt=""
                            className="d-inline-block align-middle mr-2"
                        />
                    ) : 

                    <img
                        src={userdata.data.user.image}
                        style={{ borderRadius: '50%' }}
                        width="46"
                        height="46"
                        alt=""
                        className="d-inline-block align-middle mr-2"
                    />
                        
                    }
                </button>
                {isOpen && (
                    <div className={styles.dropdownMenu + ' ' + styles.show}>
                        <a className={styles['dropdown-item']}>{userdata.data.user.name}</a>
                        <div className={styles['dropdown-divider']}></div>
                        <a className={styles['dropdown-item']} onClick={() => signOut()}
                        >Sign Out</a>
                    </div>
                )}
            </div>
        );
    }
};

export default Dropdown;
