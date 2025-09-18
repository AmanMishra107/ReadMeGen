import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Github, 
  Copy, 
  Download, 
  Sparkles, 
  Code, 
  Eye, 
  Plus, 
  X, 
  Star, 
  Users, 
  Shield, 
  Award, 
  Zap,
  Menu,
  ChevronDown,
  ChevronUp,
  Edit2,
  Save,
  Search
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectInfo {
  title: string;
  description: string;
  author: string;
  githubUrl: string;
  demo: string;
  technologies: string[];
  features: string[];
  installation: string;
  usage: string;
  contributing: string;
  license: string;
  badges: {
    tech: Array<{ text: string; color: string }>;
    status: Array<{ text: string; color: string }>;
    version: string;
    license: string;
  };
  socialLinks: Array<{
    platform: 'github' | 'linkedin' | 'twitter' | 'instagram' | 'youtube' | 'website' | 'email';
    username: string;
    url: string;
  }>;
  stats: {
    stars: number;
    forks: number;
    issues: number;
    downloads: number;
  };
  sections: {
    tableOfContents: boolean;
    installation: boolean;
    usage: boolean;
    api: boolean;
    contributing: boolean;
    license: boolean;
    changelog: boolean;
    roadmap: boolean;
    screenshots: boolean;
    faq: boolean;
  };
  customSections: Array<{ title: string; content: string }>;
}

// Enhanced hook for responsive breakpoints
const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState('mobile');

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setBreakpoint('mobile');
      } else if (width < 768) {
        setBreakpoint('mobile-lg');
      } else if (width < 1024) {
        setBreakpoint('tablet');
      } else if (width < 1280) {
        setBreakpoint('desktop');
      } else {
        setBreakpoint('desktop-lg');
      }
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return breakpoint;
};

