
const supabaseUrl = 'https://rimkjlrnwievpupuhtgi.supabase.co';        // tu URL real
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpbWtqbHJud2lldnB1cHVodGdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxNzM2ODMsImV4cCI6MjA2Nzc0OTY4M30.yCJ0WWweaOTwoRRKQcDXyh2nzdGgZ7miEJq-Y9LBg8U';                               // tu clave pública real

const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);


// Exponerlo como variable global para que index.html lo use
window.supabase = supabaseClient;
