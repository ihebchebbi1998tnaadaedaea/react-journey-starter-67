import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="container mx-auto px-4 py-20 text-center animate-fade-up">
        <h1 className="text-4xl md:text-6xl font-bold text-secondary mb-6">
          Welcome to <span className="text-primary">YourApp</span>
        </h1>
        <p className="text-lg md:text-xl text-secondary/80 max-w-2xl mx-auto mb-8">
          Build something amazing with React and modern tools. Start your journey today
          with our powerful platform.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-6">
            Get Started
          </Button>
          <Button variant="outline" className="text-lg px-8 py-6">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;