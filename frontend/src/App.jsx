import { useState, useEffect } from 'react'
import axios from 'axios'
import Modal from 'react-modal'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import Layout from './components/Layout/Layout'
import SeminarCard from './components/SeminarCard/SeminarCard'
import SeminarModal from './components/Modals/SeminarModal'
import DeleteModal from './components/Modals/DeleteModal'

// Инициализация модального окна для React
Modal.setAppElement('#root')

function App() {
  // Состояния для управления данными и UI
  const [seminars, setSeminars] = useState([]) // Список всех семинаров
  const [loading, setLoading] = useState(true) // Состояние загрузки
  const [isModalOpen, setIsModalOpen] = useState(false) // Открытие/закрытие модального окна
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false) // Открытие/закрытие модального окна удаления
  const [seminarToDelete, setSeminarToDelete] = useState(null) // ID семинара для удаления
  const [editingSeminar, setEditingSeminar] = useState(null) // Данные редактируемого семинара
  const [isSubmitting, setIsSubmitting] = useState(false) // Состояние отправки формы
  const [isDeleting, setIsDeleting] = useState(false) // Состояние удаления
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    description: '',
    photo: '',
  })

  // Загрузка семинаров при монтировании компонента
  useEffect(() => {
    fetchSeminars()
  }, [])

  // Функция для получения списка семинаров с сервера
  const fetchSeminars = async () => {
    try {
      const response = await axios.get('http://localhost:3001/seminars')
      setSeminars(response.data)
      setLoading(false)
    } catch (error) {
      toast.error(`Ошибка загрузки семинаров: ${error.message}`, {
        position: 'top-right',
        autoClose: 2000,
      })
      setLoading(false)
    }
  }

  // Обработчик открытия модального окна удаления
  const handleDelete = async (id) => {
    setSeminarToDelete(id)
    setIsDeleteModalOpen(true)
  }

  // Обработчик подтверждения удаления семинара
  const confirmDelete = async () => {
    setIsDeleting(true)
    try {
      await axios.delete(`http://localhost:3001/seminars/${seminarToDelete}`)
      setSeminars(seminars.filter((seminar) => seminar.id !== seminarToDelete))
      setIsDeleteModalOpen(false)
      setSeminarToDelete(null)
      toast.success('Семинар успешно удален!', {
        position: 'top-right',
        autoClose: 2000,
      })
    } catch (error) {
      toast.error(`Ошибка удаления семинара: ${error.message}`, {
        position: 'top-right',
        autoClose: 2000,
      })
    } finally {
      setIsDeleting(false)
    }
  }

  // Обработчик открытия модального окна редактирования
  const handleEdit = (seminar) => {
    setEditingSeminar(seminar)
    setFormData(seminar)
    setIsModalOpen(true)
  }

  // Обработчик отправки формы (создание/редактирование семинара)
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      if (editingSeminar) {
        // Обновление существующего семинара
        await axios.put(
          `http://localhost:3001/seminars/${editingSeminar.id}`,
          formData
        )
        setSeminars(
          seminars.map((seminar) =>
            seminar.id === editingSeminar.id ? formData : seminar
          )
        )
        toast.success('Семинар успешно обновлен!', {
          position: 'top-right',
          autoClose: 2000,
        })
      } else {
        // Создание нового семинара
        const response = await axios.post(
          'http://localhost:3001/seminars',
          formData
        )
        setSeminars([...seminars, response.data])
        toast.success('Семинар успешно добавлен!', {
          position: 'top-right',
          autoClose: 2000,
        })
      }
      // Сброс формы и закрытие модального окна
      setIsModalOpen(false)
      setEditingSeminar(null)
      setFormData({
        title: '',
        date: '',
        time: '',
        description: '',
        photo: '',
      })
    } catch (error) {
      toast.error(`Ошибка сохранения семинара: ${error.message}`, {
        position: 'top-right',
        autoClose: 2000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Отображение загрузки при получении данных
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#8B5CF6" size={50} />
      </div>
    )

  return (
    <Layout>
      {/* Кнопка добавления нового семинара */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600"
      >
        Добавить новый семинар
      </button>

      {/* Сетка с карточками семинаров */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {seminars.map((seminar) => (
          <SeminarCard
            key={seminar.id}
            seminar={seminar}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Модальное окно для создания/редактирования семинара */}
      <SeminarModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        isEditing={!!editingSeminar}
      />

      {/* Модальное окно подтверждения удаления */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
      />
    </Layout>
  )
}

export default App
