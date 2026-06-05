import { motion } from "framer-motion";
import { ArrowLeft, Award, Download, BadgeCheck } from "lucide-react";
import certificateAsset from "@/assets/certificate_test.jpg.asset.json";


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

        {/* Certificate Image */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 100, damping: 20 }}
          className="relative rounded-2xl overflow-hidden border border-gold/20 shadow-2xl bg-white"
        >
          <img
            src={certificateAsset.url}
            alt="Certificate of Completion"
            className="w-full h-auto block"
          />
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
