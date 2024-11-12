import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Brain, Trophy, Upload } from 'lucide-react';
import { useEffect } from 'react';

export default function MainMenu() {
  const navigate = useNavigate();

  const buttons = [
    { icon: Brain, text: 'Test', path: '/test', color: 'from-purple-600 to-blue-600' },
    { icon: Trophy, text: 'Puntuación', path: '/scores', color: 'from-green-600 to-teal-600' },
    { icon: Upload, text: 'Carga', path: '/password', color: 'from-orange-600 to-red-600' },
  ];

  useEffect(() => {
    // Cargar el script de Ko-fi
    const script = document.createElement('script');
    script.src = 'https://storage.ko-fi.com/cdn/scripts/overlay-widget.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.kofiWidgetOverlay) {
        window.kofiWidgetOverlay.draw('zabadev', {
          'type': 'floating-chat',
          'floating-chat.donateButton.text': 'Donacion',
          'floating-chat.donateButton.background-color': '#00b9fe',
          'floating-chat.donateButton.text-color': '#fff',
        });
      }
    };

    // Limpiar el script cuando el componente se desmonte
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 sm:p-6 md:p-8">
      <motion.h1
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-7xl font-bold mb-16 text-white text-center"
        style={{
          textShadow: '0 0 10px rgba(255,255,255,0.5), 0 0 20px rgba(255,255,255,0.3)',
        }}
      >
        App Quiz ZaBaDeV
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {buttons.map((button, index) => (
          <motion.button
            key={button.text}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.05, rotate: [0, -1, 1, 0] }}
            className={`relative group overflow-hidden rounded-xl bg-gradient-to-r ${button.color} p-1`}
            onClick={() => navigate(button.path)} // Redirigir a la ruta indicada
          >
            <div className="relative bg-black bg-opacity-30 backdrop-blur-sm rounded-lg p-8 h-full transition-all duration-300 group-hover:bg-opacity-20">
              <button.icon className="w-16 h-16 mx-auto mb-4 text-white" />
              <h2 className="text-2xl font-bold text-white text-center">{button.text}</h2>

              <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-0 group-hover:opacity-10 transform -skew-x-12 transition-all duration-300" />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
