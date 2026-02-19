import React, { useState } from 'react';
import { MapPin, Search, ExternalLink, Globe, Navigation2, CheckCircle2, Copy, Check, Link } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';
import { Coordinates, LocationInfo } from '../types';
import { parseInputToCoordinates, toDMS } from '../utils/geoUtils';

interface MainInterfaceProps {
  initialCoords?: Coordinates | null;
}

export const MainInterface: React.FC<MainInterfaceProps> = ({ initialCoords }) => {
  const [inputVal, setInputVal] = useState<string>(
    initialCoords ? `${initialCoords.lat}, ${initialCoords.lng}` : ''
  );
  const [result, setResult] = useState<LocationInfo | null>(
    initialCoords ? {
        coordinates: initialCoords,
        dms: `${toDMS(initialCoords.lat, 'lat')} ${toDMS(initialCoords.lng, 'lng')}`,
        googleMapsUrl: `https://www.google.com/maps?q=${initialCoords.lat},${initialCoords.lng}`
    } : null
  );
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const handleSearch = () => {
    setError('');
    setLoading(true);
    setResult(null);
    setCopied(false);
    setLinkCopied(false);

    // Simulate system processing time for effect
    setTimeout(() => {
      const coords = parseInputToCoordinates(inputVal);
      
      if (!coords) {
        setError('خطأ: تنسيق الإحداثيات غير صالح. يرجى التأكد من الصيغة.');
        setLoading(false);
        return;
      }

      setResult({
        coordinates: coords,
        dms: `${toDMS(coords.lat, 'lat')} ${toDMS(coords.lng, 'lng')}`,
        googleMapsUrl: `https://www.google.com/maps?q=${coords.lat},${coords.lng}`
      });
      setLoading(false);
    }, 600);
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(`${result.coordinates.lat}, ${result.coordinates.lng}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyLink = () => {
    if (result) {
      navigator.clipboard.writeText(result.googleMapsUrl);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
      <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-primary relative overflow-hidden max-w-md mx-auto">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Globe className="text-primary animate-pulse" />
            <span className="text-white">نظام تحديد الموقع</span>
          </h2>
          
          <div className="grid gap-6">
            <Input 
              label="أدخل الإحداثيات (Decimal أو DMS)"
              placeholder="مثال: 24.653528,46.513722"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              icon={<Navigation2 size={18} />}
              dir="ltr"
            />
            
            <Button onClick={handleSearch} isLoading={loading}>
              <Search size={18} />
              <span>تحليل الموقع</span>
            </Button>
          </div>

          {error && (
            <div className="mt-4 p-4 rounded-lg bg-alert/10 border border-alert/20 text-alert text-sm font-bold flex items-center gap-2">
              <span className="w-2 h-2 bg-alert rounded-full animate-pulse"></span>
              {error}
            </div>
          )}
        </div>
      </div>

      {result && (
        <div className="glass-panel p-0 rounded-2xl overflow-hidden animate-[slideUp_0.5s_ease-out]">
          {/* Header */}
          <div className="bg-white/5 border-b border-white/10 p-4 flex justify-between items-center">
             <div className="flex items-center gap-2">
               <CheckCircle2 className="text-success" size={20} />
               <span className="font-bold text-success tracking-widest text-sm">تم تحديد الهدف</span>
             </div>
             <span className="text-xs font-mono text-dim px-2 py-1 bg-black/50 rounded border border-white/5">DATA: {new Date().toLocaleTimeString()}</span>
          </div>

          <div className="p-6 grid gap-6 md:grid-cols-2">
             {/* Data Column */}
             <div className="space-y-4">
                <div className="space-y-1">
                   <label className="text-[10px] text-primary uppercase tracking-widest font-mono">الإحداثيات (Decimal)</label>
                   <div className="flex items-center justify-between group">
                     <div className="font-mono text-xl text-white tracking-tight" dir="ltr">
                       {result.coordinates.lat.toFixed(6)}, {result.coordinates.lng.toFixed(6)}
                     </div>
                     <button
                        onClick={handleCopy}
                        className="p-2 hover:bg-white/10 rounded-md text-primary transition-all active:scale-95 opacity-70 group-hover:opacity-100"
                        title="نسخ الإحداثيات"
                     >
                        {copied ? <Check size={18} /> : <Copy size={18} />}
                     </button>
                   </div>
                </div>

                <div className="w-full h-px bg-white/10"></div>

                <div className="space-y-1">
                   <label className="text-[10px] text-dim uppercase tracking-widest font-mono">الصيغة الفلكية (DMS)</label>
                   <div className="font-mono text-lg text-dim" dir="ltr">
                     {result.dms}
                   </div>
                </div>

                <div className="w-full h-px bg-white/10"></div>

                <div className="space-y-2">
                   <label className="text-[10px] text-dim uppercase tracking-widest font-mono">روابط المشاركة</label>
                   <Button 
                     variant="secondary" 
                     className="w-full text-sm py-2 justify-between group bg-black/40 hover:bg-white/5"
                     onClick={handleCopyLink}
                   >
                      <span className="flex items-center gap-2 text-dim group-hover:text-white transition-colors">
                        <Link size={16} />
                        <span>نسخ رابط Google Maps</span>
                      </span>
                      {linkCopied ? <Check size={16} className="text-success" /> : <Copy size={16} className="text-dim opacity-50 group-hover:opacity-100 transition-opacity" />}
                   </Button>
                </div>
             </div>

             {/* Actions Column */}
             <div className="flex flex-col justify-end gap-3">
               <div className="flex-1 bg-black/50 rounded-lg border border-white/5 flex items-center justify-center p-4 mb-4 relative overflow-hidden group">
                  <MapPin className="text-primary/20 absolute w-32 h-32 -right-4 -bottom-4 group-hover:text-primary/30 transition-all duration-500" />
                  <div className="text-center relative z-10">
                     <h3 className="text-lg font-bold text-white mb-1">المعاينة المباشرة</h3>
                     <p className="text-xs text-dim">فتح الموقع عبر Google Maps</p>
                  </div>
               </div>

               <a 
                 href={result.googleMapsUrl} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="block w-full"
               >
                 <Button className="w-full">
                    <ExternalLink size={18} />
                    <span>فتح الخريطة (Live Link)</span>
                 </Button>
               </a>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};