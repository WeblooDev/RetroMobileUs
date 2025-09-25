const redirects = async () => {
  const currentSpecialsRedirect = {
    source: '/current-specials',
    destination: '/inventory',
    permanent: true,
  }

  // Handle trailing slash variant explicitly for single-hop redirect
  const currentSpecialsRedirectWithSlash = {
    source: '/current-specials/',
    destination: '/inventory',
    permanent: true,
  }

  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header',
        key: 'user-agent',
        value: '(.*Trident.*)', // all ie browsers
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
  }

  const redirects = [
    currentSpecialsRedirect,
    currentSpecialsRedirectWithSlash,
    internetExplorerRedirect,
  ]

  return redirects
}

export default redirects