// Comprehensive technology list [web:112][8][6]
const COMPREHENSIVE_TECH_LIST = {
  // Programming Languages
  'Programming Languages': [
    { name: 'JavaScript', color: 'F7DF1E', logo: 'javascript' },
    { name: 'TypeScript', color: '007ACC', logo: 'typescript' },
    { name: 'Python', color: '3776AB', logo: 'python' },
    { name: 'Java', color: 'ED8B00', logo: 'openjdk' },
    { name: 'C++', color: '00599C', logo: 'cplusplus' },
    { name: 'C#', color: '239120', logo: 'csharp' },
    { name: 'C', color: 'A8B9CC', logo: 'c' },
    { name: 'Go', color: '00ADD8', logo: 'go' },
    { name: 'Rust', color: '000000', logo: 'rust' },
    { name: 'Swift', color: 'FA7343', logo: 'swift' },
    { name: 'Kotlin', color: '0095D5', logo: 'kotlin' },
    { name: 'Dart', color: '0175C2', logo: 'dart' },
    { name: 'PHP', color: '777BB4', logo: 'php' },
    { name: 'Ruby', color: 'CC342D', logo: 'ruby' },
    { name: 'Scala', color: 'DC322F', logo: 'scala' },
    { name: 'R', color: '276DC3', logo: 'r' },
    { name: 'MATLAB', color: 'FF6600', logo: 'mathworks' },
    { name: 'Perl', color: '39457E', logo: 'perl' },
    { name: 'Haskell', color: '5D4F85', logo: 'haskell' },
    { name: 'Clojure', color: '5881D8', logo: 'clojure' },
    { name: 'Elixir', color: '4B275F', logo: 'elixir' },
    { name: 'Erlang', color: 'A90533', logo: 'erlang' },
    { name: 'F#', color: '378BBA', logo: 'fsharp' },
    { name: 'Lua', color: '2C2D72', logo: 'lua' },
    { name: 'Groovy', color: '4298B8', logo: 'apachegroovy' },
    { name: 'Julia', color: '9558B2', logo: 'julia' },
    { name: 'Crystal', color: '000000', logo: 'crystal' },
    { name: 'Nim', color: 'FFE953', logo: 'nim' },
    { name: 'Zig', color: 'EC915C', logo: 'zig' },
    { name: 'Assembly', color: '654FF0', logo: 'assemblyscript' },
    { name: 'Solidity', color: '363636', logo: 'solidity' },
    { name: 'COBOL', color: '005CA5', logo: 'gnucobol' },
    { name: 'Fortran', color: '734F96', logo: 'fortran' },
  ],

  // Frontend Technologies
  'Frontend Frameworks': [
    { name: 'React', color: '61DAFB', logo: 'react' },
    { name: 'Vue.js', color: '4FC08D', logo: 'vuedotjs' },
    { name: 'Angular', color: 'DD0031', logo: 'angular' },
    { name: 'Svelte', color: 'FF3E00', logo: 'svelte' },
    { name: 'Next.js', color: '000000', logo: 'nextdotjs' },
    { name: 'Nuxt.js', color: '00C58E', logo: 'nuxtdotjs' },
    { name: 'Gatsby', color: '663399', logo: 'gatsby' },
    { name: 'Remix', color: '000000', logo: 'remix' },
    { name: 'SvelteKit', color: 'FF3E00', logo: 'svelte' },
    { name: 'Astro', color: '0C7377', logo: 'astro' },
    { name: 'Solid', color: '2C4F7C', logo: 'solid' },
    { name: 'Qwik', color: 'AC7EF4', logo: 'builder.io' },
    { name: 'Alpine.js', color: '8BC34A', logo: 'alpinedotjs' },
    { name: 'Lit', color: '324FFF', logo: 'lit' },
    { name: 'Stencil', color: '16161D', logo: 'stencil' },
    { name: 'Ember.js', color: 'E04E39', logo: 'emberdotjs' },
    { name: 'Preact', color: '673AB8', logo: 'preact' },
  ],

  // CSS & Styling
  'CSS & Styling': [
    { name: 'CSS3', color: '1572B6', logo: 'css3' },
    { name: 'HTML5', color: 'E34F26', logo: 'html5' },
    { name: 'Sass', color: 'CC6699', logo: 'sass' },
    { name: 'SCSS', color: 'CC6699', logo: 'sass' },
    { name: 'Less', color: '1D365D', logo: 'less' },
    { name: 'Stylus', color: '333333', logo: 'stylus' },
    { name: 'Tailwind CSS', color: '06B6D4', logo: 'tailwindcss' },
    { name: 'Bootstrap', color: '7952B3', logo: 'bootstrap' },
    { name: 'Bulma', color: '00D1B2', logo: 'bulma' },
    { name: 'Chakra UI', color: '319795', logo: 'chakraui' },
    { name: 'Material-UI', color: '007FFF', logo: 'mui' },
    { name: 'Ant Design', color: '0170FE', logo: 'antdesign' },
    { name: 'Semantic UI', color: '35BDB2', logo: 'semanticui' },
    { name: 'Styled Components', color: 'DB7093', logo: 'styledcomponents' },
    { name: 'Emotion', color: 'D26AC2', logo: 'emotion' },
    { name: 'PostCSS', color: 'DD3A0A', logo: 'postcss' },
  ],

  // Backend Technologies
  'Backend Frameworks': [
    { name: 'Node.js', color: '339933', logo: 'nodedotjs' },
    { name: 'Express.js', color: '000000', logo: 'express' },
    { name: 'Fastify', color: '000000', logo: 'fastify' },
    { name: 'Koa.js', color: '33333D', logo: 'koa' },
    { name: 'NestJS', color: 'E0234E', logo: 'nestjs' },
    { name: 'Django', color: '092E20', logo: 'django' },
    { name: 'Flask', color: '000000', logo: 'flask' },
    { name: 'FastAPI', color: '009688', logo: 'fastapi' },
    { name: 'Spring Boot', color: '6DB33F', logo: 'springboot' },
    { name: 'Spring', color: '6DB33F', logo: 'spring' },
    { name: 'Laravel', color: 'FF2D20', logo: 'laravel' },
    { name: 'CodeIgniter', color: 'EF4223', logo: 'codeigniter' },
    { name: 'Symfony', color: '000000', logo: 'symfony' },
    { name: 'CakePHP', color: 'D33C43', logo: 'cakephp' },
    { name: 'Ruby on Rails', color: 'CC0000', logo: 'rubyonrails' },
    { name: 'Sinatra', color: '000000', logo: 'ruby' },
    { name: 'ASP.NET Core', color: '512BD4', logo: 'dotnet' },
    { name: 'Gin', color: '00ADD8', logo: 'go' },
    { name: 'Echo', color: '00ADD8', logo: 'go' },
    { name: 'Fiber', color: '00ADD8', logo: 'go' },
    { name: 'Actix Web', color: '000000', logo: 'rust' },
    { name: 'Rocket', color: '000000', logo: 'rust' },
    { name: 'Phoenix', color: 'F16F00', logo: 'phoenixframework' },
    { name: 'Vapor', color: 'FA7343', logo: 'swift' },
  ],

  // Databases
  'Databases': [
    { name: 'MySQL', color: '4479A1', logo: 'mysql' },
    { name: 'PostgreSQL', color: '336791', logo: 'postgresql' },
    { name: 'MongoDB', color: '47A248', logo: 'mongodb' },
    { name: 'Redis', color: 'DC382D', logo: 'redis' },
    { name: 'SQLite', color: '003B57', logo: 'sqlite' },
    { name: 'MariaDB', color: '003545', logo: 'mariadb' },
    { name: 'Oracle', color: 'F80000', logo: 'oracle' },
    { name: 'Microsoft SQL Server', color: 'CC2927', logo: 'microsoftsqlserver' },
    { name: 'Cassandra', color: '1287B1', logo: 'apachecassandra' },
    { name: 'CouchDB', color: 'E42528', logo: 'couchdb' },
    { name: 'InfluxDB', color: '22ADF6', logo: 'influxdb' },
    { name: 'Neo4j', color: '4581C3', logo: 'neo4j' },
    { name: 'ArangoDB', color: 'DDE072', logo: 'arangodb' },
    { name: 'DynamoDB', color: '4053D6', logo: 'amazondynamodb' },
    { name: 'Firebase', color: 'FFCA28', logo: 'firebase' },
    { name: 'Supabase', color: '3ECF8E', logo: 'supabase' },
    { name: 'PlanetScale', color: '000000', logo: 'planetscale' },
    { name: 'CockroachDB', color: '6933FF', logo: 'cockroachlabs' },
    { name: 'Elasticsearch', color: '005571', logo: 'elasticsearch' },
  ],

  // Cloud & DevOps
  'Cloud & DevOps': [
    { name: 'AWS', color: 'FF9900', logo: 'amazonaws' },
    { name: 'Google Cloud', color: '4285F4', logo: 'googlecloud' },
    { name: 'Microsoft Azure', color: '0078D4', logo: 'microsoftazure' },
    { name: 'Docker', color: '2496ED', logo: 'docker' },
    { name: 'Kubernetes', color: '326CE5', logo: 'kubernetes' },
    { name: 'Jenkins', color: 'D24939', logo: 'jenkins' },
    { name: 'GitHub Actions', color: '2088FF', logo: 'githubactions' },
    { name: 'GitLab CI', color: 'FCA326', logo: 'gitlab' },
    { name: 'CircleCI', color: '343434', logo: 'circleci' },
    { name: 'Travis CI', color: '3EAAAF', logo: 'travisci' },
    { name: 'Terraform', color: '7B42BC', logo: 'terraform' },
    { name: 'Ansible', color: 'EE0000', logo: 'ansible' },
    { name: 'Vagrant', color: '1563FF', logo: 'vagrant' },
    { name: 'Nginx', color: '009639', logo: 'nginx' },
    { name: 'Apache', color: 'D22128', logo: 'apache' },
    { name: 'Vercel', color: '000000', logo: 'vercel' },
    { name: 'Netlify', color: '00C7B7', logo: 'netlify' },
    { name: 'Heroku', color: '430098', logo: 'heroku' },
    { name: 'DigitalOcean', color: '0080FF', logo: 'digitalocean' },
  ],

  // Mobile Development
  'Mobile Development': [
    { name: 'React Native', color: '61DAFB', logo: 'react' },
    { name: 'Flutter', color: '02569B', logo: 'flutter' },
    { name: 'Xamarin', color: '3498DB', logo: 'xamarin' },
    { name: 'Ionic', color: '3880FF', logo: 'ionic' },
    { name: 'Cordova', color: '35434F', logo: 'apachecordova' },
    { name: 'PhoneGap', color: '00ADEF', logo: 'adobephonegap' },
    { name: 'NativeScript', color: '3655FF', logo: 'nativescript' },
    { name: 'Expo', color: '000020', logo: 'expo' },
    { name: 'Android', color: '3DDC84', logo: 'android' },
    { name: 'iOS', color: '000000', logo: 'ios' },
  ],

  // Testing & Quality
  'Testing Frameworks': [
    { name: 'Jest', color: 'C21325', logo: 'jest' },
    { name: 'Mocha', color: '8D6748', logo: 'mocha' },
    { name: 'Jasmine', color: '8A4182', logo: 'jasmine' },
    { name: 'Cypress', color: '17202C', logo: 'cypress' },
    { name: 'Selenium', color: '43B02A', logo: 'selenium' },
    { name: 'Playwright', color: '2EAD33', logo: 'playwright' },
    { name: 'Puppeteer', color: '40B5A4', logo: 'puppeteer' },
    { name: 'Testing Library', color: 'E33332', logo: 'testinglibrary' },
    { name: 'Vitest', color: '6E9F18', logo: 'vitest' },
    { name: 'PyTest', color: '0A9EDC', logo: 'pytest' },
    { name: 'JUnit', color: '25A162', logo: 'junit5' },
    { name: 'PHPUnit', color: '366394', logo: 'php' },
  ],

  // Build Tools
  'Build Tools': [
    { name: 'Webpack', color: '8DD6F9', logo: 'webpack' },
    { name: 'Vite', color: '646CFF', logo: 'vite' },
    { name: 'Rollup', color: 'EC4A3F', logo: 'rollupdotjs' },
    { name: 'Parcel', color: 'E1A94A', logo: 'parcel' },
    { name: 'Gulp', color: 'CF4647', logo: 'gulp' },
    { name: 'Grunt', color: 'FAA918', logo: 'grunt' },
    { name: 'Snowpack', color: '2E5E82', logo: 'snowpack' },
    { name: 'ESBuild', color: 'FFCF00', logo: 'esbuild' },
    { name: 'Turbopack', color: '0C1419', logo: 'turbo' },
  ],

  // Version Control
  'Version Control': [
    { name: 'Git', color: 'F05032', logo: 'git' },
    { name: 'GitHub', color: '181717', logo: 'github' },
    { name: 'GitLab', color: 'FCA326', logo: 'gitlab' },
    { name: 'Bitbucket', color: '0052CC', logo: 'bitbucket' },
    { name: 'Subversion', color: '809CC9', logo: 'subversion' },
    { name: 'Mercurial', color: '999999', logo: 'mercurial' },
  ],

  // IDEs & Editors
  'IDEs & Editors': [
    { name: 'VS Code', color: '007ACC', logo: 'visualstudiocode' },
    { name: 'Visual Studio', color: '5C2D91', logo: 'visualstudio' },
    { name: 'IntelliJ IDEA', color: '000000', logo: 'intellijidea' },
    { name: 'WebStorm', color: '000000', logo: 'webstorm' },
    { name: 'PyCharm', color: '000000', logo: 'pycharm' },
    { name: 'Android Studio', color: '3DDC84', logo: 'androidstudio' },
    { name: 'Xcode', color: '007ACC', logo: 'xcode' },
    { name: 'Eclipse', color: '2C2255', logo: 'eclipse' },
    { name: 'NetBeans', color: '1B6EC8', logo: 'apachenetbeanside' },
    { name: 'Atom', color: '66595C', logo: 'atom' },
    { name: 'Sublime Text', color: 'FF9800', logo: 'sublimetext' },
    { name: 'Vim', color: '019733', logo: 'vim' },
    { name: 'Emacs', color: '7F5AB6', logo: 'gnuemacs' },
  ],

  // Cybersecurity Tools (your specialty)
  'Cybersecurity': [
    { name: 'Kali Linux', color: '557C94', logo: 'kalilinux' },
    { name: 'Metasploit', color: '2596CD', logo: 'metasploit' },
    { name: 'Wireshark', color: '1679A7', logo: 'wireshark' },
    { name: 'Burp Suite', color: 'FF6633', logo: 'portswigger' },
    { name: 'Nmap', color: '4682B4', logo: 'nmap' },
    { name: 'OWASP', color: '000000', logo: 'owasp' },
    { name: 'Snyk', color: '4C4A73', logo: 'snyk' },
    { name: 'SonarQube', color: '4E9BCD', logo: 'sonarqube' },
    { name: 'Nessus', color: '00C176', logo: 'tenable' },
    { name: 'Qualys', color: 'ED2224', logo: 'qualys' },
    { name: 'Splunk', color: '000000', logo: 'splunk' },
    { name: 'Elastic Security', color: '005571', logo: 'elasticstack' },
    { name: 'CrowdStrike', color: 'E01F25', logo: 'crowdstrike' },
    { name: 'Rapid7', color: '394EFF', logo: 'rapid7' },
    { name: 'Hashcat', color: '000000', logo: 'hashcat' },
    { name: 'John the Ripper', color: '8B0000', logo: 'gnupg' },
    { name: 'Aircrack-ng', color: '00599C', logo: 'wifi' },
    { name: 'Hydra', color: '2E8B57', logo: 'gnupg' },
    { name: 'Nikto', color: '8B0000', logo: 'gnupg' },
    { name: 'SQLmap', color: 'CC2927', logo: 'postgresql' },
    { name: 'Maltego', color: '1BA1E2', logo: 'maltego' },
    { name: 'Autopsy', color: '000080', logo: 'autopsy' },
  ],

  // API & GraphQL
  'APIs & GraphQL': [
    { name: 'GraphQL', color: 'E434AA', logo: 'graphql' },
    { name: 'Apollo GraphQL', color: '311C87', logo: 'apollographql' },
    { name: 'REST API', color: '25D366', logo: 'openapiinitiative' },
    { name: 'Postman', color: 'FF6C37', logo: 'postman' },
    { name: 'Insomnia', color: '4000BF', logo: 'insomnia' },
    { name: 'Swagger', color: '85EA2D', logo: 'swagger' },
    { name: 'tRPC', color: '398CCB', logo: 'trpc' },
  ],

  // Package Managers
  'Package Managers': [
    { name: 'npm', color: 'CB3837', logo: 'npm' },
    { name: 'Yarn', color: '2C8EBB', logo: 'yarn' },
    { name: 'pnpm', color: 'F69220', logo: 'pnpm' },
    { name: 'Composer', color: '885630', logo: 'composer' },
    { name: 'pip', color: '3776AB', logo: 'pypi' },
    { name: 'Maven', color: 'C71A36', logo: 'apachemaven' },
    { name: 'Gradle', color: '02303A', logo: 'gradle' },
    { name: 'NuGet', color: '004880', logo: 'nuget' },
  ]
};

