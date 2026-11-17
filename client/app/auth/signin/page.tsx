'use client';

import { type SubmitEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import useRequest from '@/hooks/useRequest';

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess: () => router.push('/'),
  });

  const onSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    await doRequest();
  };

  return (
    <div className={'bg-blue-300  text-gray-900 h-screen flex justify-center items-center'}>
      <form onSubmit={onSubmit} className={'flex flex-col items-center justify-center gap-3'}>
        <h1 className={'text-2xl font-semibold'}>Sign In</h1>
        <div className={'flex flex-col'}>
          <label htmlFor={'email'}>Email Address</label>
          <input
            className={'p-2 w-full border border-gray-300 rounded-lg'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type={'email'}
            id={'email'}
          />
        </div>
        <div className={'flex flex-col'}>
          <label htmlFor={'password'}>Password</label>
          <input
            className={'p-2 w-full border border-gray-300 rounded-lg'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={'password'}
            id={'password'}
          />
        </div>
        {errors}
        <button className={'p-2 rounded-2xl bg-blue-600 '} type={'submit'}>
          Sign In
        </button>
      </form>
    </div>
  );
}
