import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "auto";

// Opciones del selector con íconos SVG personalizados
const themeOptions: {
    value: Theme;
    label: string;
    icon: JSX.Element;
}[] = [
        {
            value: "light",
            label: "Light",
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
            ),
        },
        {
            value: "dark",
            label: "Dark",
            icon: (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 12.79A9 9 0 0111.21 3 7 7 0 1015 21a9 9 0 006-8.21z" />
                </svg>
            ),
        },
        {
            value: "auto",
            label: "Auto",
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 3v1M12 20v1M4.22 4.22l.707.707M19.071 19.071l.707.707M1 12h1M22 12h1M4.22 19.78l.707-.707M19.071 4.929l.707-.707M8 12a4 4 0 008 0" />
                </svg>
            ),
        },
    ];

export const ThemeSwitcher = () => {
    const [open, setOpen] = useState(false);

    // Carga inicial del tema desde localStorage o por defecto "auto"
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window === "undefined") return "auto";
        return (localStorage.getItem("theme") as Theme) || "auto";
    });

    // Aplica el tema cada vez que se monta o cambia
    useEffect(() => {
        const root = document.documentElement;
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

        const applyTheme = (t: Theme) => {
            if (t === "dark") {
                root.classList.add("dark");
            } else if (t === "light") {
                root.classList.remove("dark");
            } else {
                // Auto
                prefersDark.matches
                    ? root.classList.add("dark")
                    : root.classList.remove("dark");
            }
        };

        applyTheme(theme);

        // Si es auto, escuchar cambios del sistema
        if (theme === "auto") {
            const listener = (e: MediaQueryListEvent) => {
                if (!localStorage.getItem("theme")) {
                    e.matches ? root.classList.add("dark") : root.classList.remove("dark");
                }
            };
            prefersDark.addEventListener("change", listener);
            return () => prefersDark.removeEventListener("change", listener);
        }
    }, [theme]);

    // Maneja la selección de tema desde el UI
    const handleSelect = (newTheme: Theme) => {
        setTheme(newTheme);
        setOpen(false);

        // Guardar en localStorage solo si es light o dark
        if (newTheme === "auto") {
            localStorage.removeItem("theme");
        } else {
            localStorage.setItem("theme", newTheme);
        }
    };

    return (
        <div className="relative inline-block text-left">
            {/* Botón que muestra el tema actual */}
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="inline-flex cursor-pointer items-center gap-2 px-4 py-2 border rounded dark:bg-zinc-800 bg-white text-zinc-800 dark:text-zinc-300"
            >
                {themeOptions.find((o) => o.value === theme)?.icon}
                {themeOptions.find((o) => o.value === theme)?.label}
            </button>

            {/* Menú desplegable de opciones */}
            {open && (
                <div className="absolute mt-2 w-full bg-white dark:bg-zinc-800 border dark:text-zinc-200 rounded shadow-md z-10">
                    {themeOptions.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => handleSelect(option.value)}
                            className={`flex items-center cursor-pointer gap-2 w-full px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 ${theme === option.value ? "font-bold text-zinc-800 dark:text-zinc-200" : ""
                                }`}
                        >
                            {option.icon}
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
