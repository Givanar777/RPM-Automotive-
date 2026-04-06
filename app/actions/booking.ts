'use server';

export async function submitBooking(formData: FormData) {
  const data = {
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    service: formData.get('service'),
    date: formData.get('date'),
    time: formData.get('time'),
    vehicle: formData.get('vehicle'),
    message: formData.get('message'),
  };

  // Log the lead for now as requested.
  // In a real production app, you would use a service like Resend, SendGrid, or Nodemailer here.
  console.log('--- NEW LEAD RECEIVED ---');
  console.log('To: lionsagencybc@gmail.com');
  console.log('Data:', JSON.stringify(data, null, 2));
  console.log('-------------------------');

  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return { success: true, message: '¡Cita solicitada con éxito! Nos pondremos en contacto pronto.' };
}

export async function submitQuote(formData: FormData) {
  const data = {
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    vehicle: formData.get('vehicle'),
    serviceType: formData.get('serviceType'),
    message: formData.get('message'),
  };

  console.log('--- NEW QUOTE REQUEST RECEIVED ---');
  console.log('To: lionsagencybc@gmail.com');
  console.log('Data:', JSON.stringify(data, null, 2));
  console.log('-------------------------');

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return { success: true, message: '¡Solicitud enviada con éxito! Nos pondremos en contacto pronto.' };
}
