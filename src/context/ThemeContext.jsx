import React, { createContext, useContext, useState, useEffect } from 'react';

export const THEMES = [
  {
    id: 'academic',
    name: 'Academic',
    subtitle: 'Warm Ivory & Collegiate Blue',
    badge: 'Classic',
    mode: 'light',
    preview: ['#faf8f5', '#2563eb', '#1e293b'],
  },
  {
    id: 'midnight',
    name: 'Midnight',
    subtitle: 'Cyber Obsidian & Electric Blue',
    badge: 'Dark',
    mode: 'dark',
    preview: ['#0b0f19', '#38bdf8', '#f8fafc'],
  },
  {
    id: 'terminal',
    name: 'Terminal',
    subtitle: 'Matrix Silicon & Phosphor Green',
    badge: 'Matrix',
    mode: 'dark',
    preview: ['#060b08', '#10b981', '#ecfdf5'],
  },
  {
    id: 'nordic',
    name: 'Nordic',
    subtitle: 'Crisp Ice Slate & Cobalt',
    badge: 'Clean',
    mode: 'light',
    preview: ['#f1f5f9', '#0284c7', '#0f172a'],
  },
  {
    id: 'twilight',
    name: 'Twilight',
    subtitle: 'Deep Amethyst & Radiant Lilac',
    badge: 'Vibrant',
    mode: 'dark',
    preview: ['#110e1c', '#c084fc', '#f5f3ff'],
  },
];

const ThemeContext = createContext({
  theme: 'academic',
  setTheme: () => {},
  cycleTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    try {
      const saved = localStorage.getItem('coa_theme');
      if (saved && THEMES.some(t => t.id === saved)) {
        return saved;
      }
    } catch (e) {
      // ignore
    }
    return 'academic';
  });

  const setTheme = (newTheme) => {
    if (!THEMES.some(t => t.id === newTheme)) return;
    setThemeState(newTheme);
    try {
      localStorage.setItem('coa_theme', newTheme);
    } catch (e) {
      // ignore
    }
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const cycleTheme = () => {
    const currentIndex = THEMES.findIndex(t => t.id === theme);
    const nextIndex = (currentIndex + 1) % THEMES.length;
    setTheme(THEMES[nextIndex].id);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
