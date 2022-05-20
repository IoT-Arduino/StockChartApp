import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo.png";

import {useEffect,useState,useContext}from 'react'
import { UserContext } from "../utils/UserContext";

import { Button } from "@supabase/ui";
import { supabase } from "../utils/supabase";

export const Header = () => {
        const { user, session } = useContext(UserContext);

        return (
        <header className="flex justify-center items-center gap-4 py-6 text-gray-600">
                <Link href="/">
                        <a>
                                <Image src={logo} alt="logo" width={75} height={75} />
                        </a>
                </Link>
                <Link href="/">
                        <a className="text-2xl text-center">
                                <h1 className="m-2">StockChartApp</h1>
                        </a>

                        </Link>
                        <div>
                                <Link href="/stocks">
                                <a>株式一覧</a>
                                </Link>
                        </div>
                             <div>
                                <Link href="/member">
                                <a>会員ページ</a>
                                </Link>
                        </div>

                {!user ? 
                        (<div>
                                 <Link href="/signin">
                                <a className="text-2xl text-right">
                                <p className="m-2">Login</p>
                                </a>
                        </Link></div>
                        ) :
                <div className="w-20">
                        <Button block onClick={() => { supabase.auth.signOut(); }} >サインアウト</Button>
                </div>
                } 
        </header>
        );
};
