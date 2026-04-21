import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, PartyPopper, Zap, Heart, Hand } from "lucide-react";
import WeeklyLeaderboard from "@/components/WeeklyLeaderboard";
import GameCompletion from "@/components/GameCompletion";
import TapAndBuild from "@/components/TapAndBuild";

type Screen = "home" | "leaderboard" | "completion" | "tapbuild";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("home");

  if (screen === "leaderboard") return <WeeklyLeaderboard onBack={() => setScreen("home")} />;
  if (screen === "completion") return <GameCompletion onBack={() => setScreen("home")} />;
  if (screen === "tapbuild") return <TapAndBuild onBack={() => setScreen("home")} />;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center relative z-10 max-w-md w-full"
      >
        {/* Logo */}
        <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
          <Zap className="w-8 h-8 text-primary" />
        </div>

        <h1 className="text-3xl font-display font-bold text-foreground mb-2">
          ML Game Screens
        </h1>
        <p className="text-muted-foreground text-sm mb-10">
          Preview the Weekly Leaderboard & Game Completion designs
        </p>

        {/* Navigation Buttons */}
        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setScreen("leaderboard")}
            className="w-full p-5 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-xl bg-gold/15 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-gold" />
            </div>
            <div className="text-left flex-1">
              <p className="font-display font-bold text-foreground group-hover:text-primary transition-colors">
                Weekly Leaderboard
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">Rankings, XP scores & streaks</p>
            </div>
            <div className="text-muted-foreground group-hover:text-primary transition-colors">→</div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setScreen("completion")}
            className="w-full p-5 rounded-2xl bg-card border border-border hover:border-accent/30 transition-all flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center">
              <PartyPopper className="w-6 h-6 text-accent" />
            </div>
            <div className="text-left flex-1">
              <p className="font-display font-bold text-foreground group-hover:text-accent transition-colors">
                Course Completion
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">Congratulations & certificate</p>
            </div>
            <div className="text-muted-foreground group-hover:text-accent transition-colors">→</div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setScreen("tapbuild")}
            className="w-full p-5 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center">
              <Hand className="w-6 h-6 text-primary" />
            </div>
            <div className="text-left flex-1">
              <p className="font-display font-bold text-foreground group-hover:text-primary transition-colors">
                Tap & Build
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">Build the sequence by tapping options</p>
            </div>
            <div className="text-muted-foreground group-hover:text-primary transition-colors">→</div>
          </motion.button>
        </div>

        {/* Footer */}
        <div className="mt-10 flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 text-hearts" />
            <span>5/5</span>
          </div>
          <div className="flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-xp" />
            <span>3,540 XP</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
