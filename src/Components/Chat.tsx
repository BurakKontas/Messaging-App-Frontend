import React from "react";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import styles from "@/styles/Chat.module.scss";
import { Avatar } from "primereact/avatar";
import * as signalR from "@microsoft/signalr";
import { addMessage } from "@/Redux/Messages/messagesSlice";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { Result } from "@/Types/Result";
import { setPublicKey } from "@/Redux/Keys/keysSlice";
import { Encrypter } from "@/Helpers/encrypt";

export const Chat: React.FC = () => {
    const dispatch = useAppDispatch();
    const { token } = useAppSelector(state => state.token)
    const { id, name } = useAppSelector(state => state.chat)
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [connection, setConnection] = React.useState<signalR.HubConnection>();
    const [messages, setMessages] = React.useState<Map<string, { type: string, text: string, createdAt: string, date: string, user: string }[]>>(new Map());
    const { keys } = useAppSelector(state => state.keys);
    const [encrypter, setEncrypter] = React.useState<Encrypter | null>(null);

    async function GetMessages(page = 0) {
        if (id === undefined || !connection?.state) return;
        let response = await axios.post("http://localhost:3000/api/getmessages", {
            token,
            receiver_id: id,
            page
        });
        let data: Result = response.data;
        if (!data.error) return;
        let messages = data.data;
        console.log(messages)
    }

    async function init() {
        if (token === undefined) return;
        //@ts-ignore
        const conn = new signalR.HubConnectionBuilder()
            .withUrl(
                "http://localhost:5099/hub",
                {
                    withCredentials: true,
                    accessTokenFactory: () => {
                        const accessToken = token.token;
                        return accessToken;
                    },
                }
            )
            .build();
        await conn.start();
        setConnection(conn);
        await GetMessages();
        conn.on("ReceiveMessage", (type, user, message, timestamp, date) => {
            dispatch(addMessage({
                chatId: id!,
                message: {
                    type: type,
                    text: message,
                    createdAt: timestamp,
                    date: date,
                    user: user
                }
            }))
        });
    }

    React.useEffect(() => {
        init();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token])

    React.useEffect(() => {
        GetMessages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    React.useEffect(() => {
        if (name !== undefined)
            setEncrypter(new Encrypter(name!));
        GetMessages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name])

    async function RequestKey() {
        let response = await axios.post("http://localhost:3000/api/key", {
            email: name
        });
        let data: Result = response.data;
        if (data.error) return;
        let key = data.data.public_key;
        dispatch(setPublicKey({
            id: id!,
            key
        }));
        return key;
    }

    async function sendMessage() {
        let message = inputRef.current?.value!;
        let key = "";
        if (message.length === 0) return;
        if (!keys.some(arr => arr.id == id)) {
            key = await RequestKey();
        } else {
            key = keys.find(arr => arr.id == id)?.key!;
        }
        messages?.get("06/06/2023")?.push({
            createdAt: "22:02",
            date: "06/06/2023",
            text: message,
            type: "to",
            user: "test@test.com"
        })
        let encryptedMessage = encrypter?.encryptMessage(message, key);
        console.log(encryptedMessage)
        await axios.post("http://localhost:3000/api/savemessage", {
            token,
            receiver_id: id,
            message: encryptedMessage
        })
        if (connection?.state) {
            connection.send("SendMessage", id, encryptedMessage);
        }
    }

    if (id !== undefined)
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.headerItem}>
                        <p>{name}</p>
                    </div>
                </div>
                <div className={styles.chat}>
                    {messages && Array.from(messages.keys()).map((key) => {
                        return messages.get(key)!.map((message) => {
                            return (
                                <p key={uuid()} className={`${message.type === "from" ? styles.fromMessage : styles.toMessage} ${styles.message}`}>
                                    <p>{message.text}</p>
                                    <p>{message.createdAt}</p>
                                </p>
                            )
                        })
                    })}
                </div>
                <div className={styles.bottom}>
                    <input type="text" placeholder="Message" ref={inputRef}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") sendMessage();
                        }}
                    />
                    <a href="#"
                        onClick={() => sendMessage()}
                    >
                        Send
                    </a>
                </div>
            </div>
        );
};