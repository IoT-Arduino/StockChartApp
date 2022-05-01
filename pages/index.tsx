import { useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Home: NextPage = ({ priceData }:any) => {

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2 className={styles.title}>StockChartApp Top</h2>
        <Link href="/stocks">
          <a>株価一覧ページへ</a>
        </Link>
      </main>
    </div>
  );
};

export default Home;
