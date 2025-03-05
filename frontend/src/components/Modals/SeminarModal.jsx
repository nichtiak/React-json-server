import React from 'react'
import Modal from 'react-modal'
import SeminarForm from '../Forms/SeminarForm'

// Компонент модального окна для создания/редактирования семинара
// Принимает props:
// - isOpen: флаг открытия/закрытия модального окна
// - onClose: функция для закрытия модального окна
// - formData: объект с данными формы
// - setFormData: функция для обновления данных формы
// - onSubmit: функция для отправки формы
// - isSubmitting: состояние отправки формы
// - isEditing: флаг режима редактирования
const SeminarModal = ({
  isOpen,
  onClose,
  formData,
  setFormData,
  onSubmit,
  isSubmitting,
  isEditing,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-sky-100 p-6 rounded-lg w-96 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center"
    >
      {/* Заголовок модального окна */}
      <h2 className="text-2xl font-bold mb-4 text-black">
        {isEditing ? 'Редактировать семинар' : 'Добавить новый семинар'}
      </h2>
      {/* Форма для ввода данных семинара */}
      <SeminarForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        onCancel={onClose}
        isEditing={isEditing}
      />
    </Modal>
  )
}

export default SeminarModal
