import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, TrendingUp, ChevronLeft, ChevronRight, ChevronDown,
  Users, CheckCircle, Building, Zap,
  Rocket, BarChart3, AlertCircle, Target, Database,
  ShoppingCart, Sparkles, Package, Clock,
  Lock, Gauge, Layers, Headphones, Award, X, ArrowRight
} from 'lucide-react';

interface SlideProps {
  isActive?: boolean;
  slideIndex: number;
}

// Welcome Modal Component
const WelcomeModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsLoaded(false);
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-3 md:p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-2xl pointer-events-auto"
            >
            <div className="relative bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-2xl border border-cyan-500/30 rounded-xl md:rounded-3xl p-4 md:p-8 shadow-2xl shadow-cyan-500/20 max-h-[85vh] overflow-y-auto">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-3 md:top-4 right-3 md:right-4 p-1.5 md:p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 group z-10"
              >
                <X className="w-4 md:w-5 h-4 md:h-5 text-slate-400 group-hover:text-white transition-colors" />
              </button>

              {/* Logo */}
              <div className="flex justify-center mb-2 md:mb-6">
                <img 
                  src="https://i.imgur.com/KlJmrhb.png" 
                  alt="FWAIP Logo" 
                  className="h-10 md:h-16 w-auto"
                />
              </div>

              {/* Content */}
              <div className="text-center mb-3 md:mb-6">
                <h2 className="text-lg md:text-3xl font-bold text-white mb-1 md:mb-3">
                  How to Navigate <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Presentation</span>
                </h2>
                <p className="text-slate-400 text-xs md:text-base leading-snug md:leading-relaxed px-2">
                  Navigate using arrow keys, spacebar, or the navigation buttons.
                </p>
              </div>

              {/* Navigation Tips */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3 md:mb-6">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg md:rounded-xl p-2 md:p-4 text-center">
                  <div className="text-lg md:text-2xl mb-1">⌨️</div>
                  <div className="text-[10px] md:text-xs text-slate-400 font-medium">Arrow Keys & Click</div>
                  <div className="text-[9px] md:text-[10px] text-slate-500 mt-0.5 md:mt-1">Navigate slides</div>
                </div>
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg md:rounded-xl p-2 md:p-4 text-center">
                  <div className="text-lg md:text-2xl mb-1">✨</div>
                  <div className="text-[10px] md:text-xs text-slate-400 font-medium">Hover Components</div>
                  <div className="text-[9px] md:text-[10px] text-slate-500 mt-0.5 md:mt-1">Reveal more info</div>
                </div>
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg md:rounded-xl p-2 md:p-4 text-center">
                  <div className="text-lg md:text-2xl mb-1">📱</div>
                  <div className="text-[10px] md:text-xs text-slate-400 font-medium">Swipe Gestures</div>
                  <div className="text-[9px] md:text-[10px] text-slate-500 mt-0.5 md:mt-1">Mobile only</div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="relative">
                <button
                  onClick={isLoaded ? onClose : undefined}
                  disabled={!isLoaded}
                  className={`w-full py-2.5 md:py-3 px-4 md:px-6 text-sm md:text-base text-white font-semibold rounded-xl transition-all duration-300 shadow-lg relative overflow-hidden ${
                    isLoaded 
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-[1.02] cursor-pointer' 
                      : 'bg-slate-700 cursor-not-allowed opacity-60'
                  }`}
                >
                  {/* Loading Bar */}
                  {!isLoaded && (
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 6, ease: "linear" }}
                      className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600"
                    />
                  )}
                  
                  {/* Button Text */}
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {!isLoaded && (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                    )}
                    {isLoaded ? "Let's Get Started" : "Please Read Above"}
                  </span>
                </button>
                
                {/* Progress Indicator */}
                {!isLoaded && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-slate-500 text-center mt-2"
                  >
                    Please review the navigation instructions...
                  </motion.p>
                )}
              </div>
            </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

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
  { id: 1, title: "Hero" },
  { id: 2, title: "Your Advantage" },
  { id: 3, title: "Velocity Gap" },
  { id: 4, title: "AI Intelligence" },
  { id: 5, title: "Business First" },
  { id: 6, title: "ROAS Pilot" },
  { id: 7, title: "RAG Case Study" },
  { id: 8, title: "Data Cleanup" },
  { id: 9, title: "About FWAIP" }
];

// Slide 1 - Hero
const Slide1: React.FC<SlideProps> = ({ isActive }) => {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  return (
    <>
      <WelcomeModal isOpen={showModal} onClose={() => setShowModal(false)} />
      
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
            Intelligence Infrastructure
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="block mt-1 md:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
            >
              for Shopper Data
            </motion.span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xs sm:text-sm md:text-lg lg:text-xl text-slate-400 max-w-3xl mx-auto leading-snug md:leading-relaxed font-light px-2"
          >
            Turn your promotions and purchase history into the insights enterprise CPG brands will pay for.
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
    </>
  );
};

