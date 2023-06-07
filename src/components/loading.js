import { motion, useAnimation } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const LoadingAnimation = () => {
  const controls = useAnimation();
  const router = useRouter();

  useEffect(() => {
    const startAnimation = () => {
      controls.start({
        rotate: 360,
        transition: { duration: 1, repeat: Infinity, ease: 'linear' }
      });
    };

    const stopAnimation = () => {
      controls.stop();
    };

    router.events.on('routeChangeStart', startAnimation);
    router.events.on('routeChangeComplete', stopAnimation);
    router.events.on('routeChangeError', stopAnimation);

    return () => {
      router.events.off('routeChangeStart', startAnimation);
      router.events.off('routeChangeComplete', stopAnimation);
      router.events.off('routeChangeError', stopAnimation);
    };
  }, [controls, router]);

  return (
    <motion.div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <motion.div
        style={{
          width: '50px',
          height: '50px',
          backgroundColor: 'blue',
          borderRadius: '50%',
        }}
        animate={controls}
      />
    </motion.div>
  );
};

export default LoadingAnimation;
