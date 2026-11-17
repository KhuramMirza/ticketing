'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import axios from 'axios';

export async function signOutAction() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;

  // 1. Hit your Express GET route to destroy the session in the backend
  if (sessionCookie) {
    try {
      await axios.get(
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/signout',
        {
          headers: {
            Host: 'tickets.local',
            Cookie: `session=${sessionCookie}`,
          },
        },
      );
    } catch (error) {
      // Safe to ignore errors here; we still want to clear the local cookie
    }
  }

  // 2. Delete the Next.js cookie from the user's browser
  cookieStore.delete('session');

  // 3. Redirect back to the root page
  redirect('/');
}
