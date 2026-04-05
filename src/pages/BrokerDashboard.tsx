import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useProperties } from '../context/PropertyContext';
import { useBrokers } from '../context/BrokerContext';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Users, 
  Home, 
  DollarSign, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight,
  Filter,
  Download,
  MoreHorizontal,
  Plus,
  Search,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  Menu,
  X,
  Trash2,
  Edit,
  ExternalLink,
  MapPin,
  Bed,
  Bath,
  Car,
  Maximize,
  User,
  Phone,
  Info,
  Mail,
  Save,
  Image as ImageIcon,
  Video,
  Trash,
  FileText,
  Play
} from 'lucide-react';
import { CATEGORIES } from '../constants/categories';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Dados simulados para o Dashboard Imobiliário
const salesData = [
  { name: 'Jan', sales: 4200, leads: 2100 },
  { name: 'Fev', sales: 3800, leads: 1800 },
  { name: 'Mar', sales: 5100, leads: 3200 },
  { name: 'Abr', sales: 4800, leads: 2900 },
  { name: 'Mai', sales: 6200, leads: 4100 },
  { name: 'Jun', sales: 5900, leads: 3800 },
  { name: 'Jul', sales: 7500, leads: 5200 },
];

const propertyTypeData = [
  { name: 'Casas de Luxo', value: 45 },
  { name: 'Apartamentos', value: 30 },
  { name: 'Terrenos', value: 15 },
  { name: 'Comercial', value: 10 },
];

const COLORS = ['#8FA603', '#374001', '#B8860B', '#D2B48C'];

const recentLeads = [
  { id: 1, name: 'João Silva', email: 'joao.silva@email.com', property: 'Mansão no Joá', status: 'Novo', date: '10:30', avatar: 'JS' },
  { id: 2, name: 'Maria Oliveira', email: 'maria.o@email.com', property: 'Cobertura Leblon', status: 'Em Contato', date: '09:15', avatar: 'MO' },
  { id: 3, name: 'Carlos Santos', email: 'carlos.s@email.com', property: 'Casa em Búzios', status: 'Agendado', date: 'Ontem', avatar: 'CS' },
  { id: 4, name: 'Ana Costa', email: 'ana.costa@email.com', property: 'Apartamento Ipanema', status: 'Proposta', date: 'Ontem', avatar: 'AC' },
];

const initialProperties = [
  { id: 1, title: 'Mansão Suspensa no Joá', price: 'R$ 12.500.000', location: 'Joá, Rio de Janeiro', type: 'Casa', status: 'Ativo', image: 'https://i.imgur.com/pe07Ikg.png' },
  { id: 2, title: 'Cobertura Duplex Leblon', price: 'R$ 8.900.000', location: 'Leblon, Rio de Janeiro', type: 'Apartamento', status: 'Ativo', image: 'https://i.imgur.com/W10YtDm.png' },
  { id: 3, title: 'Casa de Praia em Búzios', price: 'R$ 4.200.000', location: 'Geribá, Búzios', type: 'Casa', status: 'Vendido', image: 'https://i.imgur.com/pe07Ikg.png' },
  { id: 4, title: 'Apartamento Vista Mar Ipanema', price: 'R$ 6.700.000', location: 'Ipanema, Rio de Janeiro', type: 'Apartamento', status: 'Ativo', image: 'https://i.imgur.com/W10YtDm.png' },
];

