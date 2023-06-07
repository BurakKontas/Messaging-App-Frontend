import React from "react";
import Head from 'next/head'
import { useRouter } from 'next/router';

import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { Register } from "@/Components/Register";

export default function RegisterScreen() {
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
                <Register />
            </main>
        </>
    )
}