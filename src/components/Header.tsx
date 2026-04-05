import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Search, Heart, User } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface HeaderProps {
  isScrolled: boolean;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  isMobileNavOpen: boolean;
  setIsMobileNavOpen: (open: boolean) => void;
  favoritesCount: number;
  onLoginClick: () => void;
}

export default function Header({ isScrolled, isMenuOpen, setIsMenuOpen, isMobileNavOpen, setIsMobileNavOpen, favoritesCount, onLoginClick }: HeaderProps) {
  const navigate = useNavigate();
  const [hasScrolledOnce, setHasScrolledOnce] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isPropertyDetail = location.pathname.startsWith('/imovel/');
  const isTransparentPage = isHome || isPropertyDetail;

  useEffect(() => {
    if (isScrolled && !hasScrolledOnce) {
      setHasScrolledOnce(true);
    }
  }, [isScrolled, hasScrolledOnce]);

  const [isHeartHovered, setIsHeartHovered] = useState(false);
  const [isUserHovered, setIsUserHovered] = useState(false);

  // On transparent pages (home, detail), we show content if scrolled. On other pages, we always show it.
  const shouldShow = isTransparentPage ? (isScrolled || hasScrolledOnce) : true;

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[98%] max-w-[1800px] flex items-center gap-4">
      <motion.nav 
        initial={false}
        animate={{
          backgroundColor: isTransparentPage 
            ? (shouldShow ? "rgba(55, 64, 1, 0.3)" : "rgba(55, 64, 1, 0)")
            : "#374001",
          backdropFilter: isTransparentPage 
            ? (shouldShow ? "blur(16px)" : "blur(0px)")
            : "blur(16px)",
          borderColor: isTransparentPage 
            ? (shouldShow ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0)")
            : "rgba(255, 255, 255, 0.1)",
          borderWidth: "1px",
          boxShadow: isTransparentPage 
            ? (shouldShow ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)" : "0 0px 0px 0px rgba(0, 0, 0, 0)")
            : "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="flex-1 rounded-full py-3 px-8 flex items-center justify-between overflow-hidden border-transparent"
      >
        {/* Logo Section - Fade in on scroll */}
        <AnimatePresence>
          {shouldShow && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/" className="flex items-center gap-3 shrink-0">
                <img 
                  src="https://i.imgur.com/egg4k7M.png" 
                  alt="CR Imóveis" 
                  className="h-10 w-auto"
                  referrerPolicy="no-referrer"
                />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop Menu - Fade in on scroll */}
        <AnimatePresence>
          {shouldShow && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hidden lg:flex items-center gap-8 text-brand-cream/90 text-sm font-medium tracking-wide mx-8 group/nav"
            >
              <Link to="/comprar" className="transition-all duration-300 group-hover/nav:opacity-40 hover:!opacity-100 hover:!text-white">Imóveis</Link>
              <Link to="/alto-padrao" className="transition-all duration-300 group-hover/nav:opacity-40 hover:!opacity-100 hover:!text-white">Alto padrão</Link>
              <Link to="/lancamentos" className="transition-all duration-300 group-hover/nav:opacity-40 hover:!opacity-100 hover:!text-white">Lançamentos</Link>
              <Link to="/sobre" className="transition-all duration-300 group-hover/nav:opacity-40 hover:!opacity-100 hover:!text-white">Sobre</Link>
              <Link to="/contato" className="transition-all duration-300 group-hover/nav:opacity-40 hover:!opacity-100 hover:!text-white">Contato</Link>
              <Link to="/exclusivos" className="transition-all duration-300 group-hover/nav:opacity-40 hover:!opacity-100 hover:!text-white">Quero vender</Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons - Fade in on scroll */}
        <AnimatePresence>
          {shouldShow && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 md:gap-4 shrink-0"
            >
              {/* Desktop Search Button */}
              <button 
                onClick={() => setIsMenuOpen(true)}
                className={`hidden lg:flex items-center gap-2 bg-white text-brand-dark px-6 py-2 rounded-full text-sm font-bold ${isTransparentPage ? 'hover:bg-[#374001]' : 'hover:bg-[#8FA603]'} hover:text-white transition-all shadow-lg cursor-pointer group`}
              >
                <Search className="w-4 h-4 text-[#8FA603] group-hover:text-white group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300" />
                <span>Buscar imóvel</span>
              </button>

              {/* Mobile Action Group (Search + Favorites + Menu) */}
              <div className="flex lg:hidden items-center gap-1 md:gap-2">
                {/* Search Button */}
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-brand-cream p-2 hover:bg-white/10 rounded-full transition-colors relative z-[60] cursor-pointer group/search"
                >
                  <Search className="w-6 h-6 transition-transform group-hover/search:scale-125" />
                </button>

                {/* Favorites Button (Mobile) */}
                <button 
                  onClick={() => navigate('/favoritos')}
                  onMouseEnter={() => setIsHeartHovered(true)}
                  onMouseLeave={() => setIsHeartHovered(false)}
                  className="text-brand-cream p-2 hover:bg-white/10 rounded-full transition-colors relative z-[60] cursor-pointer"
                >
                  <div className="relative">
                    <Heart className="w-6 h-6 fill-white" />
                    {favoritesCount > 0 && (
                      <div className="absolute -top-1 -right-1 bg-[#374001] text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white/20">
                        {favoritesCount}
                      </div>
                    )}
                  </div>
                </button>

                {/* Login Button (Mobile) */}
                <button 
                  onClick={onLoginClick}
                  className="text-brand-cream p-2 hover:bg-white/10 rounded-full transition-colors relative z-[60] cursor-pointer group/login"
                >
                  <User className="w-6 h-6 transition-transform group-hover/login:scale-125" />
                </button>

                {/* Menu Button (Three lines) */}
                <button 
                  onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                  className="text-brand-cream p-2 hover:bg-white/10 rounded-full transition-colors relative z-[60] cursor-pointer"
                >
                  <motion.div
                    animate={isMobileNavOpen ? { rotate: 90 } : { rotate: 0 }}
                    whileHover={{ scale: 1.25 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isMobileNavOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                  </motion.div>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Action Icons - Desktop Only (Outside to the right) */}
      <AnimatePresence>
        {shouldShow && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:flex items-center gap-2 shrink-0"
          >
            {/* Favorites Icon */}
            <button 
              onClick={() => navigate('/favoritos')}
              onMouseEnter={() => setIsHeartHovered(true)}
              onMouseLeave={() => setIsHeartHovered(false)}
              className="relative group cursor-pointer p-2"
            >
              <div className="relative">
                <Heart className="w-7 h-7 text-white fill-white transition-transform group-hover:scale-125 drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]" />
                
                {/* Badge with pulsing green effect */}
                <div className="absolute -top-1.5 -right-1.5 w-5 h-5">
                  {/* Pulse background */}
                  <motion.div
                    animate={isHeartHovered ? {
                      scale: [1, 1.6, 1],
                      opacity: [0.7, 0, 0.7],
                    } : {
                      scale: 1,
                      opacity: 0
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 bg-[#374001] rounded-full"
                  />
                  {/* Main badge circle */}
                  <div className="relative bg-[#374001] text-white text-[10px] font-bold w-full h-full rounded-full flex items-center justify-center border border-white/20 shadow-sm">
                    {favoritesCount}
                  </div>
                </div>
              </div>
            </button>

            {/* Login Icon */}
            <button 
              onClick={onLoginClick}
              onMouseEnter={() => setIsUserHovered(true)}
              onMouseLeave={() => setIsUserHovered(false)}
              className="relative group cursor-pointer p-2"
            >
              <User className="w-7 h-7 text-white transition-transform group-hover:scale-125 drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
