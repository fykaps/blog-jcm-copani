/**
 * Formulario de Contacto - Versión Profesional
 * 
 * Funcionalidades:
 * - Validación en tiempo real
 * - Envío asíncrono
 * - Manejo de estados
 * - Accesibilidad mejorada
 */

document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    // Elementos del formulario
    const formElements = {
        name: document.getElementById('contact-name'),
        email: document.getElementById('contact-email'),
        phone: document.getElementById('contact-phone'),
        subject: document.getElementById('contact-subject'),
        message: document.getElementById('contact-message'),
        newsletter: document.getElementById('contact-newsletter'),
        submitBtn: contactForm.querySelector('button[type="submit"]'),
        successMessage: document.getElementById('success-message')
    };

    // Expresiones regulares para validación
    const patterns = {
        name: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phone: /^[0-9\s+-]{0,20}$/,
        message: /^[\s\S]{10,500}$/
    };

    // Mensajes de error
    const errorMessages = {
        name: 'Por favor ingresa un nombre válido (2-50 caracteres)',
        email: 'Por favor ingresa un email válido',
        phone: 'Por favor ingresa un teléfono válido',
        subject: 'Por favor selecciona un asunto',
        message: 'El mensaje debe tener entre 10 y 500 caracteres',
        generic: 'Este campo es requerido'
    };

    // Estado del formulario
    let formState = {
        isValid: false,
        isSubmitting: false
    };

    // Inicializar eventos
    initFormEvents();

    function initFormEvents() {
        // Validación en tiempo real
        formElements.name.addEventListener('input', () => validateField('name'));
        formElements.email.addEventListener('input', () => validateField('email'));
        formElements.phone.addEventListener('input', () => validateField('phone'));
        formElements.subject.addEventListener('change', () => validateField('subject'));
        formElements.message.addEventListener('input', () => validateField('message'));

        // Envío del formulario
        contactForm.addEventListener('submit', handleSubmit);
    }

    function validateField(fieldName) {
        const field = formElements[fieldName];
        const errorElement = document.getElementById(`${fieldName}-error`);
        let isValid = false;
        let errorMessage = '';

        if (field.required && !field.value.trim()) {
            errorMessage = errorMessages.generic;
        } else {
            switch (fieldName) {
                case 'name':
                    isValid = patterns.name.test(field.value.trim());
                    errorMessage = isValid ? '' : errorMessages.name;
                    break;
                case 'email':
                    isValid = patterns.email.test(field.value.trim());
                    errorMessage = isValid ? '' : errorMessages.email;
                    break;
                case 'phone':
                    isValid = field.value === '' || patterns.phone.test(field.value);
                    errorMessage = isValid ? '' : errorMessages.phone;
                    break;
                case 'subject':
                    isValid = field.value !== '';
                    errorMessage = isValid ? '' : errorMessages.subject;
                    break;
                case 'message':
                    isValid = patterns.message.test(field.value.trim());
                    errorMessage = isValid ? '' : errorMessages.message;
                    break;
                case 'newsletter':
                    isValid = true;
                    break;
            }
        }

        // Actualizar UI
        if (errorMessage) {
            field.setAttribute('aria-invalid', 'true');
            errorElement.textContent = errorMessage;
            formState.isValid = false;
        } else {
            field.removeAttribute('aria-invalid');
            errorElement.textContent = '';
        }

        // Verificar estado general del formulario
        checkFormValidity();
        return isValid;
    }

    function checkFormValidity() {
        const requiredFields = ['name', 'email', 'subject', 'message'];
        formState.isValid = requiredFields.every(field => {
            const element = formElements[field];
            return element.value.trim() !== '' && !element.hasAttribute('aria-invalid');
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        // Validar todos los campos antes de enviar
        const fieldsToValidate = ['name', 'email', 'subject', 'message'];
        const allValid = fieldsToValidate.every(field => validateField(field));

        if (!allValid || formState.isSubmitting) return;

        // Cambiar estado a "enviando"
        formState.isSubmitting = true;
        contactForm.classList.add('is-loading');
        formElements.submitBtn.setAttribute('disabled', 'true');
        formElements.submitBtn.setAttribute('aria-busy', 'true');

        try {
            // Simular envío (en producción sería una llamada fetch)
            await simulateFormSubmit();

            // Mostrar mensaje de éxito
            contactForm.reset();
            contactForm.style.display = 'none';
            formElements.successMessage.style.display = 'flex';

            // Enfocar el mensaje de éxito para lectores de pantalla
            formElements.successMessage.focus();
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            showFormError('Ocurrió un error al enviar el mensaje. Por favor intenta nuevamente.');
        } finally {
            // Restaurar estado
            formState.isSubmitting = false;
            contactForm.classList.remove('is-loading');
            formElements.submitBtn.removeAttribute('disabled');
            formElements.submitBtn.removeAttribute('aria-busy');
        }
    }

    function simulateFormSubmit() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simular éxito 90% de las veces para pruebas
                Math.random() > 0.1 ? resolve() : reject(new Error('Simulated server error'));
            }, 1500);
        });
    }

    function showFormError(message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message form-error';
        errorElement.textContent = message;
        errorElement.setAttribute('role', 'alert');

        contactForm.insertBefore(errorElement, contactForm.firstChild);

        // Desaparecer después de 5 segundos
        setTimeout(() => {
            errorElement.remove();
        }, 5000);
    }
});