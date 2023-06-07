import React from "react";
import styles from "@/styles/Layout.module.scss";
import { Menu } from "./Menu";
import { Chat } from "./Chat";

type Props = {
    children?: React.ReactNode;
}

const Layout: React.FC<Props> = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles.menu}>
                <Menu />
            </div>
            <div className={styles.content}>
                <Chat />
            </div>
        </div>
    );
};

export default Layout;