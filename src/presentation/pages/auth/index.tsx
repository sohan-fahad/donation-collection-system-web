import { useState } from "react";
import { LoginForm } from "./login";
import { RegistrationForm } from "./registration";

export default function AuthPage() {
  const [state, setState] = useState<"LOGIN" | "REGISTER">("LOGIN");
  return (
    <div className="flex flex-col justify-center items-center min-h-screen space-x-4 space-y-4">
      {state == "LOGIN" ? (
        <LoginForm />
      ) : (
        <RegistrationForm onStateChange={() => setState("LOGIN")} />
      )}

      {state == "LOGIN" ? (
        <>
          <button
            className="text-blue-700"
            onClick={() => setState("REGISTER")}
          >
            Create an account?
          </button>
        </>
      ) : (
        <>
          <button className="text-blue-700" onClick={() => setState("LOGIN")}>
            Already have an account?
          </button>
        </>
      )}
    </div>
  );
}
