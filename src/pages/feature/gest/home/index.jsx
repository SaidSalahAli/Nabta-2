import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from './components/hero';
import Applications from './components/applications';
import Characters from './components/characters';
import Worksheets from './components/work-sheets';
import WhyNabta from './components/why-nabta';
import AboutNabta from './components/about-nabta';
// import Partners from './components/partners';
import NabtaNumbers from './components/nabta-numbers';
import PartnersReviews from './components/partners-reviews';
import Partners from './components/partners';
import Team from './components/team';
import GoalsPrinciples from './components/goals-Principles';
import Episodes from './components/episodes';
import SEO from 'components/SEO';
import AnimatedSection from 'components/AnimatedSection';

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const targetId = location.state.scrollTo;
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [location.state]);
  const hasScrollTarget = Boolean(location.state?.scrollTo);

  return (
    <Box sx={{ width: '100%' }}>
      <SEO
        title="منصة نبتة"
        description="منصة نبتة لصناعة المحتوى التربوي والتعليمي المبتكر للأطفال، ودعم الأمهات والآباء بأدوات وأساليب تربوية إبداعية."
        keywords="منصة نبتة, الصفحة الرئيسية, تعليم أطفال, أفلام كرتون تربوية, أوراق عمل للأطفال"
        url="/"
      />

      {/* Above-the-fold: Loaded immediately */}
      <AnimatedSection deferMount={false}><Hero /></AnimatedSection>
      <AnimatedSection deferMount={false}><Episodes /></AnimatedSection>

      {/* Below-the-fold: Deferred mounting on scroll with generous 350px rootMargin */}
      <AnimatedSection deferMount={!hasScrollTarget} minHeight="350px"><Applications /></AnimatedSection>
      <AnimatedSection deferMount={!hasScrollTarget} minHeight="350px"><Worksheets /></AnimatedSection>
      <AnimatedSection deferMount={!hasScrollTarget} minHeight="350px"><AboutNabta /></AnimatedSection>
      <AnimatedSection deferMount={!hasScrollTarget} minHeight="350px"><Characters /></AnimatedSection>
      <AnimatedSection deferMount={!hasScrollTarget} minHeight="350px"><GoalsPrinciples /></AnimatedSection>
      <AnimatedSection deferMount={!hasScrollTarget} minHeight="300px"><WhyNabta /></AnimatedSection>
      <AnimatedSection deferMount={!hasScrollTarget} minHeight="350px"><PartnersReviews /></AnimatedSection>
      <AnimatedSection deferMount={!hasScrollTarget} minHeight="250px"><NabtaNumbers /></AnimatedSection>
      <AnimatedSection deferMount={!hasScrollTarget} minHeight="200px"><Partners /></AnimatedSection>
      <AnimatedSection deferMount={!hasScrollTarget} minHeight="350px"><Team /></AnimatedSection>
    </Box>
  );
}
