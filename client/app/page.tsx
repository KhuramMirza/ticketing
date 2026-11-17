import { Suspense } from 'react';
import { getCurrentUser } from '@/lib/getCurrentUser';

const CurrentUser = async () => {
  // 1. No axios needed here
  // 2. No manual cookie parsing
  // 3. No connection() needed (the cookies() call in your utility already handles dynamic rendering)
  const currentUser = await getCurrentUser();

  return currentUser ? <h1>You are signed in</h1> : <h1>You are not signed in</h1>;
};

const Home = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CurrentUser />
    </Suspense>
  );
};

export default Home;
