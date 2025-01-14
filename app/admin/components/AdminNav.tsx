import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const handleLogout = async () => {
  const router = useRouter();
  await signOut({ 
    redirect: false
  });
  router.push('/');
}; 