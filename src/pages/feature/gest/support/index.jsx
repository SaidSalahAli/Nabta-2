import React, { useState } from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import SEO from 'components/SEO';
import vodafoneImg from 'assets/Home/vodafone (1).png';
import instaImg from 'assets/Home/insta (1).png';
import paypalImg from 'assets/Home/paypal (1).png';
import qnb_bankImg from 'assets/Home/qnb-bank (1).png';
import patreonImg from 'assets/Home/patreon (1).png';
import coffeeImg from 'assets/Home/coffee (1).png';
import { Messages1, Share, Gift, MessageText1, Copy, TickCircle } from 'iconsax-react';
import { PageHero, KidButton, SectionHeading, Sprout, crayon, kidColors, kidFont, kidType, stickerCard } from 'components/kids';

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handle = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <KidButton
      size="small"
      color={copied ? 'leaf' : 'white'}
      onClick={handle}
      startIcon={copied ? <TickCircle size={16} color="#fff" variant="Bold" /> : <Copy size={16} color={kidColors.ink} />}
      sx={{ mt: 1.5 }}
    >
      {copied ? 'تم النسخ' : 'نسخ'}
    </KidButton>
  );
}

const valueSx = { fontFamily: kidFont, fontWeight: 800, color: kidColors.ink, fontSize: '1.15rem', direction: 'ltr' };
const noteSx = { fontFamily: kidFont, color: kidColors.inkSoft, mt: 1, fontSize: '0.95rem', lineHeight: 1.7 };

const supportMethods = [
  {
    id: 'qnb',
    image: qnb_bankImg,
    title: 'تحويل بنكي QNB',
    content: (
      <>
        <Typography sx={{ fontFamily: kidFont, fontWeight: 700, color: kidColors.ink }}>حمدي محمود عشري عثمان</Typography>
        <Typography sx={{ ...valueSx, letterSpacing: '1px' }}>1020518304835</Typography>
        <CopyButton text="1020518304835" />
        <Typography sx={noteSx}>فرع ش شامبليون، وسط القاهرة، قصر النيل</Typography>
      </>
    )
  },
  {
    id: 'instapay',
    image: instaImg,
    title: 'إنستاباي',
    content: (
      <>
        <Typography sx={{ fontFamily: kidFont, fontWeight: 700, color: kidColors.inkSoft }}>اسم المستخدم</Typography>
        <Typography sx={valueSx}>qnb-hamdy</Typography>
        <CopyButton text="qnb-hamdy" />
      </>
    )
  },
  {
    id: 'wallets',
    image: vodafoneImg,
    title: 'المحافظ الإلكترونية',
    content: (
      <>
        <Typography sx={{ fontFamily: kidFont, fontWeight: 700, color: kidColors.inkSoft }}>رقم التحويل</Typography>
        <Typography sx={valueSx}>01007560466</Typography>
        <CopyButton text="01007560466" />
        <Typography sx={{ ...noteSx, color: kidColors.coralDeep, fontWeight: 700 }}>الرقم خاص بالدعم فقط — داخل مصر</Typography>
      </>
    )
  },
  { id: 'bmc', title: 'Buy Me a Coffee', image: coffeeImg, href: 'https://www.buymeacoffee.com/HamdyMahmoud' },
  { id: 'patreon', title: 'باتريون Patreon', image: patreonImg, href: 'https://www.patreon.com/NabtaStudio' },
  { id: 'paypal', title: 'باي بال PayPal', image: paypalImg, href: 'https://paypal.me/HamdyMahmoudAshry' }
];

const supportTypes = [
  {
    title: 'الرأي والمشورة',
    desc: 'دعمكم بالرأي والمشورة يلهمنا كثيرًا في خطتنا وعملنا وأسلوب تفكيرنا في التطوير، فالنبي ﷺ مثلما أمر بالاستخارة، أمر بالمشاورة أيضًا، و(الله جلّ وعز) يقول: وَأَمْرُهُمْ شُورَى بَيْنَهُمْ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ [الشورى:38].',
    Icon: Messages1
  },
  {
    title: 'مشاركة المحتوى',
    desc: 'مشاركتك لمحتوانا مع دائرة معارفك يساعدنا كثيرًا وهو دلالة على الخير، فلا تدري لعل أحدًا ممن شاركتهم محتوانا قادرًا على دعمنا ماديًا بحيث يساعدنا هذا على النمو والاستمرار.',
    Icon: Share
  },
  {
    title: 'الدعم المادي',
    desc: 'دعمكم المادي، يمثل لنا أمر أكبر من الاستمرارية وفقط، بل للتطوير ومواكبة التقدم الهائل والسريع لمجريات العصر، فنحن مستمرين على كل حال، بإذن الله تعالى.. لكن دعمكم المادي يجعلنا نخطو خطوات أسرع للحاق بركب التطور.',
    Icon: Gift
  },
  {
    title: 'الدعاء',
    desc: 'أخي الكريم، إن لم يكن في استطاعتك دعمنا ماديًا، فأنت تملك أكثر من ذلك وهو الدعاء (لله جلّ وعز) لنا بظهر الغيب، وهذا عندنا أقوى دعم من أجل تحقيق الخير من خلال نشر ما ينفع الناس، وجزاك الله خيرًا.',
    Icon: MessageText1
  }
];

