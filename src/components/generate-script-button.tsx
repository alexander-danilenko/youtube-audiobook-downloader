'use client';

import { useState } from 'react';
import { Button, Box, Snackbar, Alert } from '@mui/material';
import { ContentCopy as ContentCopyIcon } from '@mui/icons-material';
import { BookDto } from '../application/dto/book-dto';
import { CookiesBrowser } from '../application/stores/app-store';
import { useScriptGenerator } from '../hooks/use-script-generator';
import { useTranslation } from '../i18n/use-translation';

interface GetDownloadCommandButtonProps {
  books: BookDto[];
  filenameTemplate: string;
  cookiesBrowser: CookiesBrowser;
}

export function GetDownloadCommandButton({ books, filenameTemplate, cookiesBrowser }: GetDownloadCommandButtonProps) {
  const { t } = useTranslation();
  const { copyDownloadString } = useScriptGenerator();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleClick = async (): Promise<void> => {
    const validBooks = books.filter(
      (book) => book.url && book.title && book.author && book.narrator
    );

    if (validBooks.length === 0) {
      alert(t('script_generation_error_no_books') as string);
      return;
    }

    try {
      await copyDownloadString(validBooks, filenameTemplate, cookiesBrowser);
      setSnackbarOpen(true);
    } catch (error) {
      alert(t('script_generation_error_copy_failed') as string);
    }
  };

  return (
    <>
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Button
          onClick={handleClick}
          variant="contained"
          color="primary"
          size="large"
          startIcon={<ContentCopyIcon />}
        >
          {t('script_generation_get_download_command')}
        </Button>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          {t('script_generation_copy_success')}
        </Alert>
      </Snackbar>
    </>
  );
}

