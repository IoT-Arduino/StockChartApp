import { useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export async function getServerSideProps(context:any) {
  const reqList = await fetch(`http://localhost:3000/stock/8001.json`);
  const priceData = await reqList.json();
  return {
    props: {
      priceData,
    },
  };
}

const Home: NextPage = ({ priceData }:any) => {

  return (
    <div className={styles.container}>
      <Link href="/stocks">
        <a>株価一覧ページへ</a>
      </Link>
    </div>
  );
};

export default Home;
