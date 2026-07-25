import { Box } from '@mui/material';
import React from 'react';
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
  return (
    <Box sx={{ width: '100%' }}>
      <SEO
        title="منصة نبتة"
        description="منصة نبتة لصناعة المحتوى التربوي والتعليمي المبتكر للأطفال، ودعم الأمهات والآباء بأدوات وأساليب تربوية إبداعية."
        keywords="منصة نبتة, الصفحة الرئيسية, تعليم أطفال, أفلام كرتون تربوية, أوراق عمل للأطفال"
        url="/"
      />

      <AnimatedSection><Hero /></AnimatedSection>
      <AnimatedSection><Episodes /></AnimatedSection>
      <AnimatedSection><Applications /></AnimatedSection>
      <AnimatedSection><Worksheets /></AnimatedSection>
      <AnimatedSection><AboutNabta /></AnimatedSection>
      <AnimatedSection><Characters /></AnimatedSection>
      <AnimatedSection><GoalsPrinciples /></AnimatedSection>
      <AnimatedSection><WhyNabta /></AnimatedSection>
      <AnimatedSection><PartnersReviews /></AnimatedSection>
      <AnimatedSection><NabtaNumbers /></AnimatedSection>
      <AnimatedSection><Partners /></AnimatedSection>
      <AnimatedSection><Team /></AnimatedSection>
    </Box>
  );
}
