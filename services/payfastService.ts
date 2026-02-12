
/**
 * South African Payment Integration Service (PayFast)
 * Documentation: https://developers.payfast.co.za/docs/
 */

interface PayFastParams {
  merchant_id: string;
  merchant_key: string;
  return_url: string;
  cancel_url: string;
  notify_url: string;
  name_first: string;
  email_address: string;
  m_payment_id: string;
  amount: string;
  item_name: string;
}

export const initiatePayFastPayment = (params: PayFastParams) => {
  // In a real app, you would generate a signature on the server
  // For this prototype, we'll simulate the redirect to PayFast's sandbox/live endpoint
  const baseUrl = 'https://www.payfast.co.za/eng/process';
  
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = baseUrl;

  Object.entries(params).forEach(([key, value]) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = value;
    form.appendChild(input);
  });

  document.body.appendChild(form);
  // form.submit(); // Commented out to prevent leaving the app in demo
  console.log('Redirecting to PayFast with:', params);
};
