import { useState, useRef } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  Button,
  Stack,
  Collapse,
  Menu,
  MenuItem,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton
} from '@mui/material';

import { useGetEpisode } from 'api/episodes';
import { Share, Calendar, Profile, DocumentText, DocumentDownload, Document, Eye, CloseCircle, Export } from 'iconsax-react';
import SEO from 'components/SEO';
import {
  PageHero,
  KidButton,
  EmptyState,
  PageLoader,
  SectionHeading,
  crayon,
  kidColors,
  kidFont,
  kidType,
  stickerCard
} from 'components/kids';

// ─── Share Button ────────────────────────────────────────────────────────────
function ShareButton({ episode }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const buttonRef = useRef(null);

  const shareUrl = window.location.href;
  const shareTitle = episode?.TitleAr || '';

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: shareTitle, url: shareUrl });
      } catch (_) {
        /* user cancelled */
      }
    } else {
      setOpen(true);
    }
  };

  const platforms = [
    { label: 'واتساب', color: '#1DA851', emoji: '💬', href: `https://wa.me/?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}` },
    {
      label: 'فيسبوك',
      color: '#1877F2',
      emoji: '📘',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    },
    {
      label: 'تويتر / X',
      color: kidColors.ink,
      emoji: '🐦',
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`
    },
    {
      label: 'تيليجرام',
      color: kidColors.sky,
      emoji: '✈️',
      href: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`
    },
    {
      label: copied ? 'تم النسخ!' : 'نسخ الرابط',
      color: copied ? kidColors.leafDeep : kidColors.inkSoft,
      emoji: '🔗',
      onClick: async () => {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  ];

  const itemSx = (color) => ({ borderRadius: '14px', color, fontFamily: kidFont, fontWeight: 700, gap: 1.5, py: 1 });

  return (
    <>
      <KidButton ref={buttonRef} color="berry" onClick={handleShare} startIcon={<Share size={20} color="#fff" variant="Bold" />}>
        انشر الحلقة
      </KidButton>

      <Menu
        open={open}
        anchorEl={buttonRef.current}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        disableScrollLock
        keepMounted
        PaperProps={{
          sx: {
            mt: 1.5,
            borderRadius: '22px',
            p: 1,
            minWidth: 230,
            border: `3px solid ${kidColors.ink}14`,
            boxShadow: `0 8px 0 ${kidColors.ink}14`
          }
        }}
      >
        <Typography sx={{ fontFamily: kidFont, fontWeight: 800, mb: 1, textAlign: 'center', color: kidColors.ink, px: 2 }}>
          مشاركة الحلقة
        </Typography>
        {platforms.map((p) =>
          p.onClick ? (
            <MenuItem key={p.label} onClick={p.onClick} sx={itemSx(p.color)}>
              {p.emoji} {p.label}
            </MenuItem>
          ) : (
            <MenuItem
              key={p.label}
              component="a"
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              sx={itemSx(p.color)}
            >
              {p.emoji} {p.label}
            </MenuItem>
          )
        )}
      </Menu>
    </>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ViewEpisode() {
  const { id } = useParams();
  const [showTranscript, setShowTranscript] = useState(false);
  const [previewPdf, setPreviewPdf] = useState(null);

  const { episode, episodeLoading } = useGetEpisode(id);

  if (episodeLoading) return <PageLoader />;

  if (!episode) {
    return (
      <Box sx={{ py: { xs: 8, md: 12 }, px: 2 }}>
        <EmptyState
          title="لم نجد هذه الحلقة"
          description="ربما نُقلت أو حُذفت. تصفّح باقي الحلقات واختر ما يناسب طفلك."
          action={
            <KidButton component={RouterLink} to="/episodes" color="sky">
              كل الحلقات
            </KidButton>
          }
        />
      </Box>
    );
  }

  const worksheets = episode.EpisodeWorksheets || episode.episode_worksheets || episode.EpisodeWorksheet || [];

  const dateObject = new Date(episode.CreatedAt || new Date());
  const formattedDate = dateObject.toLocaleDateString('ar-EG');
  let hijriDate = '';
  try {
    hijriDate = new Intl.DateTimeFormat('ar-SA-u-ca-islamic', { day: 'numeric', month: 'long', year: 'numeric' }).format(dateObject);
  } catch (e) {
    // fallback: no hijri date
  }

  return (
    <Box sx={{ backgroundColor: kidColors.cloud }}>
      <SEO
        title={episode.TitleAr}
        description={episode.DescriptionAr?.slice(0, 160)}
        image={episode.thumbnail_image || episode.cover_image}
        url={`/episodes/${id}`}
      />

      <PageHero
        title={episode.TitleAr}
        description={episode.DescriptionAr}
        crumbs={[{ label: 'الحلقات', to: '/episodes' }, { label: episode.TitleAr }]}
      />

      <Container maxWidth="lg" sx={{ pt: { xs: 3, md: 4 }, pb: { xs: 6, md: 8 } }}>
        {/* Video in a chunky "TV" frame */}
        <Box
          sx={{
            p: { xs: 1, sm: 1.5 },
            borderRadius: { xs: '24px', md: '36px' },
            backgroundColor: kidColors.sun,
            boxShadow: `0 12px 0 ${kidColors.sunDeep}`,
            mb: { xs: 5, md: 6 }
          }}
        >
          <Box
            sx={{
              width: '100%',
              aspectRatio: '16/9',
              borderRadius: { xs: '18px', md: '26px' },
              overflow: 'hidden',
              backgroundColor: '#000'
            }}
          >
            <iframe
              width="100%"
              height="100%"
              src={episode.VideoUrl?.replace('watch?v=', 'embed/')}
              title={episode.TitleAr}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ display: 'block' }}
            />
          </Box>
        </Box>

        {/* Meta + actions */}
        <Box
          sx={{
            ...stickerCard(kidColors.sky, { lift: false }),
            p: { xs: 2.5, md: 3 },
            mb: { xs: 5, md: 6 },
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2.5
          }}
        >
          <Stack spacing={1.25} sx={{ textAlign: { xs: 'center', md: 'start' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' }, gap: 1 }}>
              <Profile size={22} color={kidColors.sky} variant="Bold" />
              <Typography sx={{ fontFamily: kidFont, fontWeight: 700, color: kidColors.ink }}>
                بقلم: {episode.Author || 'غير محدد'}
              </Typography>
            </Box>
            <Box
              sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' }, gap: 1, flexWrap: 'wrap' }}
            >
              <Calendar size={22} color={kidColors.sky} variant="Bold" />
              <Typography sx={{ fontFamily: kidFont, color: kidColors.inkSoft }}>
                {formattedDate} م{hijriDate ? ` | ${hijriDate}` : ''}
              </Typography>
            </Box>
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} gap={1.5} sx={{ width: { xs: '100%', sm: 'auto' } }}>
            <KidButton
              color="sky"
              onClick={() => setShowTranscript((v) => !v)}
              aria-expanded={showTranscript}
              aria-controls="episode-transcript"
              startIcon={<DocumentText size={20} color="#fff" variant="Bold" />}
            >
              {showTranscript ? 'إخفاء النص' : 'اقرأ محتوى الحلقة'}
            </KidButton>
            <ShareButton episode={episode} />
          </Stack>
        </Box>

        <Collapse in={showTranscript} id="episode-transcript">
          <Box
            sx={{
              mb: { xs: 5, md: 6 },
              p: { xs: 3, md: 4.5 },
              borderRadius: '30px',
              backgroundColor: '#fff',
              border: `3px dashed ${kidColors.sun}`,
              backgroundImage: `repeating-linear-gradient(transparent, transparent 41px, ${kidColors.skySoft} 42px)`
            }}
          >
            <Typography sx={{ ...kidType.body, color: kidColors.ink, whiteSpace: 'pre-line', lineHeight: '42px' }}>
              {episode.TranscriptAr || 'لا يوجد نص لهذه الحلقة.'}
            </Typography>
          </Box>
        </Collapse>

        {/* Worksheets */}
        {worksheets.length > 0 && (
          <Box>
            <SectionHeading
              title="أوراق عمل الحلقة"
              subtitle="اطبعها ودع طفلك يطبّق ما تعلّمه بالقلم والألوان."
              lineColor={kidColors.leaf}
            />
            <Grid container spacing={3}>
              {worksheets.map((ws, idx) => {
                const c = crayon(idx);
                const title = ws.TitleAr || ws.title_ar || 'ورقة عمل';
                const description = ws.DescriptionAr || ws.description_ar || '';
                const fileUrl = ws.FileUrl || ws.file_url || '';
                const thumbnail = ws.ThumbnailImage || ws.thumbnail_image || '';
                const fileType = (ws.FileType || ws.file_type || 'pdf').toUpperCase();

                return (
                  <Grid item xs={12} sm={6} md={4} key={ws.Id || ws.id || idx}>
                    <Box sx={{ ...stickerCard(c.main), p: 1.5, height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <Box
                        sx={{
                          position: 'relative',
                          height: 190,
                          borderRadius: '20px',
                          overflow: 'hidden',
                          backgroundColor: c.soft,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 2
                        }}
                      >
                        {thumbnail ? (
                          <Box
                            component="img"
                            src={thumbnail}
                            alt={title}
                            loading="lazy"
                            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        ) : (
                          <Document size={60} color={c.main} variant="Bold" />
                        )}
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 10,
                            insetInlineEnd: 10,
                            fontWeight: 800,
                            fontSize: 11,
                            color: '#fff',
                            backgroundColor: kidColors.coral,
                            borderRadius: '10px',
                            px: 1,
                            py: 0.25,
                            direction: 'ltr'
                          }}
                        >
                          {fileType}
                        </Box>
                      </Box>

                      <Box sx={{ px: 1, flexGrow: 1 }}>
                        <Typography
                          component="h3"
                          sx={{ fontFamily: kidFont, fontWeight: 800, fontSize: '1.2rem', color: kidColors.ink, lineHeight: 1.45, mb: 1 }}
                        >
                          {title}
                        </Typography>
                        {description && (
                          <Typography
                            sx={{
                              fontFamily: kidFont,
                              color: kidColors.inkSoft,
                              lineHeight: 1.7,
                              whiteSpace: 'pre-line',
                              overflow: 'hidden',
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical'
                            }}
                          >
                            {description}
                          </Typography>
                        )}
                      </Box>

                      <Stack direction="row" spacing={1.25} sx={{ mt: 2, px: 0.5, pb: 0.5 }}>
                        <KidButton
                          color="sky"
                          size="small"
                          fullWidth
                          startIcon={<Eye size={18} color="#fff" />}
                          onClick={() => setPreviewPdf({ url: fileUrl, title })}
                        >
                          معاينة
                        </KidButton>
                        <KidButton
                          color="leaf"
                          size="small"
                          fullWidth
                          startIcon={<DocumentDownload size={18} color="#fff" />}
                          component="a"
                          href={fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                        >
                          تحميل
                        </KidButton>
                      </Stack>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        )}
      </Container>

      {/* PDF Preview */}
      <Dialog
        open={Boolean(previewPdf)}
        onClose={() => setPreviewPdf(null)}
        maxWidth="lg"
        fullWidth
        PaperProps={{ sx: { borderRadius: '28px', height: '85vh', overflow: 'hidden', border: `4px solid ${kidColors.sun}` } }}
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1,
            flexWrap: 'wrap',
            backgroundColor: kidColors.sunSoft
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ minWidth: 0 }}>
            <Document size={24} color={kidColors.coral} variant="Bold" />
            <Typography sx={{ fontFamily: kidFont, fontWeight: 800, fontSize: '1.15rem', color: kidColors.ink }}>
              {previewPdf?.title}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <Button
              size="small"
              startIcon={<Export size={16} />}
              component="a"
              href={previewPdf?.url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ fontFamily: kidFont, fontWeight: 700, borderRadius: '12px', color: kidColors.ink }}
            >
              نافذة جديدة
            </Button>
            <KidButton
              size="small"
              color="leaf"
              component="a"
              href={previewPdf?.url}
              download
              startIcon={<DocumentDownload size={16} color="#fff" />}
            >
              تحميل
            </KidButton>
            <IconButton onClick={() => setPreviewPdf(null)} aria-label="إغلاق المعاينة">
              <CloseCircle size={26} color={kidColors.ink} />
            </IconButton>
          </Stack>
        </DialogTitle>

        <DialogContent sx={{ p: 0, height: '100%', backgroundColor: '#525659' }}>
          {previewPdf?.url ? (
            <iframe src={previewPdf.url} title={previewPdf.title} width="100%" height="100%" style={{ border: 'none' }} />
          ) : null}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
