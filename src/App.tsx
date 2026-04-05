import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Buy from './pages/Buy';
import Sell from './pages/Sell';
import AltoPadrao from './pages/AltoPadrao';
import About from './pages/About';
import Contact from './pages/Contact';
import PropertyDetail from './pages/PropertyDetail';
import Favorites from './pages/Favorites';
import CategoryResults from './pages/CategoryResults';
import BrokerDashboard from './pages/BrokerDashboard';
import { PropertyProvider } from './context/PropertyContext';
import { BrokerProvider } from './context/BrokerContext';

export default function App() {
  return (
    <PropertyProvider>
      <BrokerProvider>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="comprar" element={<Buy />} />
            <Route path="alugar" element={<Buy />} />
            <Route path="vender" element={<Sell />} />
            <Route path="alto-padrao" element={<AltoPadrao />} />
            <Route path="lancamentos" element={<Buy />} />
            <Route path="exclusivos" element={<Buy />} />
            <Route path="sobre" element={<About />} />
            <Route path="contato" element={<Contact />} />
            <Route path="imovel/:id" element={<PropertyDetail />} />
            <Route path="categoria/:slug" element={<CategoryResults />} />
            <Route path="favoritos" element={<Favorites />} />
            <Route path="dashboard-corretor" element={<BrokerDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </BrokerProvider>
  </PropertyProvider>
);
}
