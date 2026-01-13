# Quick Start Guide

## Prerequisites

- Node.js 18+ installed
- Yarn installed (`npm install -g yarn`)

## Step-by-Step Setup

### 1. Install Dependencies

```bash
yarn install
```

This will install dependencies for all apps in the monorepo.

### 2. Start All Services

You need to run three services simultaneously. Open **three separate terminal windows**:

#### Terminal 1: Admin Dashboard (Remote)
```bash
cd "module-federation example"
yarn dev:admin
```
Wait for: `✓ Ready on http://localhost:3001`

#### Terminal 2: Customer Dashboard (Remote)
```bash
cd "module-federation example"
yarn dev:customer
```
Wait for: `✓ Ready on http://localhost:3002`

#### Terminal 3: Shell App (Host)
```bash
cd "module-federation example"
yarn dev:shell
```
Wait for: `✓ Ready on http://localhost:3000`

### 3. Test the Federation

1. **Open your browser** and go to: http://localhost:3000
   - You should see both Admin and Customer dashboards side by side
   - Both components should be interactive

2. **Test individual pages:**
   - http://localhost:3000/admin - Admin dashboard page
   - http://localhost:3000/customer - Customer dashboard page

3. **Test standalone apps:**
   - http://localhost:3001 - Admin dashboard standalone
   - http://localhost:3002 - Customer dashboard standalone

## What to Verify

✅ **Shell app loads remote components** - Check http://localhost:3000
✅ **Remote apps run independently** - Check ports 3001 and 3002
✅ **State management works** - Click buttons, interact with components
✅ **No console errors** - Check browser DevTools console
✅ **Hot reload works** - Edit a component and see it update

## Troubleshooting

### Port Already in Use
If you get a port conflict error:
- Stop any other Next.js apps running
- Or change ports in `package.json` scripts

### Module Not Found
```bash
# Clean and reinstall
rm -rf node_modules apps/*/node_modules
yarn install
```

### Remote Components Not Loading
1. Ensure all three services are running
2. Check browser console for errors
3. Verify the remote URLs in `apps/shell/next.config.js` match the ports
4. Clear browser cache and hard refresh (Cmd+Shift+R / Ctrl+Shift+R)

### TypeScript Errors
```bash
# Rebuild TypeScript
yarn workspace shell build
```

## Next Steps

Once this test case works:
1. ✅ Verify Module Federation is working
2. ✅ Test production builds (`yarn build` in each app)
3. ✅ Plan migration strategy for your full app
4. ✅ Set up shared packages for common code
5. ✅ Integrate Redux and authentication

## Architecture Notes

- **Shell App**: Host application that consumes remotes
- **Remote Apps**: Independent Next.js apps that expose components
- **Module Federation**: Runtime code sharing between apps
- **Shared Dependencies**: React is shared to avoid duplication
