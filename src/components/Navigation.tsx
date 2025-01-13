import { Button } from "@/components/ui/button";

const Navigation = () => {
  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-sm z-50 border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-primary">YourApp</div>
        <div className="hidden md:flex space-x-6 items-center">
          <a href="#features" className="text-secondary hover:text-primary transition-colors">Features</a>
          <a href="#about" className="text-secondary hover:text-primary transition-colors">About</a>
          <Button className="bg-primary hover:bg-primary/90 text-white">Get Started</Button>
        </div>
        <Button variant="ghost" className="md:hidden">Menu</Button>
      </div>
    </nav>
  );
};

export default Navigation;