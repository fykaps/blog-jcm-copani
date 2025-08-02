/**
 * Validación de formulario de contacto
 */

document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    // Elementos del formulario
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const phoneInput = document.getElementById('contact-phone');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');
    const successMessage = document.getElementById('success-message');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const submitText = submitButton.querySelector('.submit-text');
    const loadingSpinner = submitButton.querySelector('.loading-spinner');

    // Expresiones regulares para validación
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9\-\+\(\)\s]{7,}$/;

    // Manejar envío del formulario
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Validar campos
        const isNameValid = validateField(nameInput, 'name-error', value => value.trim() !== '', 'Por favor ingresa tu nombre');
        const isEmailValid = validateField(emailInput, 'email-error', value => emailRegex.test(value), 'Por favor ingresa un email válido');
        const isPhoneValid = validateField(phoneInput, 'phone-error', value => value === '' || phoneRegex.test(value), 'Por favor ingresa un teléfono válido');
        const isSubjectValid = validateField(subjectInput, 'subject-error', value => value.trim() !== '', 'Por favor ingresa un asunto');
        const isMessageValid = validateField(messageInput, 'message-error', value => value.trim().length >= 10, 'El mensaje debe tener al menos 10 caracteres');

        // Si todo es válido, enviar formulario (simulado)
        if (isNameValid && isEmailValid && isPhoneValid && isSubjectValid && isMessageValid) {
            submitForm();
        }
    });

    // Función para validar campos
    function validateField(input, errorId, validationFn, errorMessage) {
        const errorElement = document.getElementById(errorId);
        const value = input.value.trim();
        const isValid = validationFn(value);

        if (isValid) {
            input.classList.remove('error');
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        } else {
            input.classList.add('error');
            errorElement.textContent = errorMessage;
            errorElement.style.display = 'block';
        }

        return isValid;
    }

    // Función para enviar el formulario (simulado)
    function submitForm() {
        // Mostrar estado de carga
        submitText.style.display = 'none';
        loadingSpinner.style.display = 'inline-block';
        submitButton.disabled = true;

        // Simular envío al servidor (en un caso real sería una petición fetch)
        setTimeout(() => {
            // Ocultar estado de carga
            submitText.style.display = 'inline-block';
            loadingSpinner.style.display = 'none';
            submitButton.disabled = false;

            // Mostrar mensaje de éxito
            successMessage.style.display = 'block';
            contactForm.reset();

            // Ocultar mensaje después de 5 segundos
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);

            // En un caso real, aquí iría el código para enviar los datos al servidor
            // const formData = new FormData(contactForm);
            // fetch('url-del-servidor', {
            //     method: 'POST',
            //     body: formData
            // })
            // .then(response => response.json())
            // .then(data => {
            //     // Manejar respuesta del servidor
            // })
            // .catch(error => {
            //     // Manejar errores
            // });
        }, 1500);
    }

    // Validación en tiempo real
    nameInput.addEventListener('blur', () => {
        validateField(nameInput, 'name-error', value => value.trim() !== '', 'Por favor ingresa tu nombre');
    });

    emailInput.addEventListener('blur', () => {
        validateField(emailInput, 'email-error', value => emailRegex.test(value), 'Por favor ingresa un email válido');
    });

    phoneInput.addEventListener('blur', () => {
        validateField(phoneInput, 'phone-error', value => value === '' || phoneRegex.test(value), 'Por favor ingresa un teléfono válido');
    });

    subjectInput.addEventListener('blur', () => {
        validateField(subjectInput, 'subject-error', value => value.trim() !== '', 'Por favor ingresa un asunto');
    });

    messageInput.addEventListener('blur', () => {
        validateField(messageInput, 'message-error', value => value.trim().length >= 10, 'El mensaje debe tener al menos 10 caracteres');
    });
});