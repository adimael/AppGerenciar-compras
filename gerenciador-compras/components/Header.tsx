import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <Link href="/">Home</Link>
      <Link href="/clientes">Clientes</Link>
      <Link href="/produtos">Produtos</Link>
      <Link href="/compras">Compras</Link>
    </header>
  );
}
