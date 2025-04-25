import { JSX, useEffect, useState } from "react";

// Define los posibles valores para el tema de la aplicación
type Theme = "light" | "dark" | "auto";

// Array de opciones para el selector de temas, cada opción incluye:
// - value: el valor del tema ("light", "dark" o "auto")
// - label: el texto que se muestra en la UI
// - icon: un icono SVG personalizado para representar visualmente cada tema
const themeOptions: {
    value: Theme;
    label: string;
    icon: JSX.Element;
}[] = [
        {
            value: "light", // Tema claro
            label: "Light",
            icon: (
                // Icono de sol para el tema claro
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
            ),
        },
        {
            value: "dark", // Tema oscuro
            label: "Dark",
            icon: (
                // Icono de luna para el tema oscuro
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 12.79A9 9 0 0111.21 3 7 7 0 1015 21a9 9 0 006-8.21z" />
                </svg>
            ),
        },
        {
            value: "auto", // Tema automático (basado en preferencias del sistema)
            label: "Auto",
            icon: (
                // Icono que representa el ajuste automático
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 3v1M12 20v1M4.22 4.22l.707.707M19.071 19.071l.707.707M1 12h1M22 12h1M4.22 19.78l.707-.707M19.071 4.929l.707-.707M8 12a4 4 0 008 0" />
                </svg>
            ),
        },
    ];

export const ThemeSwitcher = () => {
    // Estado para controlar si el menú desplegable está abierto o cerrado
    const [open, setOpen] = useState(false);

    // Estado para almacenar el tema actual
    // Inicializa el tema desde localStorage si existe, o usa "auto" como valor predeterminado
    // Usa una función de inicialización para evitar problemas con SSR (renderizado del lado del servidor)
    const [theme, setTheme] = useState<Theme>(() => {
        // Si estamos en un entorno sin window (como SSR), usamos "auto" por defecto
        if (typeof window === "undefined") return "auto";
        // Obtiene el tema del localStorage o usa "auto" si no existe
        return (localStorage.getItem("theme") as Theme) || "auto";
    });

    // Efecto que se ejecuta al montar el componente y cada vez que cambia el tema
    useEffect(() => {
        // Accede al elemento raíz del documento para manipular las clases CSS
        const root = document.documentElement;
        // Detecta si el sistema del usuario prefiere el tema oscuro
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

        // Función interna para aplicar el tema al DOM
        const applyTheme = (t: Theme) => {
            if (t === "dark") {
                // Si el tema es oscuro, añade la clase 'dark' al elemento raíz
                root.classList.add("dark");
            } else if (t === "light") {
                // Si el tema es claro, elimina la clase 'dark' del elemento raíz
                root.classList.remove("dark");
            } else {
                // Si el tema es automático, depende de las preferencias del sistema
                prefersDark.matches
                    ? root.classList.add("dark")
                    : root.classList.remove("dark");
            }
        };

        // Aplica el tema actual
        applyTheme(theme);

        // Si el tema es "auto", configura un escuchador para detectar cambios en las preferencias del sistema
        if (theme === "auto") {
            const listener = (e: MediaQueryListEvent) => {
                // Solo aplica el cambio si no hay un tema explícito guardado en localStorage
                if (!localStorage.getItem("theme")) {
                    e.matches ? root.classList.add("dark") : root.classList.remove("dark");
                }
            };
            // Añade el listener al evento de cambio de preferencias del sistema
            prefersDark.addEventListener("change", listener);
            // Limpia el listener cuando el componente se desmonta
            return () => prefersDark.removeEventListener("change", listener);
        }
    }, [theme]); // Este efecto se ejecuta cuando cambia el tema

    // Maneja la selección de un nuevo tema desde la interfaz de usuario
    const handleSelect = (newTheme: Theme) => {
        // Actualiza el estado del tema
        setTheme(newTheme);
        // Cierra el menú desplegable
        setOpen(false);

        // Maneja el almacenamiento en localStorage según el tema seleccionado
        if (newTheme === "auto") {
            // Si es "auto", elimina la entrada del localStorage para usar las preferencias del sistema
            localStorage.removeItem("theme");
        } else {
            // Si es "light" o "dark", guarda la selección en localStorage
            localStorage.setItem("theme", newTheme);
        }
    };

    return (
        <div className="relative inline-block text-left">
            {/* Botón principal que muestra el tema actual y activa el menú desplegable */}
            <button
                onClick={() => setOpen((prev) => !prev)} // Alterna el estado del menú al hacer clic
                className="inline-flex cursor-pointer items-center gap-2 px-4 py-2 border rounded dark:bg-zinc-800 bg-white text-zinc-800 dark:text-zinc-300"
            >
                {/* Muestra el icono del tema actual */}
                {themeOptions.find((o) => o.value === theme)?.icon}
                {/* Muestra el nombre del tema actual */}
                {themeOptions.find((o) => o.value === theme)?.label}
            </button>

            {/* Menú desplegable que se muestra solo cuando 'open' es true */}
            {open && (
                <div className="absolute mt-2 w-full bg-white dark:bg-zinc-800 border dark:text-zinc-200 rounded shadow-md z-10">
                    {/* Mapea todas las opciones de tema y crea un botón para cada una */}
                    {themeOptions.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => handleSelect(option.value)} // Maneja la selección del tema
                            className={`flex items-center cursor-pointer gap-2 w-full px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 ${theme === option.value ? "font-bold text-zinc-800 dark:text-zinc-200" : ""
                                }`} // Aplica estilos condicionales para resaltar la opción seleccionada
                        >
                            {option.icon} {/* Muestra el icono de cada opción */}
                            {option.label} {/* Muestra el nombre de cada opción */}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};