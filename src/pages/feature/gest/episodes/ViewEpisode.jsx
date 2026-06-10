import { useState, useEffect, useRef } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  Breadcrumbs,
  Link,
  Button,
  Stack,
  Divider,
  Paper,
  Fade,
  Collapse,
  CircularProgress,
  Menu,
  MenuItem
} from '@mui/material';

import { useGetEpisode } from 'api/episodes';
import { ArrowLeft2, Share, Calendar, Profile, DocumentText } from 'iconsax-react';
import SEO from 'components/SEO';


// ─── Share Button Component ───────────────────────────────────────────────────
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
      } catch (_) { }
    } else {
      setOpen(true);
    }
  };

  const platforms = [
    {
      label: 'واتساب',
      color: '#25D366',
      emoji: '💬',
      href: `https://wa.me/?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`
    },
    {
      label: 'فيسبوك',
      color: '#1877F2',
      emoji: '📘',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    },
    {
      label: 'تويتر / X',
      color: '#000',
      emoji: '🐦',
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`
    },
    {
      label: 'تيليجرام',
      color: '#0088CC',
      emoji: '✈️',
      href: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`
    },
    {
      label: copied ? 'تم النسخ!' : 'نسخ الرابط',
      color: copied ? '#2e7d32' : '#555',
      emoji: '🔗',
      onClick: async () => {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  ];

  return (
    <>
      <Button
        ref={buttonRef}
        onClick={handleShare}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: 3,
          py: 1.5,
          borderRadius: '12px',
          backgroundColor: '#fff',
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          color: '#2E2A39',
          fontWeight: 700,
          fontSize: { xs: '15px', sm: '16px' },
          '&:hover': {
            backgroundColor: '#f5f5f5',
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(0,0,0,0.12)'
          },
          transition: 'all 0.2s ease'
        }}
      >
        <Share size="20" color="#2E2A39" variant="Bold" />
        انشر الحلقة
      </Button>

      <Menu
        open={open}
        anchorEl={buttonRef.current}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} // ← bottom مش top
        transformOrigin={{ vertical: 'top', horizontal: 'center' }} // ← top مش bottom
        disableScrollLock={true}
        keepMounted
        PaperProps={{
          sx: {
            borderRadius: '16px',
            p: 1,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            minWidth: '220px'
          }
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, textAlign: 'center', color: '#2E2A39', px: 2 }}>
          مشاركة الحلقة
        </Typography>

        {platforms.map((p) =>
          p.onClick ? (
            <MenuItem key={p.label} onClick={p.onClick} sx={{ borderRadius: '10px', color: p.color, fontWeight: 600, gap: 1.5 }}>
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
              sx={{ borderRadius: '10px', color: p.color, fontWeight: 600, gap: 1.5 }}
            >
              {p.emoji} {p.label}
            </MenuItem>
          )
        )}
      </Menu>
    </>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ViewEpisode() {
  const { id } = useParams();
  const [checked, setChecked] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  useEffect(() => {
    setChecked(true);
  }, []);

  const { episode, episodeLoading } = useGetEpisode(id);

  if (episodeLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!episode) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h4">الحلقة غير موجودة</Typography>
      </Box>
    );
  }

  const dateObject = new Date(episode.CreatedAt || new Date());
  const formattedDate = dateObject.toLocaleDateString('ar-EG');
  const formattedTime = dateObject.toLocaleTimeString('ar-EG');
  let hijriDate = '';
  try {
    hijriDate = new Intl.DateTimeFormat('ar-SA-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(dateObject);
  } catch (e) {
    // fallback
  }

  return (
    <Fade in={checked} timeout={800}>
      <Box sx={{ py: { xs: 3, sm: 4, md: 6 }, backgroundColor: '#fcfcfc', minHeight: '100vh' }}>
        <SEO
          title={episode.TitleAr}
          description={episode.DescriptionAr?.slice(0, 160)}
          image={episode.thumbnail_image || episode.cover_image}
          url={`/episodes/${id}`}
        />
        <Container maxWidth="lg">
          {/* Breadcrumbs */}
          <Breadcrumbs

            separator={<ArrowLeft2 size="14" color="#2E2A39" style={{ transform: 'rotate(180deg)' }} />}
            aria-label="breadcrumb"
            sx={{ mb: { xs: 2, md: 4 }, flexWrap: 'wrap' }}
          >
            <Link
              component={RouterLink}
              to="/episodes"
              underline="hover"
              color="inherit"
              sx={{ display: 'flex', alignItems: 'center', fontWeight: 600, fontSize: { xs: '14px', sm: '16px' } }}
            >
              الحلقات
            </Link>
            <Typography color="text.primary" sx={{ fontWeight: 700, fontSize: { xs: '14px', sm: '16px' } }}>
              {episode.TitleAr}
            </Typography>
          </Breadcrumbs>

          {/* Title */}
          <Typography
            variant="h1"
            sx={{
              fontWeight: 700,
              mb: { xs: 2, md: 4 },
              color: 'primary.main',
              lineHeight: 1.4,
              textAlign: { xs: 'center', md: 'left' }
            }}
          >
            {episode.TitleAr}
          </Typography>

          {/* Description */}
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '15px', sm: '16px', md: '18px' },
              lineHeight: 2,
              mb: { xs: 4, md: 6 }
            }}
          >
            {episode.DescriptionAr}
          </Typography>

          {/* Video */}
          <Paper
            elevation={0}
            sx={{
              width: '100%',
              aspectRatio: '16/9',
              borderRadius: { xs: '14px', sm: '18px', md: '24px' },
              overflow: 'hidden',
              backgroundColor: '#000',
              position: 'relative',
              mb: { xs: 3, md: 4 },
              boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: { md: 'translateY(-5px)' },
                boxShadow: '0 30px 60px rgba(0,0,0,0.15)'
              }
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
            />
          </Paper>

          {/* Transcript */}
          <Box sx={{ mb: { xs: 4, md: 6 }, textAlign: 'center' }}>
            <Button
              variant="contained"
              startIcon={<DocumentText size="20" color="#2E2A39" variant="Bold" />}
              onClick={() => setShowTranscript(!showTranscript)}
              sx={{
                px: { xs: 2, sm: 4 },
                py: 1.5,
                width: { xs: '100%', sm: 'auto' },
                maxWidth: { xs: '100%', sm: 'fit-content' },
                borderRadius: '12px',
                backgroundColor: 'primary.main',
                color: '#ffff',
                fontWeight: 700,
                fontSize: { xs: '14px', sm: '16px' },
                '&:hover': { backgroundColor: 'primary.light' },
                boxShadow: '0 8px 24px rgba(255, 214, 102, 0.3)'
              }}
            >
              محتوى الحلقة مقروء
            </Button>

            <Collapse in={showTranscript}>
              <Paper
                variant="outlined"
                sx={{
                  mt: 3,
                  p: { xs: 2, sm: 3, md: 4 },
                  borderRadius: '16px',
                  backgroundColor: '#fff',
                  borderColor: '#FFD666'
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.primary',
                    whiteSpace: 'pre-line',
                    lineHeight: 2,
                    fontSize: { xs: '14px', sm: '15px', md: '16px' }
                  }}
                >
                  {episode.TranscriptAr || 'لا يوجد نص لهذه الحلقة.'}
                </Typography>
              </Paper>
            </Collapse>
          </Box>

          <Divider sx={{ mb: { xs: 3, md: 4 } }} />

          {/* Footer */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: { xs: 3, md: 4 }
            }}
          >
            {/* Metadata */}
            <Stack spacing={2} sx={{ width: '100%', textAlign: { xs: 'center', md: 'left' } }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: { xs: 'center', md: 'flex-start' },
                  gap: 1
                }}
              >
                <Profile size="20" color="#0088CC" variant="Bold" />
                <Typography variant="body2" sx={{ fontWeight: 600, fontSize: { xs: '14px', sm: '15px' } }}>
                  بقلم: {episode.Author || 'غير محدد'}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: { xs: 'center', md: 'flex-start' },
                  gap: 1,
                  flexWrap: 'wrap'
                }}
              >
                <Calendar size="20" color="#0088CC" variant="Bold" />
                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: { xs: '13px', sm: '14px' } }}>
                  التاريخ: {formattedDate} م {hijriDate ? `| ${hijriDate}` : ''} ({formattedTime})
                </Typography>
              </Box>
            </Stack>

            {/* Share — centered */}
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <ShareButton episode={episode} />
            </Box>
          </Box>
        </Container>
      </Box>
    </Fade>
  );
}
