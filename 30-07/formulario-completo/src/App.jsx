import { useEffect, useState } from 'react'
import './App.css'

const initialForm = {
  name: '',
  email: '',
  password: '',
  age: '',
  birthDate: '',
  experience: '5',
  acceptedTerms: false,
  languages: [],
  modality: 'presencial',
  country: 'Argentina',
  comments: '',
  color: '#4f46e5',
  photoName: '',
}

const countries = ['Argentina', 'Brasil', 'Chile', 'Colombia', 'México', 'España', 'Uruguay', 'Otro']
const languageOptions = ['JavaScript', 'Python', 'Java', 'C#', 'PHP']

function App() {
  const [formData, setFormData] = useState(initialForm)
  const [emailError, setEmailError] = useState('')
  const [ageError, setAgeError] = useState('')
  const [submittedData, setSubmittedData] = useState(null)
  const [photoPreview, setPhotoPreview] = useState('')

  useEffect(() => {
    return () => {
      if (photoPreview) {
        URL.revokeObjectURL(photoPreview)
      }
    }
  }, [photoPreview])

  const validateEmail = (email) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    setEmailError(isValid ? '' : 'Ingresá un correo válido.')
    return isValid
  }

  const validateAge = (age) => {
    const ageNumber = Number(age)
    const isValid = ageNumber > 0
    setAgeError(isValid ? '' : 'La edad debe ser mayor a 0.')
    return isValid
  }

  const handleChange = (event) => {
    const { name, type, value, checked } = event.target

    if (type === 'checkbox') {
      if (name === 'acceptedTerms') {
        setFormData((prev) => ({ ...prev, acceptedTerms: checked }))
        return
      }

      if (name === 'languages') {
        setFormData((prev) => ({
          ...prev,
          languages: checked
            ? [...prev.languages, value]
            : prev.languages.filter((language) => language !== value),
        }))
        return
      }
    }

    if (type === 'file') {
      const file = event.target.files?.[0]
      if (!file) {
        setPhotoPreview('')
        setFormData((prev) => ({ ...prev, photoName: '' }))
        return
      }

      if (photoPreview) {
        URL.revokeObjectURL(photoPreview)
      }

      const nextPreview = URL.createObjectURL(file)
      setPhotoPreview(nextPreview)
      setFormData((prev) => ({ ...prev, photoName: file.name }))
      return
    }

    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === 'email') {
      validateEmail(value)
    }

    if (name === 'age') {
      validateAge(value)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const emailIsValid = validateEmail(formData.email)
    const ageIsValid = validateAge(formData.age)

    if (!emailIsValid || !ageIsValid || !formData.acceptedTerms) {
      return
    }

    setSubmittedData({ ...formData, photoPreview })
  }

  const isSubmitDisabled =
    !formData.acceptedTerms ||
    !formData.name.trim() ||
    !formData.email.trim() ||
    !formData.password.trim() ||
    !formData.age.trim() ||
    !formData.birthDate ||
    !formData.country ||
    formData.languages.length === 0 ||
    Boolean(emailError) ||
    Boolean(ageError)

  return (
    <div className="page">
      <h1>Registro de estudiante</h1>
      <p className="intro">
        Completa el formulario para registrar a un estudiante con todos los campos pedidos.
      </p>

      <form className="student-form" onSubmit={handleSubmit}>
        <label>
          Nombre
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Correo electrónico
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        {emailError ? <p className="error">{emailError}</p> : null}

        <label>
          Contraseña
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Edad
          <input
            type="number"
            name="age"
            min="1"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </label>
        {ageError ? <p className="error">{ageError}</p> : null}

        <label>
          Fecha de nacimiento
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
          />
        </label>

        <div className="range-row">
          <label htmlFor="experience">Nivel de experiencia</label>
          <div className="range-controls">
            <input
              id="experience"
              type="range"
              name="experience"
              min="1"
              max="10"
              value={formData.experience}
              onChange={handleChange}
            />
            <span>{formData.experience}/10</span>
          </div>
        </div>

        <fieldset>
          <legend>Aceptar términos</legend>
          <label className="inline-checkbox">
            <input
              type="checkbox"
              name="acceptedTerms"
              checked={formData.acceptedTerms}
              onChange={handleChange}
            />
            Acepto los términos y condiciones.
          </label>
        </fieldset>

        <fieldset>
          <legend>Lenguajes que conoce</legend>
          {languageOptions.map((language) => (
            <label key={language} className="inline-checkbox">
              <input
                type="checkbox"
                name="languages"
                value={language}
                checked={formData.languages.includes(language)}
                onChange={handleChange}
              />
              {language}
            </label>
          ))}
        </fieldset>

        <fieldset>
          <legend>Modalidad</legend>
          <label className="inline-radio">
            <input
              type="radio"
              name="modality"
              value="presencial"
              checked={formData.modality === 'presencial'}
              onChange={handleChange}
            />
            Presencial
          </label>
          <label className="inline-radio">
            <input
              type="radio"
              name="modality"
              value="virtual"
              checked={formData.modality === 'virtual'}
              onChange={handleChange}
            />
            Virtual
          </label>
        </fieldset>

        <label>
          País
          <select name="country" value={formData.country} onChange={handleChange}>
            <option value="">Seleccioná un país</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </label>

        <label>
          Comentarios
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            rows="4"
          />
        </label>

        <label>
          Foto de perfil
          <input type="file" name="photo" accept="image/*" onChange={handleChange} />
        </label>
        {photoPreview ? (
          <img className="preview-image" src={photoPreview} alt="Vista previa de la foto subida" />
        ) : null}

        <label>
          Color favorito
          <input type="color" name="color" value={formData.color} onChange={handleChange} />
        </label>

        <button type="submit" disabled={isSubmitDisabled}>
          Enviar
        </button>
      </form>

      {submittedData ? (
        <section className="summary">
          <h2>Resumen de datos</h2>
          <ul>
            <li><strong>Nombre:</strong> {submittedData.name}</li>
            <li><strong>Correo:</strong> {submittedData.email}</li>
            <li><strong>Edad:</strong> {submittedData.age}</li>
            <li><strong>Fecha de nacimiento:</strong> {submittedData.birthDate}</li>
            <li><strong>Nivel de experiencia:</strong> {submittedData.experience}/10</li>
            <li><strong>Términos aceptados:</strong> {submittedData.acceptedTerms ? 'Sí' : 'No'}</li>
            <li><strong>Lenguajes:</strong> {submittedData.languages.join(', ')}</li>
            <li><strong>Modalidad:</strong> {submittedData.modality}</li>
            <li><strong>País:</strong> {submittedData.country}</li>
            <li><strong>Comentarios:</strong> {submittedData.comments || 'Sin comentarios'}</li>
            <li><strong>Foto:</strong> {submittedData.photoName || 'Sin foto'}</li>
            <li><strong>Color favorito:</strong> {submittedData.color}</li>
          </ul>
          {submittedData.photoPreview ? (
            <img className="summary-image" src={submittedData.photoPreview} alt="Foto subida" />
          ) : null}
        </section>
      ) : null}
    </div>
  )
}

export default App