// Status badge options [10]
const STATUS_BADGES = [
  { name: 'Active', color: 'brightgreen' },
  { name: 'Maintained', color: 'blue' },
  { name: 'Stable', color: 'green' },
  { name: 'Beta', color: 'orange' },
  { name: 'Alpha', color: 'red' },
  { name: 'Deprecated', color: 'lightgrey' },
  { name: 'Under Development', color: 'yellow' },
  { name: 'Production Ready', color: 'brightgreen' },
  { name: 'Security Focused', color: 'red' },
  { name: 'Open Source', color: 'blue' },
  { name: 'MIT Licensed', color: 'green' },
  { name: 'GPL Licensed', color: 'blue' },
  { name: 'Apache Licensed', color: 'green' },
  { name: 'Commercial', color: 'orange' },
  { name: 'Enterprise', color: 'purple' },
  { name: 'Free', color: 'brightgreen' },
  { name: 'Premium', color: 'gold' },
  { name: 'SaaS', color: 'blue' },
  { name: 'Self-Hosted', color: 'green' },
  { name: 'Cloud Native', color: 'blue' },
  { name: 'Mobile First', color: 'green' },
  { name: 'Responsive', color: 'blue' },
  { name: 'PWA Ready', color: 'purple' },
  { name: 'TypeScript', color: '007ACC' },
  { name: 'JavaScript', color: 'F7DF1E' },
  { name: 'Cross Platform', color: 'blue' },
  { name: 'Real Time', color: 'green' },
  { name: 'Offline First', color: 'orange' },
];