const impacts = [
  { title: 'فريق عمل أكبر', desc: 'تعيين أفراد ذو كفاءة برواتب يساعدوننا في بعض المهمات لكي نتفرغ لمهمات أخرى.' },
  { title: 'سرعة إنتاج', desc: 'الإنفاق على تحويل الأفكار إلى منتجات تعليمية حقيقية جديدة وظهورها إلى العلن في وقت أسرع مما سبق.' },
  { title: 'التسويق', desc: 'تكاليف التسويق والتعريف بالمنصة من أجل انتشار أوسع.' },
  {
    title: 'تحسين وتطوير',
    desc: 'تطوير البنية التحتية لمنصة نبتة من خلال تحديث الأجهزة والأدوات اللازمة للعمل، لتوفير بيئة تربوية تعليمية آمنة ومنتجة.'
  },
  { title: 'هامش ربح', desc: 'تحقيق هامش ربح عادل للمؤسسين من أجل تفرغهم الكامل لنمو وتوسع المنصة.' }
];

export default function Support() {
  return (
    <Box sx={{ backgroundColor: kidColors.cloud }}>
      <SEO
        title="كيف تدعمنا؟"
        description="ساهم ودعم استمرار منصة نبتة لتقديم محتوى تعليمي وتربوي قيم وآمن للأطفال. تعرف على طرق الدعم المتنوعة المتاحة."
        keywords="دعم منصة نبتة, التبرع للتعليم, منصات تعليم الأطفال, تمويل محتوى تربوي, رعاة نبتة"
        url="/support"
      />

      <PageHero
        tone="berry"
        title="كيف تدعمنا؟"
        description="شاركنا التحدي في بناء جيل واعٍ متفتح منذ نعومة أظافره وطفولته البريئة، وكُن أحد الداعمين!"
      />

      <Container maxWidth="lg" sx={{ pt: { xs: 3, md: 4 }, pb: { xs: 6, md: 8 } }}>
        {/* Payment methods */}
        <Grid container spacing={3} sx={{ mb: { xs: 7, md: 9 } }}>
          {supportMethods.map((method, i) => {
            const c = crayon(i);
            return (
              <Grid item xs={12} sm={6} md={4} key={method.id}>
                <Box sx={{ ...stickerCard(c.main), height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                  <Box sx={{ backgroundColor: c.soft, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 1.5 }}>
                    <Box
                      component="img"
                      src={method.image}
                      alt={method.title}
                      loading="lazy"
                      sx={{ maxWidth: '100%', maxHeight: 150, objectFit: 'contain', borderRadius: '16px' }}
                    />
                  </Box>
                  <Box
                    sx={{
                      p: 2.5,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      flexGrow: 1,
                      justifyContent: 'center'
                    }}
                  >
                    <Typography
                      component="h3"
                      sx={{ fontFamily: kidFont, fontWeight: 800, fontSize: '1.2rem', color: kidColors.ink, mb: 1.5 }}
                    >
                      {method.title}
                    </Typography>
                    {method.content}
                    {method.href && (
                      <KidButton component="a" href={method.href} target="_blank" rel="noopener noreferrer" color="sun">
                        ادعمنا من هنا
                      </KidButton>
                    )}
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>

        {/* Story */}
        <Box
          sx={{
            position: 'relative',
            mb: { xs: 7, md: 9 },
            p: { xs: 3, md: 5 },
            borderRadius: '36px',
            backgroundColor: '#fff',
            border: `3px solid ${kidColors.leaf}`,
            boxShadow: `0 10px 0 ${kidColors.leaf}40`
          }}
        >
          <Sprout size={70} sx={{ top: -40, insetInlineStart: 36 }} />
          <Typography
            component="h2"
            sx={{
              fontFamily: kidFont,
              fontWeight: 800,
              fontSize: { xs: '1.4rem', md: '1.7rem' },
              color: kidColors.ink,
              mb: 2.5,
              lineHeight: 1.6
            }}
          >
            أهلًا ومرحبًا بالداعم الكريم
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 860 }}>
            <Typography sx={{ ...kidType.body, color: kidColors.inkSoft }}>
              نحن في نبتة نؤمن بأن الأطفال مثل النباتات كلما اعتنيت بهم وسقيتهم المعرفة السليمة أثمروا وأزهروا نبتة طيبة ونافعة.
            </Typography>
            <Typography sx={{ ...kidType.body, color: kidColors.inkSoft }}>
              ونسعى من خلال “داعمين نبتة” لإيصال محتوانا التربوي والتعليمي لجميع الأطفال حول العالم؛ خاصة في عالمنا العربي؛ وبالأخص (الغير
              مقتدرين).
            </Typography>
            <Typography sx={{ ...kidType.body, color: kidColors.inkSoft }}>
              يمكننا تحقيق هذه الرسالة السامية معًا، نحتاج مساعدتك؛ لذلك نطمح لمشاركة “ألف داعم” معنا شهريًا لإتاحة فرصة تربوية تعليمية
              لأطفالنا فهم يستحقون ذلك منا.
            </Typography>
            <Typography sx={{ ...kidType.body, color: kidColors.inkSoft }}>
              تم بالفعل توفير دعم كامل لأكثر من{' '}
              <Box component="strong" sx={{ color: kidColors.leafDeep }}>
                1,180,000 طفل
              </Box>{' '}
              حول العالم بقيمة 2,360,000 مليون دولار، من خلال تحميل تطبيق “لغتي العربية” بشكل مجاني تمامًا وتعلم الأطفال من خلاله؛ فنحن
              (ولله الحمد والمنة) منذ أن بدأنا لم يكن هدفنا الربح والتكسب في المقام الأول، ولكن نحتاج مساعدتك لنكمل الطريق في دعم الأطفال
              وأولياء أمورهم.
            </Typography>
          </Box>
        </Box>

        {/* Ways to support */}
        <Box sx={{ mb: { xs: 7, md: 9 } }}>
          <SectionHeading title="طرق متعددة لدعمنا" subtitle="الرأي والمشورة، مشاركة المحتوى، الدعم المادي، والدعاء." />
          <Grid container spacing={3}>
            {supportTypes.map(({ title, desc, Icon }, idx) => {
              const c = crayon(idx);
              return (
                <Grid item xs={12} sm={6} key={title}>
                  <Box
                    sx={{
                      ...stickerCard(c.main, { lift: false }),
                      p: { xs: 3, md: 3.5 },
                      height: '100%',
                      display: 'flex',
                      gap: 2.5,
                      alignItems: 'flex-start'
                    }}
                  >
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '20px',
                        backgroundColor: c.main,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: `0 4px 0 ${c.deep}`,
                        transform: idx % 2 ? 'rotate(4deg)' : 'rotate(-4deg)'
                      }}
                    >
                      <Icon size={30} color={c.text} variant="Bold" />
                    </Box>
                    <Box>
                      <Typography
                        component="h3"
                        sx={{ fontFamily: kidFont, fontWeight: 800, color: kidColors.ink, mb: 1, fontSize: '1.3rem' }}
                      >
                        {title}
                      </Typography>
                      <Typography sx={{ fontFamily: kidFont, color: kidColors.inkSoft, lineHeight: 1.85, fontSize: '1.02rem' }}>
                        {desc}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>

        {/* Note */}
        <Box
          role="note"
          sx={{
            mb: { xs: 7, md: 9 },
            p: { xs: 3, md: 3.5 },
            backgroundColor: kidColors.sunSoft,
            borderRadius: '28px',
            border: `3px dashed ${kidColors.sunDeep}`,
            display: 'flex',
            gap: 2,
            alignItems: 'flex-start'
          }}
        >
          <Box sx={{ fontSize: 32, lineHeight: 1 }} aria-hidden="true">
            💡
          </Box>
          <Box>
            <Typography sx={{ fontFamily: kidFont, fontWeight: 800, color: kidColors.ink, mb: 0.5, fontSize: '1.2rem' }}>
              قبل أن تدعمنا ماديًا
            </Typography>
            <Typography sx={{ fontFamily: kidFont, color: kidColors.inkSoft, lineHeight: 1.85, fontSize: '1.05rem' }}>
              اعلم أنه لا توجد مزايا خاصة لهذا النوع من الدعم، فاجعل نيتك أن يكون الدعم لاستمرار المنصة ونشر ما ينفع الناس.
            </Typography>
          </Box>
        </Box>

        {/* Impact */}
        <Box>
          <SectionHeading
            title="كيف يؤثر دعمكم؟"
            subtitle="يتم إنفاق الدعم على تطوير واستدامة المنصة كما يلي:"
            lineColor={kidColors.leaf}
          />
          <Grid container spacing={3} justifyContent="center">
            {impacts.map((impact, idx) => {
              const c = crayon(idx);
              return (
                <Grid item xs={12} sm={6} md={4} key={impact.title}>
                  <Box sx={{ p: 3, height: '100%', borderRadius: '26px', backgroundColor: '#fff', borderTop: `8px solid ${c.main}` }}>
                    <Typography
                      component="h3"
                      sx={{ fontFamily: kidFont, fontWeight: 800, color: kidColors.ink, mb: 1, fontSize: '1.2rem' }}
                    >
                      {impact.title}
                    </Typography>
                    <Typography sx={{ fontFamily: kidFont, color: kidColors.inkSoft, lineHeight: 1.8, fontSize: '1rem' }}>
                      {impact.desc}
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
