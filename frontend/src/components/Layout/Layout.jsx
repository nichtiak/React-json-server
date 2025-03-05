import React from 'react'
import { ToastContainer } from 'react-toastify'

// Компонент общего layout'а приложения
// Принимает props:
// - children: дочерние компоненты
const Layout = ({ children }) => {
  return (
    // Основной контейнер с отступами
    <div className="container mx-auto px-4 py-8">
      {/* Контейнер для уведомлений */}
      <ToastContainer />
      {/* Заголовок приложения */}
      <h1 className="text-3xl font-bold mb-8 text-purple-600">
        Управление семинарами
      </h1>
      {/* Содержимое приложения */}
      {children}
    </div>
  )
}

export default Layout
