import React, { useState } from 'react';
import { Link, Copy, Lock, ShieldAlert, ArrowRight, LogOut } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';
import { Coordinates } from '../types';
import { extractCoordsFromUrl } from '../utils/geoUtils';

interface HiddenInterfaceProps {
  onCoordsExtracted: (coords: Coordinates) => void;
  onClose: () => void;
}

export const HiddenInterface: React.FC<HiddenInterfaceProps> = ({ onCoordsExtracted, onClose }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [extracted, setExtracted] = useState<Coordinates | null>(null);

  const handleExtract = () => {
    setError('');
    const coords = extractCoordsFromUrl(url);
    
    if (coords) {
      setExtracted(coords);
    } else {
      setError('فشل استخراج الإحداثيات. يرجى استخدام الرابط الكامل من شريط العنوان (ليس الرابط المختصر goo.gl).');
    }
  };

  const copyToClipboard = () => {
    if (extracted) {
      navigator.clipboard.writeText(`${extracted.lat}, ${extracted.lng}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 animate-[fadeIn_0.3s_ease-out]">
      <div className="w-full max-w-lg glass-panel border border-alert/30 rounded-2xl shadow-[0_0_50px_rgba(239,68,68,0.1)] overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Classified Header */}
        <div className="bg-alert/10 border-b border-alert/20 p-4 flex items-center justify-between shrink-0">
           <div className="flex items-center gap-3">
              <ShieldAlert className="text-alert animate-pulse" size={24} />
              <div>
                <h2 className="text-alert font-black tracking-tighter text-lg leading-none">TOP SECRET</h2>
                <p className="text-[10px] text-alert/70 font-mono tracking-widest uppercase">Developer Access Granted</p>
              </div>
           </div>
           <button onClick={onClose} className="text-dim hover:text-white transition-colors" title="إغلاق">
             <Lock size={18} />
           </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto">
          <p className="text-sm text-dim leading-relaxed">
            أدخل رابط خرائط Google الكامل (من شريط العنوان) لاستخراج الإحداثيات الدقيقة وتجاوز التشفير.
          </p>

          <div className="space-y-4">
             <Input 
               label="رابط الهدف (Full Google Maps URL)"
               placeholder="https://www.google.com/maps/place/..."
               value={url}
               onChange={(e) => setUrl(e.target.value)}
               icon={<Link size={16} />}
               className="border-alert/20 focus:border-alert/50 focus:shadow-[0_0_15px_rgba(239,68,68,0.15)]"
               dir="ltr"
             />

             <Button variant="danger" onClick={handleExtract} className="w-full">
               استخراج الإحداثيات
             </Button>
          </div>

          {error && (
             <div className="text-xs text-alert font-mono border-r-2 border-alert px-2 bg-alert/5 p-2 rounded">
               {error}
             </div>
          )}

          {extracted && (
            <div className="bg-black/40 rounded-lg border border-white/5 p-4 animate-[slideUp_0.3s_ease-out]">
               <label className="text-[10px] text-success uppercase tracking-widest font-mono mb-2 block">تم فك التشفير بنجاح</label>
               <div className="flex items-center justify-between gap-4">
                  <div className="font-mono text-xl text-white" dir="ltr">
                    {extracted.lat.toFixed(6)}, {extracted.lng.toFixed(6)}
                  </div>
                  <button 
                    onClick={copyToClipboard}
                    className="p-2 hover:bg-white/10 rounded-md text-primary transition-colors"
                    title="نسخ"
                  >
                    <Copy size={20} />
                  </button>
               </div>
               
               <div className="mt-4 pt-4 border-t border-white/5">
                 <Button 
                    variant="secondary" 
                    className="w-full text-sm py-2"
                    onClick={() => onCoordsExtracted(extracted)}
                 >
                    <span>استخدام في النظام الرئيسي</span>
                    <ArrowRight size={16} className="rotate-180" />
                 </Button>
               </div>
            </div>
          )}

          <div className="pt-4 mt-4 border-t border-white/5">
            <Button 
              variant="secondary" 
              onClick={onClose} 
              className="w-full text-dim hover:text-white border-white/5 hover:border-white/20"
            >
              <LogOut size={16} />
              <span>إغلاق الواجهة السرية (Log Out)</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};