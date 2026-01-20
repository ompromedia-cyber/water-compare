import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Сравнение воды',
  description: 'Сервис сравнения воды с диаграммами',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}