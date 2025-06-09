export const Colors = {
  light: {
    primary: '#007bff',
    secondary: '#f9c846',
    background: '#ffffff',
    surface: '#f8f9fa',
    text: '#212529',
    textSecondary: '#6c757d',
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',
    neutral: '#e0e0e0',
    border: '#e9ecef',
    shadow: 'rgba(0, 0, 0, 0.1)',
  },
  dark: {
    primary: '#007bff',
    secondary: '#f9c846',
    background: '#121212',
    surface: '#1e1e1e',
    text: '#ffffff',
    textSecondary: '#a0a0a0',
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',
    neutral: '#404040',
    border: '#2a2a2a',
    shadow: 'rgba(0, 0, 0, 0.3)',
  },
};

export const getColors = (isDark: boolean = false) => {
  return isDark ? Colors.dark : Colors.light;
};