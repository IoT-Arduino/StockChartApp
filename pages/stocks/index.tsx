import React from "react";
import Link from "next/link";
import styles from "../../styles/Home.module.css";

// import dynamic from "next/dynamic";

export async function getServerSideProps() {
  try {
    const reqList = await fetch(
      `http://localhost:3000/stockCode/sp-ciklist.json`
    );
    const codeList = await reqList.json();
    return {
      props: {
        codeList,
      },
    };
  } catch (err) {
    console.log(err);
  }
}

export default function index({ codeList }) {
  // console.log(codeList)
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2 className={styles.title}>株式一覧</h2>
        <ul>
          {codeList.map((code, i) => {
            return (
              <li key={i}>
                <Link href={`/stocks/${code.CIK}`}>
                  <a>
                    {code.Security}/{code.Symbol}
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
