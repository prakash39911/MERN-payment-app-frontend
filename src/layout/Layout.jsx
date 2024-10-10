import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header at the top */}
      <header>
        <Header />
      </header>

      {/* Main content, grows to fill the space between header and footer */}
      <main className="flex-grow flex justify-center items-center">
        {children}
      </main>

      {/* Footer at the bottom */}
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
