import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css'; // Importa o arquivo de estilos

export default function Home() {
  return (
    <>
      <Head>
        <title>compras.com</title> {/* Altera o título da aba */}
      </Head>
      <div className={styles.container}>
        <h1 className={styles.title}>compras.com</h1> {/* Nome acima da logo */}
        <img
          src="/logo.png" // Coloque a imagem da logo na pasta public
          alt="Logo"
          className={styles.logo}
        />
        <Link href="/clientes">
          <button className={styles.button}>Comprar</button>
        </Link>
      </div>
    </>
  );
}
