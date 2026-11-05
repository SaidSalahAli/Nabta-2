import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import SEO from 'components/SEO';
import { PageHero, crayon, kidColors, kidFont } from 'components/kids';

/* ── Shared styles (must be before sections array) ── */
const bodyStyle = {
  color: '#56607A',
  fontFamily: kidFont,
  lineHeight: 2,
  fontSize: { xs: '1rem', md: '1.08rem' }
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
          أهلًا بك في منصة نبتة لصناعة المحتوى التربوي التعليمي للأطفال، ودعم الأمهات والآباء، من خلال الوصول إلى خدماتنا وإستخدامها، فإنك
          توافق على الامتثال والالتزام بشروط الاستخدام هذه. إذا كنت غير راضٍ عن أي جزء من هذه الشروط، يرجى عدم استخدام المنصّة مرةً أخرى.
          لكننا بكل تأكيد نود معرفة أسباب عدم الرضا حتى نتمكن من تحسين منتجاتنا. يرجى مراسلتنا عبر البريد الإلكتروني على{' '}
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
        إن استخدامك للخدمة يخضع أيضًا لسياسة الخصوصية التابعة لـ منصة نبتة. يرجى مراجعة سياسة الخصوصية لدينا، التي تحكم الخدمة وتُبلغ
        المستخدمين عن ممارسات جمع البيانات الخاصة بنا. سياسة الخصوصية متاحة هُنا:{' '}
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
          يتم تنسيق المحتوى في منصة نبتة وتوفيره وفقًا لقوانين حقوق المُلكيّة الفكرية وحقوق التأليف والنشر. وهو مُخصَّص للاستخدام التعليمي
          ويتم ترخيصه للبث والمشاهدة عبر تطبيقنا وموقعنا الإلكتروني،{' '}
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
            <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#5DBB63', mt: '10px', flexShrink: 0 }} />
            <Typography variant="body1" sx={bodyStyle}>
              {item}
            </Typography>
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
          عند إنشاء حساب في منصة نبتة، يجب عليك تقديم معلومات دقيقة وكاملة. أنت مسؤول عن الحفاظ على سِريّة حسابك وكلمة المرور، وعن جميع
          الأنشطة التي تتم ضمن حسابك.
        </Typography>
        <Typography variant="body1" sx={{ ...bodyStyle, mt: 1 }}>
          أنت توافق على عدم الكشف عن كلمة المرور الخاصة بك لأي طرف ثالث وعلى إبلاغنا فورًا في حالة حدوث أي استخدام غير مُصرَّح به لحسابك.
        </Typography>
      </>
    )
  },
  {
    id: 'ip',
    title: 'الملكية الفكرية',
    content: (
      <Typography variant="body1" sx={bodyStyle}>
        تحمي حقوق الطبع والنشر وقوانين المُلكيّة الفكرية الأخرى مُلكيّة خدمة "منصة نبتة" والجهات المرخصة لها، بالإضافة إلى محتواها الأصلي
        وميزاتها ووظائفها.
      </Typography>
    )
  },
  {
    id: 'termination',
    title: 'إنهاء الخدمة',
    content: (
      <Typography variant="body1" sx={bodyStyle}>
        يجوز لنا إنهاء أو تعليق الوصول إلى خدمتنا فورًا، دون إشعارٍ مسبق أو مسؤولية، لأي سبب كان، بما في ذلك على سبيل المثال لا الحصر، إذا
        كنت تنتهك الشروط.
      </Typography>
    )
  },
  {
    id: 'liability',
    title: 'تحديد المسؤولية',
    content: (
      <Typography variant="body1" sx={bodyStyle}>
        لا تتحمَّل منصة نبتة أي مسؤولية عن أي أضرار غير مباشرة، أو عرضية، أو خاصة، أو عقوبية ناتجة عن إستخدامك للخدمة.
      </Typography>
    )
  },
  {
    id: 'disclaimer',
    title: 'إخلاء المسؤولية',
    content: (
      <Typography variant="body1" sx={bodyStyle}>
        يتم تقديم الخدمة "كما هي" و"حسب التوفُّر". لا تُقدِّم منصة نبتة أي ضمانات بخصوص الخدمة، سواء كانت صريحة أم ضمنية.
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
        قد نقوم بتحديث شروط الاستخدام هذه من حين لآخر، وسيتم إرسال أي تغييرات جوهرية إلى أولياء الأمور والأوصياء باعتبارهم المستخدمين
        الأساسيين. إن استمرارك في إستخدام منصة نبتة يعني موافقتك على هذه التغييرات.
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
  return (
    <Box sx={{ backgroundColor: kidColors.cloud }}>
      <SEO
        title="الشروط والأحكام"
        description="اتفاقية شروط الاستخدام والأحكام الخاصة بمنصة نبتة للأطفال لدعم الأمهات والآباء وصناعة المحتوى التربوي."
        keywords="شروط الاستخدام منصة نبتة, الأحكام والشروط, اتفاقية منصة نبتة"
        url="/terms"
      />

      <PageHero tone="sky" title="الشروط والأحكام" description="نرجو قراءة هذه الشروط بعناية قبل استخدام منصة نبتة.">
        <Box
          component="span"
          sx={{
            display: 'inline-block',
            fontFamily: kidFont,
            fontWeight: 700,
            fontSize: '0.95rem',
            px: 2,
            py: 0.5,
            borderRadius: '999px',
            backgroundColor: 'rgba(255,255,255,.18)'
          }}
        >
          آخر تحديث: {new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}
        </Box>
      </PageHero>

      <Container maxWidth="md" sx={{ pt: { xs: 3, md: 4 }, pb: { xs: 6, md: 8 } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {sections.map((section, index) => {
            const c = crayon(index);
            return (
              <Box
                key={section.id}
                component="section"
                id={section.id}
                sx={{
                  backgroundColor: '#fff',
                  borderRadius: '28px',
                  borderInlineStart: `8px solid ${c.main}`,
                  boxShadow: `0 6px 0 ${kidColors.ink}0F`,
                  px: { xs: 3, md: 4.5 },
                  py: { xs: 3, md: 3.5 }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.75, mb: 1.75 }}>
                  <Box
                    aria-hidden="true"
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '14px',
                      backgroundColor: c.main,
                      color: c.text,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      fontFamily: kidFont,
                      fontWeight: 800,
                      fontSize: 17,
                      boxShadow: `0 3px 0 ${c.deep}`
                    }}
                  >
                    {index + 1}
                  </Box>
                  <Typography
                    component="h2"
                    sx={{ fontFamily: kidFont, fontWeight: 800, color: kidColors.ink, fontSize: { xs: '1.2rem', md: '1.4rem' } }}
                  >
                    {section.title}
                  </Typography>
                </Box>
                <Box>{section.content}</Box>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
