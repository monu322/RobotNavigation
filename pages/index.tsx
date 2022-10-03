import Head from 'next/head';
import dynamic from 'next/dynamic';

import styles from '../styles/index.module.css';


const UiWrapper = dynamic(() => import('../components/ui-wrapper/ui-wrapper.component'), { ssr: false });

const Home = () => {
  return (
    <div className={ styles.container }>
      <Head>
        <title>Robot Map tool</title>
        <meta name="description" content="A basic robot front-end" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={ styles.header }>
        Robot front-end
      </header>

      <main className={ styles.main }>
        <UiWrapper/>
      </main>

      <footer className={ styles.footer }>
        Powered by <a href="https://nextjs.org" target='_blank' rel="noreferrer">Next.js</a>
      </footer>
    </div>
  );
};

export default Home;
