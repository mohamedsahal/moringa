import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Mail, ArrowRight, Leaf, Code, Cloud, Users } from "lucide-react";
import Spline from '@splinetool/react-spline';
import { MoringaLogo } from "@/components/moringa-logo";
import { AnimatedCounter } from "@/components/animated-counter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Landing() {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Contact form
  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      service: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      const response = await apiRequest("POST", "/api/contacts", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
    },
    onError: () => {
      toast({
        title: "Failed to send message",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContact) => {
    contactMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden" style={{ 
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)' 
    }}>
      {/* Subtle background pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #22c55e 2px, transparent 2px), radial-gradient(circle at 75% 75%, #16a34a 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }} />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-slate-900/50 border-b border-green-500/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <MoringaLogo size={40} />
              <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                Moringa
              </div>
            </motion.div>
            <Button variant="outline" className="border-green-500 text-green-400 hover:bg-green-500/10">
              Contact Us
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center relative px-6 pt-20 bg-slate-900">
        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-left">
              {/* Main Heading */}
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Transform Your<br />
                <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent">
                  Business
                </span>
              </motion.h1>

              {/* Subheading */}
              <motion.p
                className="text-lg text-gray-300 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Enterprise solutions for digital transformation with cutting-edge ERP systems and cloud services.
              </motion.p>

              {/* Call to Action Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300"
                >
                  Get Started
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-green-500 text-green-400 hover:bg-green-500/10 px-8 py-4 rounded-lg"
                >
                  Learn More
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="flex gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div>
                  <div className="text-2xl font-bold text-green-400">
                    <AnimatedCounter suffix="+" />
                  </div>
                  <div className="text-sm text-gray-400">Happy Clients</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">98%</div>
                  <div className="text-sm text-gray-400">Success Rate</div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - 3D Component */}
            <div className="relative h-[600px] lg:h-[700px]">
              <motion.div
                className="w-full h-full"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <Spline 
                  scene="https://prod.spline.design/QYHiMjWrshPtiX4K/scene.splinecode"
                  style={{ width: '100%', height: '100%' }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                Core Services
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Comprehensive technology solutions designed to accelerate your business growth
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto">
            {[
              {
                icon: Code,
                title: "ERP Systems",
                description: "End-to-end Enterprise Resource Planning solutions that integrate all your business processes into a single, efficient system.",
                features: ["Custom Workflows", "Real-time Analytics", "Multi-platform Integration"],
                color: "text-green-400"
              },
              {
                icon: Cloud,
                title: "Software Development",
                description: "Bespoke software applications built with modern technologies to solve your unique business challenges.",
                features: ["Web Applications", "Mobile Solutions", "API Development"],
                color: "text-emerald-400"
              },
              {
                icon: Leaf,
                title: "Cloud Services",
                description: "Scalable cloud infrastructure and migration services to ensure your business stays ahead of the curve.",
                features: ["Cloud Migration", "DevOps Solutions", "24/7 Support"],
                color: "text-lime-400"
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="backdrop-blur-md bg-white/5 border border-green-500/20 hover:border-green-500/40 transition-all duration-300 h-full">
                  <CardContent className="p-8">
                    <div className="w-12 h-12 mb-6 backdrop-blur-md bg-green-500/10 rounded-xl flex items-center justify-center">
                      <service.icon className={`text-xl ${service.color}`} />
                    </div>
                    <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                      {service.title}
                    </h3>
                    <p className="text-gray-300 mb-6 text-sm leading-relaxed">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="text-green-400 text-sm flex items-center">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 backdrop-blur-md bg-green-500/5">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "Projects Delivered" },
              { number: "98%", label: "Client Satisfaction" },
              { number: "24/7", label: "Support Available" },
              { number: "10+", label: "Years Experience" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                Transform
              </span> Your Business?
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Let's discuss how our solutions can drive your business forward
            </p>
          </motion.div>

          <motion.div
            className="max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="backdrop-blur-md bg-white/5 border border-green-500/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                  Get In Touch
                </h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Your Name"
                              className="bg-transparent border-green-500/20 focus:border-green-400 text-white placeholder-gray-400"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              placeholder="Your Email"
                              className="bg-transparent border-green-500/20 focus:border-green-400 text-white placeholder-gray-400"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Service Interest"
                              className="bg-transparent border-green-500/20 focus:border-green-400 text-white placeholder-gray-400"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Your Message"
                              className="bg-transparent border-green-500/20 focus:border-green-400 text-white placeholder-gray-400 min-h-[100px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      disabled={contactMutation.isPending}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/25"
                    >
                      {contactMutation.isPending ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Message <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 backdrop-blur-md bg-slate-900/50 border-t border-green-500/20">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <MoringaLogo size={48} />
            <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
              Moringa
            </div>
          </div>
          <p className="text-gray-400 mb-6">Transforming businesses through innovative technology solutions</p>
          <p className="text-gray-500">&copy; 2024 Moringa. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}