"use client";
import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const UserValidDB: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkUserInDB = async () => {
      
      const UserMail = session?.user?.email;  

      if (!UserMail) {
        setError("User not logged in or email not available");
        setIsLoading(false);
        return;
      }

      try {
        // Send API request and gather the result and validity
        const response = await fetch("/api/usrCheack", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: UserMail }),
        });

        const data = await response.json();

        if (response.status === 409) {
          // Check if the user is registered (Lecturer or Student)
          if (window.location.pathname === "/login/details") {
            if (data.Type === "Student") {
              router.push("/student/dashboard"); // Redirect to Student dashboard
            } else if (data.Type === "Lecturer") {
              router.push("/Lecturer/Dashboard"); // Redirect to Lecturer dashboard
            }
          } else {
            // Check the user's role and whether they can access the page
            const userRole = window.location.pathname.split("/")[1];
            if (
              (data.Type === "Student" && userRole === "student") ||
              (data.Type === "Lecturer" && userRole === "lecturer")
            ) {
              setIsLoading(false);
              return; // Allow access to the page
            } else {
              router.push("/"); // Redirect to home page if user doesn't have access
            }
          }
        } else if (response.status === 200) {
          // New user who can register, allow on specific pages
          if (
            window.location.pathname === "/login/details" ||
            window.location.pathname === "/login/roll"
          ) {
            setIsLoading(false);
            return;
          } else {
            router.push("/"); // Redirect to home page for other cases
          }
        } else {
          setError(data.message); // Handle other errors
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        setError("An error occurred while checking the email.");
      } finally {
        setIsLoading(false); // End loading state
      }
    };

    if (session) {
      checkUserInDB();
    } else if (status === "unauthenticated") {
      signIn(); // Redirect to sign in if unauthenticated
    }
  }, [session, status, router]); // Properly add dependencies

  if (isLoading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div>{error}</div>; // Show error if any
  }

  return <>{children}</>; // Render children content if validation is passed
};

export default UserValidDB;
