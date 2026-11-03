import { supabase } from "./supabase-config.js";

const form = document.getElementById("form-login");
const msg = document.getElementById("login-msg");

// Si ya hay sesión, ir directo al inicio
const { data: { session } } = await supabase.auth.getSession();
if (session) location.replace("index.html");

form.addEventListener("submit", async e => {
  e.preventDefault();
  msg.textContent = "";
  const { error } = await supabase.auth.signInWithPassword({
    email: form.correo.value.trim(),
    password: form.clave.value
  });
  if (!error) return location.replace("index.html");
  msg.textContent = (error.code === "invalid_credentials" || error.status === 400)
    ? "Correo o contraseña incorrectos."
    : "No se pudo iniciar sesión. Intenta de nuevo.";
});
