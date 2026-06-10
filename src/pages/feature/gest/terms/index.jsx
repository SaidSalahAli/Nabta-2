import React, { useEffect, useState } from 'react';
import { Box, Container, Fade, Typography, Divider, Link } from '@mui/material';
import SEO from 'components/SEO';


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
    id: 'usage',
    title: 'شروط الاستخدام',
    content: (
      <>
        <Typography variant="body1" sx={bodyStyle}>
          أهلًا بك في منصة نبتة لصناعة المحتوى التربوي التعليمي للأطفال، ودعم الأمهات والآباء، من خلال الوصول إلى
          خدماتنا وإستخدامها، فإنك توافق على الامتثال والالتزام بشروط الاستخدام هذه. إذا كنت غير راضٍ عن أي جزء من هذه
          الشروط، يرجى عدم استخدام المنصّة مرةً أخرى. لكننا بكل تأكيد نود معرفة أسباب عدم الرضا حتى نتمكن من تحسين
          منتجاتنا. يرجى مراسلتنا عبر البريد الإلكتروني على{' '}
          <Link href="mailto:contact@nabtastudio.com" sx={linkStyle}>
            contact@nabtastudio.com
          </Link>
        </Typography>
      </>
    )
  },
  {
    id: 'privacy',
    title: 'سياسة الخصوصية',
    content: (
      <Typography variant="body1" sx={bodyStyle}>
        إن استخدامك للخدمة يخضع أيضًا لسياسة الخصوصية التابعة لـ منصة نبتة. يرجى مراجعة سياسة الخصوصية لدينا، التي تحكم
        الخدمة وتُبلغ المستخدمين عن ممارسات جمع البيانات الخاصة بنا. سياسة الخصوصية متاحة هُنا:{' '}
        <Link href="/privacy" sx={linkStyle}>
          Privacy Policy
        </Link>
      </Typography>
    )
  },
  {
    id: 'content',
    title: 'المحتوى',
    content: (
      <>
        <Typography variant="body1" sx={bodyStyle}>
          يتم تنسيق المحتوى في منصة نبتة وتوفيره وفقًا لقوانين حقوق المُلكيّة الفكرية وحقوق التأليف والنشر. وهو مُخصَّص
          للاستخدام التعليمي ويتم ترخيصه للبث والمشاهدة عبر تطبيقنا وموقعنا الإلكتروني،{' '}
          <Link href="https://www.nabtastudio.com" target="_blank" rel="noopener noreferrer" sx={linkStyle}>
            Nabtastudio.com
          </Link>
          .
        </Typography>
        <Typography variant="body1" sx={{ ...bodyStyle, mt: 1 }}>
          لدينا الحق في تعديل أو تحديث أو إزالة المحتوى في أي وقت.
        </Typography>
      </>
    )
  },
  {
    id: 'subscription',
    title: 'الاشتراك',
    content: (
      <Box component="ul" sx={{ pl: 0, listStyle: 'none', m: 0 }}>
        {[
          'توفر الاشتراكات إمكانية الوصول إلى جميع الأنشطة التعليمية المتاحة على تطبيقنا وموقعنا الإلكتروني خلال مدة الاشتراك.',
          'يتم معالجة الدفعات من خلال حساب متجر التطبيقات المقابل.',
          'يتم تجديد الاشتراك تلقائيًا ما لم يتم إيقاف التجديد التلقائي قبل 24 ساعة على الأقل من نهاية الفترة الحالية.',
          'سيتم فرض رسوم على الحساب للتجديد خلال 24 ساعة قبل نهاية الفترة الحالية.',
          'تتيح الاشتراكات للمستخدمين إمكانية تعديل اشتراكاتهم وإيقاف التجديد التلقائي من خلال إعدادات حساباتهم.'
        ].map((item, i) => (
          <Box key={i} component="li" sx={{ display: 'flex', gap: 1.5, mb: 1.5 }}>
            <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'primary.main', mt: '10px', flexShrink: 0 }} />
            <Typography variant="body1" sx={bodyStyle}>{item}</Typography>
          </Box>
        ))}
      </Box>
    )
  },
  {
    id: 'accounts',
    title: 'الحسابات',
    content: (
      <>
        <Typography variant="body1" sx={bodyStyle}>
          عند إنشاء حساب في منصة نبتة، يجب عليك تقديم معلومات دقيقة وكاملة. أنت مسؤول عن الحفاظ على سِريّة حسابك
          وكلمة المرور، وعن جميع الأنشطة التي تتم ضمن حسابك.
        </Typography>
        <Typography variant="body1" sx={{ ...bodyStyle, mt: 1 }}>
          أنت توافق على عدم الكشف عن كلمة المرور الخاصة بك لأي طرف ثالث وعلى إبلاغنا فورًا في حالة حدوث أي استخدام غير
          مُصرَّح به لحسابك.
        </Typography>
      </>
    )
  },
  {
    id: 'ip',
    title: 'الملكية الفكرية',
    content: (
      <Typography variant="body1" sx={bodyStyle}>
        تحمي حقوق الطبع والنشر وقوانين المُلكيّة الفكرية الأخرى مُلكيّة خدمة "منصة نبتة" والجهات المرخصة لها، بالإضافة
        إلى محتواها الأصلي وميزاتها ووظائفها.
      </Typography>
    )
  },
  {
    id: 'termination',
    title: 'إنهاء الخدمة',
    content: (
      <Typography variant="body1" sx={bodyStyle}>
        يجوز لنا إنهاء أو تعليق الوصول إلى خدمتنا فورًا، دون إشعارٍ مسبق أو مسؤولية، لأي سبب كان، بما في ذلك على سبيل
        المثال لا الحصر، إذا كنت تنتهك الشروط.
      </Typography>
    )
  },
  {
    id: 'liability',
    title: 'تحديد المسؤولية',
    content: (
      <Typography variant="body1" sx={bodyStyle}>
        لا تتحمَّل منصة نبتة أي مسؤولية عن أي أضرار غير مباشرة، أو عرضية، أو خاصة، أو عقوبية ناتجة عن إستخدامك
        للخدمة.
      </Typography>
    )
  },
  {
    id: 'disclaimer',
    title: 'إخلاء المسؤولية',
    content: (
      <Typography variant="body1" sx={bodyStyle}>
        يتم تقديم الخدمة "كما هي" و"حسب التوفُّر". لا تُقدِّم منصة نبتة أي ضمانات بخصوص الخدمة، سواء كانت صريحة أم
        ضمنية.
      </Typography>
    )
  },
  {
    id: 'law',
    title: 'القانون الحاكم',
    content: (
      <Typography variant="body1" sx={bodyStyle}>
        تخضع هذه الشروط لقوانين دولة مصر (القاهرة) بغض النظر عن أحكام التعارض فيها.
      </Typography>
    )
  },
  {
    id: 'changes',
    title: 'التغييرات في شروط الخدمة',
    content: (
      <Typography variant="body1" sx={bodyStyle}>
        قد نقوم بتحديث شروط الاستخدام هذه من حين لآخر، وسيتم إرسال أي تغييرات جوهرية إلى أولياء الأمور والأوصياء باعتبارهم
        المستخدمين الأساسيين. إن استمرارك في إستخدام منصة نبتة يعني موافقتك على هذه التغييرات.
      </Typography>
    )
  },
  {
    id: 'contact',
    title: 'تواصل معنا',
    content: (
      <Typography variant="body1" sx={bodyStyle}>
        لأي أسئلة حول هذه الشروط، يرجى التواصل معنا على{' '}
        <Link href="mailto:contact@nabtastudio.com" sx={linkStyle}>
          contact@nabtastudio.com
        </Link>
      </Typography>
    )
  }
];

export default function Terms() {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(true);
  }, []);

  return (
    <Fade in={checked} timeout={800}>
      <Box sx={{ py: 8, width: '100%', minHeight: '100vh', backgroundColor: '#fcfcfc' }}>
        <SEO 
          title="الشروط والأحكام" 
          description="اتفاقية شروط الاستخدام والأحكام الخاصة بمنصة نبتة للأطفال لدعم الأمهات والآباء وصناعة المحتوى التربوي."
          keywords="شروط الاستخدام منصة نبتة, الأحكام والشروط, اتفاقية منصة نبتة"
          url="/terms"
        />
        <Container maxWidth="md">
          {/* Header */}
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant="h1" sx={{ fontWeight: 800, color: 'text.primary', mb: 2, fontSize: { xs: '2.2rem', md: '3rem' } }}>
              الشروط والأحكام
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
                  {/* Section number + title */}
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

                  {/* Section content */}
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
