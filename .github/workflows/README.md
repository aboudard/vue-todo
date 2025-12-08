# GitHub Actions Workflow Configuration

## Deploy Workflow

The `deploy.yml` workflow handles testing and deployment to GitHub Pages.

### Workflow Jobs

#### 1. Test Job

- Runs on every push and pull request to `main`
- Executes unit tests with Vitest
- Runs TypeScript type checking
- Must pass before deployment can occur

#### 2. Deploy Job

- Only runs on `main` branch (not on PRs)
- Requires the test job to pass first
- Builds the application with production settings
- Deploys to GitHub Pages

### Environment Variables

The build step uses the default `.env` configuration:

```yaml
env:
  NODE_ENV: production
  VITE_USE_MOCK_DATA: true
```

**Note:** The `VITE_USE_MOCK_DATA: true` in the workflow is actually redundant since `.env` already sets this value. It's included for explicitness and documentation purposes.

**Why `VITE_USE_MOCK_DATA: true`?**

The deployed application uses mocked data because:

- No backend API server is available on GitHub Pages
- Mocked data provides a fully functional demo
- All CRUD operations work without external dependencies
- Better user experience for visitors viewing the demo

### Local Production Build

To test the production build locally:

```bash
# Build with default .env settings (mocked data)
npm run build

# Preview the production build
npm run preview
```

To test production build with real API, temporarily modify `.env` before building.

### Deployment URL

The application is deployed to: `https://[username].github.io/vue-todo/`

### Manual Deployment

You can manually trigger the workflow:

1. Go to Actions tab in GitHub
2. Select "Test and Deploy to GitHub Pages"
3. Click "Run workflow"
