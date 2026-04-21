import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Heart,
  Zap,
  Flame,
  Check,
  X,
  RotateCcw,
  Lightbulb,
  Sparkles,
} from "lucide-react";

interface TapAndBuildProps {
  onBack: () => void;
}

type Token = {
  id: string;
  label: string;
};

// The question: build the formula for the sample MEAN (central tendency)
// Sequence template — blanks are positions where the user must drop tokens.
// Final correct sequence: x̄  =  (1/n)  Σ  xᵢ
const SEQUENCE: Array<{ id: string; type: "fixed" | "blank"; label?: string; answerId?: string }> = [
  { id: "s1", type: "fixed", label: "x̄" },
  { id: "s2", type: "fixed", label: "=" },
  { id: "b1", type: "blank", answerId: "t-frac" },
  { id: "b2", type: "blank", answerId: "t-sigma" },
  { id: "b3", type: "blank", answerId: "t-xi" },
];

const OPTIONS: Token[] = [
  { id: "t-frac", label: "1 / n" },
  { id: "t-sigma", label: "Σ" },
  { id: "t-xi", label: "xᵢ" },
  { id: "t-n", label: "n" },
  { id: "t-mu", label: "μ" },
  { id: "t-sq", label: "( xᵢ − x̄ )²" },
];

