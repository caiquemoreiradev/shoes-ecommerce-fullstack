import React, { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default function Return() {

  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');

  useEffect(() => {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');

    fetch(`/api/checkout_sessions?session_id=${sessionId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);

        console.log(status)
      });
  }, []);

  if (status === 'open') {
    return (
      redirect('/')
    )
  }

  if (status === 'complete') {
    return (
      <section className='flex flex-col justify-center items-center h-[100vh] bg-gray-700'>

        <div className='bg-white rounded-lg shadow-2xl p-10'>
          <img className="w-28" src="https://cdn-icons-png.flaticon.com/512/2742/2742674.png" alt="store__logo" />
          

          <h2 className='font-bold text-3xl my-10'>Thanks for your order!</h2>

          <p className='mt-5 my-2 text-2xl'>
            We appreciate your business! A confirmation email will be sent to <strong>{customerEmail}</strong>.
          </p>

          <p className='text-gray-400 mb-16'>
            If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
          </p>

          <Link href={'/'} className='mt-10 bg-emerald-600 px-10 py-4 rounded-xl text-white'>return to home</Link>
        </div>
      </section>
    )
  }

  return null;
}