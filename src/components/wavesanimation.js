import * as React from "react";
import { motion } from "framer-motion";
import styles from '../styles/utils.module.css';

const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2
        }
    }
};

const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1
    }
};

export const Animation = () => (
    <div className={styles.bigcontainer}>
        <motion.ul
            className={styles.container1}
            variants={container}
            initial="hidden"
            animate="visible">
            {[0, 1, 2, 3].map((index) => (
                <motion.li key={index} className={styles.item} variants={item} />
            ))}
        </motion.ul>
    </div>
);


export default Animation;