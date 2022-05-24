import type { ReactNode } from "react";
import { Footer } from "./footer";
// import { Header } from "./header";
import  HeaderNav  from "./HeaderNav";


type Props = {
    children: ReactNode;
};


export const LayoutWrapper = (props: Props) => {
    return (
    <div className="flex-column min-h-screen">
        <HeaderNav />
        <div className="container px-4 text-gray-600 mx-auto max-w-7xl">
            <div>{props.children}</div>
        </div>
        <div className="mt-40">
        <Footer />
        </div>
    </div>
    );
};