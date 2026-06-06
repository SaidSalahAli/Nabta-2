import React, { useEffect, useState } from 'react';
import { Box, Container, Fade, Typography, Divider, Link } from '@mui/material';

/* ── Shared styles (must be before sections array) ── */
const bodyStyle = {
  color: 'text.secondary',
  lineHeight: 2,
  fontSize: { xs: '0.95rem', md: '1rem' }
};

const linkStyle = {
  color: 'primary.main',
  fontWeight: 600,
  textDecoration: 'underline',
  '&:hover': { color: '#006699' }
};

const sections = [
  {
    id: 'intro',
    title: 'سياسة الخصوصية لمنصة أستوديو نبتة للأطفال',
    content: (
      <Typography variant="body1" sx={bodyStyle}>
        أهلًا بك في منصّة أستوديو نبتة لصناعة المحتوى التربوي التعليمي للأطفال، ودعم الأمهات والآباء. في هذه الوثيقة، ستُشير
        التعبيرات "نحن" و"لنا" إلى منصة أستوديو نبتة. ومن خلال التفاعل مع هذه المنصّة، بما في ذلك جميع المعلومات والأدوات
        والخدمات المُقدَّمة، فإنك توافق على الإلتزام بالشروط المبينة في وثيقة سياسة الخصوصية هذه.{' '}
        <br />
        <br />
        تتم الموافقة على سياسة الخصوصية هذه عندما يقوم المستخدم أو إن أمكن الوالد أو مقدم الرعاية المعني، باستخدام منصتنا
        ويوافق على معالجة بياناته الشخصية. إذا كنت لا توافق على وثيقة سياسة الخصوصية هذه، يرجى عدم إستخدام المنصّة مرةً
        أخرى. يرجى مراسلتنا عبر البريد الإلكتروني{' '}
        <Link href="mailto:contact@nabtastudio.com" sx={linkStyle}>
          contact@nabtastudio.com
        </Link>
      </Typography>
    )
  },
  {
    id: 'commitment',
    title: 'الالتزام بخصوصية البيانات',
    content: (
      <Typography variant="body1" sx={bodyStyle}>
        منصة أستوديو نبتة تولي اهتمامًا كبيرًا بخصوصية مستخدميها. نحن لا نقوم بجمع أو تخزين أو معالجة بيانات المستخدمين
        الشخصية خارج نطاق الأغراض المعبّر عنها هُنا، إلا إذا كان ذلك مطلوبًا بموجب القانون.
      </Typography>
    )
  },
  {
    id: 'personal-data',
    title: 'ما الذي تتضمنه البيانات الشخصية؟',
    content: (
      <Typography variant="body1" sx={bodyStyle}>
        تشير البيانات الشخصية إلى أي معلومات يمكنها تحديد هوية الفرد بشكلٍ مباشر أو غير مباشر، مثل الإسم وعنوان البريد
        الإلكتروني وعنوان IP والدولة.
      </Typography>
    )
  },
  {
    id: 'handling',
    title: 'التعامل مع البيانات الشخصية',
    content: (
      <>
        <Typography variant="body1" sx={bodyStyle}>
          <strong>أثناء استخدام المنصّة:</strong> يجوز للمستخدمين الكشف طوعًا عن بياناتهم الشخصية، على سبيل المثال، عند
          إجراء عملية شراء عبر منصّة أستوديو نبتة. بالإضافة إلى ذلك، قد يتم جمع بيانات بشكلٍ غير مباشر مثل إحصائيات
          إستخدام المنصّة، وعدد المستخدمين وأكثر الميزات إستخدامًا.
        </Typography>
        <Typography variant="body1" sx={{ ...bodyStyle, mt: 1 }}>
          <strong>الغرض والأساس القانوني:</strong> نقوم بمعالجة البيانات الشخصية بكل شفافية.
        </Typography>
      </>
    )
  },
  {
    id: 'sharing',
    title: 'مشاركة البيانات الشخصية',
    content: (
      <Typography variant="body1" sx={bodyStyle}>
        قد تقوم أستوديو نبتة بمشاركة البيانات الشخصية مع مقدّمي الخدمات والشركاء الخارجيين لأغراض مثل تخزين البيانات،
        والتحليلات، وتسليم الاتصالات. نحن نضمن أن هؤلاء الأطراف يتمتّعون بمستوى مماثل من حماية البيانات والخصوصية كما هو
        الحال مع أستوديو نبتة.
      </Typography>
    )
  },
  {
    id: 'transfer',
    title: 'نقل البيانات',
    content: (
      <Typography variant="body1" sx={bodyStyle}>
        قد يتم نقل بياناتك الشخصية دوليًا، بما في ذلك إلى الدول التي تخضع لقوانين مختلفة لحماية البيانات. ومن خلال تقديم
        بياناتك، فإنك توافق على هذا النقل.
      </Typography>
    )
  },
  {
    id: 'rights',
    title: 'حقوق المستخدم',
    content: (
      <Typography variant="body1" sx={bodyStyle}>
        يحق للمستخدمين ممارسة حقوقهم فيما يتعلَّق ببياناتهم الشخصية، بما في ذلك الحق في الوصول إليها، وتصحيحها، وحذفها،
        أو نقلها. لأي طلبات أو استفسارات، يرجى التواصل معنا على البريد الإلكتروني{' '}
        <Link href="mailto:contact@nabtastudio.com" sx={linkStyle}>
          contact@nabtastudio.com
        </Link>
      </Typography>
    )
  },
  {
    id: 'retention',
    title: 'الاحتفاظ بالبيانات وحمايتها',
    content: (
      <Typography variant="body1" sx={bodyStyle}>
        تحتفظ أستوديو نبتة بالبيانات الشخصية فقط في حال كان ذلك ضروريًا. وتتَّخذ احتياطاتٍ صارمةٍ لحمايتها من الوصول غير
        المُصرَّح به، أو فقدانها أو سوء استخدامها.
      </Typography>
    )
  },
  {
    id: 'contact',
    title: 'التواصل مع أستوديو نبتة',
    content: (
      <>
        <Typography variant="body1" sx={bodyStyle}>
          إذا كانت لديك أي أسئلة أو استفسارات بخصوص سياسة الخصوصية هذه أو بياناتك الشخصية، يرجى التواصل معنا على:
        </Typography>
        <Box sx={{ mt: 2, p: 3, backgroundColor: '#f8f9fa', borderRadius: '12px', border: '1px solid', borderColor: 'divider' }}>
          {[
            { label: 'العنوان', value: 'مصر، القاهرة، مدينة السلام، صندوق بريد 11491' },
            { label: 'البريد الإلكتروني', value: 'contact@nabtastudio.com', href: 'mailto:contact@nabtastudio.com' },
            { label: 'الموقع الإلكتروني', value: 'nabtastudio.com', href: 'https://nabtastudio.com/' }
          ].map(({ label, value, href }) => (
            <Box key={label} sx={{ display: 'flex', gap: 1, mb: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary', minWidth: 140, flexShrink: 0 }}>
                {label}:
              </Typography>
              {href ? (
                <Link href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" sx={linkStyle}>
                  {value}
                </Link>
              ) : (
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>{value}</Typography>
              )}
            </Box>
          ))}
        </Box>
      </>
    )
  },
  {
    id: 'changes',
    title: 'التغييرات في سياسة الخصوصية',
    content: (
      <Typography variant="body1" sx={bodyStyle}>
        تحتفظ أستوديو نبتة بحق تحديث سياسة الخصوصية هذه. سيتم إبلاغ المستخدمين بالتغييرات المهمة وقد تتطلَّب هذه التغييرات
        موافقة جديدة.
      </Typography>
    )
  },
  {
    id: 'additional',
    title: 'شروط إضافية',
    content: (
      <Box component="ul" sx={{ pl: 0, listStyle: 'none', m: 0 }}>
        {[
          'مصر هي بلد إقامتنا.',
          'على الأهل أو الأوصياء القانونيين تقديم موافقة يمكن التحقق منها قبل جمع أو استخدام أو الكشف عن المعلومات الشخصية للأطفال دون سن الثامنة عشرة.',
          'أستوديو نبتة ملتزمة بحماية خصوصية الأطفال، ولا تقوم بجمع معلوماتٍ شخصية من الأطفال دون سن 13 سنة دون موافقة الوالدين بشكل يمكن التحقق منه.',
          'للأهل أو الأوصياء القانونيين الحق في مراجعة أو تحديث أو حذف معلومات أطفالهم عن طريق الاتصال بنا.',
          'يتم إرسال تفاصيل الدفع المقدمة في منصّة أستوديو نبتة إلى مزوِّد الدفع لدينا عبر اتصالٍ آمن.',
          'نقبل الدفع عبر الإنترنت باستخدام فيزا وماستر كارد.'
        ].map((item, i) => (
          <Box key={i} component="li" sx={{ display: 'flex', gap: 1.5, mb: 1.5 }}>
            <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'primary.main', mt: '10px', flexShrink: 0 }} />
            <Typography variant="body1" sx={bodyStyle}>{item}</Typography>
          </Box>
        ))}
      </Box>
    )
  }
];

