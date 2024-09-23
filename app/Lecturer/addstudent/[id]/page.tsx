"use client";

import AddStudent from '@/app/components/Lecturer/Students/StudentsLec';
import LoadingSpinner from '@/app/components/root/LoadingSpinner';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AddlecBase() {
  const pathname = usePathname();
  const [id, setId] = useState<string | null>(null);
  const [courseCode, setCourseCode] = useState<string>(''); 
  const [cname, setCname] = useState<string>(''); 
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const pathParts = pathname?.split('/');
    const courseId = pathParts?.[3]; 

    if (courseId) {
      setId(courseId);
    } else {
      setLoading(false);
    }
  }, [pathname]);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      if (id) {
        setLoading(true);
        try {
          const response = await fetch('/api/course/find', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: id }),
          });

          const data = await response.json();

          if (response.ok) {
            console.log('Fetched Course Data:', data.course);
            setCourseCode(data.course.code);
            setCname(data.course.name);
          } else {
            console.log('Error:', data.message);
          }
        } catch (error) {
          console.error('Error fetching course details:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCourseDetails();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  console.log('Course Name:', cname);
  console.log('Course Code:', courseCode);

  // Only render AddStudent if courseCode and cname are valid
  if (!courseCode || !cname) {
    return <p>No course data available.</p>;
  }

  return <AddStudent name={cname} code={courseCode} />;
}
