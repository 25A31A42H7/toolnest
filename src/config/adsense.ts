/**
 * Google AdSense Configuration
 *
 * After your site is approved by Google AdSense:
 * 1. Set `enabled` to `true`.
 * 2. Replace `publisherId` with your ca-pub-XXXXXXXXXXXXXXXX ID.
 * 3. Replace each slot ID with the matching Ad Unit ID from your AdSense dashboard.
 * 4. Add the AdSense Auto/Script tag to index.html <head>.
 */
export const ADSENSE_CONFIG = {
  enabled: false,
  publisherId: 'ca-pub-0000000000000000',
  slots: {
    homeTopBanner: '1111111111',
    homeMidBanner: '2222222222',
    toolTopBanner: '3333333333',
    toolSidebarRect: '4444444444',
    toolBottomBanner: '5555555555',
  },
};
