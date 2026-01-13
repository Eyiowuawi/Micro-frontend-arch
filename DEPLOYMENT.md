# Deployment Guide - Vercel

This guide explains how to deploy the Module Federation setup independently on Vercel.

## Architecture

Each app (shell, admin-dashboard, customer-dashboard) is deployed as a separate Vercel project. They communicate via Module Federation at runtime.

**Note**: This setup uses a **monorepo** (single repository). See [REPOSITORY_STRATEGY.md](./REPOSITORY_STRATEGY.md) for details on monorepo vs multi-repo approaches.

## Prerequisites

1. Vercel account (sign up at https://vercel.com)
2. Vercel CLI installed: `npm i -g vercel`
3. All apps built and tested locally

## Deployment Steps

### Step 1: Deploy Remote Apps First

**Important**: Deploy the remote apps (admin-dashboard and customer-dashboard) BEFORE deploying the shell app. The shell needs their URLs to configure Module Federation.

#### Deploy Admin Dashboard

**Option A: Using Vercel Dashboard (Recommended for Monorepo)**

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New Project**
3. Import your repository
4. Configure the project:
   - **Root Directory**: `apps/admin-dashboard`
   - **Framework Preset**: Next.js
   - **Build Command**: `NEXT_PRIVATE_LOCAL_WEBPACK=true yarn build`
   - **Install Command**: `yarn install`
   - **Output Directory**: `.next`
5. Add environment variable: `NEXT_PRIVATE_LOCAL_WEBPACK=true`
6. Deploy

**Option B: Using Vercel CLI**

```bash
cd apps/admin-dashboard
vercel
```

Follow the prompts:
- Set up and deploy? **Yes**
- Which scope? (Select your account)
- Link to existing project? **No**
- Project name: `admin-dashboard` (or your preferred name)
- **Root Directory**: `apps/admin-dashboard` (important for monorepo!)
- Override settings? **Yes** → Set root directory to `apps/admin-dashboard`

After deployment, note the deployment URL (e.g., `https://admin-dashboard.vercel.app`)

#### Deploy Customer Dashboard

**Option A: Using Vercel Dashboard**

1. Create another new project in Vercel Dashboard
2. Import the same repository
3. Configure:
   - **Root Directory**: `apps/customer-dashboard`
   - **Framework Preset**: Next.js
   - **Build Command**: `NEXT_PRIVATE_LOCAL_WEBPACK=true yarn build`
   - **Install Command**: `yarn install`
4. Add environment variable: `NEXT_PRIVATE_LOCAL_WEBPACK=true`
5. Deploy

**Option B: Using Vercel CLI**

```bash
cd apps/customer-dashboard
vercel
```

Follow the prompts similarly. **Important**: Set root directory to `apps/customer-dashboard`.

Note the deployment URL (e.g., `https://customer-dashboard.vercel.app`)

### Step 2: Configure Shell App with Remote URLs

Before deploying the shell, you need to set environment variables with the remote URLs.

#### Option A: Using Vercel Dashboard

1. Go to your Vercel dashboard
2. Create a new project for the shell app
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

```
NEXT_PUBLIC_ADMIN_URL=https://admin-dashboard.vercel.app
NEXT_PUBLIC_CUSTOMER_URL=https://customer-dashboard.vercel.app
NEXT_PRIVATE_LOCAL_WEBPACK=true
```

#### Option B: Using Vercel CLI

```bash
cd apps/shell

# Set environment variables
vercel env add NEXT_PUBLIC_ADMIN_URL production
# Enter: https://admin-dashboard.vercel.app

vercel env add NEXT_PUBLIC_CUSTOMER_URL production
# Enter: https://customer-dashboard.vercel.app

vercel env add NEXT_PRIVATE_LOCAL_WEBPACK production
# Enter: true
```

### Step 3: Deploy Shell App

**Option A: Using Vercel Dashboard**

1. Create another new project in Vercel Dashboard
2. Import the same repository
3. Configure:
   - **Root Directory**: `apps/shell`
   - **Framework Preset**: Next.js
   - **Build Command**: `NEXT_PRIVATE_LOCAL_WEBPACK=true yarn build`
   - **Install Command**: `yarn install`
4. Add environment variables:
   - `NEXT_PUBLIC_ADMIN_URL=https://admin-dashboard.vercel.app`
   - `NEXT_PUBLIC_CUSTOMER_URL=https://customer-dashboard.vercel.app`
   - `NEXT_PRIVATE_LOCAL_WEBPACK=true`
5. Deploy

**Option B: Using Vercel CLI**

```bash
cd apps/shell
vercel
```

Follow the prompts:
- Set up and deploy? **Yes**
- Which scope? (Select your account)
- Link to existing project? **No** (or **Yes** if you created it in dashboard)
- Project name: `shell` (or your preferred name)
- **Root Directory**: `apps/shell` (important for monorepo!)
- Override settings? **Yes** → Set root directory to `apps/shell`

### Step 4: Verify Deployment

1. Visit your shell app URL (e.g., `https://shell.vercel.app`)
2. Check browser console for any Module Federation errors
3. Verify that remote components load correctly

## Monorepo Deployment

If you're deploying from a monorepo, you need to configure the root directory for each project.

### Using Vercel Dashboard

For each project in Vercel:
1. Go to **Settings** → **General**
2. Set **Root Directory** to:
   - `apps/shell` for shell app
   - `apps/admin-dashboard` for admin app
   - `apps/customer-dashboard` for customer app
3. Set **Build Command** to: `NEXT_PRIVATE_LOCAL_WEBPACK=true yarn build`
4. Set **Install Command** to: `yarn install`
5. Set **Output Directory** to: `.next`

### Using vercel.json

Each app already has a `vercel.json` file configured. Vercel will automatically detect and use these settings.

## Environment Variables

### Shell App (Required)

| Variable | Description | Example |
|----------|------------|---------|
| `NEXT_PUBLIC_ADMIN_URL` | URL of deployed admin-dashboard | `https://admin-dashboard.vercel.app` |
| `NEXT_PUBLIC_CUSTOMER_URL` | URL of deployed customer-dashboard | `https://customer-dashboard.vercel.app` |
| `NEXT_PRIVATE_LOCAL_WEBPACK` | Enable local webpack | `true` |

### Remote Apps (Optional)

| Variable | Description | Default |
|----------|------------|---------|
| `NEXT_PRIVATE_LOCAL_WEBPACK` | Enable local webpack | `true` |

## Updating Deployments

### Update a Remote App

1. Make changes to the remote app
2. Deploy: `cd apps/admin-dashboard && vercel --prod`
3. The shell app will automatically use the new version (no redeploy needed)

### Update Shell App

1. Make changes to the shell app
2. Deploy: `cd apps/shell && vercel --prod`
3. If remote URLs changed, update environment variables first

## Troubleshooting

### Remote Components Not Loading

1. **Check remote URLs**: Verify environment variables are set correctly
2. **Check CORS**: Ensure remote apps allow cross-origin requests
3. **Check browser console**: Look for Module Federation errors
4. **Verify remote entry files**: Visit `https://admin-dashboard.vercel.app/_next/static/chunks/remoteEntry.js` - should return JavaScript

### Build Failures

1. **Missing webpack**: Ensure `NEXT_PRIVATE_LOCAL_WEBPACK=true` is set
2. **Module not found**: Ensure all dependencies are in `package.json`
3. **Build timeout**: Increase build timeout in Vercel settings if needed

### CORS Issues

If you see CORS errors, add headers to remote apps:

Create `next.config.js` in remote apps:

```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ];
  },
};
```

## Production Best Practices

1. **Use custom domains**: Set up custom domains for each app
2. **Enable HTTPS**: Vercel automatically provides HTTPS
3. **Set up monitoring**: Use Vercel Analytics or other monitoring tools
4. **Cache remote entries**: Consider CDN caching for remote entry files
5. **Version management**: Tag releases and use versioned URLs if needed

## CI/CD Integration

### GitHub Integration

1. Connect your GitHub repository to Vercel
2. Vercel will automatically deploy on push
3. Configure branch-based deployments (main = production, develop = preview)

### Manual Deployment Script

Create a deployment script:

```bash
#!/bin/bash

# Deploy remotes first
cd apps/admin-dashboard && vercel --prod && cd ../..
cd apps/customer-dashboard && vercel --prod && cd ../..

# Wait for deployments to complete
sleep 10

# Deploy shell
cd apps/shell && vercel --prod
```

## Cost Considerations

- Each app is a separate Vercel project
- Vercel Hobby plan: Free for personal projects
- Vercel Pro: $20/month per team member
- Each deployment counts toward your deployment limit

## Support

For issues:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify environment variables
4. Test locally first
