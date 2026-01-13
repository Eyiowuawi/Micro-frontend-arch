# Module Federation Test Case

This is a test implementation of Module Federation with Next.js to validate the architecture before scaling to the full application.

## Architecture

```
module-federation example/
├── apps/
│   ├── shell/              # Host application (port 3000)
│   │   └── pages/          # Pages Router
│   ├── admin-dashboard/    # Remote app (port 3001)
│   │   ├── pages/          # Pages Router
│   │   └── components/     # Exposed components
│   └── customer-dashboard/ # Remote app (port 3002)
│       ├── pages/          # Pages Router
│       └── components/     # Exposed components
└── package.json            # Root workspace config
```

**Note**: This setup uses Next.js Pages Router because `@module-federation/nextjs-mf` doesn't support App Router yet.

## Features

- ✅ Module Federation with Next.js 14
- ✅ Shell app consumes remote components
- ✅ Remote apps can run standalone or be consumed
- ✅ Shared React dependencies
- ✅ TypeScript support
- ✅ Independent deployment capability
- ⚠️ Uses Pages Router (App Router not supported by @module-federation/nextjs-mf)

## Setup

### 1. Install Dependencies

```bash
yarn install
```

### 1.5. Fix Webpack Dependency (If Needed)

If you encounter the error `Cannot find module 'webpack/lib/runtime/StartupChunkDependenciesPlugin'`, add webpack as a dev dependency:

```bash
yarn workspace admin-dashboard add -D webpack@5.89.0
yarn workspace customer-dashboard add -D webpack@5.89.0
yarn workspace shell add -D webpack@5.89.0
yarn install
```

See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for more solutions.

### 2. Start Development Servers

**IMPORTANT**: Start the remote apps (admin and customer) BEFORE starting the shell app. The shell needs the remotes to be running to resolve the remote modules.

Open three terminal windows and start them in this order:

**Terminal 1 - Admin Dashboard (Remote) - START FIRST**
```bash
yarn dev:admin
```
Runs on http://localhost:3001
Wait until you see: `✓ Ready on http://localhost:3001`

**Terminal 2 - Customer Dashboard (Remote) - START SECOND**
```bash
yarn dev:customer
```
Runs on http://localhost:3002
Wait until you see: `✓ Ready on http://localhost:3002`

**Terminal 3 - Shell App (Host) - START LAST**
```bash
yarn dev:shell
```
Runs on http://localhost:3000

### 3. Test the Federation

1. Visit http://localhost:3000 - You should see both remote components loaded
2. Visit http://localhost:3000/admin - Admin dashboard page
3. Visit http://localhost:3000/customer - Customer dashboard page
4. Visit http://localhost:3001 - Admin dashboard standalone
5. Visit http://localhost:3002 - Customer dashboard standalone

## How It Works

### Shell App (Host)
- Consumes remote components using `dynamic` imports
- Configures remotes in `next.config.js`
- Routes to `/admin` and `/customer` pages

### Remote Apps
- Expose components via Module Federation plugin
- Can run independently as standalone Next.js apps
- Shared React dependencies to avoid duplication

### Module Federation Configuration

**Shell (next.config.js)**
```javascript
remotes: {
  admin: 'admin@http://localhost:3001/_next/static/chunks/remoteEntry.js',
  customer: 'customer@http://localhost:3002/_next/static/chunks/remoteEntry.js',
}
```

**Remote Apps (next.config.js)**
```javascript
exposes: {
  './AdminDashboard': './components/AdminDashboard',
  './CustomerDashboard': './components/CustomerDashboard',
}
```

## Testing Checklist

- [x] Shell app loads remote components
- [x] Remote apps run independently
- [x] State management works in remote components
- [x] Styling doesn't conflict between apps
- [x] Hot reload works in development
- [ ] Production build works
- [ ] Error boundaries handle remote failures
- [ ] Shared state management (Redux) integration

## Next Steps for Full Implementation

1. **Add More Remotes**
   - investor-dashboard
   - agent-dashboard

2. **Shared Packages**
   - Create `packages/shared-ui` for common components
   - Create `packages/shared-utils` for utilities
   - Create `packages/shared-types` for TypeScript types

3. **State Management**
   - Integrate Redux Toolkit
   - Set up shared store configuration
   - Handle state synchronization

4. **Authentication**
   - Integrate NextAuth
   - Handle auth state across remotes
   - Protect routes

5. **Production Setup**
   - Configure production URLs for remotes
   - Set up CDN for remote entries
   - Implement error boundaries
   - Add monitoring and logging

6. **CI/CD**
   - Independent deployment pipelines
   - Version management
   - Rollback strategies

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions on deploying to Vercel.

**Quick Start:**
1. Deploy remote apps first: `cd apps/admin-dashboard && vercel`
2. Set environment variables in shell app with remote URLs
3. Deploy shell app: `cd apps/shell && vercel`

## Troubleshooting

### Remote components not loading
- Ensure all remote apps are running
- Check browser console for errors
- Verify ports match in `next.config.js`
- Clear `.next` folders and rebuild

### Module not found errors
- Run `yarn install` in root
- Check that `@module-federation/nextjs-mf` is installed in all apps
- Verify webpack configuration

### Styling conflicts
- Use CSS Modules or styled-components
- Consider CSS-in-JS solutions
- Implement style isolation

## Resources

- [Module Federation Documentation](https://module-federation.github.io/)
- [Next.js Module Federation Plugin](https://github.com/module-federation/nextjs-mf)
- [Webpack Module Federation](https://webpack.js.org/concepts/module-federation/)
