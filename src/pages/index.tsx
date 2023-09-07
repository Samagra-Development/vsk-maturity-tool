import AnimatedText from '@/components/AnimatedText';
import useMobile from '@/hooks/useMobile';
import styles from '@/styles/Home.module.css'
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


export default function Home() {
  const [visible, setVisible] = useState(true);
  const router = useRouter();
  const isMobile = useMobile();

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 1.5 },
    },
  };

  useEffect(() => {
    setTimeout(() => setVisible(false), 3300)
    setTimeout(() => { router.push('/landing') }, 4000)
  }, [])

  return (
    <>
      <div className={styles.root}>
        {isMobile ? <AnimatePresence>
          {visible && <motion.div
            exit={{ opacity: 0 }}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <AnimatedText text="Vidya" customStyle={{ marginBottom: '1.5rem' }} stagger={0.1} />
            <AnimatedText text="Samiksha" customStyle={{ marginBottom: '1.5rem' }} stagger={0.1} />
            <AnimatedText text="Kendra" customStyle={{ marginBottom: '1.5rem' }} stagger={0.1} />
          </motion.div>}
        </AnimatePresence> :
          <AnimatePresence>
            {visible && <motion.div
              exit={{ opacity: 0 }}
            >
              <AnimatedText text="Vidya Samiksha Kendra" />
            </motion.div>}
          </AnimatePresence>
        }

        <AnimatePresence>
          {visible && <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
          >Maturity Evaluation Tool</motion.div>}
        </AnimatePresence>
      </div>
    </>
  )
}
