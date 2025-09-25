'use client'

import { useState } from 'react'

interface CarRequestFormProps {
  carModel: string
  onClose: () => void
  onSubmit: (formData: FormData) => void
}

interface FormData {
  fullName: string
  phone: string
  zipCode: string
  email: string
}

export default function CarRequestForm({ carModel, onClose, onSubmit }: CarRequestFormProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    zipCode: '',
    email: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await onSubmit(formData)
      setFormData({
        fullName: '',
        phone: '',
        zipCode: '',
        email: '',
      })
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col gap-4 text-base sm:text-lg">
      <h2 className="text-lg lg:text-xl 2xl:text-2xl lg:mt-4">
        Are you interested in a similar deal?
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="p-2 lg:p-4 mb-2 lg:mb-4 border border-[#B8B8BC] outline-none font-inter text-[#121212] bg-white w-full text-sm sm:text-base"
            required
          />

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="p-2 lg:p-4 mb-2 lg:mb-4 border border-[#B8B8BC] outline-none font-inter text-[#121212] bg-white w-full text-sm sm:text-base"
            required
          />

          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            placeholder="ZIP Code"
            className="p-2 lg:p-4 mb-2 lg:mb-4 border border-[#B8B8BC] outline-none font-inter text-[#121212] bg-white w-full text-sm sm:text-base"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="p-2 lg:p-4 mb-2 lg:mb-4 border border-[#B8B8BC] outline-none font-inter text-[#121212] bg-white w-full text-sm sm:text-base"
            required
          />
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#171717] text-white py-3 px-5 sm:py-4 sm:px-6 flex items-center justify-center gap-2 font-inter hover:bg-[#333333] transition-colors duration-300"
          >
            Submit <span className="ml-1 sm:ml-2 ">→</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="py-3 px-5 sm:py-4 sm:px-6 border border-[#171717] text-[#171717] hover:bg-gray-100 transition-colors duration-300 font-inter "
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
