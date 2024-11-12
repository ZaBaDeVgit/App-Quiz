// src/global.d.ts
declare global {
    interface Window {
        kofiWidgetOverlay: {
            draw: (username: string, options: object) => void;
        };
    }
}

export { }; // Asegúrate de exportar para que se pueda encontrar el archivo
