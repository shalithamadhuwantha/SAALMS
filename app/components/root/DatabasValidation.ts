"use client";
import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Define the return type of the validation function
interface ValidationResult {
  isLoading: boolean;
  error: string | null;
  isValid: boolean;
}

// Define the database validation function
function UseDatabaseValidation(): ValidationResult {
  const { data: session, status } = useSession(); // Session data and status from next-auth
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [isValid, setIsValid] = useState(false); // Validation status

  useEffect(() => {
    const checkUserInDB = async () => {
      const UserMail = session?.user?.email;

      if (!UserMail) {
        setError("User not logged in or email not available");
        setIsLoading(false);
      }

      try {
        const response = await fetch("/api/usrCheack", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: UserMail }),
        });

        const data = await response.json();

        if (response.status === 202) {
          console.log("S");
          
          if (window.location.pathname === "/login/roll") {
            router.push("/login/details");
            setIsValid(false);
            setIsLoading(false);
          } else if (window.location.pathname === "/login/details") {
            if (data.Type === "Student") {
              router.push("/Student/Dashboard");
              setIsValid(false);
              setIsLoading(false); // Redirect to Student dashboard
            } else if (data.Type === "Lecturer") {
              router.push("/Lecturer/Dashboard");
              setIsValid(false);
              setIsLoading(false); // Redirect to Lecturer dashboard
            }
          } else {
            const userRole = window.location.pathname.split("/")[1];
            console.log(userRole);
            
            if (
              (data.Type === "Student" && userRole === "Student") ||
              (data.Type === "Lecturer" && userRole === "Lecturer")
            ) {
              setIsValid(true);
              setIsLoading(false);
              // Allow access
            } else {
              router.push("/");
              // Redirect to home page if user doesn't have access
            }
          }
        } else if (response.status === 200) {
          if (
            window.location.pathname === "/login/details" ||
            window.location.pathname === "/login/roll"
          ) {
            setIsValid(true);
            setIsLoading(false);
            // Allow access for registration pages
          } else {
            router.push("/");
            // Redirect to home page
          }
        } else {
          setError(data.message);

          setIsValid(false);
          setIsLoading(false); // Handle other errors
        }
      } catch (error) {
        console.error("Error validating user:", error);
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
  }, [session, status, router]);

  // Return the current state of validation
  return { isLoading, error, isValid };
}

export default UseDatabaseValidation;
