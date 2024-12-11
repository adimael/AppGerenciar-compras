import Header from '../components/Header';
import Footer from '../components/Footer';
import Head from 'next/head';

export default function Compras() {
  return (
    <>

      <Head>
        <title>Compras</title>
      </Head>

      <Header />
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h1>Compras</h1>
        <p>Aqui está a lista de compras realizadas.</p>
      </div>

      <Footer />

    </>
  );
}
