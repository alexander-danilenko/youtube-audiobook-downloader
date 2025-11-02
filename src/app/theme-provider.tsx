'use client';

import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { themeColors } from '../config/theme';

const theme = createTheme({
  palette: {
    primary: {
      main: themeColors.primary,
      light: '#FF3333', // Lighter red for hover states
      dark: '#CC0000', // Darker red for active states
      contrastText: '#FFFFFF', // White text on red background
    },
    secondary: {
      main: themeColors.secondary,
      contrastText: '#FFFFFF',
    },
    error: {
      main: themeColors.error,
    },
    warning: {
      main: themeColors.warning,
    },
    info: {
      main: themeColors.info,
    },
    success: {
      main: themeColors.success,
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#000000',
      secondary: '#606060', // YouTube's secondary text color
    },
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif', // YouTube's font
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // YouTube uses lowercase buttons
          borderRadius: 2,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '4px 8px', // Reduced from default 16px to use more space
        },
        head: {
          backgroundColor: themeColors.primary,
          color: '#FFFFFF',
          fontWeight: 500,
          padding: '6px 8px', // Slightly more padding for headers
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            padding: '0 4px', // Reduced input padding
          },
        },
      },
    },
  },
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}