export default function Privacy() {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(true);
  }, []);

  return (
    <Fade in={checked} timeout={800}>
      <Box sx={{ py: 8, width: '100%', minHeight: '100vh', backgroundColor: '#fcfcfc' }}>
        <Container maxWidth="md">
          {/* Header */}
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant="h1" sx={{ fontWeight: 800, color: 'text.primary', mb: 2, fontSize: { xs: '2.2rem', md: '3rem' } }}>
              سياسة الخصوصية
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: 15 }}>
              آخر تحديث: {new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}
            </Typography>
          </Box>

          {/* Sections */}
          <Box
            sx={{
              backgroundColor: '#fff',
              borderRadius: '24px',
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: '0 10px 40px rgba(0,0,0,0.03)',
              overflow: 'hidden'
            }}
          >
            {sections.map((section, index) => (
              <Box key={section.id}>
                <Box sx={{ px: { xs: 3, md: 5 }, py: { xs: 3, md: 4 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: '10px',
                        backgroundColor: '#FFF8E1',
                        border: '1.5px solid #FFD666',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <Typography sx={{ fontWeight: 800, fontSize: 14, color: '#b27b00' }}>{index + 1}</Typography>
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: '#2E2A39', fontSize: { xs: '1.1rem', md: '1.3rem' } }}>
                      {section.title}
                    </Typography>
                  </Box>
                  <Box sx={{ pr: { md: 6 } }}>{section.content}</Box>
                </Box>
                {index < sections.length - 1 && <Divider sx={{ borderColor: 'divider' }} />}
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </Fade>
  );
}
