import Link from 'next/link';
import { getCurrentUser } from '@/lib/getCurrentUser';
import { signOutAction } from '@/actions/auth'; // Import your Server Action here

export default async function Header() {
  const currentUser = await getCurrentUser();

  // 1. Array now only contains standard navigation links
  const navLinks = [
    !currentUser && { label: 'Sign Up', link: '/auth/signup' },
    !currentUser && { label: 'Sign In', link: '/auth/signin' },
  ]
    .filter((linkConfig) => linkConfig)
    .map((config: any) => {
      return (
        <li key={config.link}>
          <Link href={config.link}>{config.label}</Link>
        </li>
      );
    });

  return (
    <nav className="bg-blue-600 flex justify-between items-center py-2 px-5">
      <Link href={'/'} className="text-gray-900 font-bold">
        GitTix
      </Link>

      <div className="flex justify-center">
        <ul className="flex items-center gap-4">
          {/* Render the Sign In/Sign Up links */}
          {navLinks}

          {/* 2. Render the Sign Out form directly when authenticated */}
          {currentUser && (
            <li>
              <form action={signOutAction}>
                <button type="submit" className="text-gray-900 hover:underline cursor-pointer">
                  Sign Out
                </button>
              </form>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
