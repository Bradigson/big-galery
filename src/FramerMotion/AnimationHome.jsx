
import { motion } from 'framer-motion';

const animations = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 10 },
};

const AnimatedHome = ({ children }) => {
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: .5 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedHome;