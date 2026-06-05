import { motion } from "framer-motion";
import { ArrowLeft, Award, Star, Download, Share2, BadgeCheck } from "lucide-react";

const CertificateScreen = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Radial glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gold/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <button onClick={onBack} className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-semibold text-foreground">Your Certificate</span>
          <div className="w-5" />
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 relative z-10 pb-10">
        {/* Badge */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
          className="text-center mt-2"
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-gold/20 to-gold/5 border-2 border-gold/30 flex items-center justify-center mb-4">
            <Award className="w-10 h-10 text-gold" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-6"
        >
          <h1 className="text-2xl font-display font-bold text-foreground">
            Certificate of Completion
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Awarded by Interview Kickstart
          </p>
        </motion.div>

        {/* Certificate Card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 100, damping: 20 }}
          className="relative"
        >
          {/* Decorative border frame */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/30 via-gold/10 to-gold/30 p-[1.5px]">
            <div className="w-full h-full rounded-2xl bg-card" />
          </div>

          {/* Inner decorative corners */}
          <div className="relative rounded-2xl bg-card border border-gold/20 p-6 overflow-hidden">
            {/* Corner ornaments */}
            <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-gold/40 rounded-tl-sm" />
            <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-gold/40 rounded-tr-sm" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-gold/40 rounded-bl-sm" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-gold/40 rounded-br-sm" />

            {/* Certificate content */}
            <div className="text-center pt-4 pb-2">
              {/* Seal */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
                className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/30 flex items-center justify-center mb-4"
              >
                <BadgeCheck className="w-8 h-8 text-gold" />
              </motion.div>

              <p className="text-xs font-semibold text-gold tracking-[0.2em] uppercase mb-2">
                This certifies that
              </p>

              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
                className="text-2xl font-display font-bold text-foreground mb-2"
              >
                Alex Johnson
              </motion.h2>

              <div className="w-16 h-[1px] bg-gold/40 mx-auto mb-3" />

              <p className="text-xs text-muted-foreground leading-relaxed mb-1">
                has successfully completed
              </p>
              <p className="text-lg font-display font-bold text-primary mb-1">
                Statistics Foundations
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                with 94% overall accuracy
              </p>

              {/* Star rating */}
              <div className="flex justify-center gap-1 mb-4">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 1.2 + i * 0.15, type: "spring", stiffness: 300 }}
                  >
                    <Star className="w-6 h-6 fill-gold text-gold drop-shadow-md" />
                  </motion.div>
                ))}
              </div>

              {/* Course details */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-secondary/50 rounded-lg p-3">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Modules</p>
                  <p className="text-sm font-display font-bold text-foreground">5/5</p>
                </div>
                <div className="bg-secondary/50 rounded-lg p-3">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Total XP</p>
                  <p className="text-sm font-display font-bold text-xp">12,480</p>
                </div>
                <div className="bg-secondary/50 rounded-lg p-3">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Time</p>
                  <p className="text-sm font-display font-bold text-foreground">18h 42m</p>
                </div>
                <div className="bg-secondary/50 rounded-lg p-3">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Best Streak</p>
                  <p className="text-sm font-display font-bold text-streak">21 days</p>
                </div>
              </div>

              {/* Date & ID */}
              <div className="border-t border-border pt-3">
                <p className="text-xs text-muted-foreground">
                  Completed on <span className="text-foreground font-medium">June 5, 2026</span>
                </p>
                <p className="text-[10px] text-muted-foreground/60 mt-1 font-mono">
                  CERT-ID: ML-SF-2026-0605-AJ
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Verified badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground"
        >
          <BadgeCheck className="w-4 h-4 text-primary" />
          <span>Verified by Interview Kickstart</span>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7 }}
          className="mt-6 space-y-3"
        >
          <button className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-display font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
            <Download className="w-4 h-4" />
            Download Certificate
          </button>
          <button className="w-full py-3 rounded-xl bg-secondary text-foreground font-medium text-sm flex items-center justify-center gap-2 hover:bg-secondary/80 transition-colors">
            <Share2 className="w-4 h-4" />
            Share Achievement
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default CertificateScreen;
