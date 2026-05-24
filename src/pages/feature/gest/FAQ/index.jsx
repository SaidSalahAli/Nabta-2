import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Fade, Divider, Collapse, IconButton } from '@mui/material';
import { ArrowDown2 } from 'iconsax-react';

const faqs = [
  {
    id: 1,
    question: 'ما هي منصة نبتة؟',
    answer:
      'نبتة هي منصة صناعة محتوى تربوي تعليمي للأطفال، ودعم الأمهات والآباء من خلال: (نصائح تربوية - تطبيقات تعليمية - فيديوهات توعوية - أوراق مذاكرة وتلوين - ورش عمل - أنشطة وألعاب تفاعلية).'
  },
  {
    id: 2,
    question: 'ما المحتوى الذي تقدمه نبتة؟',
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
              <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#2E2A39' }}>{i + 1}</Typography>
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
                <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#2E2A39' }}>{i + 1}</Typography>
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
              <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#2E2A39' }}>{i + 1}</Typography>
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
              <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#2E2A39' }}>{i + 1}</Typography>
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

function FAQItem({ faq, isLast }) {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Box
        onClick={() => setOpen(!open)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          py: 2.5,
          px: { xs: 2, md: 3 },
          cursor: 'pointer',
          transition: 'background 0.2s',
          borderRadius: open ? '16px 16px 0 0' : '16px',
          backgroundColor: open ? '#fffdf5' : 'transparent',
          '&:hover': { backgroundColor: '#fffdf5' }
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: open ? '#2E2A39' : '#2E2A39',
            fontSize: { xs: '16px', md: '18px' },
            lineHeight: 1.5,
            flex: 1,
            pr: 2
          }}
        >
          {faq.question}
        </Typography>
        <Box
          sx={{
            minWidth: 36,
            height: 36,
            borderRadius: '50%',
            border: '1.5px solid',
            borderColor: open ? '#FFD666' : 'divider',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            backgroundColor: open ? '#FFD666' : 'transparent'
          }}
        >
          <ArrowDown2 size="16" color={open ? '#2E2A39' : '#888'} variant="Bold" />
        </Box>
      </Box>

      <Collapse in={open}>
        <Box
          sx={{
            px: { xs: 2, md: 3 },
            pb: 2.5,
            pt: 0.5,
            backgroundColor: '#fffdf5',
            borderRadius: '0 0 16px 16px',
            borderTop: '1px dashed',
            borderColor: '#FFD66640'
          }}
        >
          {typeof faq.answer === 'string' ? (
            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.9, fontWeight: 400 }}>
              {faq.answer}
            </Typography>
          ) : (
            faq.answer
          )}
        </Box>
      </Collapse>

      {!isLast && <Divider sx={{ borderColor: 'divider', mx: { xs: 2, md: 3 } }} />}
    </Box>
  );
}

export default function FAQ() {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(true);
  }, []);

  return (
    <Fade in={checked} timeout={800}>
      <Box sx={{ py: 6, width: '100%', minHeight: '100vh', backgroundColor: '#fcfcfc', direction: 'rtl' }}>
        <Container maxWidth="lg">
          {/* Main Title */}
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography variant="h1" sx={{ fontWeight: 800, color: 'text.primary', mb: 2, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
              الأسئلة الشائعة
            </Typography>
            <Box sx={{ width: '80px', height: '4px', backgroundColor: '#FFD666', mx: 'auto', borderRadius: '2px' }} />
          </Box>

          {/* FAQ List */}
          <Box
            sx={{
              backgroundColor: '#fff',
              borderRadius: '24px',
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: '0 10px 40px rgba(0,0,0,0.03)',
              overflow: 'hidden',
              px: { xs: 1, md: 2 },
              py: 1
            }}
          >
            {faqs.map((faq, index) => (
              <FAQItem key={faq.id} faq={faq} isLast={index === faqs.length - 1} />
            ))}
          </Box>
        </Container>
      </Box>
    </Fade>
  );
}
