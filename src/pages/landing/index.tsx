import VSKForm from '@/components/VSKForm'
import styles from './index.module.scss'
import { motion } from 'framer-motion';

export default function LandingPage() {

  const leftColVariant = {
    hidden: { opacity: 0, x: -200 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    },
  };

  const rightColVariant = {
    hidden: { opacity: 0, x: 200 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    },
  };

  const mainVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { delay: 0.5, duration: 0.5 }
    },
  }
  return (
    <>
      <div className={styles.root}>
        <motion.div className={styles.col1}
          variants={leftColVariant}
          initial="hidden"
          animate="visible"></motion.div>
        <motion.div className={styles.col2}
          variants={mainVariant}
          initial="hidden"
          animate="visible">
          <div className={styles.heading}>
            <span>VSK</span> Maturity Evaluation Tool
          </div>
          <div className={styles.introText}>
            Vidya Samiksha Kendra (VSK) is a Government of India program that aims to inspire data-backed decision making for system actors at all levels in the public education system. To aid with the implementation of VSK, the Ministry of Education - Government of India, released an NDEAR-compliant VSK solution starter pack.
          </div>
          <div className={styles.mLevels}>
            <p>MoE has defined <span>4 levels</span> of VSK Maturity:</p>
            <div className={styles.levelsContainer}>
              <div className={styles.levelBox + ` ${styles.starter}`}>
                STARTER
              </div>
              <div className={styles.levelBox + ` ${styles.silver}`}>
                SILVER
              </div>
              <div className={styles.levelBox + ` ${styles.gold}`}>
                GOLD
              </div>
              <div className={styles.levelBox + ` ${styles.platinum}`}>
                PLATINUM
              </div>
            </div>
          </div>
          <div className={styles.questionairreText}>
            These levels are determined based on a set of 12 questions.<br></br><br></br>
            By answering the questionnaire below, you can determine the VSK maturity level in your State/UT/Organization.
          </div>
          <div className={styles.formContainer}>
            <VSKForm />
          </div>
          <h2>Refer to this for the Maturity Metrices</h2>
          <img src="/images/maturityMetric.png" width={'100%'} style={{ paddingBottom: '4rem' }} />
        </motion.div>
        <motion.div
          variants={rightColVariant}
          initial="hidden"
          animate="visible"
          className={styles.col3}></motion.div>
      </div>
    </>
  )
}
