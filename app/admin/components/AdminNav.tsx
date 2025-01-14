import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminNav() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ 
      redirect: false
    });
    router.push('/');
  }; 

  return (
    // ... reszta komponentu ...
    <button onClick={handleLogout}>
      Wyloguj się
    </button>
    // ... reszta komponentu ...
  );
} 