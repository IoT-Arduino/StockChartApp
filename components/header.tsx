import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo.png";

import {useEffect,useState,useContext}from 'react'
import { UserContext } from "../util/UserContext";

export const Header = () => {

const { user, session } = useContext(UserContext);

return (
<header className="flex justify-center gap-4 py-6 text-gray-600 bg›-gray-200">
<Link href="/">
<a>
<Image src={logo} alt="logo" width={75} height={75} />
</a>
</Link>
<Link href="/">
<a className="text-4xl text-center">
                <h1 className="pt-2 m-2">StockChartApp</h1>
</a>
        </Link>

<div>

{!user ? ( <Link href="/signin">
                <a className="text-4xl text-right">
                <p className="pt-2 m-2">サインイン</p>
                </a>
                </Link>
         ) : <h4>サインアウト</h4>} 


                        
</div>
</header>
);
};
