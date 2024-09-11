"use client";
import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import the useRouter hook for client-side navigation

const UserValidDB: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter(); // Initialize the router for navigation
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentURL, setCurrentURL] = useState("");

  useEffect(() => {
    const checkUserInDB = async () => {
      const UserMail = session?.user?.email;

      if (!UserMail) {
        setError("User not logged in or email not available");
        setIsLoading(false);
        return;
      }

      try {
        // send API request and gather the database resulat and validity
        const response = await fetch("/api/usrCheack", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: UserMail }),
        });

        const data = await response.json();

        console.log(window.location.pathname.split("/")[1]);

        if (response.status === 409) {
          // cndition for is user is registed or login
          if (window.location.pathname == "/login/details") {
            if (data.Type === "Student") {
              router.push("/Student/Dashboard"); // Redirect to Student dashboard
            } else if (data.Type === "Lecturer") {
              router.push("/Lecturer/Dashboard"); // Redirect to Lecturer dashboard
            }
          } else {
            // cheack the ather page visibiloity

            if (
              data.Type === "Student" &&
              window.location.pathname.split("/")[1] == "Student"
            ) {
              // for student visibilty
              return { children };
            } else if (
              data.Type === "Lecturer" &&
              window.location.pathname.split("/")[1] == "Lecturer"
            ) {
              //  for lecture page visibility
              return { children };
            } else {
              // block the user athe return to the login
              return router.push("/");
            }
          }
        } else if (response.status === 200) {
          // If the user is new and can register
          if (window.location.pathname == "/login/details" || window.location.pathname == "/login/roll" ) {
            return ;
          }else{
            return router.push("/");
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
      signIn(); // Prompt login if unauthenticated
    }
  });

  if (isLoading) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  if (error) {
    return <div>{error}</div>; // Show error message if error occurs
  }

  // Render children content if no redirection is needed
  return <>{children}</>;
};

export default UserValidDB;
