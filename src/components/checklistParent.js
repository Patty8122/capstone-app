// import "../styles/utils.module.css";
import styles from "../styles/checklistParent.module.css";
import { useState } from "react";
// import { initialTabs as tabs } from "./tabList";
import { motion, AnimatePresence } from "framer-motion";
import { deleteTodo } from "../pages/checklistPage";

// 
const Parent = ({ tabs }) => {
    console.log("tabs: ", tabs);
    const [selectedTab, setSelectedTab] = useState(tabs[0]);




    return (
        <div c  lassName={styles.window}>
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <nav className={styles.nav}>
                            <ul className={styles.tabs}>
                                {tabs.map((item) => (
                                    <li
                                        key={item.label}
                                        className={item === selectedTab ? `${styles.liSelected} ${styles.liButton}` : styles.liButton}
                                        //   style = {{backgroundColor: item === selectedTab ? "#f5f5f5" : ""}}
                                        onClick={() => setSelectedTab(item)}
                                    >
                                        {`${item.icon} ${item.label}`}
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
                                    key={selectedTab ? selectedTab.label : "empty"}
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -10, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {selectedTab && ([selectedTab]).map((checklist) => {
                                        return (
                                            <div className="col-12" id={selectedTab.label}>
                                                <div className="card">
                                                    <div className="card-body">
                                                        <h5 className="card-title">{selectedTab.label}</h5>
                                                        <div key={selectedTab.label}>
                                                            <ul className="list-group list-group-flush text">
                                                                {
                                                                    Object.keys(checklist.tasklist).map((task) => {
                                                                        return (
                                                                            <div className="card card-outline-danger ">
                                                                                <div className="card-block text-left ">
                                                                                    <div className="row justify-content-center p-0 m-0">
                                                                                        <div className="col-11">
                                                                                            <p className="card-text"
                                                                                            >{task} - {checklist.tasklist[task]}</p>
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