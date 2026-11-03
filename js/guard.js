import { supabase } from "./supabase-config.js";

async function proteger() {
  // getUser() verifica la sesión con el servidor de Supabase
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return location.replace("login.html");

  // El rol vive en la tabla "perfiles" (protegida con RLS)
  const { data: perfil, error: errPerfil } = await supabase
    .from("perfiles").select("nombre, rol").eq("id", user.id).single();

  if (errPerfil || !perfil || !["estudiante", "docente"].includes(perfil.rol)) {
    alert("Tu cuenta no tiene un rol asignado. Contacta al administrador.");
    await supabase.auth.signOut();
    return location.replace("login.html");
  }

  const etiqueta = perfil.rol === "docente" ? "Docente" : "Estudiante";
  document.querySelector(".user-profile span").textContent = (perfil.nombre || user.email) + " (" + etiqueta + ")";
  // Elementos con data-rol="docente" solo los ve ese rol (solo visual)
  document.querySelectorAll("[data-rol]").forEach(el => { if (el.dataset.rol !== perfil.rol) el.remove(); });
  document.body.hidden = false;
}

supabase.auth.onAuthStateChange(evento => {
  if (evento === "SIGNED_OUT") location.replace("login.html");
});

document.addEventListener("click", e => {
  if (e.target.closest(".btn-logout")) { e.preventDefault(); supabase.auth.signOut(); }
});

proteger();
