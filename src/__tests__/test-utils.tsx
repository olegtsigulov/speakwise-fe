import React, { FC, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Используем наш мок для react-router-dom
const { BrowserRouter } = require('react-router-dom');

// Мок для сторы
export const createTestStore = () => {
  return {
    // Здесь можно добавить методы и свойства для мока сторы
  };
};

// Тип для мок-сторы
export const StoreMockContext = React.createContext<any>(null);

// Тип для компонента с children
type WrapperProps = {
  children: ReactNode;
};

// Компонент-обертка
const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  const store = createTestStore();
  
  return (
    <StoreMockContext.Provider value={store}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </StoreMockContext.Provider>
  );
};

// Кастомный рендер для тестов
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: Wrapper as React.ComponentType, ...options });

// Пользователь для тестирования событий
export const user = userEvent.setup();

// Реэкспорт всего из testing-library
export * from '@testing-library/react';

// Переопределение метода render
export { customRender as render }; 