Set WshShell = CreateObject("WScript.Shell")

' 1. Iniciar el Backend (Node.js) de forma silenciosa (el 0 oculta la ventana)
WshShell.Run "cmd.exe /c cd backend && node server.js", 0, False

' 2. Iniciar el Frontend (Vite) de forma silenciosa
WshShell.Run "cmd.exe /c cd frontend && npm run dev", 0, False

' 3. Esperar 3 segundos para que los servidores levanten
WScript.Sleep 3000

' 4. Abrir el navegador automáticamente en la ruta local
WshShell.Run "http://localhost:5173"
