import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Mail, ArrowRight, Leaf, Code, Cloud, Users } from "lucide-react";
import Spline from '@splinetool/react-spline';
import { MoringaLogo } from "@/components/moringa-logo";
import moringaLogoPng from "@assets/vecteezy_moringa-logo-vector-template-symbol-nature_35685081 copy_1754236645060.png";
import { AnimatedCounter } from "@/components/animated-counter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema, type InsertContact } from "@shared/schema";
// Frontend-only implementation - no backend calls needed
import { useToast } from "@/hooks/use-toast";

export default function Landing() {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

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

  // Frontend-only form submission
  const onSubmit = (data: InsertContact) => {
    // Just show success message without backend call
    toast({
      title: "Message received!",
      description: "Thank you for your interest. We'll contact you soon at " + data.email,
    });
    form.reset();
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
              <img src={moringaLogoPng} alt="Moringa Logo" className="w-10 h-10" />
              <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                Moringa
              </div>
            </motion.div>
            <Button 
              variant="outline" 
              className="border-green-500 text-green-400 hover:bg-green-500/10"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative px-6 pt-20 bg-slate-900">
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left lg:pl-8">
              {/* Main Heading */}
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="whitespace-nowrap">Digital Solutions for </span>
                <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent">
                  Modern Business
                </span>
              </motion.h1>

              {/* Subheading */}
              <motion.p
                className="text-xl text-gray-300 mb-10 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                We empower organizations with innovative ERP systems, custom software development, and comprehensive cloud solutions that drive growth and efficiency.
              </motion.p>

              {/* Call to Action Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Get Started
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-green-500 text-green-400 hover:bg-green-500/10 px-8 py-4 rounded-lg"
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Learn More
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="flex gap-8 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div>
                  <div className="text-2xl font-bold text-green-400">
                    <AnimatedCounter target={100} />+
                  </div>
                  <div className="text-sm text-gray-400">Happy Clients</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">100%</div>
                  <div className="text-sm text-gray-400">Success Rate</div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - 3D Component (Hidden on mobile) */}
            <div className="relative h-[500px] lg:h-[600px] hidden lg:block">
              <motion.div
                className="w-full h-full rounded-2xl overflow-hidden relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <div className="absolute inset-0 overflow-hidden">
                  <div className="w-[140%] h-full -mr-[40%]">
                    <Spline 
                      scene="https://prod.spline.design/QYHiMjWrshPtiX4K/scene.splinecode"
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 px-6 backdrop-blur-md bg-green-500/5">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🚀",
                title: "Fast Implementation",
                description: "Quick deployment with minimal disruption to your operations"
              },
              {
                icon: "🔒",
                title: "Secure & Reliable",
                description: "Enterprise-grade security with 99.9% uptime guarantee"
              },
              {
                icon: "📈",
                title: "Scalable Solutions",
                description: "Grows with your business from startup to enterprise"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="text-center p-6 backdrop-blur-md bg-white/5 rounded-xl border border-green-500/20 hover:border-green-500/40 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-300 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-7xl">
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

          <div className="grid md:grid-cols-3 gap-8 mb-16">
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

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Choose <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                  Moringa?
                </span>
              </h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                We are a leading technology solutions provider with over a decade of experience in transforming businesses through innovative digital solutions. Our team of experts specializes in creating tailored systems that drive efficiency and growth.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { label: "Years Experience", value: "10+" },
                  { label: "Projects Completed", value: "500+" },
                  { label: "Client Satisfaction", value: "98%" },
                  { label: "Team Members", value: "50+" }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center p-4 backdrop-blur-md bg-green-500/5 rounded-lg border border-green-500/20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-2xl font-bold text-green-400 mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="backdrop-blur-md bg-green-500/10 rounded-2xl p-8 border border-green-500/20">
                <h3 className="text-xl font-bold mb-6 text-green-400">Our Mission</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  To empower businesses with cutting-edge technology solutions that streamline operations, enhance productivity, and drive sustainable growth in the digital age.
                </p>
                <h3 className="text-xl font-bold mb-6 text-green-400">Our Vision</h3>
                <p className="text-gray-300 leading-relaxed">
                  To be the trusted technology partner for businesses worldwide, creating innovative solutions that transform industries and improve lives.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-6 backdrop-blur-md bg-green-500/5">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                Process
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              A proven methodology that ensures successful project delivery
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery",
                description: "We analyze your business needs and requirements to understand your goals."
              },
              {
                step: "02", 
                title: "Planning",
                description: "We create a detailed roadmap and timeline for your project implementation."
              },
              {
                step: "03",
                title: "Development", 
                description: "Our expert team builds your solution using cutting-edge technologies."
              },
              {
                step: "04",
                title: "Launch",
                description: "We deploy your solution and provide ongoing support and maintenance."
              }
            ].map((process, index) => (
              <motion.div
                key={process.step}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 mx-auto mb-6 backdrop-blur-md bg-green-500/10 rounded-full flex items-center justify-center border-2 border-green-500/20">
                  <span className="text-xl font-bold text-green-400">{process.step}</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">{process.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{process.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                Clients Say
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied clients
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Abdi Khayr",
                company: "Amal Bank", 
                testimonial: "Moringa created exceptional motion graphics for our marketing campaigns. Their creative team delivered stunning visuals that significantly improved our brand engagement and customer response rates.",
                rating: 5
              },
              {
                name: "Mohamed",
                company: "Nugaal Laundry",
                testimonial: "The laundry management system from Moringa revolutionized our operations. We now track orders efficiently, manage inventory better, and our customer satisfaction has increased dramatically.",
                rating: 5
              },
              {
                name: "Mohamud", 
                company: "Alcarafat Supermarket",
                testimonial: "The ERB system implementation was flawless. Our tax compliance is now automated, reporting is seamless, and we've eliminated manual errors completely.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="backdrop-blur-md bg-white/5 border border-green-500/20 h-full">
                  <CardContent className="p-8">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <div key={i} className="w-5 h-5 text-green-400">⭐</div>
                      ))}
                    </div>
                    <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.testimonial}"</p>
                    <div className="border-t border-green-500/20 pt-4">
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-sm text-green-400">{testimonial.company}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
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

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                Let's Start a Conversation
              </h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Ready to transform your business? Our team of experts is here to help you find the perfect technology solution for your needs.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <span className="text-green-400">📧</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">Email</div>
                    <div className="text-gray-400">info@moringa.co.ke</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <span className="text-green-400">📞</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">Phone</div>
                    <div className="text-gray-400">+254116366233</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <span className="text-green-400">📍</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">Location</div>
                    <div className="text-gray-400">Nairobi, Kenya</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-6 backdrop-blur-md bg-green-500/10 rounded-lg border border-green-500/20">
                <h4 className="font-bold text-white mb-2">Business Hours</h4>
                <div className="text-gray-300 text-sm">
                  <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                  <p>Saturday: 9:00 AM - 2:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="backdrop-blur-md bg-white/5 border border-green-500/20">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                    Send Us a Message
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
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/25"
                    >
                      Send Message <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </Form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 backdrop-blur-md bg-slate-900/50 border-t border-green-500/20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <img src={moringaLogoPng} alt="Moringa Logo" className="w-12 h-12" />
                <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                  Moringa
                </div>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Transforming businesses through innovative technology solutions. Your trusted partner for digital transformation.
              </p>
              <div className="text-gray-400">
                <p className="mb-2">📧 info@moringa.co.ke</p>
                <p className="mb-2">📞 +254116366233</p>
                <p>📍 Nairobi, Kenya</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>ERP Systems</li>
                <li>Software Development</li>
                <li>Cloud Services</li>
                <li>Digital Transformation</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Our Process</li>
                <li>Case Studies</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-green-500/20 pt-8 text-center">
            <p className="text-gray-500">&copy; 2024 Moringa. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}