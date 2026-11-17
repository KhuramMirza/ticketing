import { cache } from 'react';
import axios from 'axios';
import { cookies } from 'next/headers';

export const getCurrentUser = cache(async () => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;

  try {
    const response = await axios.get(
      'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
      {
        headers: {
          Host: 'tickets.local',
          Cookie: sessionCookie ? `session=${sessionCookie}` : '',
        },
      },
    );

    return response.data.currentUser;
  } catch (error) {
    // Handle unauthorized or network errors gracefully
    return null;
  }
});
