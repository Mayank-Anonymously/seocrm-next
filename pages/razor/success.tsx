// pages/success.js

import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Success.module.css";

export default function Success() {
  return (
    <div className="succes_container">
      <Head>
        <title>Success Page</title>
        <meta
          name="description"
          content="Congratulations! You've reached the Success Page!"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/styles.css" />
      </Head>

      <main className="success_main">
        <Image
          src="/success_icon.png"
          alt="Success Icon"
          width={150}
          height={150}
        />
        <h1 className="success_title">Congratulations!</h1>
        <p className="success_description">You've reached the Success Page!</p>
        <p className="success_message">
          Your hard work and determination have paid off.
        </p>
        {/* Add any additional content or functionalities here */}
      </main>
    </div>
  );
}
