import React from "react"
import styles from "@/styles/Menu.module.scss";
import { Card } from "./Card";
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import LogoutIcon from '@mui/icons-material/Logout';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import { OverlayPanel } from "primereact/overlaypanel";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { clearToken } from "@/Redux/Token/tokenSlice";
import axios from "axios";
import { useRouter } from "next/router";
import { Result } from "@/Types/Result";
import { v4 as uuid } from 'uuid';

export const Menu = () => {
    const dotRef = React.useRef<OverlayPanel>(null);
    const addRef = React.useRef<OverlayPanel>(null);
    const addInputRef = React.useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.token.token);
    const router = useRouter();

    const [contacts, setContacts] = React.useState<{ id: string, email: string, date: string, message: string }[]>([
        {
            id: "3",
            email: "test2@test.com",
            date: "22:02",
            message: "Hello World Bu bir testtir",
        },
        {
            id: "2",
            email: "test@test.com",
            date: "22:02",
            message: "Hello World Bu bir testtir",
        }
    ]);
    const keys = useAppSelector(state => state.keys.keys)
    const encrypter = useAppSelector(state => state.encrypt.encypter)


    async function addContact() {
        let response = await axios.post("http://localhost:3000/api/addcontact", {
            token,
            contact_id: addInputRef.current?.value
        });
        console.log(response.data)
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3>Chats</h3>
                <div>
                    <IconButton aria-label="dot" className={styles.icon} onClick={(e) => {
                        dotRef.current?.toggle(e);
                    }}>
                        <MoreHorizIcon />
                    </IconButton>
                    <OverlayPanel ref={dotRef}>
                        <div className={styles.dotMenu}>
                            <a
                                href={"#"}
                                onClick={() => {
                                    dispatch(clearToken())
                                    router.push("/login");
                                }}
                                className={styles.logout}
                            >
                                <LogoutIcon />
                                <p>Logout</p>
                            </a>
                        </div>
                    </OverlayPanel>
                    <IconButton aria-label="add" className={styles.icon} onClick={(e) => {
                        addRef.current?.toggle(e);
                    }}>
                        <PlusOneIcon />
                    </IconButton>
                    <OverlayPanel ref={addRef} className={styles.addMenu}>
                        <input type="email" ref={addInputRef} onKeyDown={(event) => {
                            if (event.key === "Enter") addContact()
                        }} />
                        <a href="#" onClick={addContact}>Add Contact</a>
                    </OverlayPanel>
                </div>
            </div>
            <div className={styles.search}>
                <input type="text" placeholder="Search" />
            </div>
            <div className={styles.cards}>
                {contacts.map((contact) => {
                    return (
                        <Card id={contact.id} lastMessage={contact.message} lastMessageTime={contact.date} name={contact.email} key={uuid()} />
                    )
                })}
            </div>
        </div>
    )
} 