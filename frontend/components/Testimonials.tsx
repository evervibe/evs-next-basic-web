"use client";

import { motion } from "framer-motion";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Anna M.",
      role: "Geschäftsführerin",
      company: "Digital Solutions GmbH",
      text: "Die Zusammenarbeit war professionell und effizient. Das Endergebnis hat unsere Erwartungen übertroffen und die Umsetzung erfolgte termingerecht.",
      rating: 5,
    },
    {
      name: "Thomas K.",
      role: "Produktmanager",
      company: "Tech Innovations AG",
      text: "Exzellente technische Umsetzung und sehr gute Kommunikation während des gesamten Projekts. Die Lösung ist stabil und wartungsfreundlich.",
      rating: 5,
    },
    {
      name: "Julia S.",
      role: "Marketing Leiterin",
      company: "Creative Studio Berlin",
      text: "Modern, benutzerfreundlich und genau nach unseren Anforderungen entwickelt. Die Performance ist beeindruckend und das Design zeitgemäß.",
      rating: 5,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section id="testimonials" className="py-20 px-6 bg-white dark:bg-gray-950">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Was Kunden sagen
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Erfahrungsberichte von zufriedenen Kunden, die mit uns zusammengearbeitet haben
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-xl">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
                &quot;{testimonial.text}&quot;
              </p>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">{testimonial.company}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
