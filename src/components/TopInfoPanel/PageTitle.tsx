import { Trans } from '@lingui/macro';
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import { ReactNode } from 'react';

import { useRootStore } from '../../store/root';
import { selectIsMigrationAvailable } from '../../store/v3MigrationSelectors';
import { NetworkConfig } from '../../ui-config/networksConfig';
// import { BridgeButton } from '../BridgeButton';
import { Link, ROUTES } from '../primitives/Link';

export interface PageTitleProps extends Pick<NetworkConfig, 'bridge'> {
  pageTitle?: ReactNode;
  withMarketSwitcher?: boolean;
  withMigrateButton?: boolean;
  withFavoriteButton?: boolean;
}

export const PageTitle = ({ pageTitle, withMarketSwitcher, withMigrateButton }: PageTitleProps) => {
  const isMigrateToV3Available = useRootStore((state) => selectIsMigrationAvailable(state));

  // Subscribe to favoriteMarkets to trigger re-renders when favorites change
  useRootStore((state) => state.favoriteMarkets);

  const theme = useTheme();
  const upToLG = useMediaQuery(theme.breakpoints.up('lg'));
  // const upToMD = useMediaQuery(theme.breakpoints.up('md'));
  const downToXSM = useMediaQuery(theme.breakpoints.down('xsm'));

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: { xs: 'flex-start', xsm: 'center' },
        mb: pageTitle ? 4 : 0,
        flexDirection: { xs: 'column', xsm: 'row' },
      }}
    >
      {pageTitle && (downToXSM || !withMarketSwitcher) && (
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
          <Typography
            variant={downToXSM ? 'h2' : upToLG ? 'display1' : 'h1'}
            sx={{
              color: withMarketSwitcher ? 'text.muted' : 'text.white',
              mr: { xs: 5, xsm: 3 },
              mb: { xs: 1, xsm: 0 },
            }}
          >
            {pageTitle}
          </Typography>
        </Box>
      )}

      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          mb: !pageTitle ? 4 : 0,
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {/* {withMarketSwitcher && <MarketSwitcher />} */}
          {/* <BridgeButton bridge={bridge} variant="surface" withoutIcon={!upToMD} /> */}
          {/* NOTE:// Removing for now  */}
          {isMigrateToV3Available && withMigrateButton && (
            <Link href={ROUTES.migrationTool} sx={{ mt: { xs: 2, xsm: 0 } }}>
              <Button variant="gradient" size="small">
                <Trans>Migrate to V3</Trans>
              </Button>
            </Link>
          )}
        </Box>

        {/* {withFavoriteButton && (
          <Button
            onClick={handleFavoriteClick}
            variant="surface"
            sx={{
              display: { xs: 'none', sm: 'flex' }, // Hide on mobile (xs), show on small screens and up
              p: '7px 8px',
              minWidth: 'unset',
              gap: 2,
              alignItems: 'center',
            }}
            aria-label="Favorite tool"
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <SvgIcon
                sx={{
                  fontSize: '18px !important',
                  color: isCurrentMarketFavorite ? '#FBCC5F' : 'rgba(255, 255, 255, 0.3)',
                }}
              >
                <StarIcon />
              </SvgIcon>
            </Box>

            <Typography component="span" typography="subheader1" sx={{ fontWeight: 500 }}>
              {isCurrentMarketFavorite ? <Trans>Favourited</Trans> : <Trans>Favourite</Trans>}
            </Typography>
          </Button>
        )} */}
      </Box>
    </Box>
  );
};
