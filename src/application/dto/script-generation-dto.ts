import { BookDto } from './book-dto';
import { CookiesBrowser, AudioBitrate } from '@/application/stores';

export interface ScriptGenerationDto {
  books: BookDto[];
  filenameTemplate: string;
  cookiesBrowser: CookiesBrowser;
  maxAudioBitrate: AudioBitrate;
}

export interface ScriptGenerationResult {
  scriptContent: string;
}

