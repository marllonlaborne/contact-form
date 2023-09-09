const form = document.querySelector('.form')

const handleSubmit = (event) => {
  event.preventDefault()
  validateFields()
  
  const areFieldsValid = validateFields()

  if (areFieldsValid) {
    alert('Form sent, we will be in touch!')
    form.submit()
  }
}

const validateFields = () => {
  let valid = true
  const formField = form.querySelectorAll('.validate')
  const errorText = form.querySelectorAll('.error-text')
  
  errorText.forEach(error => error.remove())

  formField.forEach(field => {
    const label = field.placeholder
    const value = field.value
    
    if (!field.value) {
      addErrorMessage(field, `${label} field can't be blank`)
      valid = false
    } 

    if (field.classList.contains('email')) {
      if (!validateEmail(value)) {
        addErrorMessage(field, 'Please enter a valid email address')
        valid = false
      }
    }

    if (field.classList.contains('name')) {
      if (!validateName(field)) valid = false
    }
  })

  return valid
}

const validateName = (field) => {
  let valid = true
  const name = document.querySelector('.name')

  if (name.value.length < 3) {
    addErrorMessage(field, 'Name field should have at least 3 characters or more')
    valid = false
  }

  return valid
}

const addErrorMessage = (field, message) => {
  const div = document.createElement('div')
  div.innerHTML = message
  div.classList.add('error-text')
  field.insertAdjacentElement('afterend', div)
}

const validateEmail = (email) => {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  
  return emailRegex.test(email)
}

form.addEventListener('submit', handleSubmit)
