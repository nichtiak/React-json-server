import React from 'react'
import { ClipLoader } from 'react-spinners'

// Компонент формы для создания/редактирования семинара
// Принимает props:
// - formData: объект с данными формы
// - setFormData: функция для обновления данных формы
// - onSubmit: функция для отправки формы
// - isSubmitting: состояние отправки формы
// - onCancel: функция для отмены
// - isEditing: флаг режима редактирования
const SeminarForm = ({
  formData,
  setFormData,
  onSubmit,
  isSubmitting,
  onCancel,
  isEditing,
}) => {
  return (
    <form onSubmit={onSubmit}>
      {/* Поле для названия семинара */}
      <div className="mb-4">
        <label className="block mb-1 text-black">Название</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full border rounded p-2 bg-white text-black"
          required
        />
      </div>
      {/* Поле для даты семинара */}
      <div className="mb-4">
        <label className="block mb-1 text-black">Дата</label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="w-full border rounded p-2 bg-white text-black"
          required
        />
      </div>
      {/* Поле для времени семинара */}
      <div className="mb-4">
        <label className="block mb-1 text-black">Время</label>
        <input
          type="time"
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          className="w-full border rounded p-2 bg-white text-black"
          required
        />
      </div>
      {/* Поле для описания семинара */}
      <div className="mb-4">
        <label className="block mb-1 text-black">Описание</label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full border rounded p-2 bg-white text-black"
          required
        />
      </div>
      {/* Поле для URL фото семинара */}
      <div className="mb-4">
        <label className="block mb-1 text-black">URL фото</label>
        <input
          type="url"
          value={formData.photo}
          onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
          className="w-full border rounded p-2 bg-white text-black"
          required
        />
      </div>
      {/* Кнопки управления формой */}
      <div className="flex justify-end gap-2">
        {/* Кнопка отмены */}
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Отмена
        </button>
        {/* Кнопка отправки формы */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <ClipLoader color="#ffffff" size={20} />
              {isEditing ? 'Обновление...' : 'Добавление...'}
            </>
          ) : isEditing ? (
            'Обновить'
          ) : (
            'Добавить'
          )}
        </button>
      </div>
    </form>
  )
}

export default SeminarForm
