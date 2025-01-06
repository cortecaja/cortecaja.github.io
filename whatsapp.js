const formulario = document.querySelector('#formulario');
const buttonSubmit = document.querySelector('#submit');
const scriptURL = 'https://script.google.com/macros/s/AKfycbznCE_6E4ANJK85YPxIVcdPXZcsSvPDW7cJ--rsr2AvEhEEmmT-V5ve_WsT1RV5CWFv/exec';

formulario.addEventListener('submit', async (event) => {
  event.preventDefault();

  buttonSubmit.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>';
  buttonSubmit.disabled = true;

  const formData = {
    nombre: document.querySelector('#nombre').value.trim(),
    apellidos: document.querySelector('#apellidos').value.trim(),
    email: document.querySelector('#email').value.trim(),
  };

  console.log('Datos a enviar:', formData);

  try {
    const response = await fetch(scriptURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    console.log('Respuesta HTTP:', response);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Resultado JSON:', result);

    if (result.success) {
      alert('Formulario enviado exitosamente.');
    } else {
      alert(`Error del servidor: ${result.error}`);
    }
  } catch (error) {
    console.error('Error al conectar con el servidor:', error);
    alert('Error al conectar con el servidor. Verifica la consola para más detalles.');
  } finally {
    buttonSubmit.innerHTML = '<i class="fab fa-whatsapp"></i> Enviar WhatsApp';
    buttonSubmit.disabled = false;
  }
});

