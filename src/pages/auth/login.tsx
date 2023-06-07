import React from "react";
import Head from 'next/head'
import { useRouter } from 'next/router';

import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { Login } from "@/Components/Login";

export default function LoginScreen() {
    const router = useRouter();
    return (
        <>
            <Head>
                <title>BayLock</title>
                <meta name="description" content="BayLock" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Login />
            </main>
        </>
    )
}