import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="container mx-auto py-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gold">Gospofy</h1>
        <nav className="flex gap-6">
          <a href="#" className="text-white hover:text-gold transition-colors">
            Home
          </a>
          <a href="#" className="text-white hover:text-gold transition-colors">
            Discover
          </a>
          <a href="#" className="text-white hover:text-gold transition-colors">
            Library
          </a>
        </nav>
        <div className="flex gap-4">
          <Button variant="outline" size="sm">
            Login
          </Button>
          <Button size="sm">Sign Up</Button>
        </div>
      </div>
    </header>
  );
}
