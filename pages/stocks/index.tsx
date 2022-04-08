import React from 'react'
import Link from "next/link";
import styles from "../../styles/Home.module.css";

import dynamic from "next/dynamic";

export async function getServerSideProps() {
  const reqList = await fetch(
    `http://localhost:3000/stockCode/edinet-codeList-export.json`
  );
  const codeList = await reqList.json();
  return {
    props: {
      codeList,
    }, 
  };
}

export default function index({codeList}) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2 className={styles.title}>株式一覧</h2>
        <ul>
          {codeList.map((code, i) => {
            return (
              <li key={i}>
                <Link href={`/stocks/${code.securitiesCode}`}>
                  <a>{code.submitterName}/{ code.securitiesCode}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}
