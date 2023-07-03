import React from "react";
import ReactDOM from "react-dom/client";
import styles from "@styles/test.module.scss"
import "@styles/index.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <h1 className={styles.test}>Hello World!</h1>
    </React.StrictMode>
);