// Slide 2 - Your Unfair Advantage
const Slide2: React.FC<SlideProps> = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="h-[calc(100vh-70px)] md:h-[calc(100vh-100px)] flex items-start md:items-center justify-start md:justify-center px-3 sm:px-4 md:px-6 pt-6 sm:pt-8 md:py-8 pb-16 md:pb-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-2 md:mb-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-1 md:mb-3 tracking-tight px-2"
          >
            Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Unfair Advantage</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[9px] sm:text-xs md:text-base text-slate-400 max-w-2xl mx-auto px-2 hidden sm:block"
          >
            Rich first party data and a massive, engaged user base.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 max-w-6xl mx-auto mb-2 md:mb-4">
          {/* Large Card - Users */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            onHoverStart={() => setHoveredCard(0)}
            onHoverEnd={() => setHoveredCard(null)}
            className="relative md:col-span-2 md:row-span-2 overflow-hidden bg-gradient-to-br from-cyan-500/5 to-blue-500/5 backdrop-blur-xl border border-cyan-500/20 rounded-xl md:rounded-3xl p-3 sm:p-4 md:p-6 hover:border-cyan-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20 cursor-pointer group"
            whileHover={{ y: -5 }}
          >
            <div className="absolute -right-8 -bottom-8 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500 transform rotate-12 group-hover:scale-110">
              <Users className="w-48 h-48 text-cyan-400" />
            </div>

            <div className="relative z-10">
              <motion.div
                animate={{ scale: hoveredCard === 0 ? 1.08 : 1, rotate: hoveredCard === 0 ? 3 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-10 md:w-12 h-10 md:h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-3 md:mb-4 border border-cyan-500/20"
              >
                <Users className="w-5 md:w-6 h-5 md:h-6 text-cyan-400" />
              </motion.div>
                  <div className="text-2xl sm:text-3xl md:text-6xl font-bold text-white mb-1 md:mb-2">
                <AnimatedCounter end={2.5} suffix="M+" />
              </div>
              <div className="text-sm sm:text-base md:text-xl font-semibold text-white mb-1 md:mb-2">Monthly Users</div>
              <p className="text-[9px] md:text-sm text-slate-400 leading-snug mb-1 md:mb-4 hidden sm:block">
                Shoppers engaging with promotions and deals across app and web.
              </p>
              
              <motion.div 
                initial={false}
                animate={{ height: hoveredCard === 0 ? 'auto' : 0, opacity: hoveredCard === 0 ? 1 : 0 }}
                className="overflow-hidden"
              >
                 <div className="pt-4 border-t border-white/10">
                  <div className="flex justify-between text-xs text-cyan-300 mb-2 font-medium uppercase tracking-wider">
                    <span>Engagement Score</span>
                    <span>Very High</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '85%' }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Amazon GMV */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            onHoverStart={() => setHoveredCard(1)}
            onHoverEnd={() => setHoveredCard(null)}
            className="relative md:col-span-2 overflow-hidden bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 backdrop-blur-xl border border-emerald-500/20 rounded-2xl p-5 hover:border-emerald-500/40 transition-all duration-500 cursor-pointer group hover:shadow-2xl hover:shadow-emerald-500/10"
            whileHover={{ y: -3 }}
          >
             <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500 transform -rotate-12 group-hover:scale-110">
              <ShoppingCart className="w-32 h-32 text-emerald-400" />
            </div>

            <div className="relative z-10">
              <motion.div
                animate={{ scale: hoveredCard === 1 ? 1.08 : 1, rotate: hoveredCard === 1 ? -3 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-8 md:w-10 h-8 md:h-10 bg-emerald-500/10 rounded-lg md:rounded-xl flex items-center justify-center mb-2 md:mb-3 border border-emerald-500/20"
              >
                <ShoppingCart className="w-4 md:w-5 h-4 md:h-5 text-emerald-400" />
              </motion.div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">
                <AnimatedCounter end={100} prefix="$" suffix="M" />
              </div>
              <div className="text-xs md:text-sm font-semibold text-white mb-1">Annual Amazon GMV Influenced</div>
              <p className="text-[10px] md:text-xs text-slate-400 leading-snug mb-1 md:mb-2">Purchase volume driven through your platform.</p>
              
              <motion.div 
                initial={false}
                animate={{ height: hoveredCard === 1 ? 'auto' : 0, opacity: hoveredCard === 1 ? 1 : 0 }}
                className="overflow-hidden"
              >
                <div className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-3 py-2 rounded-lg border border-emerald-500/20 inline-block mt-2">
                  2.5% Avg. Affiliate Commission
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Purchase History */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            onHoverStart={() => setHoveredCard(2)}
            onHoverEnd={() => setHoveredCard(null)}
            className="relative overflow-hidden bg-gradient-to-br from-purple-500/5 to-pink-500/5 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-5 hover:border-purple-500/40 transition-all duration-500 cursor-pointer hover:shadow-2xl hover:shadow-purple-500/10"
            whileHover={{ y: -3, rotate: -1 }}
          >
            <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500 transform rotate-6 group-hover:scale-110">
              <Database className="w-24 h-24 text-purple-400" />
            </div>

            <div className="relative z-10">
              <motion.div
                animate={{ scale: hoveredCard === 2 ? 1.08 : 1 }}
                transition={{ duration: 0.3 }}
                className="w-8 md:w-10 h-8 md:h-10 bg-purple-500/10 rounded-lg md:rounded-xl flex items-center justify-center mb-2 md:mb-3 border border-purple-500/20"
              >
                <Database className="w-4 md:w-5 h-4 md:h-5 text-purple-400" />
              </motion.div>
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">12–24 Mo</div>
              <div className="text-xs md:text-sm font-semibold text-white mb-1">History</div>
              <p className="text-[10px] md:text-xs text-slate-400 leading-snug">Per Linked Retailer App</p>
              
              <motion.div 
                initial={false}
                animate={{ opacity: hoveredCard === 2 ? 1 : 0, y: hoveredCard === 2 ? 0 : 10 }}
                className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-4 text-center"
              >
                <p className="text-xs text-purple-300 font-medium">
                  Deep longitudinal view of real purchase behavior.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* First-Party Data */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            onHoverStart={() => setHoveredCard(3)}
            onHoverEnd={() => setHoveredCard(null)}
            className="relative overflow-hidden bg-gradient-to-br from-blue-500/5 to-cyan-500/5 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-5 hover:border-blue-500/40 transition-all duration-500 cursor-pointer hover:shadow-2xl hover:shadow-blue-500/10"
            whileHover={{ y: -3, rotate: 1 }}
          >
            <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500 transform -rotate-6 group-hover:scale-110">
              <Package className="w-24 h-24 text-blue-400" />
            </div>

            <div className="relative z-10">
              <motion.div
                animate={{ scale: hoveredCard === 3 ? 1.08 : 1 }}
                transition={{ duration: 0.3 }}
                className="w-8 md:w-10 h-8 md:h-10 bg-blue-500/10 rounded-lg md:rounded-xl flex items-center justify-center mb-2 md:mb-3 border border-blue-500/20"
              >
                <Package className="w-4 md:w-5 h-4 md:h-5 text-blue-400" />
              </motion.div>
              <div className="text-xs md:text-sm font-semibold text-white mb-1">1st Party Data</div>
              <div className="text-[10px] md:text-xs font-medium text-blue-400 mb-1">What You Capture</div>
              
              <motion.div 
                initial={false}
                animate={{ height: hoveredCard === 3 ? 'auto' : 0, opacity: hoveredCard === 3 ? 1 : 0 }}
                className="overflow-hidden"
              >
                <ul className="mt-2 space-y-1">
                  {["Purchase History", "Retailer/Channel", "Basket Affinity"].map((item, i) => (
                    <li key={i} className="text-[10px] text-slate-300 flex items-center gap-1.5">
                      <div className="w-1 h-1 rounded-full bg-blue-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* CPG Clients Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          whileHover={{ scale: 1.01, boxShadow: "0 0 30px rgba(6, 182, 212, 0.2)" }}
          className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-4 max-w-6xl mx-auto hover:border-cyan-500/30 transition-all duration-500 cursor-default group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          <div className="text-center relative z-10">
            <p className="text-[10px] text-slate-500 mb-2 uppercase tracking-wider">Ready to Power Decision Grade Insights For</p>
            <p className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              Procter & Gamble • Unilever • Mars • Mondelez • Kimberly Clark
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Stacking Card Component for Critical Questions
const StackingCards = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const cards = [
    { 
      icon: Target, 
      title: "Top Selling Products", 
      subtitle: "By channel & region", 
      prompt: "Show me top 5 SKUs by margin in the Midwest region for Q3."
    },
    { 
      icon: Sparkles, 
      title: "Coupon Adoption", 
      subtitle: "Real-time rates", 
      prompt: "Which coupon campaign had the highest redemption rate last week?"
    },
    { 
      icon: TrendingUp, 
      title: "Promotion ROI", 
      subtitle: "Incremental lift", 
      prompt: "Calculate the incremental lift from our Summer BOGO promotion."
    },
    { 
      icon: Package, 
      title: "Product Affinity", 
      subtitle: "Basket analysis", 
      prompt: "What products are most frequently purchased with our premium line?"
    }
  ];

  const nextCard = () => {
    setActiveIndex((prev) => (prev + 1) % cards.length);
  };

  return (
    <div className="relative h-[180px] md:h-[200px] w-full flex items-center justify-center perspective-1000" onClick={nextCard}>
      <AnimatePresence mode='popLayout'>
        {cards.map((card, index) => {
          const isCurrent = index === activeIndex;
          const isNext = index === (activeIndex + 1) % cards.length;
          const isPrev = index === (activeIndex - 1 + cards.length) % cards.length;
          
          if (!isCurrent && !isNext && !isPrev) return null;

          return (
            <motion.div
              key={index}
              layoutId={`card-${index}`}
              initial={{ 
                scale: 0.9, 
                y: 20, 
                opacity: 0,
                zIndex: 0 
              }}
              animate={{ 
                scale: isCurrent ? 1 : isNext ? 0.95 : 0.9,
                y: isCurrent ? 0 : isNext ? 15 : -15,
                opacity: isCurrent ? 1 : 1, // Fully opaque
                zIndex: isCurrent ? 20 : isNext ? 10 : 0,
                rotateX: isCurrent ? 0 : isNext ? 5 : -5
              }}
              exit={{ 
                scale: 0.9,
                y: -30, 
                opacity: 0,
                zIndex: 0
              }}
              transition={{ type: "spring", stiffness: 200, damping: 25, mass: 1 }}
              className={`absolute w-full max-w-[280px] md:max-w-2xl backdrop-blur-xl border rounded-2xl p-4 md:p-5 flex flex-col items-start text-left cursor-pointer hover:border-cyan-500/50 transition-colors shadow-xl ${
                isCurrent 
                  ? 'border-cyan-500/30 bg-slate-900/95 shadow-cyan-500/20' 
                  : 'border-white/5 bg-slate-800/95 shadow-black/50'
              }`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="flex items-center gap-3 mb-2 md:mb-3 w-full">
                <div className={`p-2 rounded-lg ${isCurrent ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/5 text-slate-500'}`}>
                  <card.icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="text-left flex-1">
                  <h4 className={`text-sm md:text-base font-bold ${isCurrent ? 'text-white' : 'text-slate-400'}`}>{card.title}</h4>
                  <p className="text-[10px] md:text-xs text-slate-500">{card.subtitle}</p>
                </div>
                
                {/* Interaction Hint - Top Right inside card */}
                {isCurrent && (
                  <motion.div 
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex items-center gap-1 bg-cyan-500/10 px-3 py-1.5 rounded-full border border-cyan-500/20 animate-pulse"
                  >
                    <span className="text-[9px] text-cyan-400 font-medium uppercase tracking-wider hidden md:inline">Click for more examples</span>
                    <span className="text-[9px] text-cyan-400 font-medium uppercase tracking-wider md:hidden">Tap for more</span>
                    <ChevronRight className="w-3 h-3 text-cyan-400" />
                  </motion.div>
                )}
              </div>
              
              {isCurrent && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full bg-white/5 rounded-xl p-3 border border-white/5 mt-1"
                >
                  <div className="text-[9px] text-slate-500 mb-1 uppercase tracking-wider font-medium">Example AI Prompt</div>
                  <p className="text-[10px] md:text-xs font-mono text-cyan-300 text-left leading-relaxed">
                    <span className="text-slate-500 select-none mr-2">$</span>
                    {card.prompt}
                  </p>
                </motion.div>
              )}
              
              {/* Card Indicator */}
              {isCurrent && (
                <div className="flex gap-1 mt-3 self-center">
                  {cards.map((_, idx) => (
                    <div 
                      key={idx}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        idx === activeIndex ? 'w-6 bg-cyan-400' : 'w-1 bg-slate-600'
                      }`}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

// Slide 3 - The Velocity Gap
const Slide3: React.FC<SlideProps> = () => {
  return (
    <div className="h-[calc(100vh-70px)] md:h-[calc(100vh-100px)] flex items-start md:items-center justify-start md:justify-center px-3 sm:px-4 md:px-6 pt-6 sm:pt-8 md:py-6 pb-16 md:pb-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-2 md:mb-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-1 md:mb-3 tracking-tight px-2"
          >
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Velocity Gap</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[10px] sm:text-xs md:text-base text-slate-400 max-w-2xl mx-auto px-2"
          >
            Rich data and clear demand. Execution speed is the only constraint.
          </motion.p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 mb-3 md:mb-5">
          {/* Central "VS" Badge */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:flex flex-col items-center">
            <div className="w-[2px] h-16 bg-gradient-to-b from-transparent via-slate-700 to-transparent absolute -top-20"></div>
            <motion.div 
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="w-12 h-12 rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center shadow-xl z-20"
            >
              <span className="text-xs font-bold text-slate-500">VS</span>
            </motion.div>
            <div className="w-[2px] h-16 bg-gradient-to-b from-transparent via-slate-700 to-transparent absolute -bottom-20"></div>
          </div>

          {/* The Opportunity */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            className="group relative bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 backdrop-blur-xl border border-emerald-500/20 rounded-xl md:rounded-3xl p-3 sm:p-4 md:p-5 hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500"
          >
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <Rocket className="w-24 h-24 text-emerald-400 rotate-12" />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2 md:mb-4">
                <div className="w-8 sm:w-9 md:w-10 h-8 sm:h-9 md:h-10 bg-emerald-500/10 rounded-lg md:rounded-2xl flex items-center justify-center border border-emerald-500/20 shadow-lg shadow-emerald-500/10 group-hover:scale-110 transition-transform duration-300">
                  <Rocket className="w-4 sm:w-5 md:w-5 h-4 sm:h-5 md:h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-white">The Opportunity</h3>
                  <p className="text-[10px] md:text-xs text-emerald-400 font-medium uppercase tracking-wider hidden sm:block">Growth Engine</p>
                </div>
              </div>
              
              <ul className="space-y-2 md:space-y-3">
                {[
                  "Launch an enterprise Insights product for CPGs",
                  "Monetize engagement from 2.5M shoppers",
                  "Create a new high margin revenue stream",
                  "Command premium pricing tied directly to ROAS"
                ].map((item, i) => (
                  <motion.li 
                    key={i} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + (i * 0.1), duration: 0.4 }}
                    className="flex items-start gap-2 md:gap-3 group/item"
                  >
                    <div className="w-4 md:w-5 h-4 md:h-5 rounded-full bg-emerald-500/10 flex items-center justify-center mt-0.5 border border-emerald-500/20 group-hover/item:bg-emerald-500/20 transition-colors">
                      <CheckCircle className="w-2.5 md:w-3 h-2.5 md:h-3 text-emerald-400" />
                    </div>
                    <span className="text-[10px] sm:text-xs md:text-sm text-slate-300 group-hover/item:text-white transition-colors">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* The Reality */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            className="group relative bg-gradient-to-br from-orange-500/5 to-red-500/5 backdrop-blur-xl border border-orange-500/20 rounded-xl md:rounded-3xl p-3 sm:p-4 md:p-5 hover:border-orange-500/40 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500"
          >
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <AlertCircle className="w-24 h-24 text-orange-400 -rotate-12" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2 md:mb-4">
                <div className="w-8 sm:w-9 md:w-10 h-8 sm:h-9 md:h-10 bg-orange-500/10 rounded-lg md:rounded-2xl flex items-center justify-center border border-orange-500/20 shadow-lg shadow-orange-500/10 group-hover:scale-110 transition-transform duration-300">
                  <AlertCircle className="w-4 sm:w-5 md:w-5 h-4 sm:h-5 md:h-5 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-white">The Reality</h3>
                  <p className="text-[10px] md:text-xs text-orange-400 font-medium uppercase tracking-wider hidden sm:block">Current State</p>
                </div>
              </div>

              <ul className="space-y-2 md:space-y-3">
                {[
                  "One product lead focused on Insights, hired recently",
                  "Seventeen competing initiatives",
                  "Data spread across multiple systems and formats",
                  "Manual analysis slows time to answer and time to revenue"
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + (i * 0.1), duration: 0.4 }}
                    className="flex items-start gap-2 md:gap-3 group/item"
                  >
                    <div className="w-4 md:w-5 h-4 md:h-5 rounded-full bg-orange-500/10 flex items-center justify-center mt-0.5 border border-orange-500/20 group-hover/item:bg-orange-500/20 transition-colors">
                      <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-orange-400" />
                    </div>
                    <span className="text-[10px] sm:text-xs md:text-sm text-slate-300 group-hover/item:text-white transition-colors">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Bridge Section - Stacking Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="relative mt-3 md:mt-5"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 rounded-2xl blur-xl"></div>
          <div className="relative p-3 md:p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 md:mb-4 gap-2 md:gap-4">
              <div className="text-left">
                <h3 className="text-[10px] md:text-xs font-bold text-white uppercase tracking-wider mb-1">
                  Conversational Intelligence
                </h3>
                <p className="text-[10px] md:text-xs text-slate-400">
                  Example questions brand teams can ask directly to your data infrastructure.
                </p>
              </div>
              
              <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full self-start md:self-auto">
                 <span className="text-[9px] md:text-[10px] text-slate-300">Success Metric:</span>
                 <span className="text-emerald-400 text-[10px] md:text-xs font-bold">Higher ROAS</span>
              </div>
            </div>
            
            <StackingCards />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Slide 4 - AI Powered Intelligence Layer
const Slide4: React.FC<SlideProps> = () => {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  return (
    <div className="h-[calc(100vh-70px)] md:h-[calc(100vh-100px)] flex items-start md:items-center justify-start md:justify-center px-3 sm:px-4 md:px-6 pt-6 sm:pt-8 md:py-8 pb-16 md:pb-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-2 md:mb-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-1 md:mb-3 tracking-tight px-2"
          >
            AI Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Intelligence Layer</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[9px] sm:text-xs md:text-base text-slate-400 max-w-3xl mx-auto px-2 hidden sm:block"
          >
            Transform your existing data stack into a conversational insights engine.
          </motion.p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-3 md:mb-4">
          {[
            {
              icon: Brain,
              title: "Conversational Data Intelligence",
              desc: "Natural language queries across all relevant data sources.",
              detail: "Brand teams ask 'What was our top selling SKU at Target?' and get instant answers backed by data.",
              color: "cyan",
              delay: 0.2
            },
            {
              icon: Zap,
              title: "Real Time Query Acceleration",
              desc: "Complex multi source questions answered in under two seconds.",
              detail: "Automated aggregation and role-specific views for brand and shopper marketing teams.",
              color: "purple",
              delay: 0.3
            },
            {
              icon: BarChart3,
              title: "Pattern Recognition and Alerts",
              desc: "Trend detection that spots opportunities before traditional dashboards.",
              detail: "Proactive alerts on regional lift, promotion fatigue, inventory risk and seasonal demand.",
              color: "emerald",
              delay: 0.4
            },
            {
              icon: Users,
              title: "White Label Client Interface",
              desc: "Branded, self service dashboards your CPG clients log into directly.",
              detail: "Easy to use interfaces that drive retention and justify premium pricing for your Insights product.",
              color: "blue",
              delay: 0.5
            }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: feature.delay, duration: 0.6 }}
              onHoverStart={() => setHoveredFeature(idx)}
              onHoverEnd={() => setHoveredFeature(null)}
              className="relative group cursor-pointer"
            >
              <motion.div 
                className={`relative overflow-hidden bg-gradient-to-br ${
                  feature.color === 'cyan' ? 'from-cyan-500/5 to-blue-500/5 border-cyan-500/20' :
                  feature.color === 'purple' ? 'from-purple-500/5 to-pink-500/5 border-purple-500/20' :
                  feature.color === 'emerald' ? 'from-emerald-500/5 to-cyan-500/5 border-emerald-500/20' :
                  'from-blue-500/5 to-indigo-500/5 border-blue-500/20'
                } backdrop-blur-xl border rounded-xl md:rounded-2xl p-3 md:p-6 transition-all duration-500 group-hover:shadow-2xl ${
                  feature.color === 'cyan' ? 'group-hover:shadow-cyan-500/20 group-hover:border-cyan-500/40' :
                  feature.color === 'purple' ? 'group-hover:shadow-purple-500/20 group-hover:border-purple-500/40' :
                  feature.color === 'emerald' ? 'group-hover:shadow-emerald-500/20 group-hover:border-emerald-500/40' :
                  'group-hover:shadow-blue-500/20 group-hover:border-blue-500/40'
                }`}
                whileHover={{ y: -5 }}
              >
                 {/* Background Icon */}
                <div className={`absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500 transform group-hover:rotate-12 group-hover:scale-110`}>
                  <feature.icon className={`w-32 h-32 ${
                    feature.color === 'cyan' ? 'text-cyan-400' :
                    feature.color === 'purple' ? 'text-purple-400' :
                    feature.color === 'emerald' ? 'text-emerald-400' :
                    'text-blue-400'
                  }`} />
                </div>

                <div className="relative z-10 flex items-start gap-2 md:gap-4">
                  <motion.div 
                    animate={{ 
                      scale: hoveredFeature === idx ? 1.1 : 1,
                      rotate: hoveredFeature === idx ? 360 : 0
                    }}
                    transition={{ duration: 0.6, type: "spring" }}
                    className={`w-9 md:w-12 h-9 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 ${
                      feature.color === 'cyan' ? 'bg-cyan-500/10 border border-cyan-500/20' :
                      feature.color === 'purple' ? 'bg-purple-500/10 border border-purple-500/20' :
                      feature.color === 'emerald' ? 'bg-emerald-500/10 border border-emerald-500/20' :
                      'bg-blue-500/10 border border-blue-500/20'
                    }`}>
                    <feature.icon className={`w-5 md:w-6 h-5 md:h-6 ${
                      feature.color === 'cyan' ? 'text-cyan-400' :
                      feature.color === 'purple' ? 'text-purple-400' :
                      feature.color === 'emerald' ? 'text-emerald-400' :
                      'text-blue-400'
                    }`} />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm md:text-lg font-bold text-white mb-1 md:mb-2 group-hover:text-cyan-300 transition-colors">{feature.title}</h3>
                    <p className="text-xs md:text-sm text-slate-400 leading-snug md:leading-relaxed mb-1 md:mb-2 group-hover:text-slate-300 transition-colors">{feature.desc}</p>
                    
                    <motion.div
                      initial={false}
                      animate={{ 
                        height: hoveredFeature === idx ? 'auto' : 0,
                        opacity: hoveredFeature === idx ? 1 : 0,
                        marginTop: hoveredFeature === idx ? 8 : 0
                      }}
                      className="overflow-hidden"
                    >
                      <div className="text-xs text-slate-300 bg-black/20 p-3 rounded-lg border border-white/5 italic">
                        "{feature.detail}"
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-4"
        >
          <motion.div 
            whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(6, 182, 212, 0.3)" }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-600/20 to-purple-600/20 backdrop-blur-xl border border-cyan-500/30 rounded-full hover:border-cyan-500/50 transition-all duration-300 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-medium text-white">Built for your infrastructure. Fully owned by KCL.</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

// Slide 5 - Business Strategy First
const Slide5: React.FC<SlideProps> = () => {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const [hoveredPillar, setHoveredPillar] = useState<number | null>(null);

  return (
    <div className="h-[calc(100vh-70px)] md:h-[calc(100vh-100px)] flex items-start md:items-center justify-center px-3 md:px-6 pt-3 md:pt-4 pb-16 md:pb-4 overflow-y-auto">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-2 md:mb-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 md:mb-2 tracking-tight px-2"
          >
            <span className="text-cyan-400">Business Strategy</span> First.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[10px] md:text-sm text-slate-400 px-2"
          >
            Designed around your ROAS and revenue goals, not around algorithms.
          </motion.p>
        </div>

        {/* Expected Impact - Interactive Cards */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-4"
        >
          <div className="text-center mb-3">
            <span className="inline-block text-xs font-bold text-emerald-400 uppercase tracking-wider px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
              Expected Impact
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { 
                value: "95", 
                suffix: "%", 
                label: "Faster queries", 
                sub: "Compared with traditional BI and manual analysis.",
                detail: "Natural language eliminates complex SQL and dashboard building.",
                icon: Zap,
                color: "emerald"
              },
              { 
                value: "2", 
                prefix: "<", 
                suffix: "s", 
                label: "Response time", 
                sub: "For multi source questions on key CPG metrics.",
                detail: "Real-time aggregation across all your data sources.",
                icon: Clock,
                color: "cyan"
              },
              { 
                value: "2", 
                suffix: "x", 
                label: "Revenue potential", 
                sub: "From a dedicated Insights line and stronger CPG renewals.",
                detail: "New high-margin revenue stream from data you already own.",
                icon: TrendingUp,
                color: "purple"
              }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + (idx * 0.1) }}
                onHoverStart={() => setHoveredStat(idx)}
                onHoverEnd={() => setHoveredStat(null)}
                className="relative group cursor-pointer"
              >
                <motion.div
                  whileHover={{ y: -5 }}
                  className={`relative overflow-hidden bg-gradient-to-br ${
                    stat.color === 'emerald' ? 'from-emerald-500/5 to-cyan-500/5 border-emerald-500/20' :
                    stat.color === 'cyan' ? 'from-cyan-500/5 to-blue-500/5 border-cyan-500/20' :
                    'from-purple-500/5 to-pink-500/5 border-purple-500/20'
                  } backdrop-blur-xl border rounded-xl md:rounded-3xl p-3 sm:p-4 md:p-5 transition-all duration-500 hover:shadow-2xl ${
                    stat.color === 'emerald' ? 'hover:shadow-emerald-500/20 hover:border-emerald-500/40' :
                    stat.color === 'cyan' ? 'hover:shadow-cyan-500/20 hover:border-cyan-500/40' :
                    'hover:shadow-purple-500/20 hover:border-purple-500/40'
                  } h-full flex flex-col`}
                >
                  {/* Background Icon */}
                  <div className={`absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500 transform rotate-12 group-hover:scale-110`}>
                    <stat.icon className={`w-26 h-26 ${
                      stat.color === 'emerald' ? 'text-emerald-400' :
                      stat.color === 'cyan' ? 'text-cyan-400' :
                      'text-purple-400'
                    }`} />
                  </div>

                  {/* Hover Hint - Top Right */}
                  <motion.div
                    animate={{ opacity: hoveredStat === idx ? 0 : 0.5 }}
                    className="absolute top-3 right-3 text-[9px] text-slate-500 italic z-10"
                  >
                    Hover for details
                  </motion.div>

                  <div className="relative z-10 flex-1 flex flex-col">
                    <motion.div
                      animate={{ scale: hoveredStat === idx ? 1.1 : 1, rotate: hoveredStat === idx ? 5 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${
                        stat.color === 'emerald' ? 'bg-emerald-500/10 border border-emerald-500/20' :
                        stat.color === 'cyan' ? 'bg-cyan-500/10 border border-cyan-500/20' :
                        'bg-purple-500/10 border border-purple-500/20'
                      }`}
                    >
                      <stat.icon className={`w-5 h-5 ${
                        stat.color === 'emerald' ? 'text-emerald-400' :
                        stat.color === 'cyan' ? 'text-cyan-400' :
                        'text-purple-400'
                      }`} />
                    </motion.div>
                    
                    <div className={`text-4xl font-bold mb-2 ${
                      stat.color === 'emerald' ? 'text-emerald-400' :
                      stat.color === 'cyan' ? 'text-cyan-400' :
                      'text-purple-400'
                    }`}>
                      {stat.prefix}{stat.value}{stat.suffix}
                    </div>
                    <div className="text-sm font-bold text-white mb-2 uppercase tracking-wide">{stat.label}</div>
                    <div className="text-xs text-slate-400 leading-snug min-h-[2.5rem]">{stat.sub}</div>
                    
                    {/* Reveal on Hover */}
                    <motion.div
                      initial={false}
                      animate={{ 
                        height: hoveredStat === idx ? 'auto' : 0,
                        opacity: hoveredStat === idx ? 1 : 0,
                        marginTop: hoveredStat === idx ? 8 : 0
                      }}
                      className="overflow-hidden"
                    >
                      <div className={`text-[11px] font-medium px-2.5 py-2 rounded-lg border ${
                        stat.color === 'emerald' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' :
                        stat.color === 'cyan' ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-300' :
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
        </motion.div>

        {/* Partnership Model */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {[
            {
              icon: Lock,
              title: "100% Ownership",
              subtitle: "Total Control",
              color: "cyan",
              items: [
                "You own all code, models and infrastructure.",
                "No vendor lock in or black box platform.",
                "Deploy in your cloud or a dedicated environment."
              ]
            },
            {
              icon: Clock,
              title: "Weeks, Not Quarters",
              subtitle: "Rapid Deployment",
              color: "purple",
              items: [
                "Start with the highest impact ROAS and revenue KPIs.",
                "Show measurable value in pilot campaigns within weeks.",
                "Thirty to sixty percent faster than hiring and building in house."
              ]
            }
          ].map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx === 0 ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              onHoverStart={() => setHoveredPillar(idx)}
              onHoverEnd={() => setHoveredPillar(null)}
              className="group relative"
            >
              <motion.div
                whileHover={{ y: -5 }}
                className={`relative overflow-hidden bg-gradient-to-br ${
                  pillar.color === 'cyan' ? 'from-cyan-500/5 to-blue-500/5 border-cyan-500/20' : 'from-purple-500/5 to-pink-500/5 border-purple-500/20'
                } backdrop-blur-xl border rounded-2xl md:rounded-3xl p-4 md:p-5 transition-all duration-500 cursor-pointer hover:shadow-2xl ${
                  pillar.color === 'cyan' ? 'hover:shadow-cyan-500/20 hover:border-cyan-500/40' : 'hover:shadow-purple-500/20 hover:border-purple-500/40'
                }`}
              >
                {/* Background Icon */}
                <div className={`absolute -right-6 -bottom-6 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500 transform ${idx === 0 ? 'rotate-12' : '-rotate-12'} group-hover:scale-110`}>
                  <pillar.icon className={`w-36 h-36 ${pillar.color === 'cyan' ? 'text-cyan-400' : 'text-purple-400'}`} />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div 
                      animate={{ 
                        scale: hoveredPillar === idx ? 1.15 : 1,
                        rotate: hoveredPillar === idx ? 360 : 0
                      }}
                      transition={{ duration: 0.6, type: "spring" }}
                      className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                        pillar.color === 'cyan' ? 'bg-cyan-500/10 border border-cyan-500/20' : 'bg-purple-500/10 border border-purple-500/20'
                      }`}
                    >
                      <pillar.icon className={`w-5 h-5 ${pillar.color === 'cyan' ? 'text-cyan-400' : 'text-purple-400'}`} />
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{pillar.title}</h3>
                      <p className={`text-xs font-medium uppercase tracking-wider ${pillar.color === 'cyan' ? 'text-cyan-400' : 'text-purple-400'}`}>
                        {pillar.subtitle}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {pillar.items.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + (i * 0.05), duration: 0.4 }}
                        className="flex items-start gap-2 group/item"
                      >
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center mt-0.5 ${
                          pillar.color === 'cyan' ? 'bg-cyan-500/10 border border-cyan-500/20' : 'bg-purple-500/10 border border-purple-500/20'
                        } group-hover/item:scale-110 transition-transform`}>
                          <CheckCircle className={`w-2.5 h-2.5 ${pillar.color === 'cyan' ? 'text-cyan-400' : 'text-purple-400'}`} />
                        </div>
                        <span className="text-xs text-slate-300 group-hover/item:text-white transition-colors">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          ))}
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
            className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-cyan-600/20 to-purple-600/20 backdrop-blur-xl border border-cyan-500/30 rounded-full hover:border-cyan-500/50 transition-all duration-300 cursor-pointer"
          >
            <Gauge className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-medium text-white">Like a fractional engineering and data team for your Insights product.</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

// Slide 6 - ROAS First Pilot
const Slide6: React.FC<SlideProps> = () => {
  return (
    <div className="h-[calc(100vh-70px)] md:h-[calc(100vh-100px)] flex items-start md:items-center justify-center px-3 md:px-6 pt-2 md:pt-8 pb-20 md:pb-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-2 md:mb-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-1 md:mb-3 tracking-tight px-2"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">ROAS First</span> Pilot
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[9px] sm:text-xs md:text-base text-slate-400 max-w-2xl mx-auto px-2 hidden sm:block"
          >
            Prove the value quickly, tied directly to the metric that matters.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8 mb-3 md:mb-8 relative">
          {/* Connecting Arrow (Desktop) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block">
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="w-12 h-12 bg-slate-900 border border-slate-700 rounded-full flex items-center justify-center shadow-xl"
            >
              <ArrowRight className="w-6 h-6 text-emerald-400" />
            </motion.div>
          </div>

          {/* Pilot Focus */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            className="group relative bg-gradient-to-br from-blue-500/5 to-cyan-500/5 backdrop-blur-xl border border-blue-500/20 rounded-xl md:rounded-3xl p-3 md:p-8 hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500"
          >
            <div className="hidden md:block absolute top-0 right-0 p-3 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500 transform rotate-12 group-hover:scale-110">
              <Target className="w-32 h-32 text-blue-400" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 md:gap-4 mb-2 md:mb-6">
                <div className="w-8 md:w-12 h-8 md:h-12 bg-blue-500/10 rounded-lg md:rounded-2xl flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-4 md:w-6 h-4 md:h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-sm md:text-xl font-bold text-white">Pilot Focus</h3>
                  <p className="text-[9px] md:text-xs text-blue-400 font-medium uppercase tracking-wider">The Input</p>
                </div>
              </div>
              
              <ul className="space-y-1.5 md:space-y-4">
                {[
                  "One or two CPG partners selected with your team",
                  "Clearly defined media and promotion spend with your platform",
                  "Shared baseline metrics for ROAS, lift and engagement"
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + (i * 0.1), duration: 0.4 }}
                    className="flex items-start gap-1.5 md:gap-3 group/item"
                  >
                    <div className="w-3.5 md:w-5 h-3.5 md:h-5 rounded-full bg-blue-500/10 flex items-center justify-center mt-0.5 border border-blue-500/20 group-hover/item:bg-blue-500/20 transition-colors flex-shrink-0">
                      <CheckCircle className="w-2 md:w-3 h-2 md:h-3 text-blue-400" />
                    </div>
                    <span className="text-[11px] md:text-sm text-slate-300 group-hover/item:text-white transition-colors leading-tight">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* What the Pilot Delivers */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            className="group relative bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 backdrop-blur-xl border border-emerald-500/20 rounded-xl md:rounded-3xl p-3 md:p-8 hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500"
          >
            <div className="hidden md:block absolute top-0 right-0 p-3 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500 transform -rotate-12 group-hover:scale-110">
              <Rocket className="w-32 h-32 text-emerald-400" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 md:gap-4 mb-2 md:mb-6">
                <div className="w-8 md:w-12 h-8 md:h-12 bg-emerald-500/10 rounded-lg md:rounded-2xl flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
                  <Rocket className="w-4 md:w-6 h-4 md:h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-sm md:text-xl font-bold text-white">Outcomes</h3>
                  <p className="text-[9px] md:text-xs text-emerald-400 font-medium uppercase tracking-wider">The Output</p>
                </div>
              </div>

              <div className="space-y-2 md:space-y-6">
                <div className="bg-white/5 rounded-lg md:rounded-xl p-2 md:p-4 border border-white/5">
                  <p className="text-[9px] md:text-xs font-bold text-slate-300 mb-1.5 md:mb-3 uppercase tracking-wider">Always on answers to:</p>
                  <ul className="space-y-1 md:space-y-2">
                    {[
                      "Which promotions drive incremental sales?",
                      "Where to shift spend by region & channel?",
                      "Which products create the strongest lift?"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-xs text-emerald-100 leading-tight">
                        <div className="w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="space-y-1.5 md:space-y-3">
                  {[
                    "Clear before/after ROAS view on campaigns",
                    "Executive summary deck for brand leadership"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 md:gap-3 group/item">
                      <div className="w-4 md:w-5 h-4 md:h-5 rounded-full bg-emerald-500/10 flex items-center justify-center mt-0.5 border border-emerald-500/20 group-hover/item:bg-emerald-500/20 transition-colors flex-shrink-0">
                        <Award className="w-2.5 md:w-3 h-2.5 md:h-3 text-emerald-400" />
                      </div>
                      <span className="text-[11px] md:text-sm text-slate-300 group-hover/item:text-white transition-colors leading-tight">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
          className="relative overflow-hidden bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-emerald-500/10 backdrop-blur-xl border border-emerald-500/20 rounded-xl md:rounded-2xl p-3 md:p-6 text-center hover:border-emerald-500/40 transition-all duration-500 cursor-default"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] animate-shimmer" />
          <p className="text-xs md:text-base font-medium text-white relative z-10 leading-tight md:leading-normal">
            If the pilot proves higher ROAS, the Insights product scales across your CPG portfolio.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

// Slide 7 - RAG Case Study (Vigilant)
const Slide7: React.FC<SlideProps> = () => {
  return (
    <div className="h-[calc(100vh-70px)] md:h-[calc(100vh-100px)] flex items-start md:items-center justify-center px-3 md:px-6 pt-8 md:pt-4 pb-16 md:pb-4 overflow-y-auto">
      <div className="max-w-5xl mx-auto w-full">
        {/* Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-4 md:mb-6"
        >
          <span className="inline-flex items-center gap-2 px-3 md:px-4 py-1 md:py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-[10px] md:text-xs font-medium text-cyan-400 uppercase tracking-wider">
            <BarChart3 className="w-3 h-3" />
            FWAIP Case Study
          </span>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative bg-gradient-to-br from-cyan-500/5 to-blue-500/5 backdrop-blur-xl border border-cyan-500/20 rounded-2xl md:rounded-3xl p-4 md:p-8 overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10">
            {/* Logo/Image area */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center mb-4 md:mb-6"
            >
              <div className="relative">
                <div className="w-20 h-20 md:w-28 md:h-28 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-2xl md:rounded-3xl flex items-center justify-center border border-cyan-500/30">
                  <Brain className="w-10 h-10 md:w-14 md:h-14 text-cyan-400" />
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center"
                >
                  <Sparkles className="w-3 h-3 text-white" />
                </motion.div>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl sm:text-2xl md:text-4xl font-bold text-white text-center mb-2 md:mb-4"
            >
              Vigilant – <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">In-App RAG Safety Assistant</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-sm md:text-lg text-slate-300 text-center max-w-3xl mx-auto mb-6 md:mb-8 leading-relaxed"
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
              <div className="relative bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 rounded-xl md:rounded-2xl p-4 md:p-6 max-w-md w-full">
                <div className="absolute top-3 left-3">
                  <Zap className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
                </div>
                <div className="text-center pt-2">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.7, type: "spring" }}
                    className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2"
                  >
                    65%
                  </motion.div>
                  <p className="text-xs md:text-sm text-slate-400">
                    faster access to personalized safety intelligence
                  </p>
                  <p className="text-[10px] md:text-xs text-slate-500 mt-1">
                    vs static content search
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Slide 8 - Data Cleanup Case Study
const Slide8: React.FC<SlideProps> = () => {
  return (
    <div className="h-[calc(100vh-70px)] md:h-[calc(100vh-100px)] flex items-start md:items-center justify-center px-3 md:px-6 pt-8 md:pt-4 pb-16 md:pb-4 overflow-y-auto">
      <div className="max-w-5xl mx-auto w-full">
        {/* Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-4 md:mb-6"
        >
          <span className="inline-flex items-center gap-2 px-3 md:px-4 py-1 md:py-1.5 bg-purple-500/10 border border-purple-500/30 rounded-full text-[10px] md:text-xs font-medium text-purple-400 uppercase tracking-wider">
            <Database className="w-3 h-3" />
            FWAIP Case Study
          </span>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative bg-gradient-to-br from-purple-500/5 to-pink-500/5 backdrop-blur-xl border border-purple-500/20 rounded-2xl md:rounded-3xl p-4 md:p-8 overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10">
            {/* Logo/Image area */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center mb-4 md:mb-6"
            >
              <div className="relative">
                <div className="w-20 h-20 md:w-28 md:h-28 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-2xl md:rounded-3xl flex items-center justify-center border border-purple-500/30">
                  <Database className="w-10 h-10 md:w-14 md:h-14 text-purple-400" />
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center"
                >
                  <Sparkles className="w-3 h-3 text-white" />
                </motion.div>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl sm:text-2xl md:text-4xl font-bold text-white text-center mb-2 md:mb-4"
            >
              Turning 19 Years of Legacy Data Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">AI-Ready Customer Intelligence</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-sm md:text-lg text-slate-300 text-center max-w-3xl mx-auto mb-6 md:mb-8 leading-relaxed"
            >
              Transforming decades of accumulated customer data into structured, actionable intelligence ready for AI-powered insights and automation.
            </motion.p>

            {/* Key Stat */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex justify-center"
            >
              <div className="relative bg-gradient-to-br from-purple-500/10 to-pink-600/10 border border-purple-500/30 rounded-xl md:rounded-2xl p-4 md:p-6 max-w-md w-full">
                <div className="absolute top-3 left-3">
                  <Clock className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
                </div>
                <div className="text-center pt-2">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.7, type: "spring" }}
                    className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-2"
                  >
                    2.5 Weeks
                  </motion.div>
                  <p className="text-xs md:text-sm text-slate-400">
                    to complete full data transformation
                  </p>
                  <p className="text-[10px] md:text-xs text-slate-500 mt-1">
                    vs 6+ months of manual work
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Case Study Modal Component
const CaseStudyModal = ({ isOpen, onClose, caseStudy }: { isOpen: boolean; onClose: () => void; caseStudy: 'vigilant' | 'reconciliation' | null }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
    }
  }, [isOpen, caseStudy]);

  if (!caseStudy) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-2 md:p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-6xl h-[90vh] md:h-[85vh] pointer-events-auto"
            >
              <div className="relative bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-2xl border border-cyan-500/30 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl shadow-cyan-500/20 h-full flex flex-col">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-3 md:top-4 right-3 md:right-4 z-10 p-1.5 md:p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 group"
                >
                  <X className="w-4 md:w-5 h-4 md:h-5 text-slate-400 group-hover:text-white transition-colors" />
                </button>

                {/* Header */}
                <div className="p-4 md:p-6 border-b border-white/10">
                  <h3 className="text-lg md:text-2xl font-bold text-white">
                    {caseStudy === 'vigilant' ? 'Vigilant' : 'Data Reconciliation'} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Case Study</span>
                  </h3>
                  <p className="text-xs md:text-sm text-slate-400 mt-1">Scroll to explore the full case study</p>
                </div>

                {/* iFrame Container */}
                <div className="flex-1 relative bg-white/5">
                  {/* Loading Indicator */}
                  <AnimatePresence>
                    {isLoading && (
                      <motion.div 
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm pointer-events-none z-10"
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* iFrame */}
                  <iframe
                    src={caseStudy === 'vigilant' 
                      ? 'https://shooflyai.com/vigilant-case-study' 
                      : 'https://shooflyai.com/data-reconciliation-case-study'}
                    className="w-full h-full border-0"
                    title={caseStudy === 'vigilant' ? 'Vigilant Case Study' : 'Data Reconciliation Case Study'}
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    onLoad={() => setIsLoading(false)}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

// Slide 9 - About Flywheel AI Partners
const Slide9: React.FC<SlideProps> = () => {
  const [selectedCase, setSelectedCase] = useState<'vigilant' | 'reconciliation' | null>(null);

  return (
    <>
      <CaseStudyModal 
        isOpen={selectedCase !== null} 
        onClose={() => setSelectedCase(null)} 
        caseStudy={selectedCase}
      />

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
                <h3 className="text-sm md:text-base font-bold text-white mb-1 md:mb-2">Who We Are</h3>
                <p className="text-[10px] md:text-xs text-slate-400 leading-snug md:leading-relaxed">
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
                <h3 className="text-sm md:text-base font-bold text-white mb-1 md:mb-2">How We Work</h3>
                <div className="space-y-1 md:space-y-2">
                  {[
                    { title: "Ownership First", icon: "🔒" },
                    { title: "ROI in Weeks", icon: "⚡" },
                    { title: "Partner to Your Team", icon: "🤝" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5 md:gap-2">
                      <span className="text-sm md:text-base">{item.icon}</span>
                      <span className="text-[10px] md:text-xs text-slate-300">{item.title}</span>
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
                <h3 className="text-sm md:text-base font-bold text-white mb-1 md:mb-2">Why It Matters</h3>
                <p className="text-[10px] md:text-xs text-slate-400 leading-snug md:leading-relaxed">
                  Accelerates time to market while creating a defensible, high-margin business line that positions you as a predictive partner to enterprise brands.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Case Studies Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mb-4"
          >
            <h3 className="text-center text-[10px] md:text-xs font-bold text-white mb-2 md:mb-3 uppercase tracking-wider">See Our Work in Action</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Vigilant Case Study */}
              <motion.button
                onClick={() => setSelectedCase('vigilant')}
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="group relative bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-5 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 text-left overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-2 opacity-5 group-hover:opacity-10 transition-opacity">
                  <BarChart3 className="w-16 h-16 text-cyan-400" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-base font-bold text-white">Vigilant Case Study</h4>
                    <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-xs text-slate-400 mb-2">AI-powered operational intelligence system delivering real-time insights.</p>
                  <div className="inline-flex items-center gap-2 text-[10px] font-medium text-cyan-400">
                    <span>View Full Case Study</span>
                  </div>
                </div>
              </motion.button>

              {/* Data Reconciliation Case Study */}
              <motion.button
                onClick={() => setSelectedCase('reconciliation')}
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="group relative bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-5 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 text-left overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-2 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Database className="w-16 h-16 text-purple-400" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-base font-bold text-white">Data Reconciliation</h4>
                    <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-xs text-slate-400 mb-2">Automated multi-source data reconciliation reducing manual work by 90%.</p>
                  <div className="inline-flex items-center gap-2 text-[10px] font-medium text-purple-400">
                    <span>View Full Case Study</span>
                  </div>
                </div>
              </motion.button>
            </div>
          </motion.div>

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
    </>
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

  const SlideComponents = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7, Slide8, Slide9];

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
