import type { ReactNode } from "react";
import { Footer } from "./footer";
// import { Header } from "./header";
import  HeaderNav  from "./headerNav";


type Props = {
    children: ReactNode;
};


export const LayoutWrapper = (props: Props) => {
    return (
    <div className="flex-column min-h-screen max-w-7xl mx-auto">
        <HeaderNav />
        <div className="container px-4 text-gray-600 mx-auto">
            <div>{props.children}</div>
        </div>
        <div className="mt-40">
        <Footer />
        </div>
    </div>
    );
};