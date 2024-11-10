// utils/storage.ts

import { Question, TestResult } from '../types';

// Obtener las preguntas almacenadas
export const getStoredQuestions = (): Question[] => {
  return JSON.parse(localStorage.getItem('questions') || '[]');
};

// Guardar una nueva pregunta
export const saveQuestion = (question: Question): void => {
  const questions = getStoredQuestions();
  localStorage.setItem('questions', JSON.stringify([...questions, question]));
};

// Obtener los resultados de las pruebas almacenadas
export const getStoredResults = (): TestResult[] => {
  return JSON.parse(localStorage.getItem('testResults') || '[]');
};

// Guardar un resultado de prueba
export const saveTestResult = (result: TestResult): void => {
  const storedResults = getStoredResults();
  storedResults.push(result); // Agrega el nuevo resultado al arreglo
  localStorage.setItem('testResults', JSON.stringify(storedResults)); // Guarda el arreglo actualizado
};


// Eliminar un resultado de prueba específico
export const deleteStoredResult = (updatedResults: TestResult[]): void => {
  // Actualiza los resultados en el localStorage
  localStorage.setItem('testResults', JSON.stringify(updatedResults));
};

// Filtrar preguntas por categoría y tema
export const getFilteredQuestions = (category: string, topic: string): Question[] => {
  return getStoredQuestions().filter(
    (q) => q.category === category && q.topic === topic
  );
};
