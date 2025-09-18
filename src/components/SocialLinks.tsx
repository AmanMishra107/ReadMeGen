import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Instagram, Youtube, Globe, Mail } from 'lucide-react';

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
  website: Globe,
  email: Mail
};

interface SocialLink {
  platform: keyof typeof socialIcons;
  username: string;
  url: string;
}

interface SocialLinksProps {
  links: SocialLink[];
  animated?: boolean;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ links, animated = true }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 20 
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0
    }
  };

  if (!animated) {
    return (
      <div className="flex flex-wrap gap-3">
        {links.map((link, index) => {
          const Icon = socialIcons[link.platform];
          return (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card hover:bg-accent/50 transition-all duration-300 text-sm font-medium"
            >
              <Icon className="h-4 w-4" />
              {link.username}
            </a>
          );
        })}
      </div>
    );
  }

  return (
    <motion.div
      className="flex flex-wrap gap-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {links.map((link, index) => {
        const Icon = socialIcons[link.platform];
        return (
          <motion.a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05, 
              y: -2,
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
            }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card hover:bg-accent/50 transition-all duration-300 text-sm font-medium group cursor-pointer"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Icon className="h-4 w-4 group-hover:text-primary transition-colors" />
            </motion.div>
            <span className="group-hover:text-primary transition-colors">
              {link.username}
            </span>
          </motion.a>
        );
      })}
    </motion.div>
  );
};

export default SocialLinks;