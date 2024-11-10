import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, Trash2 } from 'lucide-react'; // Ícono de la papelera
import { useEffect, useState } from 'react';
import { TestResult } from '../types';
import { getStoredResults, deleteStoredResult } from '../utils/storage'; // Asegúrate de importar deleteStoredResult

export default function ScoreBoard() {
  const navigate = useNavigate();
  const [scores, setScores] = useState<TestResult[]>([]);

  // Cargar puntuaciones almacenadas al montar el componente
  useEffect(() => {
    setScores(getStoredResults());
  }, []);

  // Función para eliminar un resultado
  const handleDelete = (index: number) => {
    const updatedScores = scores.filter((_, i) => i !== index); // Filtra el resultado a eliminar
    setScores(updatedScores); // Actualiza el estado de las puntuaciones
    deleteStoredResult(updatedScores); // Elimina el resultado también del localStorage
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl"
      >
        <div className="flex justify-between items-center mb-8">
          <motion.button
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center px-8 py-4 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-lg text-white font-semibold shadow-xl hover:shadow-2xl transition-all"
          >
            <ArrowLeft className="w-6 h-6 mr-2" />
            Volver al Menú
          </motion.button>
        </div>

        <div className="flex items-center justify-center mb-8">
          <Trophy className="w-12 h-12 text-yellow-400 mr-4" />
          <h2 className="text-4xl font-bold text-white text-center">
            Puntuaciones
          </h2>
        </div>

        {scores.length === 0 ? (
          <div className="text-center text-white text-xl">
            No hay puntuaciones registradas aún.
          </div>
        ) : (
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl overflow-hidden">
            <div className="grid grid-cols-6 gap-4 p-4 border-b border-white border-opacity-20 text-white font-bold">
              <div>Categoría</div>
              <div>Tema</div>
              <div>Puntuación</div>
              <div>Total</div>
              <div>Fecha</div>
              <div>Eliminar</div> {/* Columna para el botón de eliminar */}
            </div>
            {scores.map((score, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="grid grid-cols-6 gap-4 p-4 text-white hover:bg-white hover:bg-opacity-5 transition-colors relative"
              >
                <div>{score.category}</div>
                <div>{score.topic}</div>
                <div>{score.score}</div> {/* Muestra la puntuación correctamente */}
                <div>{score.total}</div>
                <div>{score.date}</div>
                <div className="grid"> {/* Ícono a la derecha */}
                  <button
                    onClick={() => handleDelete(index)} // Elimina el registro correspondiente
                    className="text-red-500 hover:text-red-300"
                  >
                    <Trash2 className="w-6 h-6" /> {/* Ícono de papelera */}
                  </button>
                </div>
              </motion.div>
            ))}

          </div>
        )}
      </motion.div>
    </div>
  );
}
