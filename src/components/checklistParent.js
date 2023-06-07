// import "../styles/utils.module.css";
import styles from "../styles/checklistParent.module.css";
import { useEffect, useState } from "react";
// import { initialTabs as tabs } from "./tabList";
import { motion, AnimatePresence } from "framer-motion";
import { ChecklistPage } from "../pages/checklistPage";

import { useRef } from 'react';
import Loading from "./loading";

// 
const Parent = ({ tabs, deleteTodo, fetchSubtaskList, expandTask }) => {
    console.log("tabs: ", tabs);
    const [selectedTab, setSelectedTab] = useState(tabs[0]);
    const [selectedTabsubtasks, setSelectedTabsubtasks] = useState([]);
    console.log("selectedTabsubtasks 1: ", selectedTabsubtasks);

    // useEffect(() => {
    //     setSelectedTabsubtasks(fetchSubtaskList(selectedTab._id));
    // }, [selectedTab]);

    useEffect(() => {
        // setSelectedTabsubtasks(fetchSubtaskList(selectedTab._id));
        if (selectedTab) {
        fetchSubtaskList(selectedTab._id).then((res) => {
            setSelectedTabsubtasks(res);
        }
        );
        }
    }, [selectedTab]);





    return (
        <div className={styles.window}>
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <nav className={styles.nav}>
                            <ul className={styles.tabs}>
                                {tabs.map((item) => {
                                    if (item.id_parent === undefined) {
                                        return (
                                            <li
                                                key={item._id}
                                                className={
                                                    item === selectedTab
                                                        ? `${styles.liSelected} ${styles.liButton}`
                                                        : styles.liButton
                                                }
                                                onClick={() => {
                                                    setSelectedTab(item);
                                                    // setSelectedTabsubtasks(fetchSubtaskList(item._id));
                                                }
                                                }
                                            >
                                                {/* {`${item.icon} ${item.name}`} */}
                                                {`${item.name}`}
                                                {item === selectedTab ? (
                                                    <motion.div className={styles.underline} layoutId="underline" />
                                                ) : null}
                                            </li>
                                        );
                                    }
                                })}
                            </ul>

                        </nav>
                    </div>
                    {selectedTab &&
                        <div className="col-6">
                            <main className={styles.content}>
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={selectedTab ? selectedTab.name : "empty"}
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -10, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {selectedTab && (selectedTab.id_parent === undefined) && ([selectedTab]).map((checklist) => {
                                            {
                                                // var childlist = fetchSubtaskList(checklist._id);
                                                var childlist = null;
                                                // console.log("childlist: ", childlist);

                                            }
                                            return (
                                                <div className="col-12" id={selectedTab._id}>
                                                    <div className="card">
                                                        <div className="card-body">
                                                            <h5 className="card-title">{selectedTab.name}</h5>
                                                            <div key={selectedTab.id}>
                                                                <ul className="list-group list-group-flush text">
                                                                    {
                                                                        Object.keys(checklist.tasklist).map((task) => {
                                                                            return (
                                                                                <div className="card card-outline-danger ">
                                                                                    <div className="card-block text-left ">
                                                                                        <div className="row justify-content-center p-0 m-0">
                                                                                            <div className="col-8">
                                                                                                <div className="card-text">
                                                                                                    <button className={styles.circle + " " + styles.plus}
                                                                                                        onClick={() => { expandTask(task, selectedTab._id, selectedTab.email); }}
                                                                                                    ></button>
                                                                                                    {/* SUBTASK */}

                                                                                                    <p>{task}</p>
                                                                                                    {console.log("selectedTabsubtasks 2: ", selectedTabsubtasks)}
                                                                                                    {selectedTabsubtasks && selectedTabsubtasks.length > 0 && selectedTabsubtasks.map((subtask) => {
                                                                                                        if (subtask.name === task) {
                                                                                                            return (
                                                                                                                <p> 
                                                                                                                    {Object.keys(subtask.tasklist).map((key) => {
                                                                                                                    const subtaskItem = subtask.tasklist[key];
                                                                                                                    return <p key={key}>{key} - {subtaskItem}</p>;
                                                                                                                    })}
                                                                                                                </p>
                                                                                                            )
                                                                                                        }
                                                                                                    })}
                                                                                                    


                                                                                                </div>


                                                                                            </div>
                                                                                            <div className="form-group mx-sm-3 mb-2 col-2">
                                                                                                <form className="form-inline">
                                                                                                    <input type="text" className="form-control" placeholder={checklist.tasklist[task]} />
                                                                                                </form>
                                                                                            </div>

                                                                                            <div className="col-1 justify-content-end">
                                                                                                <button type="button" className="btn-close close-icon justify-content-right" aria-label="Close" onClick={() => { deleteTodo(task, checklist._id); }}></button>
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
                                        })}
                                    </motion.div>
                                </AnimatePresence>
                            </main>
                        </div>
                    }
                </div>
            </div>
        </div >
    );

}


export default Parent;