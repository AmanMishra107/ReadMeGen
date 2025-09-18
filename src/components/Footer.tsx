import React from 'react';
import { motion } from 'framer-motion';
import { Github, Heart, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-t from-background via-background/95 to-background/90 border-t border-border/50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-10 left-10 w-32 h-32 bg-primary/5 rounded-full blur-xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-24 h-24 bg-accent/5 rounded-full blur-xl"
          animate={{ 
            scale: [1, 0.8, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2 
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Main footer content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand section */}
          <motion.div 
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.h3 
              className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2"
              whileHover={{ scale: 1.05 }}
            >
              ReadMeGen
            </motion.h3>
            <p className="text-muted-foreground text-sm max-w-md">
              Create professional README files with advanced animations and beautiful designs.
            </p>
          </motion.div>

          {/* Actions */}
          <motion.div 
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="outline" 
                size="sm" 
                asChild
                className="hover:bg-primary/10"
              >
                <a 
                  href="https://github.com/AmanMishra107" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="outline" 
                size="sm"
                className="hover:bg-accent/10"
              >
                <Coffee className="h-4 w-4 mr-2" />
                Support
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom section */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center sm:justify-between pt-8 mt-8 border-t border-border/50 gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© {currentYear} Made with</span>
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                color: ['#ef4444', '#f97316', '#ef4444']
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <Heart className="h-4 w-4 fill-current" />
            </motion.div>
            <span>by</span>
            <a 
              href="https://github.com/AmanMishra107" 
              className="font-semibold text-primary hover:underline transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              AmanMishra107
            </a>
          </div>

          <div className="text-xs text-muted-foreground/70">
            Open source • MIT License
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
