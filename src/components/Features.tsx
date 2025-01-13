import { Rocket, Shield, Zap } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Rocket className="w-8 h-8 text-primary" />,
      title: "Fast Development",
      description: "Build and deploy quickly with modern tools and frameworks",
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Secure by Default",
      description: "Enterprise-grade security built into every feature",
    },
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: "High Performance",
      description: "Optimized for speed and efficiency at every level",
    },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary mb-12">
          Amazing Features
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border hover:shadow-lg transition-shadow duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-secondary mb-2">
                {feature.title}
              </h3>
              <p className="text-secondary/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;