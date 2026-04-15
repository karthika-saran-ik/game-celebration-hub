import { motion } from "framer-motion";
import { ArrowLeft, Star, Zap, Clock, Target, Award, ChevronRight } from "lucide-react";
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

const stats = [
  { icon: Target, label: "Accuracy", value: "92%", color: "text-xp" },
  { icon: Zap, label: "XP Earned", value: "+850", color: "text-xp" },
  { icon: Clock, label: "Time", value: "12m 34s", color: "text-accent" },
  { icon: Star, label: "Stars", value: "3/3", color: "text-gold" },
];

const GameCompletion = ({ onBack }: { onBack: () => void }) => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Confetti */}
      {showConfetti &&
        Array.from({ length: 50 }).map((_, i) => (
          <ConfettiPiece key={i} delay={Math.random() * 1.5} color={confettiColors[i % confettiColors.length]} />
        ))}

      {/* Radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

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
          className="text-center mt-6"
        >
          <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-yellow-400/20 to-yellow-600/10 border-2 border-yellow-500/30 flex items-center justify-center animate-pulse-glow mb-4">
            <span className="text-6xl animate-float">🏆</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <h1 className="text-3xl font-display font-bold text-foreground mb-1">
            Congratulations! 🎉
          </h1>
          <p className="text-muted-foreground text-sm">
            You've completed <span className="text-primary font-semibold">Central Tendency</span> module!
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
          {stats.map((stat, i) => (
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

        {/* XP Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="mt-6 p-4 rounded-2xl bg-card border border-border"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-accent" />
              <span className="text-sm font-semibold text-foreground">Level Progress</span>
            </div>
            <span className="text-xs text-primary font-bold font-display">Level 5 → 6</span>
          </div>
          <div className="h-3 bg-secondary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "45%" }}
              animate={{ width: "78%" }}
              transition={{ delay: 1.8, duration: 1, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-muted-foreground">3,540 XP</span>
            <span className="text-xs text-muted-foreground">5,000 XP</span>
          </div>
        </motion.div>

        {/* Achievements Unlocked */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-gold/10 to-streak/10 border border-gold/20"
        >
          <p className="text-xs font-semibold text-gold mb-3 tracking-wide">🎖️ ACHIEVEMENT UNLOCKED</p>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center text-2xl">
              📊
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-foreground">Central Tendency Master</p>
              <p className="text-xs text-muted-foreground">Complete all Mean, Median & Mode challenges</p>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2 }}
          className="mt-8 mb-10 space-y-3"
        >
          <button className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-display font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
            Next Module: Dispersion
            <ChevronRight className="w-4 h-4" />
          </button>
          <button className="w-full py-3 rounded-xl bg-secondary text-foreground font-medium text-sm hover:bg-secondary/80 transition-colors">
            Review Answers
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default GameCompletion;
