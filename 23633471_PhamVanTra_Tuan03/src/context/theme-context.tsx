import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

export interface AppColors {
  background: string;
  text: string;
  textSecondary: string;
  border: string;
}

const LIGHT_COLORS: AppColors = {
  background: '#ffffff',
  text: '#222222',
  textSecondary: '#666666',
  border: '#cccccc',
};

const DARK_COLORS: AppColors = {
  background: '#222222',
  text: '#ffffff',
  textSecondary: '#bbbbbb',
  border: '#555555',
};

interface ThemeContextValue {
  isDarkMode: boolean;
  colors: AppColors;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = useCallback(() => {
    setIsDarkMode((previousMode) => !previousMode);
  }, []);

  const value = useMemo(
    () => ({
      isDarkMode,
      colors: isDarkMode ? DARK_COLORS : LIGHT_COLORS,
      toggleTheme,
    }),
    [isDarkMode, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useAppTheme phải được dùng bên trong AppThemeProvider');
  }

  return context;
}
