import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6 bg-gray-50">
      <h1 className="text-4xl font-bold mb-4">Voting System</h1>
      <div className="flex gap-4">
        <Link href="/register"><Button>Register</Button></Link>
        <Link href="/login"><Button variant="outline">Login</Button></Link>
        <Link href="/user/dashboard"><Button variant="secondary">User Dashboard</Button></Link>
        <Link href="/admin/dashboard"><Button variant="destructive">Admin Dashboard</Button></Link>
      </div>
    </main>
  );
}
