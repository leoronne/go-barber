const currentUrl = (): string => {
  const windowOrigin = window.location.origin || 'http://localhost:3000/';
  const windowLocation = window.location.href || 'http://localhost:3000/';
  const windowLocationSplitted = windowLocation.split(windowOrigin).pop() || 'http://localhost:3000/';

  return windowLocation ? String(windowLocationSplitted.split('#').shift()) : '/';
};

export default currentUrl;
