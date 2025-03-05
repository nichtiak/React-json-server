import React from 'react'
import Modal from 'react-modal'
import { ClipLoader } from 'react-spinners'

// Компонент модального окна подтверждения удаления
// Принимает props:
// - isOpen: флаг открытия/закрытия модального окна
// - onClose: функция для закрытия модального окна
// - onConfirm: функция для подтверждения удаления
// - isDeleting: состояние процесса удаления
const DeleteModal = ({ isOpen, onClose, onConfirm, isDeleting }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-sky-100 p-6 rounded-lg w-96 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center"
    >
      {/* Заголовок модального окна */}
      <h2 className="text-2xl font-bold mb-4 text-black">
        Подтвердите удаление
      </h2>
      {/* Текст подтверждения */}
      <p className="text-black mb-6">
        Вы уверены, что хотите удалить этот семинар?
      </p>
      {/* Кнопки управления */}
      <div className="flex justify-end gap-2">
        {/* Кнопка отмены */}
        <button
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Отмена
        </button>
        {/* Кнопка подтверждения удаления */}
        <button
          onClick={onConfirm}
          disabled={isDeleting}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center gap-2"
        >
          {isDeleting ? (
            <>
              <ClipLoader color="#ffffff" size={20} />
              Удаление...
            </>
          ) : (
            'Удалить'
          )}
        </button>
      </div>
    </Modal>
  )
}

export default DeleteModal
