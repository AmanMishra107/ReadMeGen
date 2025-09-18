import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface AnimatedBadgeProps {
  text: string;
  type: 'tech' | 'social' | 'status' | 'version' | 'license' | 'custom';
  color?: string;
  icon?: React.ReactNode;
  url?: string;
  delay?: number;
}

const AnimatedBadge: React.FC<AnimatedBadgeProps> = ({ 
  text, 
  type, 
  color = 'blue', 
  icon, 
  url,
  delay = 0 
}) => {
  const getBadgeUrl = () => {
    const encodedText = encodeURIComponent(text);
    const encodedColor = encodeURIComponent(color);
    
    // Enhanced badge URLs with better logos
    switch (type) {
      case 'tech':
        const techLogos: Record<string, string> = {
          'React': 'react',
          'Next.js': 'nextdotjs',
          'Vue.js': 'vuedotjs',
          'Angular': 'angular',
          'TypeScript': 'typescript',
          'JavaScript': 'javascript',
          'Node.js': 'nodedotjs',
          'Express': 'express',
          'MongoDB': 'mongodb',
          'PostgreSQL': 'postgresql',
          'MySQL': 'mysql',
          'Redis': 'redis',
          'Docker': 'docker',
          'Kubernetes': 'kubernetes',
          'AWS': 'amazonaws',
          'Firebase': 'firebase',
          'Tailwind CSS': 'tailwindcss',
          'Bootstrap': 'bootstrap',
          'Sass': 'sass',
          'Python': 'python',
          'Django': 'django',
          'Flask': 'flask',
          'Java': 'openjdk',
          'Spring': 'spring',
          'C++': 'cplusplus',
          'C#': 'csharp',
          'PHP': 'php',
          'Laravel': 'laravel',
          'Ruby': 'ruby',
          'Rails': 'rubyonrails',
          'Go': 'go',
          'Rust': 'rust',
          'Swift': 'swift',
          'Kotlin': 'kotlin',
          'Flutter': 'flutter',
          'React Native': 'react',
          'GraphQL': 'graphql',
          'Apollo': 'apollographql',
          'Webpack': 'webpack',
          'Vite': 'vite',
          'ESLint': 'eslint',
          'Prettier': 'prettier',
          'Jest': 'jest',
          'Cypress': 'cypress',
          'Storybook': 'storybook',
          'Figma': 'figma',
          'VS Code': 'visualstudiocode',
          'Git': 'git',
          'GitHub': 'github',
          'GitLab': 'gitlab',
          'Bitbucket': 'bitbucket',
          'Netlify': 'netlify',
          'Vercel': 'vercel',
          'Heroku': 'heroku',
          'DigitalOcean': 'digitalocean'
        };
        const logo = techLogos[text] || text.toLowerCase().replace(/\s+/g, '').replace('.', 'dot');
        return `https://img.shields.io/badge/${encodedText}-${encodedColor}?style=for-the-badge&logo=${logo}&logoColor=white`;
      case 'social':
        return `https://img.shields.io/badge/${encodedText}-${encodedColor}?style=for-the-badge&logo=${text.toLowerCase()}&logoColor=white`;
      case 'status':
        return `https://img.shields.io/badge/Status-${encodedText}-${encodedColor}?style=for-the-badge`;
      case 'version':
        return `https://img.shields.io/badge/Version-${encodedText}-${encodedColor}?style=for-the-badge`;
      case 'license':
        return `https://img.shields.io/badge/License-${encodedText}-${encodedColor}?style=for-the-badge`;
      default:
        return `https://img.shields.io/badge/${encodedText}-${encodedColor}?style=for-the-badge`;
    }
  };

  const badgeContent = (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        delay, 
        duration: 0.5, 
        type: "spring", 
        stiffness: 100 
      }}
      whileHover={{ 
        scale: 1.05, 
        y: -2,
        transition: { duration: 0.2 }
      }}
      className="inline-block"
    >
      <div className="flex items-center gap-2 p-2 rounded-lg bg-card hover:bg-accent/50 transition-all duration-300 hover:shadow-elegant group">
        {icon && (
          <motion.div
            className="text-primary group-hover:text-accent-foreground transition-colors"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            {icon}
          </motion.div>
        )}
        <motion.img 
          src={getBadgeUrl()} 
          alt={`${type} badge for ${text}`}
          className="transition-all duration-300 group-hover:brightness-110 group-hover:scale-105"
          whileHover={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))" }}
        />
      </div>
    </motion.div>
  );

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="inline-block">
        {badgeContent}
      </a>
    );
  }

  return badgeContent;
};

interface BadgePreviewProps {
  badges: Array<{
    text: string;
    type: 'tech' | 'social' | 'status' | 'version' | 'license' | 'custom';
    color?: string;
    icon?: React.ReactNode;
    url?: string;
  }>;
  title: string;
}

const BadgePreview: React.FC<BadgePreviewProps> = ({ badges, title }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <motion.div
            className="h-2 w-2 bg-primary rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div 
          className="flex flex-wrap gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {badges.map((badge, index) => (
            <AnimatedBadge
              key={`${badge.text}-${index}`}
              {...badge}
              delay={index * 0.1}
            />
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
};

export { AnimatedBadge, BadgePreview };