const TapAndBuild = ({ onBack }: TapAndBuildProps) => {
  const blanks = useMemo(() => SEQUENCE.filter((s) => s.type === "blank"), []);
  const [placed, setPlaced] = useState<Record<string, string | null>>(
    Object.fromEntries(blanks.map((b) => [b.id, null])),
  );
  const [usedTokenIds, setUsedTokenIds] = useState<Set<string>>(new Set());
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [hearts, setHearts] = useState(5);
  const [showHint, setShowHint] = useState(false);

  const nextBlankId = useMemo(
    () => blanks.find((b) => placed[b.id] === null)?.id ?? null,
    [blanks, placed],
  );

  const allFilled = nextBlankId === null;

  const handleTapOption = (token: Token) => {
    if (status === "correct") return;
    if (usedTokenIds.has(token.id)) return;
    if (!nextBlankId) return;

    setPlaced((p) => ({ ...p, [nextBlankId]: token.id }));
    setUsedTokenIds((s) => new Set(s).add(token.id));
    if (status === "wrong") setStatus("idle");
  };

  const handleRemove = (blankId: string) => {
    if (status === "correct") return;
    const tokenId = placed[blankId];
    if (!tokenId) return;
    setPlaced((p) => ({ ...p, [blankId]: null }));
    setUsedTokenIds((s) => {
      const next = new Set(s);
      next.delete(tokenId);
      return next;
    });
    if (status === "wrong") setStatus("idle");
  };

  const handleCheck = () => {
    const isCorrect = blanks.every((b) => placed[b.id] === b.answerId);
    if (isCorrect) {
      setStatus("correct");
    } else {
      setStatus("wrong");
      setHearts((h) => Math.max(0, h - 1));
    }
  };

  const handleReset = () => {
    setPlaced(Object.fromEntries(blanks.map((b) => [b.id, null])));
    setUsedTokenIds(new Set());
    setStatus("idle");
  };

  const tokenLabel = (id: string | null) =>
    OPTIONS.find((o) => o.id === id)?.label ?? "";

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-md mx-auto px-5 pt-6 pb-32">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center hover:border-primary/30 transition-colors"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border">
              <Flame className="w-4 h-4 text-streak" />
              <span className="text-sm font-display font-bold text-foreground">7</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border">
              <Heart className="w-4 h-4 text-hearts fill-hearts" />
              <span className="text-sm font-display font-bold text-foreground">{hearts}</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span>Question 4 of 10</span>
            <span className="font-display font-bold text-primary">+25 XP</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "40%" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
            />
          </div>
        </div>

        {/* Question header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-accent/15 border border-accent/20 mb-3">
            <Sparkles className="w-3 h-3 text-accent" />
            <span className="text-[10px] font-display font-bold uppercase tracking-wider text-accent">
              Tap & Build
            </span>
          </div>
          <h1 className="text-xl font-display font-bold text-foreground leading-snug">
            Build the formula for the{" "}
            <span className="text-primary">sample mean</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1.5">
            Tap the tokens below to fill the blanks in order.
          </p>
        </motion.div>

        {/* Sequence builder card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className={`rounded-2xl border bg-card p-6 mb-6 transition-colors ${
            status === "correct"
              ? "border-primary/50 shadow-[0_0_30px_-5px_hsl(var(--primary)/0.4)]"
              : status === "wrong"
                ? "border-destructive/50"
                : "border-border"
          }`}
        >
          <div className="flex flex-wrap items-center justify-center gap-2 min-h-[80px]">
            {SEQUENCE.map((slot) => {
              if (slot.type === "fixed") {
                return (
                  <div
                    key={slot.id}
                    className="text-2xl font-display font-bold text-foreground px-1"
                  >
                    {slot.label}
                  </div>
                );
              }

              const tokenId = placed[slot.id];
              const isActive = nextBlankId === slot.id && status !== "correct";
              const isCorrectSlot =
                status === "correct" || (status === "wrong" && tokenId === slot.answerId);

              return (
                <button
                  key={slot.id}
                  onClick={() => handleRemove(slot.id)}
                  disabled={!tokenId || status === "correct"}
                  className={`min-w-[64px] h-12 px-3 rounded-xl border-2 border-dashed flex items-center justify-center text-base font-display font-semibold transition-all ${
                    tokenId
                      ? isCorrectSlot
                        ? "border-solid border-primary/60 bg-primary/10 text-foreground"
                        : status === "wrong"
                          ? "border-solid border-destructive/60 bg-destructive/10 text-foreground"
                          : "border-solid border-accent/50 bg-accent/10 text-foreground hover:bg-accent/15"
                      : isActive
                        ? "border-primary/60 bg-primary/5 text-muted-foreground animate-pulse-glow"
                        : "border-border bg-secondary/30 text-muted-foreground"
                  }`}
                >
                  {tokenId ? tokenLabel(tokenId) : "___"}
                </button>
              );
            })}
          </div>

          {/* Hint */}
          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-4 p-3 rounded-xl bg-secondary/50 border border-border text-xs text-muted-foreground">
                  💡 The mean is the sum of all values, divided by the count{" "}
                  <span className="text-foreground font-semibold">n</span>.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Options */}
        <div className="mb-6">
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-display font-bold mb-3">
            Tap to place
          </p>
          <div className="flex flex-wrap gap-2.5">
            {OPTIONS.map((token) => {
              const used = usedTokenIds.has(token.id);
              return (
                <motion.button
                  key={token.id}
                  whileHover={{ scale: used ? 1 : 1.04 }}
                  whileTap={{ scale: used ? 1 : 0.94 }}
                  onClick={() => handleTapOption(token)}
                  disabled={used || status === "correct"}
                  className={`px-4 h-12 rounded-xl font-display font-semibold text-base border transition-all ${
                    used
                      ? "bg-secondary/40 border-border text-muted-foreground/40 cursor-not-allowed"
                      : "bg-card border-border text-foreground hover:border-primary/40 hover:bg-primary/5 shadow-[0_2px_0_0_hsl(var(--border))] active:translate-y-0.5 active:shadow-none"
                  }`}
                >
                  {token.label}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Feedback banner */}
        <AnimatePresence mode="wait">
          {status === "correct" && (
            <motion.div
              key="correct"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl bg-primary/15 border border-primary/30 p-4 mb-4 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Check className="w-5 h-5 text-primary-foreground" strokeWidth={3} />
              </div>
              <div>
                <p className="font-display font-bold text-foreground">Nice build!</p>
                <p className="text-xs text-muted-foreground">
                  x̄ = (1/n) · Σ xᵢ — that's the sample mean.
                </p>
              </div>
            </motion.div>
          )}
          {status === "wrong" && (
            <motion.div
              key="wrong"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl bg-destructive/15 border border-destructive/30 p-4 mb-4 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-destructive flex items-center justify-center">
                <X className="w-5 h-5 text-destructive-foreground" strokeWidth={3} />
              </div>
              <div>
                <p className="font-display font-bold text-foreground">Not quite</p>
                <p className="text-xs text-muted-foreground">
                  Tap a placed token to remove it, then try a different order.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom action bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border">
        <div className="max-w-md mx-auto px-5 py-4 flex items-center gap-3">
          <button
            onClick={() => setShowHint((s) => !s)}
            className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center hover:border-streak/40 transition-colors"
            aria-label="Hint"
          >
            <Lightbulb className="w-5 h-5 text-streak" />
          </button>
          <button
            onClick={handleReset}
            className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center hover:border-muted-foreground/40 transition-colors"
            aria-label="Reset"
          >
            <RotateCcw className="w-5 h-5 text-muted-foreground" />
          </button>

          {status === "correct" ? (
            <motion.button
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              onClick={onBack}
              className="flex-1 h-12 rounded-xl bg-primary text-primary-foreground font-display font-bold flex items-center justify-center gap-2 shadow-[0_4px_0_0_hsl(160_70%_30%)] active:translate-y-0.5 active:shadow-[0_2px_0_0_hsl(160_70%_30%)] transition-all"
            >
              <Zap className="w-4 h-4" />
              Continue
            </motion.button>
          ) : (
            <button
              onClick={handleCheck}
              disabled={!allFilled}
              className={`flex-1 h-12 rounded-xl font-display font-bold transition-all ${
                allFilled
                  ? "bg-primary text-primary-foreground shadow-[0_4px_0_0_hsl(160_70%_30%)] active:translate-y-0.5 active:shadow-[0_2px_0_0_hsl(160_70%_30%)]"
                  : "bg-secondary text-muted-foreground cursor-not-allowed"
              }`}
            >
              Check
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TapAndBuild;
