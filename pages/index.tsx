import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Link　href="/stocks">
        <a >株価一覧ページへ</a>
      </Link>
    </div>
  );
};

export default Home;
