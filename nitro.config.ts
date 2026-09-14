export default {
  // Bundle tslib into the Vercel server function. Leaving it as an
  // external import causes: Cannot find package 'tslib'.
  noExternals: ["tslib"],
};
