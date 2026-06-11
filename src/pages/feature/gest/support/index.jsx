import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Grid, Paper, Fade, Button } from '@mui/material';
import SEO from 'components/SEO';
import vodafoneImg from 'assets/Home/vodafone (1).png';
import instaImg from 'assets/Home/insta (1).png';
import paypalImg from 'assets/Home/paypal (1).png';
import qnb_bankImg from 'assets/Home/qnb-bank (1).png';
import patreonImg from 'assets/Home/patreon (1).png';
import coffeeImg from 'assets/Home/coffee (1).png';

import { Messages1, Share, Gift, MessageText1 } from 'iconsax-react';

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handle = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <Button
      onClick={handle}
      size="small"
      variant="outlined"
      sx={{
        mt: 1,
        borderRadius: '8px',
        borderColor: copied ? 'success.main' : '#FFD666',
        color: copied ? 'success.main' : '#2E2A39',
        fontSize: '12px',
        fontWeight: 600,
        px: 2,
        '&:hover': { borderColor: '#FFD666', backgroundColor: 'rgba(255,214,102,0.08)' }
      }}
    >
      {copied ? '✓ تم النسخ' : 'نسخ'}
    </Button>
  );
}

export default function Support() {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(true);
  }, []);

  const linkButton = (label, href) => (
    <Button
      variant="contained"
      href={href}
      target="_blank"
      sx={{
        px: 4,
        py: 1,
        borderRadius: '12px',
        backgroundColor: '#FFD666',
        color: '#2E2A39',
        fontWeight: 700,
        boxShadow: '0 8px 20px rgba(255, 214, 102, 0.3)',
        '&:hover': { backgroundColor: '#ffcf4d' }
      }}
    >
      {label}
    </Button>
  );

  const supportMethods = [
    {
      id: 'qnb',
      image: qnb_bankImg,
      content: (
        <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="body1" sx={{ fontWeight: 700, mb: 0.5 }}>حمدي محمود عشري عثمان</Typography>
          <Typography variant="h6" sx={{ letterSpacing: '1px', mb: 0.5, direction: 'ltr' }}>1020518304835</Typography>
          <CopyButton text="1020518304835" />
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>فرع ش شامبليون، وسط القاهرة، قصر النيل</Typography>
        </Box>
      )
    },
    {
      id: 'instapay',
      image: instaImg,
      content: (
        <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>اسم المستخدم: qnb-hamdy</Typography>
          <CopyButton text="qnb-hamdy" />
        </Box>
      )
    },
    {
      id: 'wallets',
      image: vodafoneImg,
      content: (
        <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>رقم التحويل: 01067007977</Typography>
          <CopyButton text="01067007977" />
          <Typography variant="caption" sx={{ color: 'error.main', fontWeight: 600, display: 'block', mt: 1 }}>الرقم خاص بالدعم فقط — داخل مصر</Typography>
        </Box>
      )
    },
    {
      id: 'bmc',
      title: 'Buy Me a Coffee',
      image: coffeeImg,
      content: (
        <Box sx={{ textAlign: 'center' }}>
          {linkButton('هنا', 'https://www.buymeacoffee.com/HamdyMahmoud')}
        </Box>
      )
    },
    {
      id: 'patreon',
      title: 'باتريون Patreon',
      image: patreonImg,
      content: (
        <Box sx={{ textAlign: 'center' }}>
          {linkButton('هنا', 'https://www.patreon.com/NabtaStudio')}
        </Box>
      )
    },
    {
      id: 'paypal',
      title: 'باي بال PayPal',
      image: paypalImg,
      content: (
        <Box sx={{ textAlign: 'center' }}>
          {linkButton('هنا', 'https://paypal.me/HamdyMahmoudAshry')}
        </Box>
      )
    }
  ];

  return (
    <Fade in={checked} timeout={800}>
      <Box sx={{ py: 6, width: '100%', minHeight: '100vh', backgroundColor: '#fcfcfc' }}>
        <SEO
          title="كيف تدعمنا؟"
          description="ساهم ودعم استمرار منصة نبتة لتقديم محتوى تعليمي وتربوي قيم وآمن للأطفال. تعرف على طرق الدعم المتنوعة المتاحة."
          keywords="دعم منصة نبتة, التبرع للتعليم, منصات تعليم الأطفال, تمويل محتوى تربوي, رعاة نبتة"
          url="/support"
        />
        <Container maxWidth="lg">
          {/* Main Title */}
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography variant="h1" sx={{ fontWeight: 800, color: 'primary.main', mb: 2, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
              كيف تدعمنا؟
            </Typography>
          </Box>
          {/* Support Methods Grid */}
          <Grid container spacing={3}>
            {supportMethods.map((method) => (
              <Grid item xs={12} sm={6} md={4} key={method.id}>
                <Paper
                  elevation={0}
                  sx={{
                    height: '100%',
                    borderRadius: '10px',
                    border: '1px solid',
                    borderColor: 'divider',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                      transform: 'translateY(-5px)',
                      borderColor: '#FFD666'
                    }
                  }}
                >
                  {/* Image — top full width */}
                  <Box
                    sx={{
                      width: '100%',
                      backgroundColor: '#f8f8f8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <Box
                      component="img"
                      src={method.image}
                      alt={method.title}
                      sx={{ maxWidth: '100%', objectFit: 'contain' }}
                    />
                  </Box>

                  {/* Content — bottom */}
                  <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#2E2A39', mb: 2, textAlign: 'center' }}>
                      {method.title}
                    </Typography>
                    {method.content}
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
          {/* Intro Section */}
          <Box sx={{ my: 6 }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: '24px',
                backgroundColor: '#fff',
                boxShadow: '0 10px 40px rgba(0,0,0,0.03)',
                border: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                flexDirection: 'column',
                gap: 3
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  color: '#2E2A39',
                  lineHeight: 1.6,
                  fontSize: { xs: '20px', md: '24px' },
                  borderRight: '5px solid #FFD666',
                  pr: 2
                }}
              >
                شاركنا التحدي في بناء جيل واعي متفتح منذ نعومة أظافره وطفولته البريئة وكُن أحد الداعمين!
              </Typography>

              <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '17px', lineHeight: 1.9 }}>
                أهلًا ومرحبًا بالداعم الكريم.. نحن في نبتة نؤمن بأن الأطفال مثل النباتات كلما اعتنيت بهم وسقيتهم المعرفة السليمة أثمروا وأزهروا نبتة طيبة ونافعة.
              </Typography>

              <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '17px', lineHeight: 1.9 }}>
                ونسعى من خلال “داعمين نبتة” لإيصال محتوانا التربوي والتعليمي لجميع الأطفال حول العالم؛ خاصة في عالمنا العربي؛ وبالأخص (الغير مقتدرين).
              </Typography>

              <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '17px', lineHeight: 1.9 }}>
                يمكننا تحقيق هذه الرسالة السامية معًا، نحتاج مساعدتك؛ لذلك نطمح لمشاركة “ألف داعم” معنا شهريًا لإتاحة فرصة تربوية تعليمية لأطفالنا فهم يستحقون ذلك منا.
              </Typography>

              <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '17px', lineHeight: 1.9 }}>
                تم بالفعل توفير دعم كامل لأكثر من 1,180,000 طفل حول العالم بقيمة 2,360,000 مليون دولار، من خلال تحميل تطبيق “لغتي العربية” بشكل مجاني تمامًا وتعلم الأطفال من خلاله؛ فنحن (ولله الحمد والمنة) منذ أن بدأنا لم يكن هدفنا الربح والتكسب في المقام الأول، ولكن نحتاج مساعدتك لنكمل الطريق في دعم الأطفال وأولياء أمورهم.
              </Typography>
            </Paper>
          </Box>



          {/* Support Types */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h2" sx={{ fontWeight: 800, color: 'primary.main', mb: 4, textAlign: 'center', fontSize: { xs: '24px', md: '30px' } }}>
              يمكنك دعمنا بطرق متعددة ومنها: الرأي والمشورة، مشاركة المحتوى، الدعم المادي، الدعاء.
            </Typography>

            <Grid container spacing={3}>
              {[
                {
                  title: 'الرأي والمشورة',
                  desc: 'دعمكم بالرأي والمشورة يلهمنا كثيرًا في خطتنا وعملنا وأسلوب تفكيرنا في التطوير، فالنبي ﷺ مثلما أمر بالاستخارة، أمر بالمشاورة أيضًا، و(الله جلّ وعز) يقول: وَأَمْرُهُمْ شُورَى بَيْنَهُمْ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ [الشورى:38].',
                  icon: <Messages1 size="32" color="#0088CC" variant="Bulk" />,
                  bgColor: '#e3f2fd'
                },
                {
                  title: 'مشاركة المحتوى',
                  desc: 'مشاركتك لمحتوانا مع دائرة معارفك يساعدنا كثيرًا وهو دلالة على الخير، فلا تدري لعل أحدًا ممن شاركتهم محتوانا قادرًا على دعمنا ماديًا بحيث يساعدنا هذا على النمو والاستمرار.',
                  icon: <Share size="32" color="#0088CC" variant="Bulk" />,
                  bgColor: '#e8f5e9'
                },
                {
                  title: 'الدعم المادي',
                  desc: 'دعمكم المادي، يمثل لنا أمر أكبر من الاستمرارية وفقط، بل للتطوير ومواكبة التقدم الهائل والسريع لمجريات العصر، فنحن مستمرين على كل حال، بإذن الله تعالى.. لكندعمكم المادي يجعلنا نخطو خطوات أسرع للحاق بركب التطور.',
                  icon: <Gift size="32" color="#0088CC" variant="Bulk" />,
                  bgColor: '#fffde7'
                },
                {
                  title: 'الدعاء',
                  desc: 'أخي الكريم، إن لم يكن في استطاعتك دعمنا ماديًا، فأنت تملك أكثر من ذلك وهو الدعاء (لله جلّ وعز) لنا بظهر الغيب، وهذا عندنا أقوى دعم من أجل تحقيق الخير من خلال نشر ما ينفع الناس، وجزاك الله خيرًا.',
                  icon: <MessageText1 size="32" color="#0088CC" variant="Bulk" />,
                  bgColor: '#f3e5f5'
                }
              ].map((item, idx) => (
                <Grid item xs={12} sm={6} key={idx}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      height: '100%',
                      borderRadius: '20px',
                      backgroundColor: '#fff',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.02)',
                      border: '1.5px solid #eee',
                      display: 'flex',
                      gap: 3,
                      alignItems: 'flex-start',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 12px 40px rgba(0,0,0,0.06)',
                        borderColor: '#FFD666'
                      }
                    }}
                  >
                    <Box sx={{ p: 1.5, borderRadius: '16px', backgroundColor: item.bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {item.icon}
                    </Box>
                    <Box>
                      <Typography variant="h5" sx={{ fontWeight: 800, color: '#2E2A39', mb: 1.5, fontSize: '19px' }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, fontSize: '15px' }}>
                        {item.desc}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Note Section */}
          <Box sx={{ mb: 6 }}>
            <Box sx={{ p: 3, backgroundColor: '#fff4e5', borderRadius: '16px', borderRight: '4px solid #FFD666' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#b27b00', mb: 1, fontSize: '18px' }}>
                ملاحظة!
              </Typography>
              <Typography variant="body1" sx={{ color: '#5c4100', lineHeight: 1.8, fontWeight: 500, fontSize: '16px' }}>
                قبل اتخاذك القرار بدعمك لنا ماديًا فاعلم أنه لا يوجد مزايا خاصة لهذا النوع من الدعم، فاجعل نيتك بأن يكون الدعم لاستمرار المنصة ونشر ما ينفع الناس.
              </Typography>
            </Box>
          </Box>

          {/* Impact Section */}
          <Box sx={{ mb: 6 }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: '24px',
                backgroundColor: '#fff',
                boxShadow: '0 10px 40px rgba(0,0,0,0.03)',
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              <Typography variant="h3" sx={{ fontWeight: 800, color: 'primary.main', mb: 1, fontSize: { xs: '22px', md: '28px' } }}>
                كيف تؤثر مشاركتكم ودعمكم لنا؟
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, fontSize: '16px' }}>
                يتم إنفاق الدعم على تطوير واستدامة المنصة كما يلي:
              </Typography>

              <Grid container spacing={3}>
                {[
                  { title: 'فريق عمل أكبر', desc: 'تعيين أفراد ذو كفاءة برواتب يساعدوننا في بعض المهمات لكي نتفرغ لمهمات أخرى.' },
                  { title: 'سرعة إنتاج', desc: 'الإنفاق على تحويل الأفكار إلى منتجات تعليمية حقيقية جديدة وظهورها إلى العلن في وقت أسرع مما سبق.' },
                  { title: 'التسويق', desc: 'تكاليف التسويق والتعريف بالمنصة من أجل انتشار أوسع.' },
                  { title: 'تحسين وتطوير', desc: 'تطوير البنية التحتية لمنصة نبتة من خلال تحديث الأجهزة والأدوات اللازمة للعمل، لتوفير بيئة تربوية تعليمية آمنة ومنتجة.' },
                  { title: 'هامش ربح', desc: 'تحقيق هامش ربح عادل للمؤسسين من أجل تفرغهم الكامل لنمو وتوسع المنصة.' }
                ].map((impact, idx) => (
                  <Grid item xs={12} sm={6} md={4} key={idx}>
                    <Box sx={{ p: 2.5, height: '100%', borderRadius: '16px', backgroundColor: '#fcfcfc', border: '1px solid #f0f0f0' }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#0088CC', mb: 1, fontSize: '17px' }}>
                        {impact.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7, fontSize: '14px' }}>
                        {impact.desc}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Box>




        </Container>
      </Box>
    </Fade>
  );
}
