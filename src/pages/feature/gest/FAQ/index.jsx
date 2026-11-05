import React, { useState } from 'react';
import { Box, Typography, Container, Collapse } from '@mui/material';
import { ArrowDown2 } from 'iconsax-react';
import { Link as RouterLink } from 'react-router-dom';
import SEO from 'components/SEO';
import { PageHero, KidButton, crayon, kidColors, kidFont } from 'components/kids';

const faqs = [
  {
    id: 1,
    question: 'ما هي منصة نبتة؟',
    answer:
      'منصة نبتة هي منصة صناعة محتوى تربوي تعليمي للأطفال، ودعم الأمهات والآباء من خلال: (نصائح تربوية - تطبيقات تعليمية - فيديوهات توعوية - أوراق مذاكرة وتلوين - ورش عمل - أنشطة وألعاب تفاعلية).'
  },
  {
    id: 2,
    question: 'ما المحتوى الذي يقدمه تطبيق لغتي العربية؟',
    answer:
      'يقدم تطبيق لغتي العربية محتوى تعليمي تربوي تفاعلي للأطفال، وبه شئ من المرح يتناسب مع أعمارهم، وهو عبارة عن تعليم الحروف العربية للأطفال، بأشكال متعددة بالطريقة الصوتية، وهذه هي الطريقة المناسبة والأصح في تعليم اللغة العربية، وأيضًا يقدم التطبيق إمكانية طباعة أوراق المذاكرة مع كل مرحلة تعليمية، بحيث يتمكن الطفل من إتقان المرحلة التعليمية الحالية بشكل عملي وجيد.'
  },
  {
    id: 3,
    question: 'كيف يستفيد طفلي من تطبيق لغتي العربية؟',
    answer:
      'يستطيع طفلك الإستفادة من تطبيق لغتي العربية من خلال المحتوى الشيق الذي يحتوي عليه، وهو عبارة عن أنشطة وألعاب تعليمية تجمع بين التعلم واللعب والمرح في نفس الوقت، مما يجعل طفلك مستمتع أثناء رحلته التعليمية، كما يمكنك كأحد الأبوين أيضًا طباعة أوراق المذاكرة في كل مرحلة تعليمية وذلك لضمان تفاعل الطفل مع المحتوى التعليمي بشكل أوسع وأشمل.'
  },
  {
    id: 4,
    question: 'هل يمكن لطفلي إستخدام تطبيق لغتي العربية بشكل مستقل؟',
    answer:
      'نعم، يمكن لطفلك إستخدام تطبيق لغتي العربية منفردًا، ولكن تحت إشراف الوالدين أو ولي الأمر، مما يضمن متابعة طفلك في تقدمه التعليمي، وأيضًا تحديد وقت الإستخدام للتطبيق، وذلك للحفاظ على صحة طفلك.'
  },
  {
    id: 5,
    question: 'ما هو العُمر المناسب للإستفادة من محتوى منصة نبتة؟',
    answer:
      'محتوى تطبيق لغتي العربية يناسب الأطفال من عُمر 3 إلى 9 أعوام، وفي الإصدارات التالية سنعمل على تقديم محتوى يناسب فئات عمرية أكثر.'
  },
  {
    id: 6,
    question: 'هل تطبيق لغتي العربية مجاني؟',
    answer:
      'يمكنك تحميل تطبيق لغتي العربية من متجر التطبيقات بالهاتف والإستمتاع بالتجربة المجانية للمحتوى، ولكن يوجد بعض أجزاء في التطبيق مدفوعة، ولكي تحصل على الإستفادة بباقي المحتوى عليك الاشتراك (تكلفة رمزية) بالتطبيق والإستمتاع بكامل المحتوى وكل جديد.'
  },
  {
    id: 7,
    question: 'هل أستطيع استخدام تطبيق لغتي العربية من دون الاشتراك فيه؟',
    answer:
      'نعم ولكن هذا سيتيح لك فتح المحتوى المجاني فقط. وللمزيد من المحتوى والاستمتاع بباقي الخدمات عليك الاشتراك (تكلفة رمزية) بالتطبيق.'
  },
  {
    id: 8,
    question: 'هل يجب أن أكون متصلًا بالإنترنت خلال استخدام التطبيق؟',
    answer: 'لا يلزمك الإتصال بالإنترنت خلال إستخدام التطبيق ولكن في حالة إنشاء حساب والإشتراك داخل التطبيق فيلزمك الإتصال بالإنترنت.'
  },
  {
    id: 9,
    question: 'هل يتجدد الاشتراك تلقائيًا أم يتطلب تفعيله يدويًا في كل مرة؟',
    answer: (
      <Box>
        <Typography variant="body1" sx={{ lineHeight: 1.9, mb: 1 }}>
          تطبيق لغتي العربية يتيح لك كلا الخيارين، ويمكنك التحكم بتجديد إشتراكك باتباع الخطوات التالية:
        </Typography>
        {[
          'إفتح تطبيق لغتي العربية',
          'إضغط على إعدادات',
          'أدخل الأرقام لتخطي بوابة الأمان',
          'إفتح قائمة الإشتراكات',
          'ثم فعل أو عطل خيار التجديد التلقائي للباقة كيفما شئت، وذلك إذا كان الدفع يتم عبر استخدام بطاقة الدفع، أما في حالة الدفع عبر متجر الهاتف فيتم الدفع طبقًا لإعدادات حسابك في المتجر'
        ].map((step, i) => (
          <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 0.75 }}>
            <Box
              sx={{
                minWidth: 24,
                height: 24,
                borderRadius: '50%',
                backgroundColor: '#FFD666',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mt: 0.2
              }}
            >
              <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#1F2A44' }}>{i + 1}</Typography>
            </Box>
            <Typography variant="body2" sx={{ lineHeight: 1.8, color: 'text.primary' }}>
              {step}
            </Typography>
          </Box>
        ))}
      </Box>
    )
  },
  {
    id: 10,
    question: 'كيف أستطيع إلغاء الاشتراك من جهاز الآيفون والآيباد؟',
    answer: (
      <Box>
        <Typography variant="body1" sx={{ lineHeight: 1.9, mb: 1 }}>
          سعدنا بصحبتك معنا، ونأمل أن تعود في أقرب وقت، لإلغاء الاشتراك يرجى إتباع الخطوات التالية:
        </Typography>
        {['الدخول إلى حساب آب ستور الخاص بك', 'إختيار إدارة الإشتراكات', 'إختيار تطبيق لغتي العربية', 'إختيار إلغاء الباقة'].map(
          (step, i) => (
            <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 0.75 }}>
              <Box
                sx={{
                  minWidth: 24,
                  height: 24,
                  borderRadius: '50%',
                  backgroundColor: '#FFD666',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mt: 0.2
                }}
              >
                <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#1F2A44' }}>{i + 1}</Typography>
              </Box>
              <Typography variant="body2" sx={{ lineHeight: 1.8, color: 'text.primary' }}>
                {step}
              </Typography>
            </Box>
          )
        )}
        <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
          وسيتم إلغاء اشتراكك، ويمكنك الاستمتاع بالمدة المتبقية في اشتراكك الحالي.
        </Typography>
      </Box>
    )
  },
  {
    id: 11,
    question: 'كيف أستطيع إلغاء الاشتراك من جهاز الأندرويد؟',
    answer: (
      <Box>
        <Typography variant="body1" sx={{ lineHeight: 1.9, mb: 1 }}>
          سعدنا بصحبتك معنا، ونأمل أن تعود في أقرب وقت، لإلغاء الاشتراك تأكد من إيقاف التجديد التلقائي وسيتوقف الاشتراك تلقائيا بانتهاء
          المدة المدفوعة، ولإيقاف التجديد التلقائي يرجى إتباع الخطوات التالية:
        </Typography>
        {[
          'إفتح تطبيق لغتي العربية',
          'إضغط على إعدادات',
          'أكتب الأرقام التي ستظهر لك في شاشة الأمان',
          'إختيار الإشتراكات',
          'إختيار إلغاء التجديد التلقائي للباقة'
        ].map((step, i) => (
          <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 0.75 }}>
            <Box
              sx={{
                minWidth: 24,
                height: 24,
                borderRadius: '50%',
                backgroundColor: '#FFD666',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mt: 0.2
              }}
            >
              <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#1F2A44' }}>{i + 1}</Typography>
            </Box>
            <Typography variant="body2" sx={{ lineHeight: 1.8, color: 'text.primary' }}>
              {step}
            </Typography>
          </Box>
        ))}
        <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
          وسيتم إلغاء اشتراكك، ويمكنك الاستمتاع بالمدة المتبقية في اشتراكك الحالي.
        </Typography>
      </Box>
    )
  },
  {
    id: 12,
    question: 'كيف أعرف الوقت المتبقي حتى نهاية الاشتراك؟',
    answer: (
      <Box>
        <Typography variant="body1" sx={{ lineHeight: 1.9, mb: 1 }}>
          لمعرفة الوقت المتبقي في اشتراكك يرجى إتباع الخطوات التالية:
        </Typography>
        {[
          'إفتح تطبيق لغتي العربية',
          'إضغط على إعدادات',
          'أدخل الأرقام التي ستظهر لك في شاشة الأمان',
          'إختر الإشتراكات وسيظهر لك تفاصيل اشتراكك الحالي ووقت إنتهاء الباقة الحالية'
        ].map((step, i) => (
          <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 0.75 }}>
            <Box
              sx={{
                minWidth: 24,
                height: 24,
                borderRadius: '50%',
                backgroundColor: '#FFD666',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mt: 0.2
              }}
            >
              <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#1F2A44' }}>{i + 1}</Typography>
            </Box>
            <Typography variant="body2" sx={{ lineHeight: 1.8, color: 'text.primary' }}>
              {step}
            </Typography>
          </Box>
        ))}
      </Box>
    )
  },
  {
    id: 13,
    question: 'كم عدد الحسابات المسموح بها في نفس الإشتراك الواحد؟',
    answer: 'يمكنك إضافة 3 حسابات كحد أقصى للإشتراك الواحد وعلى الجهاز الواحد.'
  },
  {
    id: 14,
    question: 'لماذا لا يكون التطبيق مجاني؟',
    answer:
      'بالتأكيد نحن نحب هذا ونحرص عليه وقد قمنا بالفعل خلال العشر سنوات الماضية بنشر التطبيق بشكل مجاني كليًا، ونعمل الآن على توفير قدر كافي من محتوى التطبيق بشكل مجاني حرصًا منا على تعلم أبنائنا، ونسعى جاهدين لتقديم أفضل جودة ممكنة لأطفالنا بما يتوافق مع معتقداتنا ومجتمعنا، كما نسعى لبناء كيان تربوي تعليمي قوي متكامل لذلك المحتوى الضخم، وهذا يكلفنا الكثير من الوقت والجهد والمال، لذلك جعلنا جزء من التطبيق مدفوع حتى نستطيع التطوير والاستمرار لمحتوانا.'
  }
];

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false);
  const c = crayon(index);
  const panelId = `faq-panel-${faq.id}`;

  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        borderRadius: '26px',
        border: `3px solid ${open ? c.main : `${kidColors.ink}12`}`,
        boxShadow: `0 6px 0 ${open ? `${c.main}55` : `${kidColors.ink}0F`}`,
        overflow: 'hidden',
        transition: 'border-color .2s ease, box-shadow .2s ease'
      }}
    >
      <Box
        component="button"
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={panelId}
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          py: 2,
          px: { xs: 2, md: 3 },
          border: 0,
          background: 'none',
          cursor: 'pointer',
          textAlign: 'start',
          fontFamily: kidFont,
          '&:hover': { backgroundColor: c.soft },
          '&:focus-visible': { outline: `4px solid ${kidColors.sky}66`, outlineOffset: -4 }
        }}
      >
        <Box
          aria-hidden="true"
          sx={{
            width: 42,
            height: 42,
            flexShrink: 0,
            borderRadius: '14px',
            backgroundColor: c.main,
            color: c.text,
            fontWeight: 800,
            fontSize: 22,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 3px 0 ${c.deep}`,
            transform: index % 2 ? 'rotate(5deg)' : 'rotate(-5deg)'
          }}
        >
          ؟
        </Box>
        <Typography
          component="span"
          sx={{
            flex: 1,
            fontFamily: kidFont,
            fontWeight: 800,
            color: kidColors.ink,
            fontSize: { xs: '1.08rem', md: '1.2rem' },
            lineHeight: 1.5
          }}
        >
          {faq.question}
        </Typography>
        <Box
          aria-hidden="true"
          sx={{
            width: 36,
            height: 36,
            flexShrink: 0,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: open ? c.main : kidColors.cloud,
            transform: open ? 'rotate(180deg)' : 'none',
            transition: 'transform .3s cubic-bezier(.34,1.56,.64,1), background-color .2s ease'
          }}
        >
          <ArrowDown2 size={18} color={open ? c.text : kidColors.ink} variant="Bold" />
        </Box>
      </Box>

      <Collapse in={open} id={panelId}>
        <Box
          sx={{
            px: { xs: 2.5, md: 3 },
            pb: 3,
            pt: 0.5,
            fontFamily: kidFont,
            color: kidColors.inkSoft,
            '& .MuiTypography-root': { fontFamily: kidFont }
          }}
        >
          {typeof faq.answer === 'string' ? (
            <Typography sx={{ color: kidColors.inkSoft, lineHeight: 1.9, fontSize: '1.05rem' }}>{faq.answer}</Typography>
          ) : (
            faq.answer
          )}
        </Box>
      </Collapse>
    </Box>
  );
}

export default function FAQ() {
  return (
    <Box sx={{ backgroundColor: kidColors.cloud }}>
      <SEO
        title="الأسئلة الشائعة"
        description="إجابات على الأسئلة الشائعة حول منصة نبتة وتطبيق لغتي العربية والاشتراكات وطرق التحميل والاستخدام الآمن للأطفال."
        keywords="الأسئلة الشائعة منصة نبتة, استفسارات منصة نبتة, كيفية الاشتراك في منصة نبتة"
        url="/faq"
      />

      <PageHero title="الأسئلة الشائعة" description="كل ما تريد معرفته عن منصة نبتة وتطبيق لغتي العربية والاشتراكات." />

      <Container maxWidth="md" sx={{ pt: { xs: 3, md: 4 }, pb: { xs: 6, md: 8 } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {faqs.map((faq, index) => (
            <FAQItem key={faq.id} faq={faq} index={index} />
          ))}
        </Box>

        <Box
          sx={{
            mt: { xs: 6, md: 8 },
            textAlign: 'center',
            p: { xs: 3, md: 4 },
            borderRadius: '30px',
            backgroundColor: kidColors.sunSoft,
            border: `3px dashed ${kidColors.sunDeep}`
          }}
        >
          <Typography sx={{ fontFamily: kidFont, fontWeight: 800, fontSize: '1.35rem', color: kidColors.ink, mb: 2 }}>
            لم تجد إجابة سؤالك؟
          </Typography>
          <KidButton component={RouterLink} to="/contact" color="sky">
            تواصل معنا
          </KidButton>
        </Box>
      </Container>
    </Box>
  );
}
