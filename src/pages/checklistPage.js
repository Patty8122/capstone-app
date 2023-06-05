import React from "react";
import { useState } from "react";
import { useEffect } from 'react';
import Nav from '../components/landing_page/nav';
import styles from '../styles/utils.module.css';
import RootLayout from "./layout";
import Parent from "../components/checklistParent";
import { useSession} from 'next-auth/react';
import { connectDB, disconnectDB } from './api/checklist/checklistsModel';
import { data } from "autoprefixer";
import { getSession } from "next-auth/react";


const ChecklistPage = (({ checklist_names}) => {
    const [checklist_request, setChecklistRequest] = useState('');
    // const [checklist_names, updateTabNames] = useState(checklist_names_server);
    const session = useSession();
    const [user_email, setUserEmail] = useState(null);
    
    // setting user email to state variable
    useEffect(() => {
        console.log("session: ", session);
        if (session && session.data && session.data.user && session.data.user.email) {
            // console.log("session.data.user.email: ", session.data.user.email);
            setUserEmail(session.data.user.email);
        }
    }, [session.status==="authenticated"]);
    
    
    // Function to append a new name to the checklist_names state
    const appendToTabNames = (newName) => {
        updateTabNames((prevNames) => [...prevNames, newName]);
    };
    
    
    // Fetch checklist from database using GET request
    // React.useEffect(() => {
    //     const interval = setInterval(() => {
    //       fetchChecklist();
    //     }, 500); // Change the interval time (in milliseconds) to your desired value
        
    //     return () => {
    //       clearInterval(interval); // Clear the interval when the component is unmounted
    //     };
    //   }, [user_email]);
      

    //   const fetchChecklist = async () => {
    //     try {
    //       const res = await fetch('/api/checklist', {
    //         method: 'GET',
    //         headers: {
    //           'Content-Type': 'application/json',
    //           email: user_email
    //         }
    //       });
    //       const data = await res.json();
    //     } catch (error) {
    //         console.log(error);
    //         }
    //         // update the state of checklist_names
    //         updateTabNames(data);

    //   };
      

    const addChecklist = async (checklist_request) => {
        // update the state of checklist_request
        setChecklistRequest(checklist_request);
    }

    // NEED TO FIX THIS : api call to database to edit tasklist
    const deleteTodo = (task) => {
    // const deleteTodo = (task) => {
        console.log(task);


        updateTabNames(
            checklist_names.map((checklist) => {
                if (checklist.tasklist[task]) {
                    delete checklist.tasklist[task];
                }
                return checklist;
            })
        );
    }
        
    // adds a new checklist to the database
    const submitChecklistRequest = async (checklist_request) => {
        // check if checklist_request is empty
        if (checklist_request === '') {
            alert('Please enter a checklist request');
            return;
        }
        // call the api to get the checklist
        const res = await fetch('/api/checklist', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({"checklist_request": checklist_request,
                                    "email": user_email}),
        });


        const data = await res.json(); // the added new checklist
        console.log("New checklist added to the database!");
        // trigger the server to fetch the checklist again
    }


    return (
        <div className="checklistPage">
        <Nav />
        <div className="row">
            <div className="col-sm-2 span-all">
                <RootLayout />
            </div>
            <div className="col-sm-10 span-all">
            < input type="text" value={checklist_request} className={styles.searchBar} onChange={(e) => addChecklist(e.target.value)} /> 
            < button className="pl-0 pr-0 pt-1 pb-1 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-0 focus:ring-gray-300 font-medium rounded-md text-sm px-3 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 " onClick={() => submitChecklistRequest(checklist_request)}>Add Checklist</button>
            {/* <button onClick={fetchChecklist}>Fetch Checklist</button> */}

                <div className="container-fluid m-0 p-0">
                    <div className="row p-5 justify-content-left">
                        {console.log("144",checklist_names)}                            
                        {session.status==="authenticated" &&
                            <Parent tabs={checklist_names} deleteTodo={deleteTodo} user_email={user_email}/>}
                        
                </div>
            </div>
        </div>
        </div>

        </div>
    );

}
);



export default ChecklistPage;


export async function getServerSideProps(context) {  

    // connect to database first before rendering the page or else it will throw an error
    await connectDB();
    const session = await getSession(context);
    console.log("LINE 159 session: ", session);

    // setting user email to state variable if user is logged in
    let user_email = null;
    if (session && session.user && session.user.email) {
        // console.log("session.data.user.email: ", session.data.user.email);
        user_email = session.user.email;
    }

      console.log("LINE 164 user_email: ", user_email);

    // Fetch checklist from database using GET request

        try {
            const res = await fetch('http://localhost:3000/api/checklist', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    email: user_email
                }
            });
            if (!res.ok) {
                throw new Error(`Failed to fetch checklist: ${res.status} ${res.statusText}`);
              }
          
            const data = await res.json();
            console.log("LINE 181 data: ", data);
            return {
                props: {
                    checklist_names: data.check_list || [], // will be passed to the page component as props
        },
    };
    } catch (error) {
      console.error('Error fetching checklist:', error);
      
      return {
        props: {
            checklist_names: [], // provide a default value or handle the error condition appropriately
        },
    };
    } finally {
        // disconnect when there is an error or when the request is completed
      disconnectDB();
    }
    
}


//         if (data.check_list === undefined) {
//             console.log('checklist is undefined');
//             return;
//         }
//     } catch (error) {
//         console.error('Error fetching checklist:', error);
//     }


// // disconnect when there is an error
// context.res.on('close', () => {
//     disconnectDB();
// }
// );

// return {
//     props: {
//         checklist_names: data.check_list || [], // will be passed to the page component as props
//     },
// };