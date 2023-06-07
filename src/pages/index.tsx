import React from "react";
import Head from 'next/head'

import { useAppSelector } from "@/Redux/hooks";
import Layout from "@/Components/Layout";
import { useRouter } from "next/router";

export default function Home() {
    const router = useRouter();
    const { token } = useAppSelector(state => state.token)
    const [control, setControl] = React.useState(false);
    const redirectLogin = () => {
        router.push("/auth/login");
    }

    React.useEffect(() => {
        if (token === undefined) {
            redirectLogin();
            return;
        }
        setControl(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token])

    if (control)
        return (
            <>
                <Head>
                    <title>BayLock</title>
                    <meta name="description" content="whichapps" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <main>
                    <Layout />
                </main>
            </>
        )
}