// Responsive wrapper component
const ResponsiveCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  collapsible?: boolean;
  title?: string;
  icon?: React.ReactNode;
  defaultCollapsed?: boolean;
}> = ({ children, className = '', collapsible = false, title, icon, defaultCollapsed = false }) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const breakpoint = useBreakpoint();

  useEffect(() => {
    if ((breakpoint === 'mobile' || breakpoint === 'mobile-lg') && collapsible && title) {
      setIsCollapsed(true);
    }
  }, [breakpoint, collapsible, title]);

  if (collapsible && title) {
    return (
      <Card className={`transition-all duration-200 ${className}`}>
        <CardHeader 
          className="cursor-pointer select-none pb-2 px-3 py-2 sm:px-6 sm:py-4"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <CardTitle className="flex items-center justify-between text-sm sm:text-base lg:text-lg">
            <div className="flex items-center gap-2 min-w-0">
              {icon}
              <span className="truncate">{title}</span>
            </div>
            <motion.div
              animate={{ rotate: isCollapsed ? 0 : 180 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="h-4 w-4 flex-shrink-0" />
            </motion.div>
          </CardTitle>
        </CardHeader>
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <CardContent className="pt-0 px-3 pb-3 sm:px-6 sm:pb-6">
                {children}
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    );
  }

  return (
    <Card className={`transition-shadow duration-200 hover:shadow-md ${className}`}>
      {title && (
        <CardHeader className="pb-3 px-3 py-2 sm:px-6 sm:py-4">
          <CardTitle className="flex items-center gap-2 text-sm sm:text-base lg:text-lg">
            {icon}
            <span className="truncate">{title}</span>
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className={`${title ? 'pt-0' : ''} px-3 py-3 sm:px-6 sm:py-6`}>
        {children}
      </CardContent>
    </Card>
  );
};

// Enhanced Badge Management Component for Technology and Status only
const TechBadgeManager: React.FC<{
  badges: Array<{ text: string; color: string }>;
  onBadgeAdd: (badge: { text: string; color: string }) => void;
  onBadgeRemove: (index: number) => void;
  onBadgeUpdate: (index: number, badge: { text: string; color: string }) => void;
}> = ({ badges, onBadgeAdd, onBadgeRemove, onBadgeUpdate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'mobile' || breakpoint === 'mobile-lg';

  const categories = ['All', ...Object.keys(COMPREHENSIVE_TECH_LIST)];

  const filteredTechnologies = selectedCategory === 'All' 
    ? Object.values(COMPREHENSIVE_TECH_LIST).flat()
    : COMPREHENSIVE_TECH_LIST[selectedCategory as keyof typeof COMPREHENSIVE_TECH_LIST] || [];

  const searchedTechnologies = filteredTechnologies.filter(tech =>
    tech.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generateBadgePreview = (badge: { text: string; color: string }) => {
    const tech = Object.values(COMPREHENSIVE_TECH_LIST).flat().find(t => t.name === badge.text);
    const logo = tech?.logo || badge.text.toLowerCase().replace(/\s+/g, '');
    return `https://img.shields.io/badge/${encodeURIComponent(badge.text)}-${badge.color}?style=for-the-badge&logo=${logo}&logoColor=white`;
  };

  return (
    <ResponsiveCard 
      title="Technology Stack" 
      icon={<Code className="h-4 w-4 text-primary" />}
      collapsible={isMobile}
    >
      <div className="space-y-4">
        {/* Search and Filter */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search technologies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-8 text-sm"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category} {category !== 'All' && `(${COMPREHENSIVE_TECH_LIST[category as keyof typeof COMPREHENSIVE_TECH_LIST]?.length || 0})`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Technology Grid */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">
            Available Technologies ({searchedTechnologies.length})
          </p>
          <ScrollArea className="h-40 w-full">
            <div className={`grid gap-1 ${isMobile ? 'grid-cols-2' : 'grid-cols-3 sm:grid-cols-4'}`}>
              {searchedTechnologies.slice(0, isMobile ? 20 : 40).map((tech) => (
                <Button
                  key={tech.name}
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs justify-start px-2 truncate"
                  onClick={() => onBadgeAdd({ text: tech.name, color: tech.color })}
                  disabled={badges.some(b => b.text === tech.name)}
                >
                  + {tech.name}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Selected Technologies */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">
              Selected Technologies ({badges.length})
            </p>
            {badges.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                className="h-6 text-xs px-2"
                onClick={() => badges.forEach((_, index) => onBadgeRemove(index))}
              >
                Clear All
              </Button>
            )}
          </div>
          
          <ScrollArea className="h-32 w-full">
            <AnimatePresence>
              <div className="space-y-2">
                {badges.length === 0 ? (
                  <div className="text-center py-4 text-muted-foreground">
                    <Code className="h-6 w-6 mx-auto mb-2 opacity-50" />
                    <p className="text-xs">No technologies selected</p>
                  </div>
                ) : (
                  badges.map((badge, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2 p-2 border rounded-lg bg-background"
                    >
                      <img 
                        src={generateBadgePreview(badge)} 
                        alt={badge.text} 
                        className="h-5"
                      />
                      <div className="flex-1 min-w-0">
                        {editingIndex === index ? (
                          <div className="grid grid-cols-2 gap-1">
                            <Input
                              value={badge.text}
                              onChange={(e) => {
                                const updatedBadges = [...badges];
                                updatedBadges[index] = { ...badge, text: e.target.value };
                                onBadgeUpdate(index, updatedBadges[index]);
                              }}
                              className="h-6 text-xs"
                            />
                            <Input
                              value={badge.color}
                              onChange={(e) => {
                                const updatedBadges = [...badges];
                                updatedBadges[index] = { ...badge, color: e.target.value };
                                onBadgeUpdate(index, updatedBadges[index]);
                              }}
                              className="h-6 text-xs"
                              placeholder="Color"
                            />
                          </div>
                        ) : (
                          <div>
                            <p className="text-xs font-medium truncate">{badge.text}</p>
                            <p className="text-xs text-muted-foreground">#{badge.color}</p>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-1">
                        {editingIndex === index ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingIndex(null)}
                            className="h-6 w-6 p-0"
                          >
                            <Save className="h-3 w-3" />
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingIndex(index)}
                            className="h-6 w-6 p-0"
                          >
                            <Edit2 className="h-3 w-3" />
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onBadgeRemove(index)}
                          className="h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </AnimatePresence>
          </ScrollArea>
        </div>
      </div>
    </ResponsiveCard>
  );
};

// Status Badge Manager
const StatusBadgeManager: React.FC<{
  badges: Array<{ text: string; color: string }>;
  onBadgeAdd: (badge: { text: string; color: string }) => void;
  onBadgeRemove: (index: number) => void;
  onBadgeUpdate: (index: number, badge: { text: string; color: string }) => void;
}> = ({ badges, onBadgeAdd, onBadgeRemove, onBadgeUpdate }) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'mobile' || breakpoint === 'mobile-lg';

  const generateBadgePreview = (badge: { text: string; color: string }) => {
    return `https://img.shields.io/badge/Status-${encodeURIComponent(badge.text)}-${badge.color}?style=for-the-badge`;
  };

  return (
    <ResponsiveCard 
      title="Project Status" 
      icon={<Shield className="h-4 w-4 text-accent" />}
      collapsible={isMobile}
    >
      <div className="space-y-4">
        {/* Status Badge Options */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">
            Available Status Badges ({STATUS_BADGES.length})
          </p>
          <ScrollArea className="h-32 w-full">
            <div className={`grid gap-1 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
              {STATUS_BADGES.map((status) => (
                <Button
                  key={status.name}
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs justify-start px-2"
                  onClick={() => onBadgeAdd({ text: status.name, color: status.color })}
                  disabled={badges.some(b => b.text === status.name)}
                >
                  + {status.name}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Selected Status Badges */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">
              Selected Status ({badges.length})
            </p>
            {badges.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                className="h-6 text-xs px-2"
                onClick={() => badges.forEach((_, index) => onBadgeRemove(index))}
              >
                Clear All
              </Button>
            )}
          </div>
          
          <ScrollArea className="h-32 w-full">
            <AnimatePresence>
              <div className="space-y-2">
                {badges.length === 0 ? (
                  <div className="text-center py-4 text-muted-foreground">
                    <Shield className="h-6 w-6 mx-auto mb-2 opacity-50" />
                    <p className="text-xs">No status badges selected</p>
                  </div>
                ) : (
                  badges.map((badge, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2 p-2 border rounded-lg bg-background"
                    >
                      <img 
                        src={generateBadgePreview(badge)} 
                        alt={badge.text} 
                        className="h-5"
                      />
                      <div className="flex-1 min-w-0">
                        {editingIndex === index ? (
                          <div className="grid grid-cols-2 gap-1">
                            <Input
                              value={badge.text}
                              onChange={(e) => {
                                const updatedBadges = [...badges];
                                updatedBadges[index] = { ...badge, text: e.target.value };
                                onBadgeUpdate(index, updatedBadges[index]);
                              }}
                              className="h-6 text-xs"
                            />
                            <Input
                              value={badge.color}
                              onChange={(e) => {
                                const updatedBadges = [...badges];
                                updatedBadges[index] = { ...badge, color: e.target.value };
                                onBadgeUpdate(index, updatedBadges[index]);
                              }}
                              className="h-6 text-xs"
                              placeholder="Color"
                            />
                          </div>
                        ) : (
                          <div>
                            <p className="text-xs font-medium truncate">{badge.text}</p>
                            <p className="text-xs text-muted-foreground">{badge.color}</p>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-1">
                        {editingIndex === index ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingIndex(null)}
                            className="h-6 w-6 p-0"
                          >
                            <Save className="h-3 w-3" />
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingIndex(index)}
                            className="h-6 w-6 p-0"
                          >
                            <Edit2 className="h-3 w-3" />
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onBadgeRemove(index)}
                          className="h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </AnimatePresence>
          </ScrollArea>
        </div>
      </div>
    </ResponsiveCard>
  );
};

const ReadmeGenerator = () => {
  const { toast } = useToast();
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'mobile' || breakpoint === 'mobile-lg';
  const isTablet = breakpoint === 'tablet';

  const [projectInfo, setProjectInfo] = useState<ProjectInfo>({
    title: '',
    description: '',
    author: '',
    githubUrl: '',
    demo: '',
    technologies: [],
    features: [],
    installation: '',
    usage: '',
    contributing: '',
    license: 'MIT',
    badges: {
      tech: [],
      status: [],
      version: '',
      license: 'MIT'
    },
    socialLinks: [],
    stats: {
      stars: 0,
      forks: 0,
      issues: 0,
      downloads: 0
    },
    sections: {
      tableOfContents: true,
      installation: true,
      usage: true,
      api: false,
      contributing: true,
      license: true,
      changelog: false,
      roadmap: false,
      screenshots: false,
      faq: false
    },
    customSections: []
  });

  const [activeTab, setActiveTab] = useState('basic');
  const [newTech, setNewTech] = useState('');
  const [newFeature, setNewFeature] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const generateReadme = () => {
    const { badges, socialLinks, stats, sections, customSections } = projectInfo;
    
    // Use placeholder values if fields are empty
    const title = projectInfo.title || 'Your Project Name';
    const description = projectInfo.description || 'A brief description of what your project does and who it\'s for.';
    const author = projectInfo.author || 'YourUsername';
    const githubUrl = projectInfo.githubUrl || 'https://github.com/yourusername/your-repo';
    const demoUrl = projectInfo.demo || 'https://your-project-demo.vercel.app';
    
    // Generate badges section with proper encoding
    const techBadges = badges.tech.length > 0 ? badges.tech.map(badge => {
      const tech = Object.values(COMPREHENSIVE_TECH_LIST).flat().find(t => t.name === badge.text);
      const logo = tech?.logo || badge.text.toLowerCase().replace(/\s+/g, '');
      return `![${badge.text}](https://img.shields.io/badge/${encodeURIComponent(badge.text)}-${badge.color}?style=for-the-badge&logo=${logo}&logoColor=white)`;
    }).join(' ') : '![Tech Stack](https://img.shields.io/badge/Add-Technologies-blue?style=for-the-badge)';

    const statusBadges = badges.status.length > 0 ? badges.status.map(badge =>
      `![${badge.text}](https://img.shields.io/badge/Status-${encodeURIComponent(badge.text)}-${badge.color}?style=for-the-badge)`
    ).join(' ') : '';

    const versionBadge = badges.version ? `![Version](https://img.shields.io/badge/Version-${badges.version}-blue?style=for-the-badge)` : '![Version](https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge)';
    const licenseBadge = `![License](https://img.shields.io/badge/License-${badges.license}-green?style=for-the-badge)`;

    // Enhanced features list
    const featuresList = projectInfo.features.length > 0 
      ? projectInfo.features.map(feature => `- ${feature}`).join('\n')
      : `- 🚀 Fast and efficient performance
- 📱 Mobile-responsive design
- 🔒 Secure and reliable
- 🎨 Clean and modern UI
- ⚡ Easy to use and customize`;

    // Build comprehensive README
    let readme = `<div align="center">

# ${title}

${description}

${versionBadge} ${licenseBadge} ${statusBadges}

🔗 **[Live Demo](${demoUrl})** | 📚 **[Documentation](#installation)** | 🐛 **[Report Bug](${githubUrl}/issues)**

</div>

## 🌟 Overview

<p align="center">
  <img src="https://img.shields.io/github/stars/${author}/${title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}?style=for-the-badge&logo=github" alt="GitHub stars">
  <img src="https://img.shields.io/github/forks/${author}/${title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}?style=for-the-badge&logo=github" alt="GitHub forks">
  <img src="https://img.shields.io/github/issues/${author}/${title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}?style=for-the-badge&logo=github" alt="GitHub issues">
</p>

---

## ✨ Features

${featuresList}

## 🛠️ Technologies Used

<div align="center">

${techBadges}

</div>

### 🏗️ Tech Stack

${badges.tech.length > 0 ? `
**Frontend**: ${badges.tech.filter(b => 
  ['React', 'Vue.js', 'Angular', 'Svelte', 'Next.js', 'Nuxt.js', 'TypeScript', 'JavaScript'].includes(b.text)
).map(b => b.text).join(', ') || 'Modern web technologies'}

**Backend**: ${badges.tech.filter(b => 
  ['Node.js', 'Python', 'Java', 'Go', 'Rust', 'PHP', 'C#', 'Ruby'].includes(b.text)
).map(b => b.text).join(', ') || 'Server-side technologies'}

**Database**: ${badges.tech.filter(b => 
  ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'SQLite', 'Firebase', 'Supabase'].includes(b.text)
).map(b => b.text).join(', ') || 'Database solutions'}

**DevOps**: ${badges.tech.filter(b => 
  ['Docker', 'Kubernetes', 'AWS', 'Google Cloud', 'Azure', 'Vercel', 'Netlify'].includes(b.text)
).map(b => b.text).join(', ') || 'Cloud and deployment tools'}` : `
**Frontend**: Modern JavaScript frameworks and libraries
**Backend**: Scalable server technologies
**Database**: Reliable data storage solutions  
**DevOps**: Cloud deployment and containerization`}

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm/yarn/pnpm
- Git

### Quick Start

\`\`\`bash
# Clone the repository
git clone ${githubUrl}

# Navigate to the project directory
cd ${title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}

# Install dependencies
${projectInfo.installation || 'npm install'}

# Start development server
npm run dev
\`\`\`

## 🎯 Usage

\`\`\`bash
# Start the application
${projectInfo.usage || 'npm start'}
\`\`\`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a pull request

## 📄 License

This project is licensed under the ${projectInfo.license} License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**${author}** - [GitHub](${githubUrl})

## ⭐ Show your support

Give a ⭐️ if this project helped you!

---

<div align="center">
Made with ❤️ by [${author}](${githubUrl})
</div>`;

    return readme;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateReadme());
      toast({
        title: "🎉 Copied!",
        description: "README content copied to clipboard.",
      });
    } catch (err) {
      toast({
        title: "❌ Copy failed",
        description: "Please try the download option.",
        variant: "destructive"
      });
    }
  };

  const downloadReadme = () => {
    const element = document.createElement('a');
    const file = new Blob([generateReadme()], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'README.md';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast({
      title: "📥 Downloaded!",
      description: "README.md file downloaded successfully.",
    });
  };

  const updateField = (field: keyof ProjectInfo, value: any) => {
    setProjectInfo(prev => ({ ...prev, [field]: value }));
  };

  // Badge management functions
  const handleAddTechBadge = (badge: { text: string; color: string }) => {
    if (!projectInfo.badges.tech.some(b => b.text === badge.text)) {
      setProjectInfo(prev => ({
        ...prev,
        badges: {
          ...prev.badges,
          tech: [...prev.badges.tech, badge]
        }
      }));
    }
  };

  const handleRemoveTechBadge = (index: number) => {
    setProjectInfo(prev => ({
      ...prev,
      badges: {
        ...prev.badges,
        tech: prev.badges.tech.filter((_, i) => i !== index)
      }
    }));
  };

  const handleUpdateTechBadge = (index: number, badge: { text: string; color: string }) => {
    setProjectInfo(prev => ({
      ...prev,
      badges: {
        ...prev.badges,
        tech: prev.badges.tech.map((b, i) => i === index ? badge : b)
      }
    }));
  };

  const handleAddStatusBadge = (badge: { text: string; color: string }) => {
    if (!projectInfo.badges.status.some(b => b.text === badge.text)) {
      setProjectInfo(prev => ({
        ...prev,
        badges: {
          ...prev.badges,
          status: [...prev.badges.status, badge]
        }
      }));
    }
  };

  const handleRemoveStatusBadge = (index: number) => {
    setProjectInfo(prev => ({
      ...prev,
      badges: {
        ...prev.badges,
        status: prev.badges.status.filter((_, i) => i !== index)
      }
    }));
  };

  const handleUpdateStatusBadge = (index: number, badge: { text: string; color: string }) => {
    setProjectInfo(prev => ({
      ...prev,
      badges: {
        ...prev.badges,
        status: prev.badges.status.map((b, i) => i === index ? badge : b)
      }
    }));
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setProjectInfo(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setProjectInfo(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile-first responsive header */}
      <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-12 sm:h-16 items-center justify-between px-3 sm:px-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-1 sm:gap-2 min-w-0">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Github className="h-5 w-5 sm:h-6 sm:w-6 text-primary flex-shrink-0" />
            </motion.div>
            <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold truncate">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                ReadMeGen
              </span>
            </h1>
          </div>
          
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Mobile menu */}
            {isMobile ? (
              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 sm:w-96">
                  <SheetHeader>
                    <SheetTitle>Actions</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-3">
                    <Button onClick={copyToClipboard} className="w-full h-10">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy README
                    </Button>
                    <Button onClick={downloadReadme} variant="outline" className="w-full h-10">
                      <Download className="h-4 w-4 mr-2" />
                      Download File
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            ) : (
              /* Desktop actions */
              <div className="flex gap-2">
                <Button variant="outline" onClick={copyToClipboard} size="sm">
                  <Copy className="h-4 w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Copy</span>
                </Button>
                <Button onClick={downloadReadme} size="sm">
                  <Download className="h-4 w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Download</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-6">
        {/* Hero section */}
        <motion.div 
          className="text-center space-y-2 sm:space-y-4 mb-4 sm:mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto px-2">
            Create professional README files with comprehensive technology and status badges from our extensive collection.
          </p>
        </motion.div>

        {/* Responsive tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Tab navigation */}
          <div className="sticky top-12 sm:top-16 z-40 bg-background/95 backdrop-blur py-1 sm:py-2 -mx-3 sm:-mx-6 px-3 sm:px-6 border-b">
            <ScrollArea className="w-full">
              <TabsList className="inline-flex h-9 sm:h-10 w-max min-w-full p-1 gap-1">
                <TabsTrigger value="basic" className="flex items-center gap-1 text-xs sm:text-sm px-2 sm:px-3 h-7 sm:h-8">
                  <Code className="h-3 w-3 sm:h-4 sm:w-4" />
                  {isMobile ? 'Basic' : 'Basic Info'}
                </TabsTrigger>
                <TabsTrigger value="features" className="flex items-center gap-1 text-xs sm:text-sm px-2 sm:px-3 h-7 sm:h-8">
                  <Star className="h-3 w-3 sm:h-4 sm:w-4" />
                  Features
                </TabsTrigger>
                <TabsTrigger value="badges" className="flex items-center gap-1 text-xs sm:text-sm px-2 sm:px-3 h-7 sm:h-8">
                  <Award className="h-3 w-3 sm:h-4 sm:w-4" />
                  Badges
                </TabsTrigger>
                <TabsTrigger value="sections" className="flex items-center gap-1 text-xs sm:text-sm px-2 sm:px-3 h-7 sm:h-8">
                  <Shield className="h-3 w-3 sm:h-4 sm:w-4" />
                  Sections
                </TabsTrigger>
                <TabsTrigger value="preview" className="flex items-center gap-1 text-xs sm:text-sm px-2 sm:px-3 h-7 sm:h-8">
                  <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                  Preview
                </TabsTrigger>
              </TabsList>
            </ScrollArea>
          </div>

          {/* Tab content */}
          <div className="mt-3 sm:mt-6">
            <TabsContent value="basic" className="mt-0 space-y-3 sm:space-y-6">
              <ResponsiveCard
                title="Project Information"
                icon={<Code className="h-4 w-4 text-primary" />}
                collapsible={isMobile}
              >
                <div className="space-y-3 sm:space-y-4">
                  <div className={`grid gap-3 sm:gap-4 ${isTablet ? 'grid-cols-2' : 'grid-cols-1'}`}>
                    <div>
                      <Label htmlFor="title" className="text-xs sm:text-sm font-medium">Project Title</Label>
                      <Input
                        id="title"
                        value={projectInfo.title}
                        onChange={(e) => updateField('title', e.target.value)}
                        placeholder="CyberGuard Security Suite"
                        className="mt-1 h-8 sm:h-10 text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor="author" className="text-xs sm:text-sm font-medium">GitHub Username</Label>
                      <Input
                        id="author"
                        value={projectInfo.author}
                        onChange={(e) => updateField('author', e.target.value)}
                        placeholder="cybersec-expert"
                        className="mt-1 h-8 sm:h-10 text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description" className="text-xs sm:text-sm font-medium">Project Description</Label>
                    <Textarea
                      id="description"
                      value={projectInfo.description}
                      onChange={(e) => updateField('description', e.target.value)}
                      placeholder="A comprehensive cybersecurity toolkit for penetration testing, vulnerability assessment, and ethical hacking. Built with modern technologies and security best practices."
                      rows={isMobile ? 3 : 4}
                      className="mt-1 text-sm resize-none"
                    />
                  </div>
                  <div className={`grid gap-3 sm:gap-4 ${isTablet ? 'grid-cols-2' : 'grid-cols-1'}`}>
                    <div>
                      <Label htmlFor="github" className="text-xs sm:text-sm font-medium">Repository URL</Label>
                      <Input
                        id="github"
                        value={projectInfo.githubUrl}
                        onChange={(e) => updateField('githubUrl', e.target.value)}
                        placeholder="https://github.com/cybersec-expert/cyberguard-suite"
                        className="mt-1 h-8 sm:h-10 text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor="demo" className="text-xs sm:text-sm font-medium">Live Demo URL</Label>
                      <Input
                        id="demo"
                        value={projectInfo.demo}
                        onChange={(e) => updateField('demo', e.target.value)}
                        placeholder="https://cyberguard-suite.vercel.app"
                        className="mt-1 h-8 sm:h-10 text-sm"
                      />
                    </div>
                  </div>
                  <div className={`grid gap-3 sm:gap-4 ${isTablet ? 'grid-cols-2' : 'grid-cols-1'}`}>
                    <div>
                      <Label htmlFor="installation" className="text-xs sm:text-sm font-medium">Installation Command</Label>
                      <Input
                        id="installation"
                        value={projectInfo.installation}
                        onChange={(e) => updateField('installation', e.target.value)}
                        placeholder="npm install && npm run setup"
                        className="mt-1 h-8 sm:h-10 text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor="usage" className="text-xs sm:text-sm font-medium">Usage Command</Label>
                      <Input
                        id="usage"
                        value={projectInfo.usage}
                        onChange={(e) => updateField('usage', e.target.value)}
                        placeholder="npm run dev"
                        className="mt-1 h-8 sm:h-10 text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="version" className="text-xs sm:text-sm font-medium">Current Version</Label>
                    <Input
                      id="version"
                      value={projectInfo.badges.version}
                      onChange={(e) => updateField('badges', { ...projectInfo.badges, version: e.target.value })}
                      placeholder="2.1.0"
                      className="mt-1 h-8 sm:h-10 text-sm"
                    />
                  </div>
                </div>
              </ResponsiveCard>
            </TabsContent>

            <TabsContent value="features" className="mt-0">
              <ResponsiveCard
                title="Project Features"
                icon={<Star className="h-4 w-4 text-accent" />}
              >
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      placeholder="🔒 Advanced encryption algorithms"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addFeature();
                        }
                      }}
                      className="h-8 sm:h-10 text-sm flex-1"
                    />
                    <Button onClick={addFeature} size="sm" className="h-8 sm:h-10 px-2 sm:px-4">
                      <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                  
                  <ScrollArea className="h-48 sm:h-64 w-full">
                    <AnimatePresence>
                      <div className="space-y-2">
                        {projectInfo.features.length === 0 && (
                          <div className="text-center py-8 text-muted-foreground">
                            <Star className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p className="text-sm">Add your first feature above</p>
                            <p className="text-xs mt-1">Examples: 🚀 Fast performance, 🔒 Secure authentication, 📱 Mobile responsive</p>
                          </div>
                        )}
                        {projectInfo.features.map((feature, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ delay: index * 0.02 }}
                            className="flex items-center gap-2 p-2 sm:p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                          >
                            <span className="flex-1 text-sm leading-relaxed">{feature}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFeature(index)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 sm:h-8 sm:w-8 p-0"
                            >
                              <X className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                          </motion.div>
                        ))}
                      </div>
                    </AnimatePresence>
                  </ScrollArea>
                </div>
              </ResponsiveCard>
            </TabsContent>

            <TabsContent value="badges" className="mt-0 space-y-4">
              {/* Technology Badges */}
              <TechBadgeManager
                badges={projectInfo.badges.tech}
                onBadgeAdd={handleAddTechBadge}
                onBadgeRemove={handleRemoveTechBadge}
                onBadgeUpdate={handleUpdateTechBadge}
              />

              {/* Status Badges */}
              <StatusBadgeManager
                badges={projectInfo.badges.status}
                onBadgeAdd={handleAddStatusBadge}
                onBadgeRemove={handleRemoveStatusBadge}
                onBadgeUpdate={handleUpdateStatusBadge}
              />
            </TabsContent>

            <TabsContent value="sections" className="mt-0">
              <ResponsiveCard
                title="README Sections"
                collapsible={isMobile}
              >
                <div className="space-y-2 sm:space-y-3">
                  {Object.entries(projectInfo.sections).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                      <label className="text-sm font-medium capitalize cursor-pointer flex-1">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => updateField('sections', {
                          ...projectInfo.sections,
                          [key]: e.target.checked
                        })}
                        className="rounded w-4 h-4 cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </ResponsiveCard>
            </TabsContent>

            <TabsContent value="preview" className="mt-0">
              <ResponsiveCard>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
                    <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                      <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                      README Preview
                    </h3>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={copyToClipboard} className="flex-1 sm:flex-none h-8 sm:h-10 text-xs sm:text-sm">
                        <Copy className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                        Copy
                      </Button>
                      <Button onClick={downloadReadme} className="flex-1 sm:flex-none h-8 sm:h-10 text-xs sm:text-sm">
                        <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 rounded-lg p-2 sm:p-4 md:p-6 font-mono text-xs sm:text-sm whitespace-pre-wrap max-h-[60vh] sm:max-h-[70vh] overflow-y-auto scrollbar-thin border">
                    {generateReadme()}
                  </div>
                </div>
              </ResponsiveCard>
            </TabsContent>
          </div>
        </Tabs>

        {/* Mobile floating action button */}
        {isMobile && activeTab !== 'preview' && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <Button
              onClick={() => setActiveTab('preview')}
              className="rounded-full w-12 h-12 shadow-lg"
            >
              <Eye className="h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ReadmeGenerator;
