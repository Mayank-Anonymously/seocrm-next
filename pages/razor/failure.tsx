// pages/failure.js

import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Success.module.css"; // Using the same CSS module for styling

export default function Failure() {
  return (
    <div className="succes_container">
      <Head>
        <title>Failure Page</title>
        <meta name="description" content="Oops! Something went wrong." />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/styles.css" />
      </Head>

      <main className="success_main">
        <Image
          src="/failure_icon.png"
          alt="Failure Icon"
          width={150}
          height={150}
        />
        <h1 className="success_title">Oops! Something went wrong.</h1>
        <p className="success_description">
          Unfortunately, you've encountered a failure.
        </p>
        <p className="success_message">
          Don't worry, learn from this setback and keep moving forward.
        </p>
        {/* Add any additional content or functionalities here */}
      </main>
    </div>
  );
}
