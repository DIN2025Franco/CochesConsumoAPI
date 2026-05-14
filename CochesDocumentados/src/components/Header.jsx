import Nav from "./Nav.jsx";

function Header() {
  return (
    <header className="w-full secondary-bg text-white py-4 shadow-md">
      <section className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-[#d4af37] text-4xl md:text-5xl font-bold">Valior Motors</h1>
        <Nav />
      </section>
    </header>
  );
}
export default Header;