import { validateSamples } from '../client/src/types/validateResponses';

// Simple runtime script that loads typed sample responses. Its primary purpose is to
// ensure the TypeScript compiler type-checks `validateResponses.ts` when run in CI.
function main() {
  const samples = validateSamples();
  // Print keys so it's a no-op but observable
  console.log('Validated sample keys:', Object.keys(samples));
}

// Call main() when executed with `npm run validate:responses`.
main();
