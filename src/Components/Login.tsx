import React from "react";
import styles from "@/styles/Login.module.scss";
import axios from 'axios';
import { Result } from "@/Types/Result";
import { useAppDispatch } from "@/Redux/hooks";
import { setToken } from "@/Redux/Token/tokenSlice";
import { emailValidator } from "@/Helpers/emailValidator";
import { passwordValidator } from "@/Helpers/passwordValidator";
import { red } from "@mui/material/colors";
import { useRouter } from "next/router";

// ? kullanıcı adı şifre giriş yeri
// ? hesabın yok mu kayıt ol yeri
// ? şifremi unuttum yeri

export const Login = () => {
    const emailRef = React.useRef<HTMLInputElement>(null);
    const passwordRef = React.useRef<HTMLInputElement>(null);
    const router = useRouter();
    const dispatch = useAppDispatch();

    async function loginRequest() {
        //login işlemi yapılıp jwtler alınacak
        const response = await axios.post("http://localhost:3000/api/auth", {
            username: emailRef.current?.value,
            password: passwordRef.current?.value
        })
        console.log(response)
        const data: Result = response.data;
        if (!data.error) {
            const tokens = data.data;
            dispatch(setToken({
                token: tokens.token,
            }));
            router.push("/");
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.screen}>
                <h2 className={styles.loginText}>LOGIN</h2>
                <div className={styles.credidentals}>
                    <h3>Email</h3>
                    <input type="email" placeholder="E-Mail" ref={emailRef}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") loginRequest();
                        }}
                    />
                    <h3>Password</h3>
                    <input type="password" placeholder="Password" ref={passwordRef}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") loginRequest();
                        }}
                    />
                </div>
                <div className={styles.buttons}>
                    <a className={styles.buttonsLogin} href="#" onClick={loginRequest}>
                        Login
                    </a>
                    {/* <a className={styles.buttonsLogin} href="forgotpassword">
                        Forgot Password
                    </a> */}
                    <div className={styles.buttonsRegister}>
                        <p>New on our platform ?</p>
                        <a href="register" className={styles.link}>Create an account</a>
                    </div>
                </div>
            </div>
        </div>
    )
};