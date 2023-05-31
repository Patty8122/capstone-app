import React from "react";
import { useState } from "react";
import {runPrompt} from "./api/checklist/openai_call";
import { useEffect } from 'react';
import Nav from '../components/landing_page/nav';
import Center from '../components/landing_page/center';
import Features from '../components/landing_page/features';
import styles from '../styles/utils.module.css';
import RootLayout from "./layout";
import Parent from "../components/checklistParent";


function ChecklistPage(){
    const [checklist, setChecklist] = useState([]);
    const [checklist_request, setChecklistRequest] = useState('');
    const [checklist_names, updateTabNames] = useState([]);


    React.useEffect(() => {
        fetchChecklist();
      }, [])
    


    const fetchChecklist = async () => {
        const res = await fetch('/api/checklist');
        const data = await res.json();
        setChecklist(data.check_list);
        console.log(data.check_list);
        updateTabNames(data.check_list.map((checklist) => {
            return {
                label: checklist.name,
                icon: "📝",
                tasklist: checklist.tasklist
            }
        } 
        ));
        console.log(data.check_list);
        console.log("checklist_names: ", checklist_names);

    }

    // const addChecklist = async (checklist_request) => {

    //     // append to checklist_request 

    //     const res = await fetch('/api/checklist/openapi_call', {
    //         method: 'POST',
    //         headers: {
    //             'Content-type': 'application/json',
    //         },
    //         body: JSON.stringify(checklist_request),
    //     });

    //     const data = await res.json();

    //     setChecklist([...checklist, data]);

    // };

    const addChecklist = async (checklist_request) => {
        // update the state of checklist_request
        setChecklistRequest(checklist_request);
    }

    
    const deleteTodo = (task) => {
    // const deleteTodo = (task) => {
        console.log(task);


        setChecklist(
            checklist.map((checklist) => {
                if (checklist.tasklist[task]) {
                    delete checklist.tasklist[task];
                }
                return checklist;
            })
        );
    }
        

    const submitChecklistRequest = async (checklist_request) => {


        // check if checklist_request is empty
        if (checklist_request === '') {
            alert('Please enter a checklist request');
            return;
        }

        const res = await fetch('/api/checklist', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({"checklist_request": checklist_request}),
        });


        const data = await res.json();

    //     // while res is not 200, keep looping
    //     while (res.status !== 200 || data.check_list === undefined) {
    //     const res = await fetch('/api/checklist', {
    //         method: 'POST',
    //         headers: {
    //             'Content-type': 'application/json',
    //         },
    //         body: JSON.stringify({"checklist_request": checklist_request}),
    //     });

    //     const data = await res.json();
        
    // }
    console.log("res: ", res)
        console.log(data);
        setChecklist(data.check_list);
        updateTabNames(data.check_list.map((checklist) => {
            return {
                label: checklist.name,
                icon: "📝",
                tasklist: checklist.tasklist
            }
        }
        ))
        console.log("checklist_names: ", checklist_names);
    }




      
    return (
        deleteTodo,
        <>
        <Nav/>
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
                        <Parent tabs={checklist_names} deleteTodo={deleteTodo} />
                        
                    {/* {checklist.map((checklist) => {
                        return (
                            <div className="col-sm-4 " id={checklist.id}>
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{checklist.name}</h5>
                                        <div key={checklist.name}>
                                            <ul>
                                            {
                                            Object.keys(checklist.tasklist).map((task) => {
                                                return (
                                                    <div className="card card-outline-danger ">
                                                        <div className="card-block text-left">
                                                            <div className="row justify-content-center p-0 m-0">
                                                                <div className="col-10">
                                                                    <p>{task} - {checklist.tasklist[task]}</p>
                                                                </div>
                                                                <div className="col-2 justify-content-end">
                                                                    <button type="button" className="btn-close close-icon justify-content-right" aria-label="Close" onClick={()=>{deleteTodo(task);}}></button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    
                                                    </div>
                                                )
                                            }
                                            )
                                            }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                </div>
                                )
                            })} */}
                </div>
            </div>
        </div>
        <div className="section row">
            <div className="col-12">
            <div className='air air1'>
                {/* <p> Hello </p> */}
            </div>
            <div className='air air2'></div>
            <div className='air air3'></div>
            <div className='air air4'></div>
            </div>
        </div>
        </div>  

        </>
    );
}


export default ChecklistPage;





// import React from "react";
// import { useState } from "react";
// import listEngines from "../pages/api/listEngines";

// import { Configuration, OpenAIApi } from "openai";
// const configuration = new Configuration({
//     organization: "YOUR_ORG_ID",
//     apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();
// // This gets called on every request
// export async function getServerSideProps() {
//     // Fetch data from external API
//     const res = await fetch(
//         'https://api.openai.com/v1/engines/davinci/completions',
//         {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
                
//     const data = await res.json()

//     // Pass data to the page via props
//     return { props: { data } }
// }


// const checklistPageDisplay = () => {


//     return (
//         <>
//             <div className="container-fluid m-0 p-0">
//                 {/* <div className="row">
//                     <div className="col-12 col-md-6 col-lg-4">
//                         <div className="card">
//                             <div className="card-body"> 
//                                 <h5 className="card-title">Card title</h5>
//                                 <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//                                 <a href="#" className="btn btn-primary">Go somewhere</a>
//                             </div>
//                         </div>
//                     </div>
//                 </div> */}




//             </div>
//         </>
//     );

// };




// export default checklistPageDisplay;