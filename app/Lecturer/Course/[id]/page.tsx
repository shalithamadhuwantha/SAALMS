'use client'; // Ensure the component runs on the client side


import CreateClassPage from '@/app/components/Lecturer/Dashboard/Createclass';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';


export default function CoursePage() {
  const pathname = usePathname(); // Get the current path
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    // Extract the id from the pathname (e.g., /course/123)
    const pathParts = pathname?.split('/'); // Split the pathname by slashes
    const courseId = pathParts?.[3]; // Assuming the ID is the third part (e.g., /course/123)
    
    if (courseId) {
      setId(courseId);  // Set the extracte d id
    }
  }, [pathname]); // Re-run the effect when pathname changes

  if (!id) {
    return <p>Loading...</p>;  // Show a loading state while id is being fetched
  }

  return (
    <div>
      <CreateClassPage />
    </div>
  );
}
