'use client';

import { Typography, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Stack } from '@mui/material';
import { FilenameTemplateInput } from './filename-template-input';
import { CookiesBrowser, AudioBitrate } from '@/application/stores';
import { useTranslation } from '@/i18n';

interface SettingsProps {
  filenameTemplate: string;
  cookiesBrowser: CookiesBrowser;
  maxAudioBitrate: AudioBitrate;
  onFilenameTemplateChange: (value: string) => void;
  onCookiesBrowserChange: (browser: CookiesBrowser) => void;
  onMaxAudioBitrateChange: (bitrate: AudioBitrate) => void;
}

const BROWSER_OPTIONS: CookiesBrowser[] = ['none', 'brave', 'chrome', 'chromium', 'edge', 'firefox', 'opera', 'safari', 'vivaldi', 'whale'];
const BITRATE_OPTIONS: AudioBitrate[] = [32, 48, 64, 96, 128, 160, 192, 256, 320, 'original'];

export function Settings({ filenameTemplate, cookiesBrowser, maxAudioBitrate, onFilenameTemplateChange, onCookiesBrowserChange, onMaxAudioBitrateChange }: SettingsProps) {
  const { t } = useTranslation();
  const handleCookiesBrowserChange = (event: SelectChangeEvent<CookiesBrowser>): void => {
    onCookiesBrowserChange(event.target.value as CookiesBrowser);
  };
  const handleMaxAudioBitrateChange = (event: SelectChangeEvent<AudioBitrate | string>): void => {
    const value = event.target.value;
    // Convert string to number if it's a numeric bitrate
    const bitrate: AudioBitrate = value === 'original' ? 'original' : (typeof value === 'string' ? parseInt(value, 10) as AudioBitrate : value);
    onMaxAudioBitrateChange(bitrate);
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h6" component="h2" sx={{ fontWeight: 500 }}>
        {t('settings_title')}
      </Typography>
      <Stack spacing={2}>
        <FilenameTemplateInput value={filenameTemplate} onChange={onFilenameTemplateChange} />
        
        <FormControl fullWidth size="small">
          <InputLabel id="cookies-browser-label">{t('settings_cookies_browser')}</InputLabel>
          <Select
            labelId="cookies-browser-label"
            id="cookies-browser"
            value={cookiesBrowser}
            label={t('settings_cookies_browser')}
            onChange={handleCookiesBrowserChange}
          >
            {BROWSER_OPTIONS.map((browser) => (
              <MenuItem key={browser} value={browser}>
                {browser === 'none' ? t('settings_browser_none') : browser.charAt(0).toUpperCase() + browser.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography variant="caption" color="textSecondary" sx={{ mt: 1 }}>
          {t('settings_cookies_browser_helper')}
        </Typography>
        
        <FormControl fullWidth size="small">
          <InputLabel id="max-audio-bitrate-label">{t('settings_max_audio_bitrate')}</InputLabel>
          <Select<AudioBitrate>
            labelId="max-audio-bitrate-label"
            id="max-audio-bitrate"
            value={maxAudioBitrate}
            label={t('settings_max_audio_bitrate')}
            onChange={handleMaxAudioBitrateChange}
          >
            {BITRATE_OPTIONS.map((bitrate) => {
              const label = bitrate === 'original' 
                ? t('settings_bitrate_original')
                : t(`settings_bitrate_${bitrate}kbps` as keyof typeof t);
              return (
                <MenuItem key={bitrate} value={bitrate}>
                  {label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Typography variant="caption" color="textSecondary" sx={{ mt: 1 }}>
          {t('settings_max_audio_bitrate_helper')}
        </Typography>
      </Stack>
    </Stack>
  );
}

