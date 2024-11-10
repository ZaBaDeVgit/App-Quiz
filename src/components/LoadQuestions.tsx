import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react'; // Eliminado 'Save' ya que no se usa
import { useNavigate } from 'react-router-dom';
import { Question } from '../types';

export default function LoadQuestions() {
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  const [topic, setTopic] = useState('');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);

  // Maneja el envío y la descarga del archivo JSON
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!category || !topic || !question || options.some(opt => !opt) || correctAnswer === null) {
      setMessage('Por favor, completa todos los campos y selecciona la respuesta correcta');
      return;
    }

    const newQuestion: Question = {
      category,
      topic,
      question,
      options,
      correct: correctAnswer
    };

    // Agregar nueva pregunta a la lista de preguntas
    const updatedQuestions = [...questions, newQuestion];
    setQuestions(updatedQuestions);

    // Descargar el archivo JSON
    downloadQuestions(updatedQuestions);

    setMessage('¡Pregunta guardada correctamente!');
    setCategory('');
    setTopic('');
    setQuestion('');
    setOptions(['', '', '', '']);
    setCorrectAnswer(null);

    setTimeout(() => setMessage(''), 3000);
  };

  // Descargar el archivo JSON
  const downloadQuestions = (questionsToDownload: Question[]) => {
    const json = JSON.stringify(questionsToDownload, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'preguntas.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Maneja la carga del archivo JSON
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result;
        if (content) {
          try {
            const loadedQuestions = JSON.parse(content as string) as Question[];
            setQuestions(loadedQuestions);
            setMessage('¡Preguntas cargadas correctamente!');
          } catch {
            setMessage('Error al cargar el archivo JSON. Verifica que el archivo esté bien formado.');
          }
        }
      };
      reader.readAsText(file);
    }
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl"
      >
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-white hover:text-purple-300 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 mr-2" />
            Volver al Menú
          </button>
        </div>

        <h2 className="text-4xl font-bold text-white mb-8 text-center">
          Cargar Nuevas Preguntas
        </h2>

        {message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`p-4 rounded-lg mb-6 text-center ${message.includes('Por favor')
              ? 'bg-red-500 bg-opacity-20 text-red-100'
              : 'bg-green-500 bg-opacity-20 text-green-100'
              }`}
          >
            {message}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo para categoría */}
          <div>
            <label htmlFor="category" className="text-white block mb-2">Categoría</label>
            <input
              id="category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 rounded text-black"
              placeholder="Escribe la categoría"
            />
          </div>

          {/* Campo para tema */}
          <div>
            <label htmlFor="topic" className="text-white block mb-2">Tema</label>
            <input
              id="topic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full p-2 rounded text-black"
              placeholder="Escribe el tema"
            />
          </div>

          {/* Campo para pregunta */}
          <div>
            <label htmlFor="question" className="text-white block mb-2">Pregunta</label>
            <input
              id="question"
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full p-2 rounded text-black"
              placeholder="Escribe la pregunta"
            />
          </div>

          {/* Campos para opciones */}
          <div>
            {options.map((option, index) => (
              <div key={index}>
                <label htmlFor={`option${index}`} className="text-white block mb-2">Opción {index + 1}</label>
                <input
                  id={`option${index}`}
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...options];
                    newOptions[index] = e.target.value;
                    setOptions(newOptions);
                  }}
                  className="w-full p-2 rounded text-black"
                  placeholder={`Escribe la opción ${index + 1}`}
                />
              </div>
            ))}
          </div>

          {/* Selección de la respuesta correcta */}
          <div>
            <label htmlFor="correctAnswer" className="text-white block mb-2">Respuesta Correcta</label>
            <select
              id="correctAnswer"
              value={correctAnswer ?? ''}
              onChange={(e) => setCorrectAnswer(Number(e.target.value))}
              className="w-full p-2 rounded text-black"
            >
              <option value="" disabled>Selecciona la opción correcta</option>
              {options.map((_, index) => (
                <option key={index} value={index}>{`Opción ${index + 1}`}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-between">
            <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">
              Guardar Pregunta y Descargar JSON
            </button>
            <label className="text-white cursor-pointer">
              <input
                type="file"
                accept="application/json"
                className="hidden"
                onChange={handleFileUpload}
              />
              <span className="bg-blue-600 text-white px-4 py-2 rounded">
                Cargar Preguntas desde JSON
              </span>
            </label>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
