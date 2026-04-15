import { motion } from "framer-motion";
import { Trophy, Flame, Zap, Crown, ArrowLeft } from "lucide-react";

const leaderboardData = [
  { rank: 1, name: "Priya Sharma", avatar: "PS", xp: 4820, streak: 14, level: "ML Pro", badge: "🏆" },
  { rank: 2, name: "Alex Chen", avatar: "AC", xp: 4350, streak: 12, level: "Data Wizard", badge: "🥈" },
  { rank: 3, name: "Maria Garcia", avatar: "MG", xp: 3980, streak: 9, level: "Stat Master", badge: "🥉" },
  { rank: 4, name: "You", avatar: "IK", xp: 3540, streak: 7, level: "Rising Star", badge: "⭐", isUser: true },
  { rank: 5, name: "James Wilson", avatar: "JW", xp: 3210, streak: 6, level: "Learner", badge: "" },
  { rank: 6, name: "Aisha Patel", avatar: "AP", xp: 2890, streak: 5, level: "Learner", badge: "" },
  { rank: 7, name: "Tom Li", avatar: "TL", xp: 2650, streak: 4, level: "Learner", badge: "" },
  { rank: 8, name: "Sara Kim", avatar: "SK", xp: 2410, streak: 3, level: "Learner", badge: "" },
];

const rankColors: Record<number, string> = {
  1: "from-yellow-500/20 to-yellow-600/5 border-yellow-500/40",
  2: "from-slate-300/15 to-slate-400/5 border-slate-400/30",
  3: "from-amber-700/15 to-amber-800/5 border-amber-700/30",
};

const WeeklyLeaderboard = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <button onClick={onBack} className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-display font-bold text-lg text-foreground">Weekly Leaderboard</h1>
          <div className="ml-auto text-xs text-muted-foreground font-medium px-3 py-1 rounded-full bg-secondary">
            Week 15 · Apr 2026
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Top 3 Podium */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-end justify-center gap-3 mb-8"
        >
          {/* 2nd Place */}
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-slate-400 to-slate-500 flex items-center justify-center text-sm font-bold text-background font-display">
              {leaderboardData[1].avatar}
            </div>
            <p className="text-xs text-muted-foreground mt-1 font-medium">{leaderboardData[1].name.split(" ")[0]}</p>
            <div className="mt-2 w-20 h-20 rounded-t-xl bg-gradient-to-t from-slate-500/20 to-slate-400/10 border border-slate-400/20 border-b-0 flex flex-col items-center justify-center">
              <span className="text-xl">🥈</span>
              <span className="text-xs font-bold text-silver font-display">{leaderboardData[1].xp} XP</span>
            </div>
          </div>

          {/* 1st Place */}
          <div className="flex flex-col items-center -mt-4">
            <Crown className="w-6 h-6 text-gold mb-1 animate-float" />
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-sm font-bold text-background font-display ring-2 ring-yellow-400/50 animate-pulse-glow">
              {leaderboardData[0].avatar}
            </div>
            <p className="text-xs text-foreground mt-1 font-bold">{leaderboardData[0].name.split(" ")[0]}</p>
            <div className="mt-2 w-24 h-28 rounded-t-xl bg-gradient-to-t from-yellow-500/20 to-yellow-400/10 border border-yellow-500/30 border-b-0 flex flex-col items-center justify-center">
              <span className="text-2xl">🏆</span>
              <span className="text-sm font-bold text-gold font-display">{leaderboardData[0].xp} XP</span>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center text-sm font-bold text-foreground font-display">
              {leaderboardData[2].avatar}
            </div>
            <p className="text-xs text-muted-foreground mt-1 font-medium">{leaderboardData[2].name.split(" ")[0]}</p>
            <div className="mt-2 w-20 h-16 rounded-t-xl bg-gradient-to-t from-amber-700/20 to-amber-700/10 border border-amber-700/20 border-b-0 flex flex-col items-center justify-center">
              <span className="text-xl">🥉</span>
              <span className="text-xs font-bold text-bronze font-display">{leaderboardData[2].xp} XP</span>
            </div>
          </div>
        </motion.div>

        {/* Rankings List */}
        <div className="space-y-2">
          {leaderboardData.map((player, i) => (
            <motion.div
              key={player.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                player.isUser
                  ? "bg-primary/10 border-primary/30 ring-1 ring-primary/20"
                  : rankColors[player.rank] 
                    ? `bg-gradient-to-r ${rankColors[player.rank]}`
                    : "bg-card border-border hover:border-muted-foreground/20"
              }`}
            >
              {/* Rank */}
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-display font-bold text-sm ${
                player.rank === 1 ? "bg-gold/20 text-gold" :
                player.rank === 2 ? "bg-silver/20 text-silver" :
                player.rank === 3 ? "bg-bronze/20 text-bronze" :
                "bg-secondary text-muted-foreground"
              }`}>
                {player.rank}
              </div>

              {/* Avatar */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold font-display ${
                player.isUser
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground"
              }`}>
                {player.avatar}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className={`text-sm font-semibold truncate ${player.isUser ? "text-primary" : "text-foreground"}`}>
                    {player.name}
                  </p>
                  {player.badge && <span className="text-sm">{player.badge}</span>}
                </div>
                <p className="text-xs text-muted-foreground">{player.level}</p>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1 text-streak">
                  <Flame className="w-3.5 h-3.5" />
                  <span className="font-bold">{player.streak}</span>
                </div>
                <div className="flex items-center gap-1 text-xp font-display font-bold">
                  <Zap className="w-3.5 h-3.5" />
                  <span>{player.xp}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Your Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20"
        >
          <p className="text-xs text-muted-foreground font-medium mb-2">YOUR WEEKLY STATS</p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xl font-bold font-display text-foreground">3,540</p>
              <p className="text-xs text-muted-foreground">XP Earned</p>
            </div>
            <div>
              <p className="text-xl font-bold font-display text-streak">7 🔥</p>
              <p className="text-xs text-muted-foreground">Day Streak</p>
            </div>
            <div>
              <p className="text-xl font-bold font-display text-foreground">#4</p>
              <p className="text-xs text-muted-foreground">Rank</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WeeklyLeaderboard;
