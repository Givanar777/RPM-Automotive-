'use server';

export async function submitQuote(formData: FormData) {
  const data = {
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    vehicle: formData.get('vehicle'),
    serviceType: formData.get('serviceType'),
    message: formData.get('message'),
  };

  console.log('--- NEW LEAD RECEIVED ---');
  console.log('Data:', JSON.stringify(data, null, 2));
  console.log('-------------------------');

  await new Promise((resolve) => setTimeout(resolve, 500));

  return { success: true };
}
