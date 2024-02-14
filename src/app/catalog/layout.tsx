
export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="main">
      <div className="container">
        <h2>Умный путь</h2>
      </div>
      {children}
    </main>
  );
}
