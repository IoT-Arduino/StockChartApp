import Link from "next/link";

export const Footer = () => {
return (
    <footer className="text-gray-600 bg-gray-200 p-4 text-center">
    <small className="inline-block mr-5 text-l">&copy; 2022 StockChartApp</small>
        <Link href="/stocks">
          <a>株式情報一覧ページへ</a>
        </Link>
    </footer>
    );
};
