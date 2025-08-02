import { motion } from "framer-motion";
import { Building2, Cloud, Code, Database, Globe, Shield, Cpu, Leaf, Trees, Sprout } from "lucide-react";

const brands = [
  { name: "EcoBank", icon: Building2, color: "text-green-400" },
  { name: "GreenTech", icon: Leaf, color: "text-emerald-400" },
  { name: "NatureCloud", icon: Cloud, color: "text-green-500" },
  { name: "BioCode", icon: Code, color: "text-lime-400" },
  { name: "EcoFlow", icon: Database, color: "text-emerald-500" },
  { name: "GreenScale", icon: Globe, color: "text-green-600" },
  { name: "EcoShield", icon: Shield, color: "text-lime-500" },
  { name: "GreenCore", icon: Sprout, color: "text-emerald-600" },
];

export function BrandCarousel() {
  // Duplicate brands for seamless loop
  const allBrands = [...brands, ...brands];

  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex space-x-8"
        animate={{
          x: [0, -50 * brands.length * 8], // Move by width of one set
        }}
        transition={{
          duration: 30,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {allBrands.map((brand, index) => {
          const IconComponent = brand.icon;
          return (
            <motion.div
              key={`${brand.name}-${index}`}
              className="flex-shrink-0 glass rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 30px rgba(0, 102, 255, 0.3)"
              }}
            >
              <div className="flex items-center space-x-3 min-w-[150px]">
                <IconComponent className={`w-8 h-8 ${brand.color} group-hover:scale-110 transition-transform`} />
                <span className="text-white font-semibold text-lg">{brand.name}</span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
