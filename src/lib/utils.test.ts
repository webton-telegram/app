import { cn, shortenAddress } from './utils';

describe('utility', () => {
  describe('cn()', () => {
    it('merges class names correctly', () => {
      const result = cn('btn', 'btn-primary');
      expect(result).toBe('btn btn-primary');
    });

    it('handles conditional class names', () => {
      const isTrue = true;
      const result = cn(
        'btn',
        isTrue && 'btn-primary',
        !isTrue && 'btn-secondary',
      );
      expect(result).toBe('btn btn-primary');
    });

    it('removes duplicate class names', () => {
      const result = cn('p-4', 'p-2');
      expect(result).toBe('p-2'); // tailwind-merge should keep only the last class
    });

    it('handles empty and undefined values', () => {
      const result = cn('btn', undefined, null, '', 'btn-primary');
      expect(result).toBe('btn btn-primary');
    });

    it('merges array and object syntax correctly', () => {
      const result = cn([
        'btn',
        { 'btn-primary': true, 'btn-secondary': false },
      ]);
      expect(result).toBe('btn btn-primary');
    });

    it('returns an empty string if no valid class names are provided', () => {
      const result = cn(undefined, null, false, '');
      expect(result).toBe('');
    });
  });

  describe('shortenAddress', () => {
    it('returns shorten address', () => {
      const result = shortenAddress(
        'UQDdpiiSPtwMxsmDahrVZqqYJN2urIUmsRAfWwaAlmKQE7ys',
      );
      expect(result).toBe('UQDd...ys');
    });
  });
});
