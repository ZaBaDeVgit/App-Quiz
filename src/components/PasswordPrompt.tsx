// PasswordPrompt.tsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PasswordPrompt = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const correctPassword = '123456'; // Contraseña correcta

        if (password === correctPassword) {
            // Si la contraseña es correcta, navegar al componente de carga
            navigate('/load');
        } else {
            // Si la contraseña es incorrecta, mostrar un mensaje de error
            setError('Contraseña incorrecta. Intenta nuevamente.');
        }
    };

    const handleBack = () => {
        // Navegar de vuelta a la pantalla principal
        navigate('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-8">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-3xl font-bold mb-6">Acceso Admin</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-lg font-medium mb-2">Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            placeholder="Introduce la contraseña"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white rounded-lg mb-4"
                    >
                        Acceder
                    </button>
                </form>

                <button
                    onClick={handleBack}
                    className="w-full py-3 bg-gray-600 text-white rounded-lg"
                >
                    Volver a la pantalla principal
                </button>
            </div>
        </div>
    );
};

export default PasswordPrompt;
