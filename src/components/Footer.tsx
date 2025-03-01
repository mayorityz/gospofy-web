export function Footer() {
  return (
    <footer className="bg-gray-900 py-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <p className="text-red-400">© 2025 Gospofy. All rights reserved.</p>
          <div className="flex gap-4">
            <a
              href="#"
              className="text-gray-400 hover:text-gold transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gold transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gold transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
