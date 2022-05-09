import type { ReactNode } from "react";
import { Footer } from "./footer";
import { Header } from "./header";

type Props = {
    children: ReactNode;
};

export const LayoutWrapper = (props: Props) => {
    return (
    <div>
        <div className="container mx-auto min-h-screen">
        <Header />
            <div className="px-4 text-gray-600">
                <div>{props.children}</div>
            </div>
        <Footer />
        </div>
    </div>
    );
};