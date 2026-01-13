# Troubleshooting Module Federation Setup

## Error: App Directory is not supported by nextjs-mf

**Error Message**: `App Directory is not supported by nextjs-mf. Use only pages directory`

This error occurs because `@module-federation/nextjs-mf` version 8.x does not support Next.js App Router (`app/` directory). It only supports the Pages Router (`pages/` directory).

### Solution: Use Pages Router

The project has been converted to use Pages Router. All apps now use:
- `pages/` directory instead of `app/` directory
- `pages/_app.tsx` for app-level configuration
- `pages/index.tsx` for home pages
- No `'use client'` directives (not needed in Pages Router)

If you see this error, ensure:
1. You're using `pages/` directory, not `app/` directory
2. All components are in `pages/` or imported from other directories
3. You have `pages/_app.tsx` in each app

---

## Error: NEXT_PRIVATE_LOCAL_WEBPACK is not set to true

**Error Message**: `process.env.NEXT_PRIVATE_LOCAL_WEBPACK is not set to true, please set it to true, and "npm install webpack"`

This error occurs because the Module Federation plugin requires Next.js to use a local webpack installation instead of the bundled one.

### Solution: Set Environment Variable

Update your `package.json` scripts to include the environment variable:

```json
{
  "scripts": {
    "dev": "NEXT_PRIVATE_LOCAL_WEBPACK=true next dev -p 3000",
    "build": "NEXT_PRIVATE_LOCAL_WEBPACK=true next build"
  }
}
```

**Note**: This has already been configured in all three apps. If you still see this error:
1. Make sure webpack is installed: `yarn workspace <app-name> add -D webpack@5.89.0`
2. Restart your dev server
3. Clear the `.next` cache: `rm -rf apps/*/.next`

---

## Error: Cannot find module 'webpack/lib/runtime/StartupChunkDependenciesPlugin'

This error occurs because `@module-federation/nextjs-mf` tries to access webpack internals that Next.js doesn't expose directly.

### Solution 1: Use Compatible Version (Recommended)

Try using a different version of `@module-federation/nextjs-mf` that's known to work with Next.js 14:

```bash
yarn workspace admin-dashboard add @module-federation/nextjs-mf@^8.0.0
yarn workspace customer-dashboard add @module-federation/nextjs-mf@^8.0.0
yarn workspace shell add @module-federation/nextjs-mf@^8.0.0
```

Or try the latest version:
```bash
yarn workspace admin-dashboard add @module-federation/nextjs-mf@latest
yarn workspace customer-dashboard add @module-federation/nextjs-mf@latest
yarn workspace shell add @module-federation/nextjs-mf@latest
```

### Solution 2: Add Webpack as Dev Dependency (Most Likely Fix)

The plugin needs webpack to be available as a dependency. Add it to each app:

```bash
# Add webpack to all apps
yarn workspace admin-dashboard add -D webpack@5.89.0
yarn workspace customer-dashboard add -D webpack@5.89.0
yarn workspace shell add -D webpack@5.89.0

# Then reinstall
yarn install
```

**Note**: Next.js bundles its own webpack, but the Module Federation plugin needs webpack to be explicitly available in node_modules to access its internals.

### Solution 3: Use Alternative Module Federation Approach

If the plugin continues to have issues, consider:

1. **Using @module-federation/runtime directly** with manual webpack configuration
2. **Using a different micro-frontend approach** (e.g., single-spa, qiankun)
3. **Using Next.js rewrites/proxies** instead of Module Federation (simpler but less powerful)

### Solution 4: Check Node/Next.js Versions

Ensure compatibility:
- Node.js: 18.x or 20.x
- Next.js: 14.x
- React: 18.x

### Solution 5: Clean Install

Sometimes a clean install resolves dependency issues:

```bash
# Remove all node_modules and lock files
rm -rf node_modules apps/*/node_modules yarn.lock

# Reinstall
yarn install
```

### Current Configuration

The config files have been updated to:
- Only apply Module Federation on client-side builds (`!isServer`)
- Use try-catch to handle plugin loading errors gracefully
- Load the plugin dynamically inside the webpack function

### Testing

After applying a solution, test with:

```bash
# Terminal 1
yarn dev:admin

# Terminal 2  
yarn dev:customer

# Terminal 3
yarn dev:shell
```

### Additional Resources

- [Module Federation Next.js Plugin Docs](https://github.com/module-federation/nextjs-mf)
- [Next.js 14 Compatibility Issues](https://github.com/module-federation/nextjs-mf/issues)
- [Webpack Module Federation](https://webpack.js.org/concepts/module-federation/)
