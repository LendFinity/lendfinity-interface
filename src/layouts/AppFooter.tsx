import { Trans } from '@lingui/macro';
import { GitHub, Telegram, X, YouTube } from '@mui/icons-material';
import { Box, styled, SvgIcon, Typography } from '@mui/material';
import { Link } from 'src/components/primitives/Link';

interface StyledLinkProps {
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

const MediumIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    fill-rule="evenodd"
    clip-rule="evenodd"
  >
    <path
      d="M13.41 12.247c0 3.45-2.779 6.247-6.205 6.247C3.778 18.494 1 15.698 1 12.247S3.778 6 7.205 6c3.426 0 6.204 2.797 6.204 6.247Zm6.806 0c0 3.248-1.39 5.88-3.102 5.88-1.714 0-3.103-2.633-3.103-5.88s1.39-5.88 3.103-5.88c1.713 0 3.102 2.633 3.102 5.88Zm2.784 0c0 2.91-.489 5.269-1.091 5.269-.603 0-1.091-2.36-1.091-5.269 0-2.91.488-5.269 1.091-5.269S23 9.338 23 12.248Z"
      fill="currentColor"
    />
  </svg>
);

const StyledLink = styled(Link)<StyledLinkProps>(({ theme }) => ({
  color: theme.palette.text.muted,
  '&:hover': {
    color: theme.palette.text.primary,
  },
  display: 'flex',
  alignItems: 'center',
}));

const FOOTER_ICONS = [
  {
    href: 'https://t.me/lendfinity',
    icon: <Telegram />,
    title: 'Telegram',
  },
  {
    href: 'https://x.com/lendfinity_xyz',
    icon: <X />,
    title: 'X',
  },
  {
    href: 'https://github.com/LendFinity',
    icon: <GitHub />,
    title: 'Github',
  },
  {
    href: 'https://www.youtube.com/watch?v=7fvtINvTelI',
    icon: <YouTube />,
    title: 'YouTube',
  },
  {
    href: 'https://medium.com/@lendfinity.xyz',
    icon: <MediumIcon />,
    title: 'Medium',
  },
];

export function AppFooter() {
  const FOOTER_LINKS = [
    // {
    //   href: 'https://aave.com/terms-of-service',
    //   label: <Trans>Terms</Trans>,
    //   key: 'Terms',
    // },
    // {
    //   href: 'https://aave.com/privacy-policy/',
    //   label: <Trans>Privacy</Trans>,
    //   key: 'Privacy',
    // },
    {
      href: 'https://docs.lendfinity.xyz',
      label: <Trans>Docs</Trans>,
      key: 'Docs',
    },
    {
      href: 'https://oc.app/community/x2pwb-5qaaa-aaaaf-bn3vq-cai/channel/1840340961',
      label: <Trans>OpenChat</Trans>,
      key: 'OpenChat',
    },
    // {
    //   href: 'https://docs.aave.com/faq/',
    //   label: <Trans>FAQS</Trans>,
    //   key: 'FAQS',
    // },
    // {
    //   href: 'https://discord.com/invite/aave',
    //   label: <Trans>Get Support</Trans>,
    //   key: 'Get Support',
    //   onClick: (event: React.MouseEvent) => {
    //     event.preventDefault();
    //     setFeedbackOpen(true);
    //   },
    // },
    // {
    //   href: '/',
    //   label: <Trans>Manage analytics</Trans>,
    //   key: 'Manage analytics',
    //   onClick: (event: React.MouseEvent) => {
    //     event.preventDefault();
    //     setAnalyticsConfigOpen(true);
    //   },
    // },
  ];

  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        padding: ['22px 0px 40px 0px', '0 22px 0 40px', '20px 22px'],
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '22px',
        flexDirection: ['column', 'column', 'row'],
        boxShadow:
          theme.palette.mode === 'light'
            ? 'inset 0px 1px 0px rgba(0, 0, 0, 0.04)'
            : 'inset 0px 1px 0px rgba(255, 255, 255, 0.12)',
      })}
    >
      <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        {FOOTER_LINKS.map((link) => (
          <StyledLink onClick={link.onClick} key={link.key} href={link.href}>
            <Typography variant="caption">{link.label}</Typography>
          </StyledLink>
        ))}
      </Box>
      <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        {FOOTER_ICONS.map((icon) => (
          <StyledLink href={icon.href} key={icon.title}>
            <SvgIcon
              sx={{
                fontSize: [24, 24, 20],
              }}
            >
              {icon.icon}
            </SvgIcon>
          </StyledLink>
        ))}
      </Box>
    </Box>
  );
}
