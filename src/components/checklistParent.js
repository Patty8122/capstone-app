// import "../styles/utils.module.css";
import styles from "../styles/checklistParent.module.css";
import { useState } from "react";
// import { initialTabs as tabs } from "./tabList";
import { motion, AnimatePresence } from "framer-motion";
import { ChecklistPage } from "../pages/checklistPage";

import { useRef } from 'react';

// 
const Parent = ({ tabs, deleteTodo }) => {
    console.log("tabs: ", tabs);
    const [selectedTab, setSelectedTab] = useState(tabs[0]);



    return (
        <div className={styles.window}>
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <nav className={styles.nav}>
                            <ul className={styles.tabs}>
                                {tabs.map((item) => (
                                    <li
                                        key={item.name}
                                        className={item === selectedTab ? `${styles.liSelected} ${styles.liButton}` : styles.liButton}
                                        //   style = {{backgroundColor: item === selectedTab ? "#f5f5f5" : ""}}
                                        onClick={() => setSelectedTab(item)}
                                    >
                                        {/* {`${item.icon} ${item.name}`} */}
                                        {`${item.name}`}
                                        {item === selectedTab ? (
                                            <motion.div className={styles.underline} layoutId="underline" />
                                        ) : null}
                                    </li>
                                ))}
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
                                        {selectedTab && ([selectedTab]).map((checklist) => {
                                            return (
                                                <div className="col-12" id={selectedTab.name}>
                                                    <div className="card">
                                                        <div className="card-body">
                                                            <h5 className="card-title">{selectedTab.name}</h5>
                                                            <div key={selectedTab.name}>
                                                                <ul className="list-group list-group-flush text">
                                                                    {
                                                                        Object.keys(checklist.tasklist).map((task) => {
                                                                            return (
                                                                                <div className="card card-outline-danger ">
                                                                                    <div className="card-block text-left ">
                                                                                        <div className="row justify-content-center p-0 m-0">
                                                                                            <div className="col-8">
                                                                                                <p className="card-text"
                                                                                                >{task}</p>
                                                                                            </div>
                                                                                            <div className="form-group mx-sm-3 mb-2 col-2">
                                                                                                <form className="form-inline">
                                                                                                    <input type="text" className="form-control" placeholder={checklist.tasklist[task]} />
                                                                                                </form>
                                                                                            </div>

                                                                                            <div className="col-1 justify-content-end">
                                                                                                <button type="button" className="btn-close close-icon justify-content-right" aria-label="Close" onClick={() => { deleteTodo(task); }}></button>
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
        </div>
    );

}


export default Parent;