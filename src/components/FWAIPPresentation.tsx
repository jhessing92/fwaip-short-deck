import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, TrendingUp, ChevronLeft, ChevronRight, ChevronDown,
  Users, CheckCircle, Building, Zap,
  Rocket, BarChart3, AlertCircle, Target, Database,
  ShoppingCart, Sparkles, Package, Clock,
  Lock, Gauge, Layers, Headphones, Award, X, ArrowRight, ExternalLink
} from 'lucide-react';

interface SlideProps {
  isActive?: boolean;
  slideIndex: number;
}

interface SlideProps {
  isActive?: boolean;
  slideIndex: number;
}

// Animated Counter with Hover Interaction
const AnimatedCounter = ({ end, duration = 2000, suffix = "", prefix = "" }: { end: number, duration?: number, suffix?: string, prefix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      const ease = 1 - Math.pow(1 - percentage, 4);
      setCount(Math.floor(end * ease * 10) / 10);

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <>{prefix}{count}{suffix}</>;
};

// Enhanced Parallax Background with Scroll
const ParallaxBackground = ({ slideIndex }: { slideIndex: number }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const colors = [
    { primary: 'cyan', secondary: 'purple' },
    { primary: 'blue', secondary: 'cyan' },
    { primary: 'orange', secondary: 'red' },
    { primary: 'purple', secondary: 'blue' },
    { primary: 'emerald', secondary: 'cyan' },
    { primary: 'blue', secondary: 'purple' },
    { primary: 'cyan', secondary: 'purple' }
  ];

  const currentColors = colors[slideIndex] || colors[0];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900 to-black" />
      
      <motion.div 
        className={`absolute top-[-10%] left-[-10%] w-[700px] h-[700px] bg-${currentColors.primary}-600/20 rounded-full blur-[140px]`}
        animate={{ 
          x: mousePosition.x * 2 + Math.sin(scrollY * 0.001) * 50, 
          y: mousePosition.y * 2 + Math.cos(scrollY * 0.001) * 50
        }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
      />
      <motion.div 
        className={`absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-${currentColors.secondary}-600/20 rounded-full blur-[140px]`}
        animate={{ 
          x: -mousePosition.x * 1.5 + Math.cos(scrollY * 0.001) * 40, 
          y: -mousePosition.y * 1.5 + Math.sin(scrollY * 0.001) * 40
        }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"
        animate={{ 
          x: mousePosition.x + Math.sin(scrollY * 0.002) * 30, 
          y: mousePosition.y + Math.cos(scrollY * 0.002) * 30
        }}
        transition={{ type: "spring", stiffness: 30, damping: 20 }}
      />
      
      <motion.div 
        className="absolute inset-0 opacity-[0.02]" 
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          transform: `translateY(${scrollY * 0.1}px)`
        }} 
      />
    </div>
  );
};

// Navigation Helper Component
const NavigationHint = ({ currentSlide, totalSlides }: { currentSlide: number, totalSlides: number }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  if (!visible || currentSlide === totalSlides - 1) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: [0.4, 0.8, 0.4], y: [0, 5, 0] }}
      exit={{ opacity: 0 }}
      transition={{ repeat: Infinity, duration: 2 }}
      className="fixed bottom-16 md:bottom-24 left-1/2 transform -translate-x-1/2 z-40 flex flex-col items-center gap-1 hidden sm:flex"
    >
      <span className="text-xs text-slate-500 font-medium">Use arrow keys or click</span>
      <ChevronDown className="w-4 h-4 text-cyan-400" />
    </motion.div>
  );
};

const slides = [
  { id: 1, title: "Who We Are" },
  { id: 2, title: "" },
  { id: 3, title: "What is NOT AI" },
  { id: 4, title: "What IS AI" },
  { id: 5, title: "What We Build" },
  { id: 6, title: "What We've Done" },
  { id: 7, title: "Why It Matters" },
  { id: 8, title: "" },
  { id: 9, title: "ROI Framework" },
  { id: 10, title: "RAG Case Study" },
  { id: 11, title: "Data Cleanup" },
  { id: 12, title: "" },
  { id: 13, title: "About FWAIP" },
  { id: 14, title: "" },
  { id: 15, title: "Strickland CPA" },
  { id: 16, title: "CureHire" },
  { id: 17, title: "Crownmark Wealth" },
  { id: 18, title: "CCSD BoardWatch" },
  { id: 19, title: "CCSD Marketing" },
  { id: 20, title: "Vivid Path" },
  { id: 21, title: "Lowe Law" },
  { id: 22, title: "Childcare Services" },
  { id: 23, title: "" },
  { id: 24, title: "Client Journey" },
  { id: 25, title: "Sales Process" },
  { id: 26, title: "Pricing Philosophy" },
  { id: 27, title: "Let's Build Together" }
];

