import React from "react";
import Link from "next/link";
import styles from "../../styles/Home.module.css";

export async function getServerSideProps() {
  try {
    const reqList = await fetch(
      `http://localhost:3000/stockCode/US-StockList.json`
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

  const codeListSP = codeList.filter(item =>{
    return item.SP500 == "SP500" && item.Unlist != "unlist"
  })

  const codeUnlist = codeList.filter(item =>{
    return item.Unlist == "unlist"
  })

  const codeListNSP = codeList.filter(item =>{
    return item.SP500 != "SP500"
  })

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2 className={styles.title}>500株式一覧</h2>
        <ul>
          {codeListSP.map((code, i) => {
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
        <h2 className={styles.title}>Unlist株式一覧</h2>
        <ul>
          {codeUnlist.map((code, i) => {
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
        <h2 className={styles.title}>Not500株式一覧</h2>
        <ul>
          {codeListNSP.map((code, i) => {
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
