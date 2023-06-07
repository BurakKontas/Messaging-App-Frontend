import React from "react"
import styles from "@/styles/Card.module.scss";
import { Avatar } from 'primereact/avatar';
import { useAppDispatch } from "@/Redux/hooks";
import { setChat } from "@/Redux/Chat/chatSlice";

type Props = {
    image?: string;
    id: string;
    name: string;
    lastMessage: string;
    lastMessageTime: string;
}

export const Card: React.FC<Props> = (props) => {
    const dispatch = useAppDispatch();

    return (
        <a className={styles.container} href="#" onClick={() => dispatch(setChat({ id: props.id, name: props.name }))}>
            {/* <Avatar className={styles.avatar} image={props.image} size="xlarge" shape="circle" /> */}
            <div className={styles.info}>
                <div className={styles.infoHeader}>
                    <h3 className={styles.name}>{props.name}</h3>
                    <p className={styles.time}>{props.lastMessageTime}</p>
                </div>
                <div className={styles.infoBottom}>
                    <p className={styles.message}>{props.lastMessage}</p>
                </div>
            </div>
        </a>
    )
}