// Slide 1 - Hero
const Slide1: React.FC<SlideProps> = () => {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  return (
    <div className="h-[calc(100vh-70px)] md:h-[calc(100vh-100px)] flex items-start md:items-center justify-center px-3 sm:px-4 md:px-6 pt-6 sm:pt-8 md:pt-8 pb-16 md:pb-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-3 md:mb-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 md:gap-2 px-2 md:px-4 py-0.5 md:py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full mb-2 md:mb-6 hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300"
          >
            <div className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-full w-full bg-cyan-500"></span>
            </div>
            <span className="text-[8px] md:text-xs font-medium text-slate-300 tracking-wider uppercase">Flywheel AI Partners</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[1.75rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-2 md:mb-6 tracking-tight leading-tight md:leading-[1.05] px-2"
          >
            We Build{' '}
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
            >
              Private, Ownable
            </motion.span>
            <br />
            AI Systems
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xs sm:text-sm md:text-lg lg:text-xl text-slate-400 max-w-3xl mx-auto leading-snug md:leading-relaxed font-light px-2"
          >
            Applied AI infrastructure for your clients — delivered together, owned by them.
          </motion.p>
        </div>

        {/* Interactive Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-6 max-w-5xl mx-auto">
          {[
            { 
              icon: Lock,
              value: 100, 
              suffix: "%", 
              label: "Client Ownership", 
              description: "You own all code, models and infrastructure.",
              detail: "Zero vendor lock-in. Full IP control.",
              color: "cyan",
              delay: 0.4 
            },
            { 
              icon: Clock,
              value: 8, 
              suffix: " Wks", 
              label: "Time to Value", 
              description: "First ROAS focused insights live in production.",
              detail: "Weeks not quarters. Instant ROI.",
              color: "emerald",
              delay: 0.5 
            },
            { 
              icon: TrendingUp,
              value: 2, 
              suffix: "x", 
              label: "Revenue Potential", 
              description: "New high margin Insights revenue.",
              detail: "Built on data you already have.",
              color: "purple",
              delay: 0.6 
            }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: stat.delay, duration: 0.6 }}
              onHoverStart={() => setHoveredStat(idx)}
              onHoverEnd={() => setHoveredStat(null)}
              className="relative group cursor-pointer h-full"
            >
              <motion.div 
                className={`relative overflow-hidden h-full bg-gradient-to-br ${
                  stat.color === 'cyan' ? 'from-cyan-500/5 to-blue-500/5 border-cyan-500/20' :
                  stat.color === 'emerald' ? 'from-emerald-500/5 to-cyan-500/5 border-emerald-500/20' :
                  'from-purple-500/5 to-pink-500/5 border-purple-500/20'
                } backdrop-blur-xl border rounded-xl md:rounded-3xl p-3 sm:p-4 md:p-8 transition-all duration-500 group-hover:shadow-2xl ${
                  stat.color === 'cyan' ? 'group-hover:shadow-cyan-500/20 group-hover:border-cyan-500/40' :
                  stat.color === 'emerald' ? 'group-hover:shadow-emerald-500/20 group-hover:border-emerald-500/40' :
                  'group-hover:shadow-purple-500/20 group-hover:border-purple-500/40'
                }`}
                whileHover={{ y: -8 }}
              >
                {/* Background Icon */}
                <div className={`absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500 transform group-hover:rotate-12 group-hover:scale-110`}>
                  <stat.icon className={`w-32 h-32 ${
                    stat.color === 'cyan' ? 'text-cyan-400' :
                    stat.color === 'emerald' ? 'text-emerald-400' :
                    'text-purple-400'
                  }`} />
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  <motion.div
                    animate={{ 
                      scale: hoveredStat === idx ? 1.1 : 1, 
                      rotate: hoveredStat === idx ? 5 : 0 
                    }}
                    transition={{ duration: 0.4 }}
                    className={`w-8 sm:w-9 md:w-12 h-8 sm:h-9 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center mb-2 md:mb-6 ${
                      stat.color === 'cyan' ? 'bg-cyan-500/10 border border-cyan-500/20' :
                      stat.color === 'emerald' ? 'bg-emerald-500/10 border border-emerald-500/20' :
                      'bg-purple-500/10 border border-purple-500/20'
                    }`}
                  >
                    <stat.icon className={`w-4 md:w-6 h-4 md:h-6 ${
                      stat.color === 'cyan' ? 'text-cyan-400' :
                      stat.color === 'emerald' ? 'text-emerald-400' :
                      'text-purple-400'
                    }`} />
                  </motion.div>
                  
                  <div className={`text-2xl sm:text-3xl md:text-5xl font-bold mb-1 md:mb-2 ${
                    stat.color === 'cyan' ? 'text-cyan-400' :
                    stat.color === 'emerald' ? 'text-emerald-400' :
                    'text-purple-400'
                  }`}>
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-[10px] md:text-sm font-semibold text-white uppercase tracking-wider mb-1 md:mb-3">{stat.label}</div>
                  
                  <div className="text-[10px] md:text-sm text-slate-400 leading-snug mb-1 md:mb-4">
                    {stat.description}
                  </div>

                  {/* Reveal Content */}
                  <motion.div
                    initial={false}
                    animate={{ 
                      height: hoveredStat === idx ? 'auto' : 0,
                      opacity: hoveredStat === idx ? 1 : 0,
                      marginTop: hoveredStat === idx ? 12 : 0
                    }}
                    className="overflow-hidden"
                  >
                    <div className={`text-xs font-medium px-3 py-2 rounded-lg border ${
                      stat.color === 'cyan' ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-300' :
                      stat.color === 'emerald' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' :
                      'bg-purple-500/10 border-purple-500/20 text-purple-300'
                    }`}>
                      {stat.detail}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Transition: Let's Clear Something Up
const TransitionClear: React.FC<SlideProps> = () => {
  return (
    <div className="h-[calc(100vh-70px)] md:h-[calc(100vh-100px)] flex items-center justify-center px-3 md:px-6">
      <div className="max-w-4xl mx-auto w-full text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white"
        >
          Let's clear something up.
        </motion.h2>
      </div>
    </div>
  );
};

// Slide 2 - What is NOT AI
const Slide2: React.FC<SlideProps> = () => {
  const misconceptions = [
    { text: "ChatGPT is not an AI strategy", icon: "💬", desc: "It's a tool, not a solution" },
    { text: "Chatbots are an interface, not AI", icon: "🤖", desc: "They're just how you interact" },
    { text: "Automations are not AI", icon: "⚙️", desc: "Rule-based logic isn't intelligence" },
    { text: "Dashboards are not AI", icon: "📊", desc: "Reporting isn't reasoning" },
    { text: "Integrations are not AI", icon: "🔗", desc: "Moving data isn't understanding it" },
    { text: "Prompts are not a strategy", icon: "✍️", desc: "Copy-paste doesn't scale" },
  ];

  return (
    <div className="h-[calc(100vh-70px)] md:h-[calc(100vh-100px)] flex items-start md:items-center justify-center px-3 md:px-6 pt-8 md:pt-4 pb-16 md:pb-4 overflow-y-auto">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 md:mb-8"
        >
          <span className="inline-flex items-center gap-2 px-3 md:px-4 py-1 md:py-1.5 bg-red-500/10 border border-red-500/30 rounded-full text-xs md:text-sm font-medium text-red-400 uppercase tracking-wider">
            <AlertCircle className="w-3 h-3" />
            Common Misconceptions
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xl sm:text-2xl md:text-4xl font-bold text-white text-center mb-6 md:mb-10"
        >
          What is <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500">NOT</span> AI
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-6">
          {misconceptions.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + (i * 0.1), duration: 0.5 }}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-red-500/20 rounded-xl p-4 hover:border-red-500/40 transition-all"
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <p className="text-sm font-semibold text-white mb-1">{item.text}</p>
              <p className="text-xs text-slate-500">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-xl p-5 text-center"
        >
          <p className="text-lg md:text-xl font-bold text-white">
            So what <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">IS</span> AI?
          </p>
          <p className="text-sm text-slate-400 mt-2">Let's talk about what actually matters...</p>
        </motion.div>
      </div>
    </div>
  );
};

// Slide 3 - What AI Actually Is
const Slide3: React.FC<SlideProps> = () => {
  return (
    <div className="h-[calc(100vh-70px)] md:h-[calc(100vh-100px)] flex items-start md:items-center justify-center px-3 md:px-6 pt-8 md:pt-4 pb-16 md:pb-4 overflow-y-auto">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 md:mb-8"
        >
          <span className="inline-flex items-center gap-2 px-3 md:px-4 py-1 md:py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs md:text-sm font-medium text-cyan-400 uppercase tracking-wider">
            <Brain className="w-3 h-3" />
            The Real Answer
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xl sm:text-2xl md:text-4xl font-bold text-white text-center mb-6 md:mb-10"
        >
          AI Unlocks <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Unstructured Data</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 rounded-xl p-5"
          >
            <div className="text-2xl mb-3">📋</div>
            <h3 className="text-lg font-bold text-white mb-2">Structured Data</h3>
            <p className="text-sm text-slate-400 mb-3">What computers already understand</p>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>• Spreadsheets & databases</li>
              <li>• CRM fields & forms</li>
              <li>• Transaction records</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-xl p-5"
          >
            <div className="text-2xl mb-3">🧠</div>
            <h3 className="text-lg font-bold text-white mb-2">Unstructured Data</h3>
            <p className="text-sm text-cyan-300 mb-3">What AI now lets us talk to</p>
            <ul className="space-y-2 text-sm text-cyan-200/70">
              <li>• Documents, emails, contracts</li>
              <li>• Meeting notes & conversations</li>
              <li>• Industry knowledge & context</li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-xl p-5"
        >
          <p className="text-sm md:text-base text-white text-center mb-3">
            <span className="font-semibold">Real AI</span> gives you the ability to:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Create insights from chaos", "Personalize at scale", "Streamline complex processes"].map((item, i) => (
              <span key={i} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-slate-300">
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Slide 4 - What We Build
const Slide4: React.FC<SlideProps> = () => {
  return (
    <div className="h-[calc(100vh-70px)] md:h-[calc(100vh-100px)] flex items-start md:items-center justify-center px-3 md:px-6 pt-6 md:pt-4 pb-16 md:pb-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-4 md:mb-6"
        >
          <span className="inline-flex items-center gap-2 px-3 md:px-4 py-1 md:py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs md:text-sm font-medium text-cyan-400 uppercase tracking-wider">
            <Layers className="w-3 h-3" />
            What We Build
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-2"
        >
          Three Types of <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">AI Solutions</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-sm md:text-base text-slate-400 text-center mb-6 md:mb-8 max-w-3xl mx-auto"
        >
          Each serving distinct business needs while running on unified, owned infrastructure
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-5">
          {/* AI Employees */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-5"
          >
            <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-4 border border-cyan-500/30">
              <Users className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">AI Employees</h3>
            <p className="text-sm text-slate-300">
              Role-based agents that own complete outcomes, make decisions within guardrails, and deliver measurable business results.
            </p>
          </motion.div>

          {/* AI Tools */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-5"
          >
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 border border-purple-500/30">
              <Zap className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">AI Tools</h3>
            <p className="text-sm text-slate-300">
              Purpose-built applications that augment specific workflows, integrate seamlessly, and enhance human capabilities.
            </p>
          </motion.div>

          {/* Agentic Operating Systems */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 rounded-xl p-5"
          >
            <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-4 border border-emerald-500/30">
              <Layers className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Agentic Operating Systems</h3>
            <p className="text-sm text-slate-300">
              Multiple AI employees coordinating inside a command center, managing complex multi-step processes end-to-end.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4"
        >
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded border border-blue-500/50 flex items-center justify-center flex-shrink-0 mt-0.5">
              <CheckCircle className="w-3 h-3 text-blue-400" />
            </div>
            <p className="text-sm text-slate-300">
              <span className="text-white font-semibold">All solutions run on your owned infrastructure</span> — we build it, you own it, no vendor lock-in.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Slide 5 - What We've Done
const Slide5: React.FC<SlideProps> = () => {
  return (
    <div className="h-[calc(100vh-70px)] md:h-[calc(100vh-100px)] flex items-start md:items-center justify-center px-3 md:px-6 pt-8 md:pt-4 pb-16 md:pb-4 overflow-y-auto">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 md:mb-8"
        >
          <span className="inline-flex items-center gap-2 px-3 md:px-4 py-1 md:py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-xs md:text-sm font-medium text-emerald-400 uppercase tracking-wider">
            <Rocket className="w-3 h-3" />
            Track Record
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xl sm:text-2xl md:text-4xl font-bold text-white text-center mb-6 md:mb-10"
        >
          What We've <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Done</span>
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
          {[
            { value: "15+", label: "AI Systems Deployed", color: "cyan" },
            { value: "8", label: "Industries Served", color: "purple" },
            { value: "100%", label: "Client Ownership", color: "emerald" },
            { value: "<8 wks", label: "Avg Time to Value", color: "blue" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (i * 0.1), duration: 0.5 }}
              className={`bg-gradient-to-br from-${stat.color}-500/10 to-${stat.color}-600/5 border border-${stat.color}-500/20 rounded-xl p-4 text-center`}
            >
              <div className={`text-2xl md:text-3xl font-bold text-${stat.color}-400 mb-1`}>{stat.value}</div>
              <p className="text-xs text-slate-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-white/10 rounded-xl p-5 mb-4"
        >
          <h3 className="text-lg font-bold text-white mb-3 text-center">Industries We've Transformed</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {["Legal", "Accounting", "Staffing", "Wealth Management", "Education", "Retail", "Healthcare", "Government"].map((industry, i) => (
              <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-slate-300">
                {industry}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-xl p-4"
        >
          <p className="text-sm text-slate-300 text-center">
            <span className="text-white font-semibold">Partner Opportunity:</span> Every industry above represents a repeatable playbook. Your clients likely fit one of these profiles.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

// Slide 6 - Why This Matters
const Slide6: React.FC<SlideProps> = () => {
  return (
    <div className="h-[calc(100vh-70px)] md:h-[calc(100vh-100px)] flex items-start md:items-center justify-center px-3 md:px-6 pt-8 md:pt-4 pb-16 md:pb-4 overflow-y-auto">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 md:mb-8"
        >
          <span className="inline-flex items-center gap-2 px-3 md:px-4 py-1 md:py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs md:text-sm font-medium text-cyan-400 uppercase tracking-wider">
            <Target className="w-3 h-3" />
            Value Proposition
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xl sm:text-2xl md:text-4xl font-bold text-white text-center mb-6 md:mb-10"
        >
          Why This <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Matters</span>
        </motion.h2>

        <div className="space-y-4 mb-6">
          {[
            { title: "You Own Everything", desc: "No vendor lock-in. Full IP ownership. Your AI, your data, your infrastructure.", icon: Lock, color: "cyan" },
            { title: "Speed to Value", desc: "Working systems in weeks, not quarters. Prove ROI before committing to scale.", icon: Zap, color: "emerald" },
            { title: "Built for Your Operations", desc: "Custom solutions for your specific workflows — not generic tools you have to adapt to.", icon: Building, color: "purple" }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + (i * 0.15), duration: 0.5 }}
              className={`bg-gradient-to-br from-${item.color}-500/10 to-${item.color}-600/5 border border-${item.color}-500/20 rounded-xl p-5`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 bg-${item.color}-500/20 rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <item.icon className={`w-5 h-5 text-${item.color}-400`} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-400">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-xl p-4 text-center"
        >
          <p className="text-sm md:text-base text-white font-medium">
            We're not selling software — we're <span className="text-cyan-400">building your competitive advantage</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

// Transition Slide - How Do We Measure Success
const TransitionROI: React.FC<SlideProps> = () => {
  return (
    <div className="h-[calc(100vh-70px)] md:h-[calc(100vh-100px)] flex items-center justify-center px-3 md:px-6">
      <div className="max-w-4xl mx-auto w-full text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white"
        >
          How do we measure success?
        </motion.h2>
      </div>
    </div>
  );
};

// Slide 7 - ROI Framework (Measured vs Modeled)
const Slide7: React.FC<SlideProps> = () => {
  return (
    <div className="h-[calc(100vh-70px)] md:h-[calc(100vh-100px)] flex items-start md:items-center justify-center px-3 md:px-6 pt-2 md:pt-8 pb-20 md:pb-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-4 md:mb-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-3 tracking-tight px-2"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Measured ROI</span> vs <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">ROI Unlocked</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[10px] sm:text-xs md:text-base text-slate-400 max-w-3xl mx-auto px-2"
          >
            We separate ROI into two transparent categories in every deal to maintain credibility and set accurate expectations.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-4 md:mb-8">
          {/* Immediate ROI (Measured) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="group relative bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 backdrop-blur-xl border border-emerald-500/30 rounded-xl md:rounded-2xl p-4 md:p-6"
          >
            <div className="relative z-10">
              <h3 className="text-base md:text-xl font-bold mb-1">
                <span className="text-emerald-400">Immediate ROI</span>{' '}
                <span className="text-slate-400 text-sm md:text-base font-normal">(Measured)</span>
              </h3>
              <p className="text-xs text-slate-500 mb-4">What we can prove with data</p>
              
              <ul className="space-y-2 md:space-y-3">
                {[
                  "Proven with before/after data",
                  "Instrumented in production",
                  "Labeled with evidence",
                  "Handled vs escalated is visible"
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + (i * 0.1), duration: 0.4 }}
                    className="flex items-start gap-2 md:gap-3"
                  >
                    <div className="w-4 md:w-5 h-4 md:h-5 rounded-full bg-emerald-500/20 flex items-center justify-center mt-0.5 border border-emerald-500/30 flex-shrink-0">
                      <CheckCircle className="w-2.5 md:w-3 h-2.5 md:h-3 text-emerald-400" />
                    </div>
                    <span className="text-xs md:text-sm text-slate-300">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* ROI Unlocked (Modeled) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="group relative bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-500/30 rounded-xl md:rounded-2xl p-4 md:p-6"
          >
            <div className="relative z-10">
              <h3 className="text-base md:text-xl font-bold mb-1">
                <span className="text-purple-400">ROI Unlocked</span>{' '}
                <span className="text-slate-400 text-sm md:text-base font-normal">(Modeled)</span>
              </h3>
              <p className="text-xs text-slate-500 mb-4">What the freed capacity enables</p>
              
              <ul className="space-y-2 md:space-y-3">
                {[
                  "What the freed capacity enables next",
                  "Transparent assumptions",
                  "Simple formulas",
                  "Clearly labeled as estimates"
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + (i * 0.1), duration: 0.4 }}
                    className="flex items-start gap-2 md:gap-3"
                  >
                    <div className="w-4 md:w-5 h-4 md:h-5 rounded-full bg-purple-500/20 flex items-center justify-center mt-0.5 border border-purple-500/30 flex-shrink-0">
                      <CheckCircle className="w-2.5 md:w-3 h-2.5 md:h-3 text-purple-400" />
                    </div>
                    <span className="text-xs md:text-sm text-slate-300">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 md:p-5"
        >
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded border border-blue-500/50 flex items-center justify-center flex-shrink-0 mt-0.5">
              <CheckCircle className="w-3 h-3 text-blue-400" />
            </div>
            <p className="text-xs md:text-sm text-slate-300">
              <span className="text-white font-semibold">We never present modeled ROI as fact.</span>{' '}
              This distinction builds trust and maintains credibility with every client conversation.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Slide 8 - RAG Case Study (Vigilant)
const Slide8: React.FC<SlideProps> = () => {
  return (
    <div className="h-[calc(100vh-70px)] md:h-[calc(100vh-100px)] flex items-start md:items-center justify-center px-3 md:px-6 pt-6 md:pt-4 pb-16 md:pb-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-2 md:mb-3"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs md:text-sm font-medium text-cyan-400 uppercase tracking-wider">
            <BarChart3 className="w-3 h-3" />
            FWAIP Case Study
          </span>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative bg-gradient-to-br from-cyan-500/5 to-blue-500/5 backdrop-blur-xl border border-cyan-500/20 rounded-xl md:rounded-2xl p-3 md:p-5 overflow-hidden"
        >
          <div className="relative z-10">
            {/* Logo/Image area */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center mb-5 md:mb-6"
            >
              <div className="relative">
                <div className="w-14 h-14 md:w-20 md:h-20 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-xl md:rounded-2xl flex items-center justify-center border border-cyan-500/30">
                  <Brain className="w-7 h-7 md:w-10 md:h-10 text-cyan-400" />
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center"
                >
                  <Sparkles className="w-2.5 h-2.5 text-white" />
                </motion.div>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-2"
            >
              Vigilant – <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">In-App RAG Safety Assistant</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-base md:text-lg text-slate-300 text-center max-w-2xl mx-auto mb-4 leading-relaxed"
            >
              Live safety intelligence from <span className="text-cyan-400 font-semibold">47 official sources</span> across <span className="text-cyan-400 font-semibold">16 countries</span>, refreshed hourly, delivered instantly to users in the field.
            </motion.p>

            {/* Key Stat */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex justify-center"
            >
              <div className="relative bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 rounded-xl p-3 md:p-4 max-w-sm w-full">
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.7, type: "spring" }}
                    className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-1"
                  >
                    65%
                  </motion.div>
                  <p className="text-xs text-slate-400">faster access to personalized safety intelligence</p>
                </div>
              </div>
            </motion.div>

            {/* View Full Case Study Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex justify-center mt-4"
            >
              <motion.a
                href="https://fwaip.com/rag-case-study"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-xs md:text-sm rounded-lg shadow-lg shadow-cyan-500/30 transition-all duration-300"
              >
                <span>View Full Case Study</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Slide 9 - Data Cleanup Case Study
const Slide9: React.FC<SlideProps> = () => {
  return (
    <div className="h-[calc(100vh-70px)] md:h-[calc(100vh-100px)] flex items-start md:items-center justify-center px-3 md:px-6 pt-6 md:pt-4 pb-16 md:pb-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-2 md:mb-3"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-xs md:text-sm font-medium text-purple-400 uppercase tracking-wider">
            <Database className="w-3 h-3" />
            FWAIP Case Study
          </span>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative bg-gradient-to-br from-purple-500/5 to-pink-500/5 backdrop-blur-xl border border-purple-500/20 rounded-xl md:rounded-2xl p-3 md:p-5 overflow-hidden"
        >
          <div className="relative z-10">
            {/* Logo/Image area */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center mb-5 md:mb-6"
            >
              <div className="relative">
                <div className="w-14 h-14 md:w-20 md:h-20 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-xl md:rounded-2xl flex items-center justify-center border border-purple-500/30">
                  <Database className="w-7 h-7 md:w-10 md:h-10 text-purple-400" />
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center"
                >
                  <Sparkles className="w-2.5 h-2.5 text-white" />
                </motion.div>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-2"
            >
              19 Years of Legacy Data → <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">AI-Ready Intelligence</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-base md:text-lg text-slate-300 text-center max-w-2xl mx-auto mb-4 leading-relaxed"
            >
              Transforming decades of accumulated customer data into structured, actionable intelligence ready for AI-powered insights.
            </motion.p>

            {/* Key Stat */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex justify-center"
            >
              <div className="relative bg-gradient-to-br from-purple-500/10 to-pink-600/10 border border-purple-500/30 rounded-xl p-3 md:p-4 max-w-sm w-full">
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.7, type: "spring" }}
                    className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-1"
                  >
                    2.5 Weeks
                  </motion.div>
                  <p className="text-xs text-slate-400">to complete full data transformation</p>
                  <p className="text-[10px] text-slate-500">vs 6+ months of manual work</p>
                </div>
              </div>
            </motion.div>

            {/* View Full Case Study Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex justify-center mt-4"
            >
              <motion.a
                href="https://fwaip.com/data-cleanup-case-study"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold text-xs md:text-sm rounded-lg shadow-lg shadow-purple-500/30 transition-all duration-300"
              >
                <span>View Full Case Study</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Transition Slide - The Team Behind The Tech
const TransitionTeam: React.FC<SlideProps> = () => {
  return (
    <div className="h-[calc(100vh-70px)] md:h-[calc(100vh-100px)] flex items-center justify-center px-3 md:px-6">
      <div className="max-w-4xl mx-auto w-full text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white"
        >
          The team behind the tech.
        </motion.h2>
      </div>
    </div>
  );
};

// Slide 10 - About Flywheel AI Partners
const Slide10: React.FC<SlideProps> = () => {
  return (
    <div className="h-[calc(100vh-70px)] md:h-[calc(100vh-100px)] flex items-start md:items-center justify-center px-3 md:px-6 pt-8 md:pt-4 pb-16 md:pb-4 overflow-y-auto">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-2 md:mb-5">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 md:mb-2 tracking-tight px-2"
            >
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Flywheel AI Partners</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[10px] md:text-sm text-slate-400 max-w-3xl mx-auto px-2"
            >
              Applied AI infrastructure for companies that want to own their intelligence.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-3 md:mb-5">
            {/* Who We Are */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              whileHover={{ y: -5 }}
              className="group relative bg-gradient-to-br from-cyan-500/5 to-blue-500/5 backdrop-blur-xl border border-cyan-500/20 rounded-xl md:rounded-2xl p-3 md:p-5 hover:border-cyan-500/40 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500"
            >
              <div className="absolute top-0 right-0 p-3 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500">
                <Building className="w-20 h-20 text-cyan-400" />
              </div>

              <div className="relative z-10">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="w-9 md:w-11 h-9 md:h-11 bg-cyan-500/10 rounded-lg md:rounded-xl flex items-center justify-center border border-cyan-500/20 mb-2 md:mb-3"
                >
                  <Building className="w-4 md:w-5 h-4 md:h-5 text-cyan-400" />
                </motion.div>
                <h3 className="text-sm md:text-lg font-bold text-white mb-1 md:mb-2">Who We Are</h3>
                <p className="text-sm md:text-base text-slate-400 leading-snug md:leading-relaxed">
                  Specialist team focused on turning operational and shopper data into revenue producing AI systems with experience across retail, consumer, and B2B environments.
                </p>
              </div>
            </motion.div>

            {/* How We Work */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              whileHover={{ y: -5 }}
              className="group relative bg-gradient-to-br from-purple-500/5 to-pink-500/5 backdrop-blur-xl border border-purple-500/20 rounded-xl md:rounded-2xl p-3 md:p-5 hover:border-purple-500/40 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500"
            >
              <div className="absolute top-0 right-0 p-3 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500">
                <Layers className="w-20 h-20 text-purple-400" />
              </div>

              <div className="relative z-10">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ duration: 0.3 }}
                  className="w-9 md:w-11 h-9 md:h-11 bg-purple-500/10 rounded-lg md:rounded-xl flex items-center justify-center border border-purple-500/20 mb-2 md:mb-3"
                >
                  <Layers className="w-4 md:w-5 h-4 md:h-5 text-purple-400" />
                </motion.div>
                <h3 className="text-sm md:text-lg font-bold text-white mb-1 md:mb-2">How We Work</h3>
                <div className="space-y-1 md:space-y-2">
                  {[
                    { title: "Ownership First", icon: "🔒" },
                    { title: "ROI in Weeks", icon: "⚡" },
                    { title: "Partner to Your Team", icon: "🤝" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5 md:gap-2">
                      <span className="text-sm md:text-base">{item.icon}</span>
                      <span className="text-xs md:text-sm text-slate-300">{item.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Why It Matters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              whileHover={{ y: -5 }}
              className="group relative bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 backdrop-blur-xl border border-emerald-500/20 rounded-xl md:rounded-2xl p-3 md:p-5 hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500"
            >
              <div className="absolute top-0 right-0 p-3 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500">
                <Award className="w-20 h-20 text-emerald-400" />
              </div>

              <div className="relative z-10">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="w-9 md:w-11 h-9 md:h-11 bg-emerald-500/10 rounded-lg md:rounded-xl flex items-center justify-center border border-emerald-500/20 mb-2 md:mb-3"
                >
                  <Award className="w-4 md:w-5 h-4 md:h-5 text-emerald-400" />
                </motion.div>
                <h3 className="text-sm md:text-lg font-bold text-white mb-1 md:mb-2">Why It Matters</h3>
                <p className="text-sm md:text-base text-slate-400 leading-snug md:leading-relaxed">
                  Accelerates time to market while creating a defensible, high-margin business line that positions you as a predictive partner to enterprise brands.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-center"
          >
            <motion.div 
              whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(6, 182, 212, 0.3)" }}
              className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-cyan-600/20 to-purple-600/20 backdrop-blur-xl border border-cyan-500/30 rounded-full hover:border-cyan-500/50 transition-all duration-300 cursor-default"
            >
              <Headphones className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-medium text-white">A long term partner to turn shopper data into durable, growing Insights.</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
  );
};

// Transition Slide - Real Results Real Clients
const TransitionCaseStudies: React.FC<SlideProps> = () => {
  return (
    <div className="h-[calc(100vh-70px)] md:h-[calc(100vh-100px)] flex items-center justify-center px-3 md:px-6">
      <div className="max-w-4xl mx-auto w-full text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
        >
          Real results.
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500"
        >
          Real clients.
        </motion.h2>
      </div>
    </div>
  );
};

// Slide 11 - Strickland CPA
const Slide11: React.FC<SlideProps> = () => {
  return (
    <div className="h-[calc(100vh-70px)] md:h-[calc(100vh-100px)] flex items-start md:items-center justify-center px-3 md:px-6 pt-6 md:pt-4 pb-16 md:pb-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-5 md:mb-6"
        >
          <div className="inline-block px-2 py-0.5 bg-purple-500/20 border border-purple-500/30 rounded-full mb-2">
            <span className="text-xs md:text-sm text-purple-400 font-semibold uppercase tracking-wider">📊 CLIENT STORY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">Strickland CPA</h2>
          <p className="text-sm md:text-base text-slate-400">Industry: Accounting / Tax</p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-base md:text-lg text-slate-300 mb-4"
        >
          A full agentic operating system with batch AI employees transforming professional service delivery.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-500/30 rounded-xl p-5"
          >
            <h3 className="text-lg font-bold text-purple-400 mb-2">Phase 1: Foundation</h3>
            <p className="text-sm text-slate-300">Intake routing, task orchestration, and communication filtering.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-xl border border-cyan-500/30 rounded-xl p-5"
          >
            <h3 className="text-lg font-bold text-cyan-400 mb-2">Phase 2: AI Employees</h3>
            <ul className="space-y-1 text-sm text-slate-300">
              <li className="flex items-start gap-1.5">
                <CheckCircle className="w-3 h-3 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>Attachments Intake Bot</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle className="w-3 h-3 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>Voicemail Action Agent</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle className="w-3 h-3 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>Client Priority Switchboard</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-5"
        >
          <h3 className="text-lg font-bold text-white mb-2">Measured ROI</h3>
          <div className="flex flex-wrap gap-2 text-sm text-slate-300">
            <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-green-400" /> Fewer senior interruptions</span>
            <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-green-400" /> Faster turnaround</span>
            <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-green-400" /> Reduced bottlenecks</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4"
          >
            <div className="flex items-start gap-2">
              <Rocket className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <p className="text-slate-300 text-xs">
                <span className="text-white font-semibold">Productization:</span> Professional Services AI OS for law firms, consultancies, and advisory practices.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4"
          >
            <div className="flex items-start gap-2">
              <Users className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
              <p className="text-slate-300 text-xs">
                <span className="text-white font-semibold">Partner Play:</span> Ideal for partners serving accounting firms, law firms, or professional services.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Slide 12 - CureHire
const Slide12: React.FC<SlideProps> = () => {
  return (
    <div className="h-[calc(100vh-70px)] md:h-[calc(100vh-100px)] flex items-start md:items-center justify-center px-3 md:px-6 pt-6 md:pt-4 pb-16 md:pb-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-5 md:mb-6"
        >
          <div className="inline-block px-2 py-0.5 bg-orange-500/20 border border-orange-500/30 rounded-full mb-2">
            <span className="text-xs md:text-sm text-orange-400 font-semibold uppercase tracking-wider">📊 CLIENT STORY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">CureHire</h2>
          <p className="text-sm md:text-base text-slate-400">Industry: Staffing / Recruiting</p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-base md:text-lg text-slate-300 mb-4"
        >
          A bi-directional dashboard and chat system that unifies recruiter workflow.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-xl border border-orange-500/30 rounded-xl p-5"
          >
            <h3 className="text-lg font-bold text-orange-400 mb-2">How It Works</h3>
            <ul className="space-y-1 text-sm text-slate-300">
              <li className="flex items-start gap-1.5">
                <CheckCircle className="w-3 h-3 text-orange-400 mt-0.5 flex-shrink-0" />
                <span>Chat ↔ Dashboard sync</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle className="w-3 h-3 text-orange-400 mt-0.5 flex-shrink-0" />
                <span>Unified recruiter interface</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-xl border border-cyan-500/30 rounded-xl p-5"
          >
            <h3 className="text-lg font-bold text-cyan-400 mb-2">Measured ROI</h3>
            <ul className="space-y-1 text-sm text-slate-300">
              <li className="flex items-start gap-1.5">
                <CheckCircle className="w-3 h-3 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>Faster pipeline movement</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle className="w-3 h-3 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>Cleaner visibility</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4"
          >
            <div className="flex items-start gap-2">
              <Rocket className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <p className="text-slate-300 text-xs">
                <span className="text-white font-semibold">Productization:</span> AI Recruitment Copilot for staffing operations.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4"
          >
            <div className="flex items-start gap-2">
              <Users className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
              <p className="text-slate-300 text-xs">
                <span className="text-white font-semibold">Partner Play:</span> Ideal for partners serving staffing agencies and recruiting firms.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Slide 13 - Crownmark Wealth
const Slide13: React.FC<SlideProps> = () => {
  return (
    <div className="h-[calc(100vh-70px)] md:h-[calc(100vh-100px)] flex items-start md:items-center justify-center px-3 md:px-6 pt-6 md:pt-4 pb-16 md:pb-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-5 md:mb-6"
        >
          <div className="inline-block px-2 py-0.5 bg-green-500/20 border border-green-500/30 rounded-full mb-2">
            <span className="text-xs md:text-sm text-green-400 font-semibold uppercase tracking-wider">📊 CLIENT STORY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">Crownmark Wealth</h2>
          <p className="text-sm md:text-base text-slate-400">Industry: Wealth Management</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl border border-green-500/30 rounded-xl p-5"
          >
            <h3 className="text-lg font-bold text-green-400 mb-2">Phase 1: Foundation + Henri</h3>
            <p className="text-sm text-slate-300">Trust-first website experience with AI concierge and compliance-aware intake.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-xl border border-cyan-500/30 rounded-xl p-5"
          >
            <h3 className="text-lg font-bold text-cyan-400 mb-2">Phase 2: Expansion</h3>
            <p className="text-sm text-slate-300">Client journey automation, advisor copilots, and workflow triggers.</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-3 mb-3"
        >
          <h3 className="text-lg font-bold text-white mb-1">Outcome</h3>
          <p className="text-sm text-slate-300">Reduced advisor interruptions, faster lead-to-meeting cycles, maintained compliance.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4"
          >
            <div className="flex items-start gap-2">
              <Rocket className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <p className="text-slate-300 text-xs">
                <span className="text-white font-semibold">Productization:</span> Trust-First Website OS + Concierge AI for wealth management.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4"
          >
            <div className="flex items-start gap-2">
              <Users className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
              <p className="text-slate-300 text-xs">
                <span className="text-white font-semibold">Partner Play:</span> Ideal for partners serving RIAs, wealth advisors, and financial planning firms.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Slide 14 - CCSD BoardWatch
const Slide14: React.FC<SlideProps> = () => {
  return (
    <div className="h-[calc(100vh-70px)] md:h-[calc(100vh-100px)] flex items-start md:items-center justify-center px-3 md:px-6 pt-6 md:pt-4 pb-16 md:pb-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-5 md:mb-6"
        >
          <div className="inline-block px-2 py-0.5 bg-blue-500/20 border border-blue-500/30 rounded-full mb-2">
            <span className="text-xs md:text-sm text-blue-400 font-semibold uppercase tracking-wider">📊 CLIENT STORY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">CCSD BoardWatch</h2>
          <p className="text-sm md:text-base text-slate-400">Industry: Public Sector / Education</p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-base md:text-lg text-slate-300 mb-4"
        >
          Sentiment monitoring for public digital commentary, providing decision-makers with actionable intelligence.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-500/30 rounded-xl p-5"
          >
            <h3 className="text-lg font-bold text-blue-400 mb-2">What It Does</h3>
            <ul className="space-y-1 text-sm text-slate-300">
              <li className="flex items-start gap-1.5">
                <CheckCircle className="w-3 h-3 text-blue-400 mt-0.5 flex-shrink-0" />
                <span>Social media monitoring</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle className="w-3 h-3 text-blue-400 mt-0.5 flex-shrink-0" />
                <span>Sentiment analysis</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle className="w-3 h-3 text-blue-400 mt-0.5 flex-shrink-0" />
                <span>Decision summaries & alerts</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-xl border border-cyan-500/30 rounded-xl p-5"
          >
            <h3 className="text-lg font-bold text-cyan-400 mb-2">Productization</h3>
            <p className="text-sm text-slate-300">Public Signal Monitoring → Decision Summaries. Reusable for government, education, and enterprise PR.</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4"
          >
            <p className="text-slate-300 text-xs">
              <span className="text-white font-semibold">Why it matters:</span> Turns scattered sentiment into structured intelligence for proactive decisions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4"
          >
            <div className="flex items-start gap-2">
              <Users className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
              <p className="text-slate-300 text-xs">
                <span className="text-white font-semibold">Partner Play:</span> Ideal for partners serving government, education, or enterprise PR teams.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Slide 15 - CCSD Marketing OS
const Slide15: React.FC<SlideProps> = () => {
  return (
    <div className="h-[calc(100vh-70px)] md:h-[calc(100vh-100px)] flex items-start md:items-center justify-center px-3 md:px-6 pt-6 md:pt-4 pb-16 md:pb-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-5 md:mb-6"
        >
          <div className="inline-block px-2 py-0.5 bg-purple-500/20 border border-purple-500/30 rounded-full mb-2">
            <span className="text-xs md:text-sm text-purple-400 font-semibold uppercase tracking-wider">📊 CLIENT STORY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">CCSD Marketing OS</h2>
          <p className="text-sm md:text-base text-slate-400">Industry: Public Sector / Education</p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-base md:text-lg text-slate-300 mb-4"
        >
          Marketing OS with coordinated AI agents transforming content production capacity.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-500/30 rounded-xl p-5"
          >
            <h3 className="text-lg font-bold text-purple-400 mb-2">What We Built</h3>
            <p className="text-sm text-slate-300">Multiple coordinated AI agents for content production at scale.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-xl border border-cyan-500/30 rounded-xl p-5"
          >
            <h3 className="text-lg font-bold text-cyan-400 mb-2">ROI</h3>
            <div className="text-3xl font-bold text-white mb-1">4x</div>
            <p className="text-sm text-slate-300">25 → 100 stories/month</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4"
          >
            <h3 className="text-base font-bold text-white mb-1">ROI Logic</h3>
            <p className="text-xs text-slate-300">More stories → community trust → enrollment retention → protected funding.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4"
          >
            <div className="flex items-start gap-2">
              <Users className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
              <p className="text-slate-300 text-xs">
                <span className="text-white font-semibold">Partner Play:</span> Ideal for partners serving public sector marketing or communications teams.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Slide 16 - Vivid Path
const Slide16: React.FC<SlideProps> = () => {
  return (
    <div className="h-[calc(100vh-70px)] md:h-[calc(100vh-100px)] flex items-start md:items-center justify-center px-3 md:px-6 pt-6 md:pt-4 pb-16 md:pb-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-5 md:mb-6"
        >
          <div className="inline-block px-2 py-0.5 bg-red-500/20 border border-red-500/30 rounded-full mb-2">
            <span className="text-xs md:text-sm text-red-400 font-semibold uppercase tracking-wider">📊 CLIENT STORY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">Vivid Path</h2>
          <p className="text-sm md:text-base text-slate-400">Industry: Firearms / Retail Resale</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-gradient-to-br from-red-500/10 to-orange-500/10 backdrop-blur-xl border border-red-500/30 rounded-xl p-5"
          >
            <h3 className="text-lg font-bold text-red-400 mb-2">What We Built</h3>
            <p className="text-sm text-slate-300">Multi-agent valuation: image analysis, condition detection, registry queries, and automated fair-market pricing.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-xl border border-cyan-500/30 rounded-xl p-5"
          >
            <h3 className="text-lg font-bold text-cyan-400 mb-2">Measured ROI</h3>
            <ul className="space-y-1 text-sm text-slate-300">
              <li className="flex items-start gap-1.5">
                <CheckCircle className="w-3 h-3 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>Hours of appraisal time removed</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle className="w-3 h-3 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>Faster pricing at scale</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4"
          >
            <div className="flex items-start gap-2">
              <Rocket className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <p className="text-slate-300 text-xs">
                <span className="text-white font-semibold">Productization:</span> Inspection → Valuation → Pricing Engine for collectibles and resale markets.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4"
          >
            <div className="flex items-start gap-2">
              <Users className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
              <p className="text-slate-300 text-xs">
                <span className="text-white font-semibold">Partner Play:</span> Ideal for partners serving collectibles, pawn shops, or resale marketplaces.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Slide 17 - Lowe Law: AI Employee to Agentic OS
const Slide17: React.FC<SlideProps> = () => {
  return (
    <div className="h-[calc(100vh-70px)] md:h-[calc(100vh-100px)] flex items-start md:items-center justify-center px-3 md:px-6 pt-6 md:pt-4 pb-16 md:pb-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-5 md:mb-6"
        >
          <div className="inline-block px-2 py-0.5 bg-indigo-500/20 border border-indigo-500/30 rounded-full mb-2">
            <span className="text-xs md:text-sm text-indigo-400 font-semibold uppercase tracking-wider">📊 CLIENT STORY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">Lowe Law: The Journey</h2>
          <p className="text-sm md:text-base text-slate-400">From AI Employee to Full Agentic Operating System</p>
        </motion.div>

        {/* Progression Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          {/* Phase 1: AI Employee */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-xl border border-indigo-500/30 rounded-xl p-5"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-indigo-500/20 rounded flex items-center justify-center border border-indigo-500/30">
                <span className="text-indigo-400 font-bold text-xs">01</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-indigo-400">AI Employee</h3>
                <p className="text-[10px] text-slate-500">Content Automation</p>
              </div>
            </div>
            <ul className="space-y-1 text-xs text-slate-400">
              <li className="flex items-start gap-1.5">
                <CheckCircle className="w-3 h-3 text-indigo-400 mt-0.5 flex-shrink-0" />
                <span>SEO content & multi-format creation</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle className="w-3 h-3 text-indigo-400 mt-0.5 flex-shrink-0" />
                <span>Automated social distribution</span>
              </li>
            </ul>
          </motion.div>

          {/* Phase 2: Agentic OS */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-gradient-to-br from-teal-500/10 to-cyan-500/10 backdrop-blur-xl border border-teal-500/30 rounded-xl p-5"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-teal-500/20 rounded flex items-center justify-center border border-teal-500/30">
                <span className="text-teal-400 font-bold text-xs">02</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-teal-400">Agentic OS</h3>
                <p className="text-[10px] text-slate-500">PI Case Agent</p>
              </div>
            </div>
            <ul className="space-y-1 text-xs text-slate-400">
              <li className="flex items-start gap-1.5">
                <CheckCircle className="w-3 h-3 text-teal-400 mt-0.5 flex-shrink-0" />
                <span>Intake, DocuSign, appointments</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle className="w-3 h-3 text-teal-400 mt-0.5 flex-shrink-0" />
                <span>End-to-end case nurturing</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Progression Arrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex items-center justify-center gap-5 mb-5"
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-purple-500/50"></div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-indigo-500/10 to-teal-500/10 border border-white/10 rounded-full">
            <span className="text-[10px] text-slate-400">Single Task</span>
            <ArrowRight className="w-3 h-3 text-cyan-400" />
            <span className="text-[10px] text-cyan-400 font-medium">Full Workflow</span>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-teal-500/50 via-cyan-500/50 to-transparent"></div>
        </motion.div>

        {/* Key Insight + Partner Play */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4"
          >
            <div className="flex items-start gap-2">
              <Rocket className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-slate-300">
                <span className="text-white font-semibold">The Pattern:</span> Start with one AI employee → Prove value → Expand to full agentic OS.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4"
          >
            <div className="flex items-start gap-2">
              <Users className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
              <p className="text-slate-300 text-xs">
                <span className="text-white font-semibold">Partner Play:</span> Ideal for partners serving legal practices or professional services with expansion potential.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Slide 18 - Childcare Services (Strickland Extension)
const Slide18: React.FC<SlideProps> = () => {
  return (
    <div className="h-[calc(100vh-70px)] md:h-[calc(100vh-100px)] flex items-start md:items-center justify-center px-3 md:px-6 pt-6 md:pt-4 pb-16 md:pb-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-5 md:mb-6"
        >
          <div className="inline-block px-2 py-0.5 bg-amber-500/20 border border-amber-500/30 rounded-full mb-2">
            <span className="text-xs md:text-sm text-amber-400 font-semibold uppercase tracking-wider">📊 CLIENT STORY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">Childcare Services</h2>
          <p className="text-sm md:text-base text-slate-400">Industry: Tax Credits / Market Tool</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-xl border border-amber-500/30 rounded-xl p-5"
          >
            <h3 className="text-lg font-bold text-amber-400 mb-2">What We Built</h3>
            <p className="text-sm text-slate-300">Voice & text AI advisor with tax credit calculator. Data patches back into Strickland's OS.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-xl border border-cyan-500/30 rounded-xl p-5"
          >
            <h3 className="text-lg font-bold text-cyan-400 mb-2">Why It Matters</h3>
            <p className="text-sm text-slate-300">AI employees can be standalone tools or integrated modules within larger systems.</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4"
          >
            <div className="flex items-start gap-2">
              <Rocket className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <p className="text-slate-300 text-xs">
                <span className="text-white font-semibold">Productization:</span> Standalone or OS-connected module. Repeatable for credits, incentives, and advisory tools.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4"
          >
            <div className="flex items-start gap-2">
              <Users className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
              <p className="text-slate-300 text-xs">
                <span className="text-white font-semibold">Partner Play:</span> Ideal for partners serving tax professionals or firms with modular product needs.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Slide 19 - Transition: How We Sell Together
const Slide19: React.FC<SlideProps> = () => {
  return (
    <div className="h-[calc(100vh-70px)] md:h-[calc(100vh-100px)] flex items-center justify-center px-3 md:px-6">
      <div className="max-w-4xl mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Now you know what we build.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-xl sm:text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 font-semibold"
          >
            Here's how we take it to market — together.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

// Slide 20 - Client Journey
const Slide20: React.FC<SlideProps> = () => {
  const journeySteps = [
    {
      num: "01",
      title: "Assessment / Wedge",
      desc: "Entry points include automation audits, strategic workshops, intelligence layer diagnostics, or proof-of-concept builds.",
      color: "cyan"
    },
    {
      num: "02",
      title: "Pilot",
      desc: "Launch with a single AI Employee, AI-enabled tool, or narrow agentic system to prove value quickly.",
      color: "purple"
    },
    {
      num: "03",
      title: "Expand",
      desc: "Scale through additional AI employees, shared memory systems, and cross-workflow orchestration.",
      color: "emerald"
    },
    {
      num: "04",
      title: "Operate",
      desc: "Deploy full Command Center, migrate to owned infrastructure, and establish long-term scalable operations.",
      color: "blue"
    }
  ];

  return (
    <div className="h-[calc(100vh-70px)] md:h-[calc(100vh-100px)] flex items-start md:items-center justify-center px-3 md:px-6 pt-6 md:pt-4 pb-16 md:pb-6 overflow-y-auto">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 md:mb-6"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs md:text-sm font-medium text-cyan-400 uppercase tracking-wider mb-3">
            <Users className="w-3 h-3" />
            Client Journey
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
            How We Sell: <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Start → Pilot → Expand</span>
          </h2>
          <p className="text-sm md:text-base text-slate-400">
            Your clients can start anywhere, but the path to value is consistent and modular. Nothing requires a rewrite.
          </p>
        </motion.div>

        <div className="space-y-4">
          {journeySteps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + (i * 0.1), duration: 0.5 }}
              className={`border-l-2 border-${step.color}-500/50 pl-4 py-2`}
            >
              <div className="text-xs text-slate-500 mb-1">{step.num}</div>
              <h3 className={`text-lg font-bold text-${step.color}-400 mb-1`}>{step.title}</h3>
              <p className="text-sm text-slate-300">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-5 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-xl p-4"
        >
          <p className="text-sm text-slate-300 text-center">
            <span className="text-white font-semibold">Partner Advantage:</span> This is your repeatable playbook. You own the client relationship — we power the delivery.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

// Slide 21 - Sales Process & Timeline
const Slide21: React.FC<SlideProps> = () => {
  const phases = [
    {
      num: "01",
      title: "Phase 1: Discovery (Week 1)",
      items: ["Initial conversation (30-second talk track)", "Workflow identification", "Pain/value qualification", "Stakeholder mapping"],
      output: "Qualified opportunity or polite pass",
      color: "cyan"
    },
    {
      num: "02",
      title: "Phase 2: Scoping (Week 2)",
      items: ["Workflow deep-dive session", "ROI modeling workshop", "Technical feasibility review", "Proposal development"],
      output: "Signed 30-Day Proof Sprint agreement",
      color: "purple"
    },
    {
      num: "03",
      title: "Phase 3: Proof Sprint (Days 1-30)",
      items: ["Week 1: Workflow mapping & design", "Week 2-3: Build & test", "Week 4: Deploy & measure", "Day 30: ROI review"],
      output: "Working system + measured ROI",
      color: "emerald"
    },
    {
      num: "04",
      title: "Phase 4: Expansion (Week 5-6)",
      items: ["ROI validation meeting", "Expansion roadmap planning", "Additional workflow prioritization", "Agentic OS proposal (if applicable)"],
      output: "Expansion contract or successful exit",
      color: "blue"
    }
  ];

  return (
    <div className="h-[calc(100vh-70px)] md:h-[calc(100vh-100px)] flex items-start md:items-center justify-center px-3 md:px-6 pt-6 md:pt-4 pb-16 md:pb-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">
            Sales Process & Timeline
          </h2>
          <p className="text-sm md:text-base text-slate-400">From First Contact to Production</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {phases.map((phase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + (i * 0.1), duration: 0.5 }}
              className={`bg-gradient-to-br from-${phase.color}-500/5 to-${phase.color}-600/5 border border-${phase.color}-500/20 rounded-xl p-4`}
            >
              <div className="text-xs text-slate-500 mb-1">{phase.num}</div>
              <h3 className={`text-base font-bold text-${phase.color}-400 mb-2`}>{phase.title}</h3>
              <ul className="space-y-1 mb-3">
                {phase.items.map((item, j) => (
                  <li key={j} className="text-xs text-slate-400 flex items-start gap-2">
                    <span className="text-slate-600">•</span> {item}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-slate-500">
                <span className="text-slate-400 font-medium">Key output:</span> {phase.output}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-4"
          >
            <h3 className="text-base font-bold text-cyan-400 mb-2">Partner Owns</h3>
            <ul className="space-y-1 text-xs text-slate-300">
              {["Discovery & qualification", "ROI modeling", "Proposal & contracting", "Expansion planning", "Client relationship"].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 text-cyan-400 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-4"
          >
            <h3 className="text-base font-bold text-purple-400 mb-2">Flywheel Owns</h3>
            <ul className="space-y-1 text-xs text-slate-300">
              {["Technical scoping", "Proof sprint execution", "System deployment", "ROI measurement", "Knowledge transfer"].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 text-purple-400 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4"
        >
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded border border-blue-500/50 flex items-center justify-center flex-shrink-0 mt-0.5">
              <CheckCircle className="w-3 h-3 text-blue-400" />
            </div>
            <p className="text-xs text-slate-300">
              <span className="text-white font-semibold">Critical Success Factor:</span> Sales and delivery must be aligned on ROI expectations before the proof sprint starts. No surprises on Day 30.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Slide 22 - Pricing Philosophy
const Slide22: React.FC<SlideProps> = () => {
  const pricingModels = [
    {
      title: "Value Anchoring",
      desc: "Pricing anchors to the value of the workflow being removed, not hours or seats.",
      color: "cyan"
    },
    {
      title: "Services Pricing",
      desc: "Priced on complexity + ownership transfer. Client gets the system, not just the output.",
      color: "purple"
    },
    {
      title: "Proof Sprint Pricing",
      desc: "Intentionally designed to fund certainty. The 30-day sprint pays for itself in risk reduction.",
      color: "emerald"
    },
    {
      title: "Expansion Pricing",
      desc: "Scales with business impact and workflow complexity. Template reuse = faster deployment = better economics.",
      color: "blue"
    }
  ];

  return (
    <div className="h-[calc(100vh-70px)] md:h-[calc(100vh-100px)] flex items-start md:items-center justify-center px-3 md:px-6 pt-6 md:pt-4 pb-16 md:pb-6 overflow-y-auto">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">
            How We Price
          </h2>
          <p className="text-sm md:text-base text-slate-400">Pricing Philosophy, Not Price Lists</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {pricingModels.map((model, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + (i * 0.1), duration: 0.5 }}
              className={`bg-gradient-to-br from-${model.color}-500/10 to-${model.color}-600/10 border border-${model.color}-500/30 rounded-xl p-4`}
            >
              <h3 className={`text-base font-bold text-${model.color}-400 mb-2`}>{model.title}</h3>
              <p className="text-sm text-slate-300">{model.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <h3 className="text-lg font-bold text-white mb-3">Why This Matters for Partners</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              {[
                "Prevents discounting based on \"effort\"",
                "Aligns pricing with client outcomes",
                "Justifies premium positioning",
                "Makes ROI conversations easier"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 rounded-xl p-4"
          >
            <h3 className="text-lg font-bold text-white mb-3">What Partners Should Say</h3>
            <p className="text-sm text-slate-300 italic border-l-2 border-cyan-500/50 pl-3">
              "Our pricing reflects the value of the workflow we're removing, not the time it takes us to build it. As we get faster, you benefit from our efficiency — but the value to your business stays the same."
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4"
        >
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded border border-blue-500/50 flex items-center justify-center flex-shrink-0 mt-0.5">
              <CheckCircle className="w-3 h-3 text-blue-400" />
            </div>
            <p className="text-xs text-slate-300">
              <span className="text-white font-semibold">Pricing Defense:</span> If a client pushes back on price, return to ROI. If the ROI doesn't justify the price, we're solving the wrong problem.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Slide 23 - Closing CTA
const Slide23: React.FC<SlideProps> = () => {
  const partnerBenefits = [
    {
      icon: Target,
      title: "Differentiated Offering",
      desc: "Give your clients capabilities they can't get elsewhere"
    },
    {
      icon: Rocket,
      title: "Proven Methodology",
      desc: "Battle-tested delivery process with measurable outcomes"
    },
    {
      icon: Users,
      title: "Co-Branded, Not Competing",
      desc: "We strengthen your client relationships, not replace them"
    }
  ];

  return (
    <div className="h-[calc(100vh-70px)] md:h-[calc(100vh-100px)] flex items-center justify-center px-3 md:px-6">
      <div className="max-w-5xl mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Let's Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Together</span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-300">
            Your clients. Our AI. <span className="text-cyan-400 font-semibold">Shared success.</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {partnerBenefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (i * 0.1), duration: 0.5 }}
              className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-5"
            >
              <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mx-auto mb-3 border border-cyan-500/30">
                <benefit.icon className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">{benefit.title}</h3>
              <p className="text-sm text-slate-400">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-2xl p-6 md:p-8"
        >
          <p className="text-lg md:text-xl text-white font-medium mb-4">
            Start with one client. Prove the model. Scale together.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>No upfront platform fees</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Revenue share on joint deals</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Full sales & delivery support</span>
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-6 text-slate-500 text-sm"
        >
          Ready to discuss your first opportunity? Let's talk.
        </motion.p>
      </div>
    </div>
  );
};

// Main Component
const FWAIPPresentation: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const goToSlide = (index: number) => {
    if (index < 0 || index >= slides.length) return;
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) goToSlide(currentSlide + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) goToSlide(currentSlide - 1);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX.current || !touchStartY.current) return;
    const xDiff = touchStartX.current - e.changedTouches[0].clientX;
    const yDiff = touchStartY.current - e.changedTouches[0].clientY;
    
    if (Math.abs(xDiff) > Math.abs(yDiff) && Math.abs(xDiff) > 50) {
      if (xDiff > 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const SlideComponents = [Slide1, TransitionClear, Slide2, Slide3, Slide4, Slide5, Slide6, TransitionROI, Slide7, Slide8, Slide9, TransitionTeam, Slide10, TransitionCaseStudies, Slide11, Slide12, Slide13, Slide14, Slide15, Slide16, Slide17, Slide18, Slide19, Slide20, Slide21, Slide22, Slide23];

  return (
    <div 
      className="min-h-screen bg-black text-white selection:bg-cyan-500/30 relative overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <ParallaxBackground slideIndex={currentSlide} />

      <div className="relative">
        {SlideComponents.map((SlideComponent, idx) => (
          <motion.div
            key={idx}
            initial={false}
            animate={{ 
              opacity: idx === currentSlide ? 1 : 0,
              scale: idx === currentSlide ? 1 : 0.95,
              pointerEvents: idx === currentSlide ? 'auto' : 'none'
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <SlideComponent isActive={idx === currentSlide} slideIndex={idx} />
          </motion.div>
        ))}
      </div>

      {/* Navigation Hint */}
      <NavigationHint currentSlide={currentSlide} totalSlides={slides.length} />

      {/* Enhanced Navigation */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-2 md:bottom-6 left-0 right-0 z-50 flex justify-center px-1 md:px-4"
      >
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-black/70 backdrop-blur-2xl border border-cyan-400/60 md:border-2 rounded-full px-1.5 md:px-4 py-0.5 md:py-3 flex items-center gap-1 md:gap-4 shadow-xl md:shadow-2xl shadow-cyan-500/20 md:shadow-cyan-500/30 hover:border-cyan-400 transition-all duration-300"
        >
          <motion.button 
            onClick={prevSlide} 
            disabled={currentSlide === 0}
            whileHover={{ scale: currentSlide === 0 ? 1 : 1.15 }}
            whileTap={{ scale: currentSlide === 0 ? 1 : 0.9 }}
            className={`p-0.5 md:p-2 rounded-full transition-all duration-300 ${
              currentSlide === 0 
                ? 'text-slate-700 cursor-not-allowed opacity-40' 
                : 'hover:bg-white/10 text-white'
            }`}
          >
            <ChevronLeft className="w-3 md:w-5 h-3 md:h-5" />
          </motion.button>

          <div className="flex gap-0.5 md:gap-2 items-center">
            {slides.map((_, idx) => (
              <motion.button
                key={idx}
                onClick={() => goToSlide(idx)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`rounded-full transition-all duration-300 relative flex items-center justify-center ${
                  idx === currentSlide 
                    ? 'w-7 h-4 md:w-10 md:h-6 bg-cyan-400 shadow-md md:shadow-lg shadow-cyan-500/50' 
                    : 'w-1 h-1 md:w-1.5 md:h-1.5 bg-slate-600 hover:bg-slate-500'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              >
                {idx === currentSlide && (
                  <span className="text-[7px] md:text-[10px] font-bold text-slate-900">
                    {currentSlide + 1}/{slides.length}
                  </span>
                )}
              </motion.button>
            ))}
          </div>

          <motion.button 
            onClick={nextSlide} 
            disabled={currentSlide === slides.length - 1}
            whileHover={{ scale: currentSlide === slides.length - 1 ? 1 : 1.15 }}
            whileTap={{ scale: currentSlide === slides.length - 1 ? 1 : 0.9 }}
            className={`p-0.5 md:p-2 rounded-full transition-all duration-300 ${
              currentSlide === slides.length - 1 
                ? 'text-slate-700 cursor-not-allowed opacity-40' 
                : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-md md:shadow-lg shadow-cyan-500/30'
            }`}
          >
            <ChevronRight className="w-3 md:w-5 h-3 md:h-5" />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Logo */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="fixed top-2 md:top-6 left-2 md:left-6 z-50"
      >
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center justify-center bg-black/40 backdrop-blur-xl p-1.5 md:p-3 rounded-lg md:rounded-xl border-2 border-cyan-400/60 hover:border-cyan-400 transition-all duration-300 cursor-pointer shadow-lg shadow-cyan-500/20"
        >
          <img 
            src="https://i.imgur.com/KlJmrhb.png" 
            alt="FWAIP Logo" 
            className="h-7 md:h-12 w-auto"
          />
        </motion.div>
      </motion.div>

      {/* Keyboard Shortcuts Hint (Bottom Left - Hidden on Mobile) */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 0.5, x: 0 }}
        whileHover={{ opacity: 1, scale: 1.05 }}
        transition={{ delay: 0.6 }}
        className="hidden md:block fixed bottom-6 left-6 z-40 bg-black/40 backdrop-blur-xl px-3 py-2 rounded-xl border-2 border-cyan-400/60 hover:border-cyan-400 transition-all duration-300 shadow-lg shadow-cyan-500/20"
      >
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-slate-500">Use ← → or Space</span>
        </div>
      </motion.div>
    </div>
  );
};

export default FWAIPPresentation;
