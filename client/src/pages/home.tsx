import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, Menu, X, Sun, Moon, Code, Cloud, ServerCog, Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react";
import { SiLinkedin, SiX, SiGithub } from "react-icons/si";
import { ParticlesBackground } from "@/components/particles-background";
import { AnimatedCounter } from "@/components/animated-counter";
import { BrandCarousel } from "@/components/brand-carousel";
import { MoringaLogo } from "@/components/moringa-logo";
import { useTheme } from "@/components/ui/theme-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { scrollY } = useScroll();
  const queryClient = useQueryClient();

  // Parallax effects
  const heroY = useTransform(scrollY, [0, 300], [0, 150]);
  const particlesY = useTransform(scrollY, [0, 500], [0, 250]);

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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-navy via-darker-blue to-dark-navy text-white overflow-x-hidden">
      <ParticlesBackground />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center space-x-3">
                <MoringaLogo size={40} className="text-primary" />
                <div className="text-2xl font-bold gradient-text">Moringa</div>
              </div>
              {!isMobile && (
                <div className="flex space-x-6">
                  {["Home", "Services", "Clients", "Contact"].map((item) => (
                    <button
                      key={item}
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="text-gray-300 hover:text-accent transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="glass rounded-full hover:bg-white/10"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>

              {isMobile && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="glass rounded-lg"
                >
                  {mobileMenuOpen ? <X /> : <Menu />}
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobile && mobileMenuOpen && (
            <motion.div
              className="mt-4 glass rounded-lg p-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex flex-col space-y-4">
                {["Home", "Services", "Clients", "Contact"].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-left text-gray-300 hover:text-accent transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <motion.div style={{ y: heroY }} className="container mx-auto px-6 text-center relative z-10">
          {/* Animated Counter */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center glass rounded-full px-6 py-3 hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300">
              <AnimatedCounter className="text-4xl" suffix="+" />
              <span className="text-lg ml-2 text-accent">HAPPY CLIENTS</span>
              <span className="ml-2 text-2xl">😊</span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-8xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Let's Make Your<br />
            <span className="gradient-text">Business</span><br />
            <span className="gradient-text">Flourish.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Streamline operations with our tailored ERP systems, innovative software development, and comprehensive cloud services.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            className="relative max-w-md mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="glass rounded-full p-4 search-glow">
              <div className="flex items-center">
                <Search className="text-accent mr-3" />
                <Input
                  type="text"
                  placeholder="www.Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none flex-1 text-white placeholder-gray-400"
                />
              </div>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600"
              alt="Futuristic technology workspace"
              className="rounded-3xl shadow-2xl mx-auto max-w-4xl w-full hover:shadow-primary/25 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-navy/50 to-transparent rounded-3xl"></div>
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-1/4 left-10 glass rounded-full p-4"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Code className="text-2xl text-accent" />
        </motion.div>
        <motion.div
          className="absolute top-1/3 right-10 glass rounded-full p-4"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <Cloud className="text-2xl text-primary" />
        </motion.div>
        <motion.div
          className="absolute bottom-1/4 left-1/4 glass rounded-full p-4"
          animate={{ y: [0, -25, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <ServerCog className="text-2xl text-secondary" />
        </motion.div>
      </section>

      {/* Brands Section */}
      <section id="clients" className="py-20 bg-darker-blue/50">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Some of the <span className="gradient-text">Brands</span>
            </h2>
            <p className="text-xl text-gray-300">We worked with 😊</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <BrandCarousel />
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Our <span className="gradient-text">Services</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Comprehensive solutions to transform your business operations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: ServerCog,
                title: "ERP Systems",
                description: "Tailored Enterprise Resource Planning solutions to streamline your business operations and increase efficiency.",
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
                color: "text-primary"
              },
              {
                icon: Code,
                title: "Software Development",
                description: "Innovative custom software solutions built with cutting-edge technologies to meet your unique business needs.",
                image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
                color: "text-accent"
              },
              {
                icon: Cloud,
                title: "Cloud Services",
                description: "Comprehensive cloud infrastructure and migration services to scale your business with security and reliability.",
                image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
                color: "text-secondary"
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="glass border-white/10 hover:border-white/20 transition-all duration-300 group hover:shadow-2xl hover:shadow-primary/10">
                  <CardContent className="p-8 text-center">
                    <motion.div
                      className="w-16 h-16 mx-auto mb-6 glass rounded-2xl flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <service.icon className={`text-2xl ${service.color}`} />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-4 gradient-text">{service.title}</h3>
                    <p className="text-gray-300 mb-6">{service.description}</p>
                    <img
                      src={service.image}
                      alt={service.title}
                      className="rounded-xl w-full mb-4 opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                    <Button variant="ghost" className="glass rounded-full px-6 py-3 hover:bg-primary/20 transition-colors">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-darker-blue/30">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Ready to <span className="gradient-text">Transform</span> Your Business?
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Get in touch with our experts to discuss your project requirements
            </p>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="glass border-white/10">
                  <CardContent className="p-8">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  placeholder="Your Name"
                                  {...field}
                                  className="glass bg-transparent border-white/20 focus:border-primary"
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
                                  type="email"
                                  placeholder="Your Email"
                                  {...field}
                                  className="glass bg-transparent border-white/20 focus:border-primary"
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
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="glass bg-darker-blue border-white/20 focus:border-primary">
                                    <SelectValue placeholder="Select Service" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="erp">ERP Systems</SelectItem>
                                  <SelectItem value="development">Software Development</SelectItem>
                                  <SelectItem value="cloud">Cloud Services</SelectItem>
                                </SelectContent>
                              </Select>
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
                                  rows={4}
                                  placeholder="Tell us about your project"
                                  {...field}
                                  className="glass bg-transparent border-white/20 focus:border-primary resize-none"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button
                          type="submit"
                          disabled={contactMutation.isPending}
                          className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300"
                        >
                          {contactMutation.isPending ? "Sending..." : "Send Message"}
                          <Send className="ml-2 h-4 w-4" />
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                {[
                  { icon: Mail, title: "Email Us", info: "hello@jtech.so", color: "text-primary" },
                  { icon: Phone, title: "Call Us", info: "+1 (555) 123-4567", color: "text-accent" },
                  { icon: MapPin, title: "Visit Us", info: "123 Tech Street, Silicon Valley", color: "text-secondary" }
                ].map((contact, index) => (
                  <motion.div
                    key={contact.title}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Card className="glass border-white/10 hover:border-white/20 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 glass rounded-xl flex items-center justify-center">
                            <contact.icon className={`${contact.color}`} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg">{contact.title}</h4>
                            <p className="text-gray-300">{contact.info}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-darker-blue border-t border-white/10">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <MoringaLogo size={48} className="text-primary" />
              <div className="text-3xl font-bold gradient-text">Moringa</div>
            </div>
            <p className="text-gray-400 mb-6">Transforming businesses through innovative technology solutions</p>
            <div className="flex justify-center space-x-6 mb-8">
              {[
                { icon: SiLinkedin, color: "text-primary", href: "#" },
                { icon: SiX, color: "text-accent", href: "#" },
                { icon: SiGithub, color: "text-secondary", href: "#" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="glass rounded-full p-3 hover:bg-white/10 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className={`${social.color}`} />
                </motion.a>
              ))}
            </div>
            <p className="text-gray-500">&copy; 2024 Moringa. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
