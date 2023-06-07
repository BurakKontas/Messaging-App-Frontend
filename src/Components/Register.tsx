import React from "react";
import styles from "@/styles/Login.module.scss";
import axios from 'axios';
import { Result } from "@/Types/Result";
import { useAppDispatch } from "@/Redux/hooks";
import { setToken } from "@/Redux/Token/tokenSlice";
import { emailValidator } from "@/Helpers/emailValidator";
import { passwordValidator } from "@/Helpers/passwordValidator";
import { useRouter } from "next/router";

// ? kullanıcı adı şifre giriş yeri
// ? hesabın yok mu kayıt ol yeri
// ? şifremi unuttum yeri

export const Register = () => {
    const emailRef = React.useRef<HTMLInputElement>(null);
    const passwordRef = React.useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();
    const router = useRouter();

    async function registerRequest() {
        let emailValidate = emailValidator(emailRef.current?.value!)
        let passwordValidate = passwordValidator(passwordRef.current?.value!)
        // if (!emailValidate || !passwordValidate) return console.log("Hata");
        //login işlemi yapılıp jwtler alınacak
        const response = await axios.post("http://localhost:3000/api/register", {
            username: emailRef.current?.value,
            password: passwordRef.current?.value
        })
        if (response.data.error) return console.log(response.data.error)
        router.push("/auth/login");
    }

    return (
        <div className={styles.container}>
            <div className={styles.screen}>
                <h2 className={styles.loginText}>Register</h2>
                <div className={styles.credidentals}>
                    <h3>Email</h3>
                    <input type="email" placeholder="E-Mail" ref={emailRef}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") registerRequest();
                        }}
                    />
                    <h3>Password</h3>
                    <input type="password" placeholder="Password" ref={passwordRef}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") registerRequest();
                        }}
                    />
                </div>
                <div className={styles.buttons} style={{ marginBottom: "20px" }}>
                    <a className={styles.buttonsLogin} href="#" onClick={registerRequest}>
                        Register
                    </a>
                </div>
            </div>
        </div>
    )
};