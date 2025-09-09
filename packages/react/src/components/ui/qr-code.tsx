import * as React from 'react';
import QRCode from 'qrcode';
import { useTheme, useTranslator } from '@/hooks';
import { cn } from '@/lib/theme-utils';

export interface QRCodeDisplayerProps {
  /**
   * The URI/data to encode in the QR code (required)
   */
  barcodeUri: string;
  /**
   * Size of the QR code in pixels
   * @default 150
   */
  size?: number;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Alternative text for accessibility
   */
  alt?: string;
  /**
   * Translation key for the alt text (takes precedence over alt)
   */
  altTranslationKey?: string;
}

export function QRCodeDisplayer({
  barcodeUri,
  size = 150,
  className,
  alt,
  altTranslationKey,
}: QRCodeDisplayerProps) {
  const [qrCodeDataURL, setQrCodeDataURL] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);
  const { isDarkMode } = useTheme();
  const { t } = useTranslator('mfa');

  React.useEffect(() => {
    const generateQRCode = async () => {
      if (!barcodeUri) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setHasError(false);

      try {
        const dataURL = await QRCode.toDataURL(barcodeUri, {
          width: size,
          margin: 1,
          color: {
            // Adapt colors based on theme
            dark: isDarkMode ? '#FFFFFF' : '#000000',
            light: isDarkMode ? '#000000' : '#FFFFFF',
          },
        });
        setQrCodeDataURL(dataURL);
      } catch (error) {
        console.error('Error generating QR code:', error);
        setHasError(true);
        setQrCodeDataURL('');
      } finally {
        setIsLoading(false);
      }
    };

    generateQRCode();
  }, [barcodeUri, size, isDarkMode]);

  const altText = altTranslationKey ? t(altTranslationKey) : alt || 'QR Code';

  if (isLoading) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded',
          className,
        )}
        style={{ width: size, height: size }}
        aria-label="Loading QR code"
      >
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-600 dark:border-gray-300" />
      </div>
    );
  }

  if (hasError || !qrCodeDataURL) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm rounded',
          className,
        )}
        style={{ width: size, height: size }}
        aria-label="QR code could not be generated"
      >
        <span>QR code unavailable</span>
      </div>
    );
  }

  return (
    <img
      src={qrCodeDataURL}
      alt={altText}
      width={size}
      height={size}
      className={cn('block rounded', className)}
      style={{ imageRendering: 'pixelated' }}
    />
  );
}
