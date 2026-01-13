# Repository Strategy for Module Federation

## Current Setup: Monorepo (Single Repository)

The current setup uses a **monorepo** structure where all apps are in one repository:

```
module-federation example/
├── apps/
│   ├── shell/
│   ├── admin-dashboard/
│   └── customer-dashboard/
├── packages/ (optional - for shared code)
└── package.json
```

## Option 1: Monorepo (Recommended for Testing & Small Teams)

### Pros ✅
- **Easy to manage** - All code in one place
- **Shared packages** - Easy to share components, utilities, types
- **Atomic changes** - Update multiple apps in one commit
- **Simpler CI/CD** - One pipeline, one set of secrets
- **Better for testing** - Test the entire system together
- **Version sync** - All apps use same dependency versions

### Cons ❌
- **Single point of failure** - One broken commit affects all apps
- **Less team autonomy** - All teams work in same repo
- **Larger repo size** - More code to clone
- **Merge conflicts** - More likely with multiple teams

### When to Use
- ✅ Testing and prototyping (your current case)
- ✅ Small teams (< 5 developers)
- ✅ Tightly coupled apps
- ✅ Need to share a lot of code
- ✅ Want simpler deployment coordination

### Vercel Deployment (Monorepo)

Each app is still deployed independently, but from the same repo:

1. **Create 3 separate Vercel projects** (one per app)
2. **Set Root Directory** for each:
   - Shell: `apps/shell`
   - Admin: `apps/admin-dashboard`
   - Customer: `apps/customer-dashboard`
3. **Deploy independently** - Each app has its own deployment pipeline

---

## Option 2: Multi-Repo (Separate Repositories)

### Pros ✅
- **Team autonomy** - Each team owns their repo
- **Independent deployments** - No coordination needed
- **Smaller repos** - Faster clones
- **Better isolation** - One broken app doesn't affect others
- **Independent versioning** - Each app can use different dependency versions
- **Clear ownership** - Easier to assign repo permissions

### Cons ❌
- **Harder to share code** - Need npm packages or git submodules
- **Version management** - Need to coordinate dependency versions
- **More complex CI/CD** - Separate pipelines, separate secrets
- **Cross-repo changes** - Harder to make changes across apps

### When to Use
- ✅ Large teams (> 5 developers per app)
- ✅ Loosely coupled apps
- ✅ Different release cycles
- ✅ Need strict access control
- ✅ Apps maintained by different organizations

### Repository Structure (Multi-Repo)

```
admin-dashboard-repo/
├── components/
├── pages/
├── package.json
└── next.config.js

customer-dashboard-repo/
├── components/
├── pages/
├── package.json
└── next.config.js

shell-repo/
├── pages/
├── package.json
└── next.config.js

shared-packages-repo/ (optional)
├── shared-ui/
├── shared-utils/
└── shared-types/
```

### Vercel Deployment (Multi-Repo)

1. **Each repo connects to its own Vercel project**
2. **No root directory needed** - Each repo is already at the root
3. **Set environment variables** in shell app with remote URLs
4. **Deploy independently** - Each repo has its own deployment

---

## Recommendation for Your Case

### Start with Monorepo (Current Setup) ✅

Since you're:
- Testing Module Federation
- Building a proof of concept
- Likely a small team initially
- Need to share code easily

**Keep the monorepo structure** - it's simpler and easier to manage.

### Migrate to Multi-Repo Later (If Needed)

Consider splitting when:
- Teams grow beyond 5-10 developers
- Apps have very different release cycles
- You need strict access control
- Apps become truly independent

---

## How to Deploy Monorepo to Vercel

### Method 1: Vercel Dashboard (Recommended)

1. **Create 3 Vercel projects:**
   - `shell-app`
   - `admin-dashboard-app`
   - `customer-dashboard-app`

2. **For each project, set:**
   - **Root Directory**: 
     - Shell: `apps/shell`
     - Admin: `apps/admin-dashboard`
     - Customer: `apps/customer-dashboard`
   - **Build Command**: `NEXT_PRIVATE_LOCAL_WEBPACK=true yarn build`
   - **Install Command**: `yarn install`
   - **Framework Preset**: Next.js

3. **Connect to your GitHub repo** (same repo for all 3 projects)

4. **Set environment variables** in shell project:
   ```
   NEXT_PUBLIC_ADMIN_URL=https://admin-dashboard-app.vercel.app
   NEXT_PUBLIC_CUSTOMER_URL=https://customer-dashboard-app.vercel.app
   NEXT_PRIVATE_LOCAL_WEBPACK=true
   ```

### Method 2: Vercel CLI

```bash
# From root directory
cd apps/admin-dashboard
vercel --cwd . --root-directory apps/admin-dashboard

cd ../customer-dashboard
vercel --cwd . --root-directory apps/customer-dashboard

cd ../shell
vercel --cwd . --root-directory apps/shell
```

---

## How to Split into Multi-Repo (If Needed)

### Step 1: Create Separate Repositories

```bash
# Create new repos on GitHub
# admin-dashboard-repo
# customer-dashboard-repo
# shell-repo
```

### Step 2: Move Code

```bash
# For each app, create a new repo and copy files
git clone <new-repo-url>
cp -r apps/admin-dashboard/* admin-dashboard-repo/
cd admin-dashboard-repo
git add .
git commit -m "Initial commit"
git push
```

### Step 3: Update Configuration

**Shell app** - Update `next.config.js` to use production URLs:
```javascript
remotes: {
  admin: `admin@${process.env.NEXT_PUBLIC_ADMIN_URL}/_next/static/...`,
  customer: `customer@${process.env.NEXT_PUBLIC_CUSTOMER_URL}/_next/static/...`,
}
```

**Remote apps** - No changes needed, they just expose components.

### Step 4: Handle Shared Code

**Option A: NPM Packages**
- Publish shared code to npm (private or public)
- Install in each repo: `npm install @your-org/shared-ui`

**Option B: Git Submodules**
- Create `shared-packages` repo
- Add as submodule: `git submodule add <url> packages/shared`

**Option C: Copy Code**
- Copy shared utilities to each repo (not recommended for large codebases)

---

## Comparison Table

| Feature | Monorepo | Multi-Repo |
|---------|----------|------------|
| **Setup Complexity** | Low | Medium |
| **Code Sharing** | Easy | Harder |
| **Team Autonomy** | Low | High |
| **Deployment** | Coordinated | Independent |
| **CI/CD** | Single pipeline | Multiple pipelines |
| **Version Management** | Synchronized | Independent |
| **Best For** | Small teams, testing | Large teams, production |

---

## Current Recommendation

**Keep the monorepo** for now because:
1. ✅ You're testing Module Federation
2. ✅ Easier to manage and deploy
3. ✅ Can share code easily
4. ✅ Can split later if needed

**Split to multi-repo** when:
1. Teams grow significantly
2. Apps have different release cycles
3. Need strict access control
4. Apps become truly independent

---

## Quick Decision Guide

**Choose Monorepo if:**
- Team size < 10 developers
- Apps are tightly coupled
- Need to share a lot of code
- Want simpler deployment

**Choose Multi-Repo if:**
- Team size > 10 developers
- Apps are loosely coupled
- Different release cycles
- Need strict access control
