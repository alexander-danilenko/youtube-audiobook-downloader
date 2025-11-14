'use client';

import { Button, Box, Dialog, DialogTitle, DialogContent, DialogActions, Checkbox, FormControlLabel, Typography } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import DownloadIcon from '@mui/icons-material/Download';
import { BookDto } from '@/application/dto';
import { useCsvImportExport } from '@/hooks/use-csv-import-export';
import { useTranslation, useTranslationString } from '@/i18n';

interface CsvImportExportProps {
  books: BookDto[];
  onBooksChange: (books: BookDto[]) => void;
  onImport?: (importedBooks: BookDto[]) => void;
}

export function CsvImportExport({ books, onBooksChange, onImport }: CsvImportExportProps) {
  const { t } = useTranslation();
  const tString = useTranslationString();

  const CSV_COLUMNS = [
    { key: 'url' as const, label: tString('book_card_youtube_url') },
    { key: 'title' as const, label: tString('book_card_book_title') },
    { key: 'author' as const, label: tString('book_card_author') },
    { key: 'narrator' as const, label: tString('book_card_narrator') },
    { key: 'series' as const, label: tString('book_card_series_name') },
    { key: 'seriesNumber' as const, label: tString('book_card_series_number') },
    { key: 'year' as const, label: tString('book_card_year') },
  ];

  const {
    importDialogOpen,
    hasHeaders,
    setHasHeaders,
    fileInputRef,
    exportToCsv,
    handleFileSelect,
    openImportDialog,
    closeImportDialog,
    triggerFileSelect,
  } = useCsvImportExport({
    books,
    onBooksChange,
    onImport,
    columns: CSV_COLUMNS,
  });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 1,
        alignItems: 'stretch',
        width: { xs: '100%', sm: 'auto' },
      }}
    >
      <Button
        variant="outlined"
        startIcon={<DownloadIcon />}
        onClick={exportToCsv}
        disabled={books.length === 0}
        sx={{ width: { xs: '100%', sm: 'auto' } }}
      >
        {t('csv_export')}
      </Button>
      <Button
        variant="outlined"
        startIcon={<UploadIcon />}
        onClick={openImportDialog}
        sx={{ width: { xs: '100%', sm: 'auto' } }}
      >
        {t('csv_import')}
      </Button>

      <input ref={fileInputRef} type="file" accept=".csv" style={{ display: 'none' }} onChange={handleFileSelect} />

      <Dialog open={importDialogOpen} onClose={closeImportDialog}>
        <DialogTitle>{t('csv_dialog_title')}</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {t('csv_dialog_description')}
          </Typography>
          <FormControlLabel
            control={<Checkbox checked={hasHeaders} onChange={(e) => setHasHeaders(e.target.checked)} />}
            label={t('csv_has_headers')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeImportDialog}>{t('metadata_dialog_cancel')}</Button>
          <Button onClick={triggerFileSelect} variant="contained">
            {t('csv_select_file')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
