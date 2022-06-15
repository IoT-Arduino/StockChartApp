import Link from "next/link";

export const Footer = () => {
return (
    <footer className="text-gray-600 bg-gray-200 p-4 text-center">
    <small className="inline-block mr-5 text-l">&copy; 2022 TenQチャート</small>
    <Link href="/rules/discraimer">
        <a className="text-xs no-underline">免責事項</a>
    </Link>
    </footer>
    );
};
