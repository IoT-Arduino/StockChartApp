import React from "react";
import Link from "next/link";
import styles from "../../styles/Home.module.css";

// import dynamic from "next/dynamic";

export async function getServerSideProps() {
  try {
    const reqList = await fetch(
      `http://localhost:3000/stockCode/US-StockListSample100.json`
    );
    const codeList = await reqList.json();
    const codeListSorted = codeList.sort(function (a, b) {
      if (a.Ticker > b.Ticker) {
        return 1;
      } else {
        return -1;
      }
    });
 
    return {
      props: {
        codeList: codeListSorted,
      },
    };
  } catch (err) {
    console.log(err);
  }
}

export default function index({ codeList }) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2 className={styles.title}>株式一覧</h2>
        <ul>
          {codeList.map((code, i) => {
            return (
              <li key={i}>
                <Link href={`/stocks/${code.Ticker}`}>
                  <a>
                    {code.Name}/{code.Ticker}/{code.CIK}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}