export default function BrokerDashboard() {
  const navigate = useNavigate();
  const { properties, addProperty, removeProperty, updateProperty } = useProperties();
  const { brokers, addBroker, removeBroker, updateBroker } = useBrokers();
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPropertyId, setEditingPropertyId] = useState<number | null>(null);

  // Broker Management
  const [isBrokerModalOpen, setIsBrokerModalOpen] = useState(false);
  const [isEditingBroker, setIsEditingBroker] = useState(false);
  const [editingBrokerId, setEditingBrokerId] = useState<number | null>(null);

  const [newBrokerData, setNewBrokerData] = useState({
    name: '',
    role: '',
    photo: '',
    phone: '',
    email: '',
    bio: ''
  });

  const handleEditBroker = (broker: any) => {
    setNewBrokerData(broker);
    setEditingBrokerId(broker.id);
    setIsEditingBroker(true);
    setIsBrokerModalOpen(true);
  };

  const handleSaveBroker = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditingBroker && editingBrokerId !== null) {
      updateBroker(editingBrokerId, newBrokerData);
    } else {
      addBroker(newBrokerData);
    }
    setIsBrokerModalOpen(false);
    setIsEditingBroker(false);
    setEditingBrokerId(null);
    setNewBrokerData({ name: '', role: '', photo: '', phone: '', email: '', bio: '' });
  };

  const handleDeleteBroker = (id: number) => {
    if (window.confirm('Tem certeza que deseja remover este corretor?')) {
      removeBroker(id);
    }
  };
  const [propertyToDelete, setPropertyToDelete] = useState<number | null>(null);
  const [newPropertyData, setNewPropertyData] = useState({
    title: '',
    location: '',
    price: '',
    beds: 0,
    baths: 0,
    parking: 0,
    area: '',
    description: '',
    broker: 'Daniel CEO',
    category: `${CATEGORIES[0].label1} ${CATEGORIES[0].label2}`,
    categorySlug: CATEGORIES[0].slug,
    ownerName: '',
    ownerPhone: '',
    ownerAddress: '',
    additionalInfo: '',
    image: 'https://i.imgur.com/pe07Ikg.png',
    images: [''],
    videoUrl: '',
    pdfUrl: '',
    status: 'Ativo',
    rooms: 0,
    motoParking: 0,
    hasGourmetBalcony: false,
    elevators: 0,
    hasLavabo: false,
    hasHeatedPool: false,
    hasSauna: false
  });

  const handlePriceChange = (value: string) => {
    const cleanValue = value.replace(/\D/g, '');
    if (!cleanValue) {
      setNewPropertyData({ ...newPropertyData, price: '' });
      return;
    }
    const formatted = new Intl.NumberFormat('pt-BR').format(parseInt(cleanValue));
    setNewPropertyData({ ...newPropertyData, price: `R$ ${formatted}` });
  };

  const handleAreaChange = (value: string) => {
    const cleanValue = value.replace(/\D/g, '');
    setNewPropertyData({
      ...newPropertyData,
      area: cleanValue ? `${cleanValue}m²` : ''
    });
  };

  const handleAddImageField = () => {
    if (newPropertyData.images.length < 20) {
      setNewPropertyData({
        ...newPropertyData,
        images: [...newPropertyData.images, '']
      });
    }
  };

  const handleRemoveImageField = (index: number) => {
    const updatedImages = newPropertyData.images.filter((_, i) => i !== index);
    setNewPropertyData({
      ...newPropertyData,
      images: updatedImages.length > 0 ? updatedImages : ['']
    });
  };

  const handleImageChange = (index: number, value: string) => {
    const updatedImages = [...newPropertyData.images];
    updatedImages[index] = value;
    setNewPropertyData({
      ...newPropertyData,
      images: updatedImages
    });
  };

  const handleDeleteProperty = (id: number) => {
    setPropertyToDelete(id);
  };

  const confirmDelete = () => {
    if (propertyToDelete !== null) {
      removeProperty(propertyToDelete);
      setPropertyToDelete(null);
    }
  };

  const handleAddProperty = () => {
    setIsEditing(false);
    setEditingPropertyId(null);
    setNewPropertyData({
      title: '',
      location: '',
      price: '',
      beds: 0,
      baths: 0,
      parking: 0,
      area: '',
      description: '',
      broker: 'Daniel CEO',
      category: `${CATEGORIES[0].label1} ${CATEGORIES[0].label2}`,
      categorySlug: CATEGORIES[0].slug,
      ownerName: '',
      ownerPhone: '',
      ownerAddress: '',
      additionalInfo: '',
      image: 'https://i.imgur.com/pe07Ikg.png',
      images: [''],
      videoUrl: '',
      pdfUrl: '',
      status: 'Ativo',
      rooms: 0,
      motoParking: 0,
      hasGourmetBalcony: false,
      elevators: 0,
      hasLavabo: false,
      hasHeatedPool: false,
      hasSauna: false
    });
    setIsAddModalOpen(true);
  };

  const handleEditProperty = (property: any) => {
    setIsEditing(true);
    setEditingPropertyId(property.id);
    setNewPropertyData({
      title: property.title,
      location: property.location,
      price: property.price,
      beds: property.beds,
      baths: property.baths,
      parking: property.parking,
      area: property.area,
      description: property.description || '',
      broker: property.broker || 'Daniel CEO',
      category: property.category,
      categorySlug: property.categorySlug,
      ownerName: property.ownerName || '',
      ownerPhone: property.ownerPhone || '',
      ownerAddress: property.ownerAddress || '',
      additionalInfo: property.additionalInfo || '',
      image: property.image,
      images: property.images || [property.image],
      videoUrl: property.videoUrl || '',
      pdfUrl: property.pdfUrl || '',
      status: property.status || 'Ativo',
      rooms: property.rooms || 0,
      motoParking: property.motoParking || 0,
      hasGourmetBalcony: property.hasGourmetBalcony || false,
      elevators: property.elevators || 0,
      hasLavabo: property.hasLavabo || false,
      hasHeatedPool: property.hasHeatedPool || false,
      hasSauna: property.hasSauna || false
    });
    setIsAddModalOpen(true);
  };

  const handleSaveProperty = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Ensure the main 'image' field matches the first image in the 'images' array if provided
    const propertyToSave = {
      ...newPropertyData,
      image: newPropertyData.images.length > 0 && newPropertyData.images[0] !== '' 
        ? newPropertyData.images[0] 
        : newPropertyData.image
    };

    // Double check if image is still empty or default, and we have images array
    if ((!propertyToSave.image || propertyToSave.image.includes('pe07Ikg.png')) && propertyToSave.images.length > 0 && propertyToSave.images[0] !== '') {
      propertyToSave.image = propertyToSave.images[0];
    }

    if (isEditing && editingPropertyId !== null) {
      updateProperty(editingPropertyId, propertyToSave);
    } else {
      addProperty(propertyToSave);
    }
    setIsAddModalOpen(false);
    setIsEditing(false);
    setEditingPropertyId(null);
    // Reset form
    setNewPropertyData({
      title: '',
      location: '',
      price: '',
      beds: 0,
      baths: 0,
      parking: 0,
      area: '',
      description: '',
      broker: 'Daniel CEO',
      category: `${CATEGORIES[0].label1} ${CATEGORIES[0].label2}`,
      categorySlug: CATEGORIES[0].slug,
      ownerName: '',
      ownerPhone: '',
      ownerAddress: '',
      additionalInfo: '',
      image: 'https://i.imgur.com/pe07Ikg.png',
      images: [''],
      videoUrl: '',
      pdfUrl: '',
      status: 'Ativo',
      rooms: 0,
      motoParking: 0,
      hasGourmetBalcony: false,
      elevators: 0,
      hasLavabo: false,
      hasHeatedPool: false,
      hasSauna: false
    });
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col lg:flex-row">
      
      {/* Sidebar - Desktop & Mobile */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-100 flex flex-col transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:h-screen
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-8">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#8FA603] rounded-xl flex items-center justify-center shadow-lg shadow-[#8FA603]/20">
                <Home className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-black tracking-tighter text-[#1A1A1A]">CR <span className="text-[#8FA603]">DASH</span></span>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <nav className="space-y-2">
            {[
              { id: 'overview', label: 'Visão Geral', icon: LayoutDashboard },
              { id: 'properties', label: 'Meus Imóveis', icon: Home },
              { id: 'brokers', label: 'Corretores', icon: Users },
              { id: 'leads', label: 'Leads & Clientes', icon: Users },
              { id: 'calendar', label: 'Agenda', icon: Calendar },
              { id: 'reports', label: 'Relatórios', icon: TrendingUp },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (window.innerWidth < 1024) setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                  activeTab === item.id 
                    ? 'bg-[#8FA603]/10 text-[#8FA603]' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-8 border-t border-gray-50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-700">
              DC
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Daniel CEO</p>
              <p className="text-xs text-gray-500">Proprietário</p>
            </div>
          </div>
          <button 
            onClick={() => setIsLogoutModalOpen(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Sair do Sistema
          </button>
        </div>
      </aside>

      {/* Add Property Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-6 bg-[#8FA603] text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    {isEditing ? <Edit className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                  </div>
                  <h3 className="text-xl font-black">{isEditing ? 'Editar Imóvel' : 'Incluir Novo Imóvel'}</h3>
                </div>
                <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-all">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSaveProperty} className="flex-1 overflow-y-auto p-8 space-y-8">
                {/* Basic Info */}
                <div className="space-y-6">
                  <h4 className="text-sm font-black text-[#8FA603] uppercase tracking-widest flex items-center gap-2">
                    <Info className="w-4 h-4" /> Informações Básicas
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase ml-1">Nome do Imóvel</label>
                      <input 
                        required
                        type="text" 
                        value={newPropertyData.title}
                        onChange={(e) => setNewPropertyData({...newPropertyData, title: e.target.value})}
                        placeholder="Ex: Mansão Luxury"
                        className="w-full bg-gray-50 border-none rounded-2xl py-3 px-4 text-sm focus:ring-2 focus:ring-[#8FA603]/20 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase ml-1">Valor de Venda</label>
                      <input 
                        required
                        type="text" 
                        value={newPropertyData.price}
                        onChange={(e) => handlePriceChange(e.target.value)}
                        placeholder="Ex: R$ 3.500.000"
                        className="w-full bg-gray-50 border-none rounded-2xl py-3 px-4 text-sm focus:ring-2 focus:ring-[#8FA603]/20 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-bold text-gray-500 uppercase ml-1">Endereço (Bairro, Cidade, Estado)</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                          required
                          type="text" 
                          value={newPropertyData.location}
                          onChange={(e) => setNewPropertyData({...newPropertyData, location: e.target.value})}
                          placeholder="Ex: AlphaVille, Juiz de Fora - MG"
                          className="w-full bg-gray-50 border-none rounded-2xl py-3 pl-11 pr-4 text-sm focus:ring-2 focus:ring-[#8FA603]/20 outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Characteristics */}
                <div className="space-y-6">
                  <h4 className="text-sm font-black text-[#8FA603] uppercase tracking-widest flex items-center gap-2">
                    <Maximize className="w-4 h-4" /> Características
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase ml-1 flex items-center gap-1"><Bed className="w-3 h-3" /> Suítes</label>
                      <input 
                        type="number" 
                        value={newPropertyData.beds}
                        onChange={(e) => setNewPropertyData({...newPropertyData, beds: parseInt(e.target.value) || 0})}
                        className="w-full bg-gray-50 border-none rounded-2xl py-3 px-4 text-sm focus:ring-2 focus:ring-[#8FA603]/20 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase ml-1 flex items-center gap-1"><Car className="w-3 h-3" /> Vagas</label>
                      <input 
                        type="number" 
                        value={newPropertyData.parking}
                        onChange={(e) => setNewPropertyData({...newPropertyData, parking: parseInt(e.target.value) || 0})}
                        className="w-full bg-gray-50 border-none rounded-2xl py-3 px-4 text-sm focus:ring-2 focus:ring-[#8FA603]/20 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase ml-1 flex items-center gap-1"><Bath className="w-3 h-3" /> Banheiros</label>
                      <input 
                        type="number" 
                        value={newPropertyData.baths}
                        onChange={(e) => setNewPropertyData({...newPropertyData, baths: parseInt(e.target.value) || 0})}
                        className="w-full bg-gray-50 border-none rounded-2xl py-3 px-4 text-sm focus:ring-2 focus:ring-[#8FA603]/20 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase ml-1 flex items-center gap-1"><Maximize className="w-3 h-3" /> m²</label>
                      <input 
                        type="text" 
                        value={newPropertyData.area}
                        onChange={(e) => handleAreaChange(e.target.value)}
                        placeholder="Ex: 850m²"
                        className="w-full bg-gray-50 border-none rounded-2xl py-3 px-4 text-sm focus:ring-2 focus:ring-[#8FA603]/20 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase ml-1 flex items-center gap-1"><Bed className="w-3 h-3" /> Quartos</label>
                      <input 
                        type="number" 
                        value={newPropertyData.rooms}
                        onChange={(e) => setNewPropertyData({...newPropertyData, rooms: parseInt(e.target.value) || 0})}
                        className="w-full bg-gray-50 border-none rounded-2xl py-3 px-4 text-sm focus:ring-2 focus:ring-[#8FA603]/20 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase ml-1 flex items-center gap-1"><Car className="w-3 h-3" /> Vaga p/ Moto</label>
                      <input 
                        type="number" 
                        value={newPropertyData.motoParking}
                        onChange={(e) => setNewPropertyData({...newPropertyData, motoParking: parseInt(e.target.value) || 0})}
                        className="w-full bg-gray-50 border-none rounded-2xl py-3 px-4 text-sm focus:ring-2 focus:ring-[#8FA603]/20 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase ml-1 flex items-center gap-1"><ArrowUpRight className="w-3 h-3" /> Elevadores</label>
                      <input 
                        type="number" 
                        value={newPropertyData.elevators}
                        onChange={(e) => setNewPropertyData({...newPropertyData, elevators: parseInt(e.target.value) || 0})}
                        className="w-full bg-gray-50 border-none rounded-2xl py-3 px-4 text-sm focus:ring-2 focus:ring-[#8FA603]/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Feature Toggles */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'Varanda Gourmet', key: 'hasGourmetBalcony' },
                      { label: 'Lavabo', key: 'hasLavabo' },
                      { label: 'Piscina Aquecida', key: 'hasHeatedPool' },
                      { label: 'Sauna', key: 'hasSauna' },
                    ].map((feature) => (
                      <button
                        key={feature.key}
                        type="button"
                        onClick={() => setNewPropertyData({
                          ...newPropertyData, 
                          [feature.key]: !newPropertyData[feature.key as keyof typeof newPropertyData]
                        })}
                        className={`flex items-center justify-center gap-2 p-3 rounded-2xl text-xs font-bold transition-all border-2 ${
                          newPropertyData[feature.key as keyof typeof newPropertyData]
                            ? 'bg-[#8FA603]/10 border-[#8FA603] text-[#8FA603]'
                            : 'bg-gray-50 border-transparent text-gray-400 hover:bg-gray-100'
                        }`}
                      >
                        {feature.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Photos, Video and PDF */}
                <div className="space-y-6">
                  <h4 className="text-sm font-black text-[#8FA603] uppercase tracking-widest flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" /> Mídia (Fotos, Vídeo e PDF)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Photos Section */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-gray-500 uppercase ml-1">Links das Fotos (Máx. 20)</label>
                        {newPropertyData.images.length < 20 && (
                          <button
                            type="button"
                            onClick={handleAddImageField}
                            className="p-1.5 bg-[#8FA603]/10 text-[#8FA603] rounded-lg hover:bg-[#8FA603]/20 transition-all"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 no-scrollbar">
                        {newPropertyData.images.map((img, index) => (
                          <div key={index} className="flex gap-2">
                            <div className="relative flex-1">
                              <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                              <input 
                                type="text" 
                                value={img}
                                onChange={(e) => handleImageChange(index, e.target.value)}
                                placeholder={`Link da foto ${index + 1}`}
                                className="w-full bg-gray-50 border-none rounded-2xl py-3 pl-11 pr-4 text-sm focus:ring-2 focus:ring-[#8FA603]/20 outline-none transition-all"
                              />
                            </div>
                            {newPropertyData.images.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveImageField(index)}
                                className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-100 transition-all"
                              >
                                <Trash className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Video & PDF Section */}
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase ml-1">Link do Vídeo (Máx. 1)</label>
                        <div className="relative">
                          <Video className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input 
                            type="text" 
                            value={newPropertyData.videoUrl}
                            onChange={(e) => setNewPropertyData({...newPropertyData, videoUrl: e.target.value})}
                            placeholder="Link do vídeo (YouTube, Vimeo, etc.)"
                            className="w-full bg-gray-50 border-none rounded-2xl py-3 pl-11 pr-4 text-sm focus:ring-2 focus:ring-[#8FA603]/20 outline-none transition-all"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase ml-1">Link do PDF (Catálogo/Planta)</label>
                        <div className="relative">
                          <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input 
                            type="text" 
                            value={newPropertyData.pdfUrl}
                            onChange={(e) => setNewPropertyData({...newPropertyData, pdfUrl: e.target.value})}
                            placeholder="Link do PDF (Google Drive, Dropbox, etc.)"
                            className="w-full bg-gray-50 border-none rounded-2xl py-3 pl-11 pr-4 text-sm focus:ring-2 focus:ring-[#8FA603]/20 outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div className="p-4 bg-blue-50 rounded-2xl">
                        <p className="text-[10px] font-bold text-blue-600 uppercase mb-1">Dica</p>
                        <p className="text-xs text-blue-500 leading-relaxed">
                          Utilize links diretos de imagens e links públicos para PDFs (Google Drive, Dropbox) para que seus clientes possam baixar o catálogo.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Category & Broker */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h4 className="text-sm font-black text-[#8FA603] uppercase tracking-widest">Categoria</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setNewPropertyData({
                            ...newPropertyData, 
                            category: `${cat.label1} ${cat.label2}`, 
                            categorySlug: cat.slug 
                          })}
                          className={`flex items-center gap-2 p-3 rounded-2xl text-xs font-bold border-2 transition-all ${
                            newPropertyData.categorySlug === cat.slug 
                              ? 'border-[#8FA603] bg-[#8FA603]/5 text-[#8FA603]' 
                              : 'border-gray-50 bg-gray-50 text-gray-500 hover:border-gray-200'
                          }`}
                        >
                          <cat.icon className="w-4 h-4" />
                          <span className="truncate">{cat.label2}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h4 className="text-sm font-black text-[#8FA603] uppercase tracking-widest">Corretor Responsável</h4>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase ml-1">Selecionar Corretor</label>
                      <select 
                        value={newPropertyData.broker}
                        onChange={(e) => setNewPropertyData({...newPropertyData, broker: e.target.value})}
                        className="w-full bg-gray-50 border-none rounded-2xl py-3 px-4 text-sm focus:ring-2 focus:ring-[#8FA603]/20 outline-none transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Selecione um corretor...</option>
                        {brokers.map((broker) => (
                          <option key={broker.id} value={broker.name}>
                            {broker.name} - {broker.role}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase ml-1">Sobre o Imóvel (Descrição)</label>
                      <textarea 
                        rows={4}
                        value={newPropertyData.description}
                        onChange={(e) => setNewPropertyData({...newPropertyData, description: e.target.value})}
                        placeholder="Descreva os detalhes do imóvel..."
                        className="w-full bg-gray-50 border-none rounded-2xl py-3 px-4 text-sm focus:ring-2 focus:ring-[#8FA603]/20 outline-none transition-all resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Internal Info (Dashboard Only) */}
                <div className="p-8 bg-gray-50 rounded-[32px] space-y-6 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                      <Users className="w-4 h-4" /> Informações Internas (Não aparecem no site)
                    </h4>
                    <span className="px-3 py-1 bg-amber-100 text-amber-700 text-[10px] font-black rounded-full uppercase">Privado</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase ml-1 flex items-center gap-1"><User className="w-3 h-3" /> Nome do Proprietário</label>
                      <input 
                        type="text" 
                        value={newPropertyData.ownerName}
                        onChange={(e) => setNewPropertyData({...newPropertyData, ownerName: e.target.value})}
                        className="w-full bg-white border-none rounded-2xl py-3 px-4 text-sm focus:ring-2 focus:ring-[#8FA603]/20 outline-none transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase ml-1 flex items-center gap-1"><Phone className="w-3 h-3" /> Telefone</label>
                      <input 
                        type="text" 
                        value={newPropertyData.ownerPhone}
                        onChange={(e) => setNewPropertyData({...newPropertyData, ownerPhone: e.target.value})}
                        className="w-full bg-white border-none rounded-2xl py-3 px-4 text-sm focus:ring-2 focus:ring-[#8FA603]/20 outline-none transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase ml-1 flex items-center gap-1"><MapPin className="w-3 h-3" /> Endereço Atual</label>
                      <input 
                        type="text" 
                        value={newPropertyData.ownerAddress}
                        onChange={(e) => setNewPropertyData({...newPropertyData, ownerAddress: e.target.value})}
                        className="w-full bg-white border-none rounded-2xl py-3 px-4 text-sm focus:ring-2 focus:ring-[#8FA603]/20 outline-none transition-all shadow-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">Informações Adicionais</label>
                    <textarea 
                      rows={3}
                      value={newPropertyData.additionalInfo}
                      onChange={(e) => setNewPropertyData({...newPropertyData, additionalInfo: e.target.value})}
                      placeholder="Notas internas sobre o proprietário ou negociação..."
                      className="w-full bg-white border-none rounded-2xl py-3 px-4 text-sm focus:ring-2 focus:ring-[#8FA603]/20 outline-none transition-all resize-none shadow-sm"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="flex-1 py-4 rounded-2xl font-black text-gray-500 hover:bg-gray-50 transition-all"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-2 py-4 bg-[#8FA603] text-white rounded-2xl font-black hover:bg-[#374001] transition-all shadow-xl shadow-[#8FA603]/20"
                  >
                    {isEditing ? 'Salvar Alterações' : 'Salvar Imóvel e Publicar no Site'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {propertyToDelete !== null && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPropertyToDelete(null)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[32px] p-8 shadow-2xl"
            >
              <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Trash2 className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-black text-gray-900 text-center mb-2">Excluir Imóvel?</h3>
              <p className="text-gray-500 text-center font-medium mb-8">
                Esta ação não pode ser desfeita. O imóvel será removido permanentemente do dashboard e do site.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setPropertyToDelete(null)}
                  className="flex-1 py-3.5 rounded-2xl font-bold text-gray-500 hover:bg-gray-50 transition-all"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 py-3.5 bg-red-500 text-white rounded-2xl font-bold hover:bg-red-600 transition-all shadow-lg shadow-red-500/20"
                >
                  Excluir
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {isLogoutModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLogoutModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-[32px] p-8 shadow-2xl text-center"
            >
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <LogOut className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Deseja realmente sair?</h3>
              <p className="text-gray-500 text-sm font-medium mb-8">
                Sua sessão será encerrada e você voltará para a tela inicial.
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 text-white py-4 rounded-2xl font-black text-sm hover:bg-red-600 transition-all shadow-lg shadow-red-500/20"
                >
                  Sim, Sair agora
                </button>
                <button
                  onClick={() => setIsLogoutModalOpen(false)}
                  className="w-full bg-gray-50 text-gray-500 py-4 rounded-2xl font-black text-sm hover:bg-gray-100 transition-all"
                >
                  Cancelar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-auto">
        
        {/* Top Bar */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-30 px-4 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 bg-gray-50 rounded-xl text-gray-500 hover:bg-gray-100 transition-all"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative w-full hidden sm:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Buscar leads, imóveis ou documentos..."
                className="w-full bg-gray-50 border-none rounded-2xl py-2.5 pl-11 pr-4 text-sm focus:ring-2 focus:ring-[#8FA603]/20 outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 ml-4">
            <button className="p-2.5 bg-gray-50 rounded-xl text-gray-500 hover:bg-gray-100 transition-all relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="hidden sm:flex p-2.5 bg-gray-50 rounded-xl text-gray-500 hover:bg-gray-100 transition-all">
              <Settings className="w-5 h-5" />
            </button>
            <div className="hidden sm:block h-8 w-px bg-gray-100 mx-2"></div>
            <button 
              onClick={handleAddProperty}
              className="bg-[#8FA603] text-white px-4 sm:px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#374001] transition-all shadow-lg shadow-[#8FA603]/20 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden md:inline">Novo Cadastro</span>
            </button>
          </div>
        </header>

        <div className="p-4 lg:p-8 max-w-[1600px] mx-auto">
          
          {activeTab === 'overview' ? (
            <>
              {/* Welcome Section */}
              <div className="mb-8 lg:mb-10">
                <h1 className="text-2xl lg:text-3xl font-black text-gray-900 mb-2">Olá, Daniel! 👋</h1>
                <p className="text-sm lg:text-base text-gray-500 font-medium">Aqui está o que está acontecendo com seus imóveis hoje.</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 mb-8 lg:mb-10">
                {[
                  { label: 'Volume de Vendas', value: 'R$ 12.4M', icon: DollarSign, trend: '+18%', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                  { label: 'Leads Ativos', value: '842', icon: Users, trend: '+24%', color: 'text-blue-600', bg: 'bg-blue-50' },
                  { label: 'Imóveis em Pauta', value: '38', icon: Home, trend: '-4%', color: 'text-amber-600', bg: 'bg-amber-50' },
                  { label: 'Taxa de Conversão', value: '4.2%', icon: TrendingUp, trend: '+2%', color: 'text-purple-600', bg: 'bg-purple-50' },
                ].map((stat, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} transition-transform group-hover:scale-110`}>
                        <stat.icon className="w-6 h-6" />
                      </div>
                      <div className={`flex items-center gap-1 text-xs font-black ${stat.trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {stat.trend}
                        {stat.trend.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      </div>
                    </div>
                    <p className="text-gray-500 text-xs font-bold mb-1 uppercase tracking-wider">{stat.label}</p>
                    <p className="text-2xl lg:text-3xl font-black text-gray-900">{stat.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
                
                {/* Chart Section */}
                <div className="xl:col-span-2 space-y-6 lg:space-y-8">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-6 lg:p-8 rounded-[32px] lg:rounded-[40px] shadow-sm border border-gray-100"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                      <div>
                        <h3 className="text-xl font-black text-gray-900">Desempenho Comercial</h3>
                        <p className="text-sm text-gray-500 font-medium">Visualização de crescimento mensal</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-gray-50 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100">7 Dias</button>
                        <button className="px-4 py-2 bg-[#8FA603] rounded-xl text-xs font-bold text-white shadow-lg shadow-[#8FA603]/20">30 Dias</button>
                      </div>
                    </div>
                    
                    <div className="h-[300px] lg:h-[400px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={salesData}>
                          <defs>
                            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#8FA603" stopOpacity={0.2}/>
                              <stop offset="95%" stopColor="#8FA603" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                          <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fill: '#9CA3AF', fontSize: 12, fontWeight: 600}}
                            dy={10}
                          />
                          <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fill: '#9CA3AF', fontSize: 12, fontWeight: 600}}
                          />
                          <Tooltip 
                            contentStyle={{ 
                              borderRadius: '24px', 
                              border: 'none', 
                              boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                              padding: '16px'
                            }}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="sales" 
                            stroke="#8FA603" 
                            strokeWidth={4}
                            fillOpacity={1} 
                            fill="url(#colorSales)" 
                            animationDuration={2000}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>

                  {/* Recent Leads Table */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[32px] lg:rounded-[40px] shadow-sm border border-gray-100 overflow-hidden"
                  >
                    <div className="p-6 lg:p-8 flex items-center justify-between border-b border-gray-50">
                      <div>
                        <h3 className="text-xl font-black text-gray-900">Leads Recentes</h3>
                        <p className="text-sm text-gray-500 font-medium">Interações em tempo real</p>
                      </div>
                      <button className="flex items-center gap-2 text-[#8FA603] font-black text-sm hover:gap-3 transition-all">
                        Ver Todos <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="bg-gray-50/50">
                            <th className="px-6 lg:px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Lead</th>
                            <th className="px-6 lg:px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] hidden md:table-cell">Imóvel</th>
                            <th className="px-6 lg:px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                            <th className="px-6 lg:px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Ações</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {recentLeads.map((lead) => (
                            <tr key={lead.id} className="hover:bg-gray-50/30 transition-colors group">
                              <td className="px-6 lg:px-8 py-5">
                                <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-700 font-black text-xs group-hover:bg-[#8FA603] group-hover:text-white transition-all">
                                    {lead.avatar}
                                  </div>
                                  <div>
                                    <p className="font-black text-gray-900 text-sm">{lead.name}</p>
                                    <p className="text-xs text-gray-500 font-medium hidden sm:block">{lead.email}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 lg:px-8 py-5 hidden md:table-cell">
                                <p className="text-sm font-bold text-gray-700">{lead.property}</p>
                                <p className="text-[10px] text-gray-400 flex items-center gap-1 mt-1">
                                  <Clock className="w-3 h-3" /> Recebido há {lead.date}
                                </p>
                              </td>
                              <td className="px-6 lg:px-8 py-5">
                                <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-2 w-fit ${
                                  lead.status === 'Novo' ? 'bg-blue-50 text-blue-600' :
                                  lead.status === 'Em Contato' ? 'bg-amber-50 text-amber-600' :
                                  lead.status === 'Agendado' ? 'bg-purple-50 text-purple-600' :
                                  'bg-emerald-50 text-emerald-600'
                                }`}>
                                  <div className={`w-1.5 h-1.5 rounded-full ${
                                    lead.status === 'Novo' ? 'bg-blue-600' :
                                    lead.status === 'Em Contato' ? 'bg-amber-600' :
                                    lead.status === 'Agendado' ? 'bg-purple-600' :
                                    'bg-emerald-600'
                                  }`}></div>
                                  {lead.status}
                                </span>
                              </td>
                              <td className="px-6 lg:px-8 py-5 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button className="p-2 bg-gray-50 rounded-xl text-gray-400 hover:text-[#8FA603] hover:bg-[#8FA603]/10 transition-all">
                                    <MessageSquare className="w-4 h-4" />
                                  </button>
                                  <button className="p-2 bg-gray-50 rounded-xl text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all">
                                    <MoreHorizontal className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                </div>

                {/* Sidebar Widgets */}
                <div className="space-y-6 lg:space-y-8">
                  
                  {/* Portfolio Distribution */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white p-6 lg:p-8 rounded-[32px] lg:rounded-[40px] shadow-sm border border-gray-100"
                  >
                    <h3 className="text-xl font-black text-gray-900 mb-6">Distribuição</h3>
                    <div className="h-[200px] lg:h-[240px] w-full mb-8">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={propertyTypeData}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={90}
                            paddingAngle={8}
                            dataKey="value"
                          >
                            {propertyTypeData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="space-y-4">
                      {propertyTypeData.map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 transition-all">
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                            <span className="text-sm text-gray-600 font-bold">{item.name}</span>
                          </div>
                          <span className="text-sm font-black text-gray-900">{item.value}%</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Quick Actions / Tasks */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white p-6 lg:p-8 rounded-[32px] lg:rounded-[40px] shadow-sm border border-gray-100"
                  >
                    <h3 className="text-xl font-black text-gray-900 mb-6">Tarefas do Dia</h3>
                    <div className="space-y-4">
                      {[
                        { title: 'Ligar para João Silva', time: '14:00', type: 'call', done: false },
                        { title: 'Visita: Mansão Joá', time: '16:30', type: 'visit', done: true },
                        { title: 'Enviar contrato Maria', time: '18:00', type: 'doc', done: false },
                      ].map((task, i) => (
                        <div key={i} className={`flex items-center gap-4 p-4 rounded-2xl border ${task.done ? 'bg-gray-50 border-transparent opacity-60' : 'bg-white border-gray-100'}`}>
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${task.done ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-500'}`}>
                            {task.done ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                          </div>
                          <div className="flex-1">
                            <p className={`text-sm font-bold ${task.done ? 'line-through text-gray-400' : 'text-gray-900'}`}>{task.title}</p>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{task.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="w-full mt-6 py-4 border-2 border-dashed border-gray-100 rounded-2xl text-gray-400 text-sm font-bold hover:border-[#8FA603] hover:text-[#8FA603] transition-all flex items-center justify-center gap-2">
                      <Plus className="w-4 h-4" /> Adicionar Tarefa
                    </button>
                  </motion.div>

                </div>
              </div>
            </>
          ) : activeTab === 'brokers' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-black text-gray-900 mb-2">Corretores</h1>
                  <p className="text-sm lg:text-base text-gray-500 font-medium">Gerencie a equipe de corretores da sua imobiliária.</p>
                </div>
                <button 
                  onClick={() => {
                    setIsEditingBroker(false);
                    setNewBrokerData({ name: '', role: '', photo: '', phone: '', email: '', bio: '' });
                    setIsBrokerModalOpen(true);
                  }}
                  className="bg-[#8FA603] text-white px-6 py-3 rounded-2xl font-black text-sm hover:bg-[#374001] transition-all shadow-lg shadow-[#8FA603]/20 flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Adicionar Corretor
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {brokers.map((broker) => (
                  <motion.div
                    key={broker.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-100 group"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={broker.photo} 
                        alt={broker.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-black text-gray-900 leading-tight">{broker.name}</h3>
                          <p className="text-[#8FA603] font-bold text-xs">{broker.role}</p>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <p className="text-xs text-gray-500 font-medium flex items-center gap-2">
                          <Phone className="w-3 h-3" /> {broker.phone}
                        </p>
                        <p className="text-xs text-gray-500 font-medium flex items-center gap-2">
                          <Mail className="w-3 h-3" /> {broker.email}
                        </p>
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-2 mb-4">{broker.bio}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                        <button 
                          onClick={() => handleEditBroker(broker)}
                          className="p-2 bg-gray-50 rounded-xl text-gray-400 hover:text-[#8FA603] hover:bg-[#8FA603]/10 transition-all flex items-center gap-2 text-xs font-bold"
                        >
                          <Edit className="w-4 h-4" /> Editar
                        </button>
                        <button 
                          onClick={() => handleDeleteBroker(broker.id)}
                          className="p-2 bg-red-50 rounded-xl text-red-400 hover:text-red-600 hover:bg-red-100 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : activeTab === 'properties' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-black text-gray-900 mb-2">Meus Imóveis</h1>
                  <p className="text-sm lg:text-base text-gray-500 font-medium">Gerencie seu portfólio de imóveis cadastrados.</p>
                </div>
                <button 
                  onClick={handleAddProperty}
                  className="bg-[#8FA603] text-white px-6 py-3 rounded-2xl font-black text-sm hover:bg-[#374001] transition-all shadow-lg shadow-[#8FA603]/20 flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Incluir Novo Imóvel
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <motion.div
                    key={property.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-100 group"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={property.images && property.images.length > 0 && property.images[0] !== '' ? property.images[0] : property.image} 
                        alt={property.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-[10px] font-black uppercase tracking-wider text-white shadow-xl">
                          {property.broker || 'Daniel CEO'}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-black text-gray-900 leading-tight">{property.title}</h3>
                        <p className="text-[#8FA603] font-black text-sm whitespace-nowrap ml-4">{property.price}</p>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded-lg uppercase tracking-wider">
                          {property.category}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 font-medium mb-4 flex items-center gap-1">
                        <Home className="w-3 h-3" /> {property.location}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleEditProperty(property)}
                            className="p-2 bg-gray-50 rounded-xl text-gray-400 hover:text-[#8FA603] hover:bg-[#8FA603]/10 transition-all"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => navigate(`/imovel/${property.id}`)}
                            className="p-2 bg-gray-50 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        </div>
                        <button 
                          onClick={() => handleDeleteProperty(property.id)}
                          className="p-2 bg-red-50 rounded-xl text-red-400 hover:text-red-600 hover:bg-red-100 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center mb-6">
                <AlertCircle className="w-10 h-10 text-gray-400" />
              </div>
              <h2 className="text-xl font-black text-gray-900 mb-2">Em Desenvolvimento</h2>
              <p className="text-gray-500 font-medium">Esta seção estará disponível em breve.</p>
            </div>
          )}
        </div>

        {/* Broker Modal */}
        <AnimatePresence>
          {isBrokerModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
              >
                <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                  <div>
                    <h2 className="text-2xl font-black text-gray-900">{isEditingBroker ? 'Editar Corretor' : 'Adicionar Corretor'}</h2>
                    <p className="text-sm text-gray-500 font-medium">Preencha as informações do membro da equipe.</p>
                  </div>
                  <button 
                    onClick={() => setIsBrokerModalOpen(false)}
                    className="p-3 hover:bg-white rounded-2xl text-gray-400 hover:text-gray-900 transition-all shadow-sm"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSaveBroker} className="p-8 overflow-y-auto flex-1 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Nome Completo</label>
                      <input 
                        type="text"
                        required
                        value={newBrokerData.name}
                        onChange={(e) => setNewBrokerData({...newBrokerData, name: e.target.value})}
                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#8FA603] transition-all font-bold text-gray-900"
                        placeholder="Ex: Simone Silva"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Cargo / Função</label>
                      <input 
                        type="text"
                        required
                        value={newBrokerData.role}
                        onChange={(e) => setNewBrokerData({...newBrokerData, role: e.target.value})}
                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#8FA603] transition-all font-bold text-gray-900"
                        placeholder="Ex: Corretora Sênior"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Telefone</label>
                      <input 
                        type="text"
                        required
                        value={newBrokerData.phone}
                        onChange={(e) => setNewBrokerData({...newBrokerData, phone: e.target.value})}
                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#8FA603] transition-all font-bold text-gray-900"
                        placeholder="(32) 99999-9999"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">E-mail</label>
                      <input 
                        type="email"
                        required
                        value={newBrokerData.email}
                        onChange={(e) => setNewBrokerData({...newBrokerData, email: e.target.value})}
                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#8FA603] transition-all font-bold text-gray-900"
                        placeholder="simone@email.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">URL da Foto</label>
                    <input 
                      type="url"
                      required
                      value={newBrokerData.photo}
                      onChange={(e) => setNewBrokerData({...newBrokerData, photo: e.target.value})}
                      className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#8FA603] transition-all font-bold text-gray-900"
                      placeholder="https://exemplo.com/foto.jpg"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Biografia / Descrição</label>
                    <textarea 
                      required
                      rows={4}
                      value={newBrokerData.bio}
                      onChange={(e) => setNewBrokerData({...newBrokerData, bio: e.target.value})}
                      className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#8FA603] transition-all font-bold text-gray-900 resize-none"
                      placeholder="Conte um pouco sobre a experiência do corretor..."
                    />
                  </div>

                  <div className="pt-4 flex gap-4">
                    <button 
                      type="button"
                      onClick={() => setIsBrokerModalOpen(false)}
                      className="flex-1 py-4 bg-gray-100 text-gray-500 rounded-2xl font-black text-sm hover:bg-gray-200 transition-all"
                    >
                      Cancelar
                    </button>
                    <button 
                      type="submit"
                      className="flex-2 py-4 bg-[#8FA603] text-white rounded-2xl font-black text-sm hover:bg-[#374001] transition-all shadow-lg shadow-[#8FA603]/20 flex items-center justify-center gap-2"
                    >
                      <Save className="w-5 h-5" />
                      {isEditingBroker ? 'Salvar Alterações' : 'Cadastrar Corretor'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </div>
  );
}
