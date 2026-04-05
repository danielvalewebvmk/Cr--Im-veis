import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Bed, Bath, Car, Maximize, DoorOpen, Heart } from 'lucide-react';
import { PROPERTIES } from '../constants/properties';

interface PropertyCardProps {
  prop: typeof PROPERTIES[0];
  onClick: () => void | Promise<void>;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ prop, onClick, isFavorite, onToggleFavorite }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer border border-marromescuro/5"
    >
      <div className="relative h-72 overflow-hidden">
        <motion.img 
          src={prop.image} 
          alt={prop.title} 
          className="w-full h-full object-cover"
          animate={{ 
            filter: isHovered ? "blur(6px)" : "blur(0px)"
          }}
          transition={{ duration: 0.4 }}
          referrerPolicy="no-referrer"
        />
        
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-black/10"
            >
              <button className="bg-white text-marromescuro px-8 py-3 rounded-full flex items-center gap-2 font-bold shadow-2xl transition-all hover:bg-brancobg cursor-pointer group/btn">
                <DoorOpen className="w-5 h-5 text-terracota transition-transform group-hover/btn:scale-125" />
                <span>Ver de perto</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-6 space-y-6">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-marromescuro tracking-tight">{prop.title}</h3>
          <div className="flex items-center gap-1.5 text-marromescuro/40 text-sm">
            <MapPin className="w-4 h-4 text-terracota" />
            <span>{prop.location}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-4 gap-x-2 pt-4 border-t border-marromescuro/5">
          <div className="flex items-center gap-2 text-marromescuro/60 text-sm font-medium">
            <Bed className="w-4 h-4 text-terracota" />
            <span>{prop.beds} Suítes</span>
          </div>
          <div className="flex items-center gap-2 text-marromescuro/60 text-sm font-medium">
            <Car className="w-4 h-4 text-terracota" />
            <span>{prop.parking} Vagas</span>
          </div>
          <div className="flex items-center gap-2 text-marromescuro/60 text-sm font-medium">
            <Bath className="w-4 h-4 text-terracota" />
            <span>{prop.baths} Banheiros</span>
          </div>
          <div className="flex items-center gap-2 text-marromescuro/60 text-sm font-medium">
            <Maximize className="w-4 h-4 text-terracota" />
            <span>{prop.area}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-marromescuro/10">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-marromescuro/30 font-bold">Valor do Investimento</span>
            <span className="text-2xl font-bold text-marromescuro">{prop.price}</span>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(e);
            }}
            className="p-2 rounded-full hover:bg-marromescuro/5 transition-colors group/fav"
          >
            <Heart 
              className={`w-6 h-6 transition-all transform group-hover/fav:scale-125 ${isFavorite ? 'fill-[#300B00] text-[#300B00]' : 'text-marromescuro/20 group-hover/fav:text-marromescuro/40'}`} 
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
