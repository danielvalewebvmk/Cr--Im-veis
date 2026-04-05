import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { DoorOpen } from 'lucide-react';

interface GalleryItemProps {
  src: string;
  width: string;
  height: string;
  onClick: () => void;
}

export default function GalleryItem({ src, width, height, onClick }: GalleryItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative rounded-[32px] overflow-hidden shadow-xl group"
      style={{ width, height }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.img 
        src={src} 
        className="w-full h-full object-cover" 
        animate={{ 
          filter: isHovered ? "blur(4px)" : "blur(0px)"
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
            className="absolute inset-0 flex items-center justify-center bg-black/20"
          >
              <button 
                onClick={onClick}
                className="bg-white text-brand-dark px-6 py-3 rounded-full flex items-center gap-2 font-bold shadow-2xl transition-all hover:bg-brand-cream cursor-pointer group/btn"
              >
                <DoorOpen className="w-5 h-5 text-brand-rust transition-transform group-hover/btn:scale-125" />
                <span>Ver de perto</span>
              </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
