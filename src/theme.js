import { createTheme } from '@mui/material/styles';

// 색상 값은 index.css의 CSS 변수(컬러 팔레트 디자인 시스템.md)를 참조한다.
const v = (name) => `var(--color-${name})`;

const theme = createTheme({
  palette: {
    primary: { main: '#DA3832', light: '#E8625D', dark: '#D71D24', contrastText: '#FFFFFF' },
    secondary: { main: '#333333' },
    info: { main: '#3868FF' },
  },
  shape: { borderRadius: 20 },
  typography: {
    fontFamily: 'Pretendard, "Noto Sans KR", "Malgun Gothic", sans-serif',
    h2: { fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3rem)' },
    h4: { fontWeight: 700, fontSize: 'clamp(1.4rem, 3.5vw, 2rem)' },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: v('bg-secondary'),
          color: v('text-primary'),
          border: `1px solid ${v('border')}`,
          boxShadow: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 600, borderRadius: 999 },
        contained: {
          backgroundColor: v('button-primary'),
          color: v('bg-primary'),
          '&:hover': { backgroundColor: v('button-hover'), color: '#111111' },
        },
        containedPrimary: {
          backgroundColor: v('primary'),
          color: '#FFFFFF',
          '&:hover': { backgroundColor: v('primary-dark'), color: '#FFFFFF' },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: v('bg-primary'),
          color: v('text-primary'),
          borderBottom: `1px solid ${v('border')}`,
          boxShadow: 'none',
        },
      },
    },
  },
});

export default theme;
