// ======================================================
// SECTION 12
// PURPOSE: Login Page
// ROUTE: /login
// ======================================================

import LoginBackground from "./LoginBackground";
import LoginContent from "./LoginContent";

export default function Login()  {
  return (
    <section className="relative overflow-hidden">
      <LoginBackground />

      <div className="relative z-10">
        <LoginContent />
      </div>
    </section>
  );
}