import Header from "@/components/Header/Header"; // Importa el componente Header que se mostrará en todas las páginas
import "./globals.css"; // Importa los estilos globales del proyecto

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}