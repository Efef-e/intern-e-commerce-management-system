import Link from "next/link";

export default function Home() {
  return (
    <div>
      <header className="bg-black text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-3xl font-bold">
            E-Commerce Management System
          </h1>
          <nav className="space-x-4">
            <Link
              href="/productadd"
              className="px-6 py-3 text-white rounded-lg hover:bg-gray-800 transition-colors duration-500"
            >
              Product Add
            </Link>
            <Link
              href="/productlist"
              className="px-6 py-3 text-white rounded-lg hover:bg-gray-800 transition-colors duration-500"
            >
              List Products
            </Link>
          </nav>
        </div>
      </header>

      <main className="bg-white min-h-screen flex flex-col items-center justify-center text-center p-6">
        <div className="max-w-4xl">
          <h2 className="text-4xl font-bold mb-6 text-black">
            Make Your Easier With E-Commerce Management
            System
          </h2>
          <p className="text-lg mb-8 text-gray-700">
            Easily add, manage and list your products. A
            modern and user-friendly platform that will meet
            all your e-commerce needs.
          </p>
          <div className="space-x-4">
            <Link
              href="/productadd"
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-500"
            >
              Product Add
            </Link>
            <Link
              href="/productlist"
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-500"
            >
              List Product
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-black text-white py-4 mt-8">
        <div className="container mx-auto text-center">
          <p>
            &copy; 2024 E-Commerce Management System. All
            rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
