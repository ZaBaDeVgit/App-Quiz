import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'; // Usar Routes sin banderas futuras
import Intro from './components/Intro';
import MainMenu from './components/MainMenu';
import TestSection from './components/TestSection';
import ScoreBoard from './components/ScoreBoard';
import LoadQuestions from './components/LoadQuestions';
import PasswordPrompt from './components/PasswordPrompt';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (showIntro) {
    return <Intro />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/test" element={<TestSection />} />
        <Route path="/scores" element={<ScoreBoard />} />
        <Route path="/load" element={<LoadQuestions />} />
        <Route path="/password" element={<PasswordPrompt />} />
      </Routes>
    </div>
  );
}

export default App;
