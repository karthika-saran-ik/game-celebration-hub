import { motion } from "framer-motion";
import { ArrowLeft, Star, Zap, Clock, Target, Award, ChevronRight, BookOpen, Flame, GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";

const confettiColors = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#a855f7", "#06b6d4"];

const ConfettiPiece = ({ delay, color }: { delay: number; color: string }) => {
  const left = Math.random() * 100;
  const size = Math.random() * 8 + 4;
  const duration = Math.random() * 2 + 2;

  return (
    <div
      className="fixed top-0 animate-confetti pointer-events-none z-50"
      style={{
        left: `${left}%`,
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: Math.random() > 0.5 ? "50%" : "2px",
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    />
  );
};

const courseStats = [
  { icon: Target, label: "Overall Accuracy", value: "94%", color: "text-xp" },
  { icon: Zap, label: "Total XP", value: "12,480", color: "text-xp" },
  { icon: Clock, label: "Total Time", value: "18h 42m", color: "text-accent" },
  { icon: Flame, label: "Best Streak", value: "21 days", color: "text-streak" },
];

const completedModules = [
  { name: "Central Tendency", stars: 3, xp: 2850 },
  { name: "Dispersion", stars: 3, xp: 2640 },
  { name: "Covariance & Correlation", stars: 2, xp: 2310 },
  { name: "Point Estimates", stars: 3, xp: 2420 },
  { name: "Hypothesis Testing", stars: 3, xp: 2260 },
];

const GameCompletion = ({ onBack }: { onBack: () => void }) => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Confetti */}
      {showConfetti &&
        Array.from({ length: 60 }).map((_, i) => (
          <ConfettiPiece key={i} delay={Math.random() * 2} color={confettiColors[i % confettiColors.length]} />
        ))}

      {/* Radial glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 px-4 py-3">
        <div className="max-w-lg mx-auto">
          <button onClick={onBack} className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 relative z-10">
        {/* Trophy & Title */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          className="text-center mt-4"
        >
          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-yellow-400/20 to-yellow-600/10 border-2 border-yellow-500/30 flex items-center justify-center animate-pulse-glow mb-4">
            <span className="text-7xl animate-float">🎓</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <h1 className="text-3xl font-display font-bold text-foreground mb-1">
            Course Complete! 🎉
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            You've mastered <span className="text-primary font-semibold">Statistics Foundations</span> — all 5 modules done!
          </p>
        </motion.div>

        {/* Stars */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex justify-center gap-2 mt-5"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.8 + i * 0.2, type: "spring", stiffness: 300 }}
            >
              <Star className="w-10 h-10 fill-gold text-gold drop-shadow-lg" />
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="grid grid-cols-2 gap-3 mt-8"
        >
          {courseStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3 + i * 0.1 }}
              className="bg-card border border-border rounded-xl p-4 text-center"
            >
              <stat.icon className={`w-5 h-5 mx-auto mb-2 ${stat.color}`} />
              <p className="text-xl font-display font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Modules Completed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7 }}
          className="mt-6 p-4 rounded-2xl bg-card border border-border"
        >
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">Modules Completed</span>
            <span className="ml-auto text-xs text-primary font-bold font-display">5/5 ✓</span>
          </div>
          <div className="space-y-2">
            {completedModules.map((mod, i) => (
              <motion.div
                key={mod.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.8 + i * 0.08 }}
                className="flex items-center gap-3 py-2 px-3 rounded-lg bg-secondary/50"
              >
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-xs text-primary font-bold">✓</span>
                </div>
                <span className="text-sm text-foreground flex-1">{mod.name}</span>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 3 }).map((_, s) => (
                    <Star
                      key={s}
                      className={`w-3 h-3 ${s < mod.stars ? "fill-gold text-gold" : "text-muted-foreground/30"}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-xp font-display font-bold ml-2">{mod.xp}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certificate / Achievement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2 }}
          className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-gold/10 to-streak/10 border border-gold/20"
        >
          <p className="text-xs font-semibold text-gold mb-3 tracking-wide">🎖️ CERTIFICATE EARNED</p>
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-gold/20 flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-gold" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-foreground">Statistics Foundations Certificate</p>
              <p className="text-xs text-muted-foreground mt-0.5">Completed with 94% accuracy · 14 of 15 stars earned</p>
            </div>
          </div>
        </motion.div>

        {/* Level Up */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4 }}
          className="mt-4 p-4 rounded-2xl bg-card border border-border"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-accent" />
              <span className="text-sm font-semibold text-foreground">Final Level</span>
            </div>
            <span className="text-xs text-primary font-bold font-display">Level 12 — ML Pro</span>
          </div>
          <div className="h-3 bg-secondary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ delay: 2.6, duration: 1.2, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1.5 text-center">12,480 / 12,480 XP — Course Mastered! 🎯</p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8 }}
          className="mt-8 mb-10 space-y-3"
        >
          <button className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-display font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
            Share Certificate
            <ChevronRight className="w-4 h-4" />
          </button>
          <button className="w-full py-3 rounded-xl bg-secondary text-foreground font-medium text-sm hover:bg-secondary/80 transition-colors">
            Back to Learning Path
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default GameCompletion;
