'use client';

import { useState } from 'react';
import { Typography, Box, Container, Paper, Stack, Alert, Link, Button } from '@mui/material';
import '../infrastructure/di/container';
import { useAppStore } from '../application/stores/app-store';
import { usePersistStore } from '../application/stores/storage-store';
import { BookList } from '../components/book-list';
import { Settings } from '../components/settings';
import { GetDownloadCommandButton } from '../components/generate-script-button';
import { Lightbox } from '../components/lightbox';
import { AppHeader } from '../components/app-header';

export default function Home() {
  // Initialize persistence and wait for hydration
  const isHydrated = usePersistStore();

  // Get state from store
  const books = useAppStore((state) => state.books);
  const filenameTemplate = useAppStore((state) => state.filenameTemplate);
  const cookiesBrowser = useAppStore((state) => state.cookiesBrowser);
  const setBooks = useAppStore((state) => state.setBooks);
  const setFilenameTemplate = useAppStore((state) => state.setFilenameTemplate);
  const setCookiesBrowser = useAppStore((state) => state.setCookiesBrowser);
  const expandAllBooks = useAppStore((state) => state.expandAllBooks);
  const collapseAllBooks = useAppStore((state) => state.collapseAllBooks);

  // Local UI state (not persisted)
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Prevent hydration mismatch by not rendering until state is loaded
  if (!isHydrated) {
    return null;
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      <AppHeader />
      
      <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
        <Container maxWidth="xl">
          <Stack spacing={3}>
            {/* Introduction Section */}
            <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.paper' }}>
              <Stack spacing={2}>
                <Typography variant="body1">
                  Downloading audiobooks from YouTube and adding metadata like title, author, chapters, and cover art takes time. This browser-based tool prepares a list of YouTube video links and book details, then generates a script that handles everything automatically.
                </Typography>
                
                <Typography variant="body1">
                  For each video link, you enter book information: title, author, narrator, series, and year. The app generates a script that uses{' '}
                  <Typography component="code" variant="inherit" sx={{ bgcolor: 'action.hover', px: 0.5, borderRadius: 0.5, fontFamily: 'monospace' }}>
                    yt-dlp
                  </Typography>
                  {' '}to <strong>download the video and extract the audio</strong>. Then{' '}
                  <Typography component="code" variant="inherit" sx={{ bgcolor: 'action.hover', px: 0.5, borderRadius: 0.5, fontFamily: 'monospace' }}>
                    ffmpeg
                  </Typography>
                  {' '}embeds the metadata, adds chapter markers (if available), and incorporates cover art into the audio files.
                </Typography>
                
                <Typography variant="body1">
                  Everything runs in your browser - your data stays on your computer. Run the generated script in your terminal to download and process the audiobooks.
                </Typography>
              </Stack>
            </Paper>

            {/* Book Table Section */}
            <Paper elevation={0} sx={{ bgcolor: 'background.paper', overflow: 'hidden' }}>
              <Box sx={{ p: 3, pb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" component="h2" sx={{ fontWeight: 500 }}>
                  Books
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    size="small"
                    variant="outlined"
                    color="secondary"
                    onClick={() => collapseAllBooks(books.map(book => book.id))}
                    disabled={books.length === 0}
                  >
                    Collapse All
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="secondary"
                    onClick={() => expandAllBooks(books.map(book => book.id))}
                    disabled={books.length === 0}
                  >
                    Expand All
                  </Button>
                </Box>
              </Box>
              <BookList
                books={books}
                onBooksChange={setBooks}
                onThumbnailClick={setLightboxImage}
              />
            </Paper>

            {/* Script Generation Section */}
            <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.paper' }}>
              <Stack spacing={2}>
                <Settings
                  filenameTemplate={filenameTemplate}
                  cookiesBrowser={cookiesBrowser}
                  onFilenameTemplateChange={setFilenameTemplate}
                  onCookiesBrowserChange={setCookiesBrowser}
                />
                <Alert severity="warning">
                  <strong>Warning</strong>: You need to have <Link href="https://github.com/yt-dlp/yt-dlp" target="_blank" rel="noopener noreferrer" underline="hover">
                    yt-dlp
                  </Link>
                  {' '}and{' '}
                  <Link href="https://ffmpeg.org/" target="_blank" rel="noopener noreferrer" underline="hover">
                    ffmpeg
                  </Link>
                  {' '}need to be installed in order for the script to work.
                </Alert>
                <GetDownloadCommandButton books={books} filenameTemplate={filenameTemplate} cookiesBrowser={cookiesBrowser} />
              </Stack>
            </Paper>
          </Stack>
        </Container>
      </Box>

      <Lightbox imageUrl={lightboxImage} onClose={() => setLightboxImage(null)} />
    </Box>
  );
}
