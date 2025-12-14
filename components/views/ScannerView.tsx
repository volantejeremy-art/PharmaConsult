
import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { useStore } from '../../store/useStore';
import { Icons } from '../ui/Icon';

export const ScannerView: React.FC = () => {
  const { setView, setSearchQuery } = useStore();
  const [error, setLocalError] = useState<string | null>(null);
  const [scannedCode, setScannedCode] = useState<string | null>(null); // Visual feedback
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    
    const startScanner = async () => {
      try {
        if ('BarcodeDetector' in window) {
           console.log("Using Native BarcodeDetector API");
        }

        const formatsToSupport = [
            Html5QrcodeSupportedFormats.EAN_13,
            Html5QrcodeSupportedFormats.EAN_8,
            Html5QrcodeSupportedFormats.UPC_A,
            Html5QrcodeSupportedFormats.UPC_E,
        ];

        const html5QrCode = new Html5Qrcode("reader");
        scannerRef.current = html5QrCode;

        const config = {
            fps: 10, 
            qrbox: { width: 250, height: 150 },
            aspectRatio: 1.0,
            formatsToSupport: formatsToSupport,
            experimentalFeatures: {
                useBarCodeDetectorIfSupported: true
            }
        };

        await html5QrCode.start(
            { facingMode: "environment" }, 
            config,
            (decodedText) => {
              if (mountedRef.current) {
                // Throttle: only handle if not already processing
                if (!scannedCode) { 
                    handleScan(decodedText);
                }
              }
            },
            (errorMessage) => {
              // Ignore frame errors
            }
        );

      } catch (err) {
        console.error("Scanner init error:", err);
        setLocalError("Impossible d'accéder à la caméra. Vérifiez les permissions.");
      }
    };

    startScanner();

    // Timeout safety
    const timer = setTimeout(() => {
      if (mountedRef.current) {
        stopScanner();
        setView('HOME');
      }
    }, 60000);

    return () => {
      mountedRef.current = false;
      clearTimeout(timer);
      stopScanner();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stopScanner = async () => {
    if (scannerRef.current && scannerRef.current.isScanning) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
      } catch (e) {
        console.error("Failed to stop scanner", e);
      }
    }
  };

  const handleScan = (decodedText: string) => {
    setScannedCode(decodedText); // Show code to user
    
    if (navigator.vibrate) {
        navigator.vibrate(200);
    }
    
    // Slight delay to let user see the code before switching
    setTimeout(() => {
        stopScanner();
        setSearchQuery(decodedText); 
        setView('RESULTS');
    }, 800);
  };

  return (
    <div className="relative w-full h-full bg-black flex flex-col items-center justify-center overflow-hidden">
      
      {/* Overlay Header */}
      <div className="absolute top-0 left-0 w-full p-6 z-20 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
        <button 
            onClick={() => setView('HOME')}
            className="bg-white/10 p-3 rounded-full backdrop-blur-md hover:bg-white/20 transition text-white border border-white/20"
        >
            <Icons.ArrowLeft size={28} />
        </button>
        <div className="text-center">
            <h2 className="text-lg font-bold text-white tracking-wide uppercase">Scanner un produit</h2>
            <p className="text-white/60 text-xs">Centrez le code-barres dans le cadre</p>
        </div>
        <div className="w-12" />
      </div>

      {/* Camera Viewport */}
      <div id="reader" className="w-full h-full object-cover"></div>

      {/* Targeting Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
          <div className="absolute inset-0 border-[50px] md:border-[100px] border-black/60"></div>
          
          <div className={`w-[250px] h-[150px] relative border-4 rounded-lg bg-transparent shadow-[0_0_0_9999px_rgba(0,0,0,0.5)] transition-colors duration-300 ${scannedCode ? 'border-green-500' : 'border-primary/50'}`}>
              
              {!scannedCode && (
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-primary shadow-[0_0_10px_#8B5CF6] animate-[scan_2s_infinite_linear]"></div>
              )}
              
              {/* Corner Markers */}
              {!scannedCode && (
                  <>
                    <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-primary rounded-tl-lg"></div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-primary rounded-tr-lg"></div>
                    <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-primary rounded-bl-lg"></div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-primary rounded-br-lg"></div>
                  </>
              )}

              {/* SUCCESS FEEDBACK OVERLAY */}
              {scannedCode && (
                  <div className="absolute inset-0 bg-green-500/20 flex flex-col items-center justify-center animate-fade-in backdrop-blur-sm">
                      <div className="bg-white text-green-600 px-4 py-2 rounded-full font-bold text-lg shadow-lg flex items-center gap-2">
                          <Icons.CheckCircle size={24} />
                          {scannedCode}
                      </div>
                      <p className="text-white font-bold mt-2 text-sm drop-shadow-md">Code détecté !</p>
                  </div>
              )}
          </div>
      </div>

      <div className="absolute bottom-10 z-20 w-full px-6 flex justify-center">
         {error && (
             <div className="bg-red-500/90 backdrop-blur text-white px-6 py-3 rounded-xl text-center text-sm font-medium shadow-lg flex items-center gap-3">
                 <Icons.AlertTriangle size={20} />
                 {error}
             </div>
         )}
      </div>

      <style>{`
        @keyframes scan {
            0% { top: 0; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
        }
        #reader__scan_region img { display: none; }
        #reader__dashboard_section_csr span { display: none; }
      `}</style>
    </div>
  );
};
