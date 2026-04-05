import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-brand-cream py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <Link to="/" className="flex items-center gap-2 font-helvetica">
          <span className="text-2xl font-bold tracking-tight text-white">CLEDAN</span>
          <span className="text-xl font-light text-brand-cream/80 tracking-wide">imóveis</span>
        </Link>
        <div className="flex gap-8 text-sm font-medium tracking-wide">
          <Link to="/comprar" className="hover:text-brand-rust transition-colors uppercase">IMÓVEIS</Link>
          <Link to="/alto-padrao" className="hover:text-brand-rust transition-colors uppercase">ALTO PADRÃO</Link>
          <Link to="/sobre" className="hover:text-brand-rust transition-colors uppercase">SOBRE</Link>
          <Link to="/contato" className="hover:text-brand-rust transition-colors uppercase">CONTATO</Link>
        </div>
        <div className="text-[10px] text-brand-cream/40 uppercase tracking-widest">
          © 2026 CLEDAN IMÓVEIS. TODOS OS DIREITOS RESERVADOS.
        </div>
      </div>
    </footer>
  );
}
