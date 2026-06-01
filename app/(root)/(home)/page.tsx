'use client';

import { useEffect, useState } from 'react';
import MeetingTypeList from '@/components/MeetingTypeList';
import { useUser } from '@clerk/nextjs';

const MESSAGES = [
  'Keep going, you’re closer than you think.',
  'Every small step moves you forward.',
  'Trust yourself and the journey.',
  'Good things are worth the wait.',
  'Your next opportunity is on its way.',
  'Stay consistent, progress will follow.',
  'Today is another chance to grow.',
  'Keep building your future.',
];

const Home = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  const now = new Date();

  const time = now.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const date = new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'full',
  }).format(now);

  return (
    <section className="flex size-full flex-col gap-5 text-white">
      <div className="h-[303px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <div>
            <h1 className="text-xl font-semibold">
              Welcome Back, {user?.firstName || 'Guest'}
            </h1>

            <p className="mt-1 text-sm text-sky-1 transition-all duration-500">
              {MESSAGES[messageIndex]}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time} WIB</h1>

            <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
          </div>
        </div>
      </div>

      <MeetingTypeList />
    </section>
  );
};

export default Home;
