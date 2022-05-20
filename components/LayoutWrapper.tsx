import type { ReactNode } from "react";
import { Footer } from "./footer";
import { Header } from "./header";

type Props = {
    children: ReactNode;
};

export const LayoutWrapper = (props: Props) => {
    return (
    <div className="flex-column min-h-screen">
        <Header />
        <div className="container px-4 text-gray-600">
            <div>{props.children}</div>
        </div>
        <div className="mt-40">
            <Footer />
        </div>
    </div>
    );
};