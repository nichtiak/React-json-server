import React from 'react'

// Компонент карточки семинара
// Принимает props:
// - seminar: объект с данными семинара
// - onEdit: функция для редактирования семинара
// - onDelete: функция для удаления семинара
const SeminarCard = ({ seminar, onEdit, onDelete }) => {
  return (
    // Контейнер карточки с flex-версткой для правильного позиционирования кнопок
    <div className="border rounded-lg p-4 shadow-md flex flex-col h-full">
      {/* Изображение семинара */}
      <img
        src={seminar.photo}
        alt={seminar.title}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      {/* Заголовок семинара */}
      <h2 className="text-xl font-semibold mb-2 text-purple-600">
        {seminar.title}
      </h2>
      {/* Информация о дате и времени */}
      <p className="text-gray-600 mb-2">Дата: {seminar.date}</p>
      <p className="text-gray-600 mb-2">Время: {seminar.time}</p>
      {/* Описание семинара с flex-grow для растягивания */}
      <p className="text-gray-600 mb-4 flex-grow">{seminar.description}</p>
      {/* Контейнер кнопок с mt-auto для прижатия к низу */}
      <div className="flex gap-2 mt-auto">
        {/* Кнопка редактирования */}
        <button
          onClick={() => onEdit(seminar)}
          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
        >
          Редактировать
        </button>
        {/* Кнопка удаления */}
        <button
          onClick={() => onDelete(seminar.id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Удалить
        </button>
      </div>
    </div>
  )
}

export default SeminarCard
