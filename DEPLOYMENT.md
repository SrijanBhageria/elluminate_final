# Deploying to AWS S3

This guide explains how to deploy your Next.js static export to AWS S3.

## Prerequisites

1. **AWS CLI installed**: [Install AWS CLI](https://aws.amazon.com/cli/)
2. **AWS credentials configured**: Run `aws configure` to set up your credentials
3. **S3 bucket created**: Create a bucket in AWS S3

## Quick Start

### Option 1: Using the deployment script

```bash
# Basic deployment (uploads to S3 only)
./deploy-to-s3.sh your-bucket-name

# With CloudFront cache invalidation
./deploy-to-s3.sh your-bucket-name your-cloudfront-distribution-id
```

### Option 2: Manual deployment

```bash
# Upload all files to S3
aws s3 sync out/ s3://your-bucket-name/ --delete

# If using CloudFront, invalidate the cache
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

## Setting Up S3 Bucket

1. **Create a new S3 bucket** in AWS Console:
   - Go to S3 → Create bucket
   - Name: `your-website-name` (must be globally unique)
   - Region: Choose closest to your users
   - Uncheck "Block all public access" (or configure bucket policy)
   - Enable versioning (optional)

2. **Configure bucket for static website hosting**:
   - Go to your bucket → Properties
   - Scroll to "Static website hosting"
   - Enable it and set:
     - Index document: `index.html`
     - Error document: `404.html`

3. **Set bucket policy** (to allow public read access):
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::your-bucket-name/*"
       }
     ]
   }
   ```

4. **Optional: Set up CloudFront** (for better performance and custom domain):
   - Create a CloudFront distribution
   - Origin: Your S3 bucket
   - Default root object: `index.html`
   - Add a custom domain and SSL certificate

## Build and Deploy

```bash
# 1. Build the static export
npm run build

# 2. Deploy to S3
./deploy-to-s3.sh your-bucket-name

# 3. (Optional) Invalidate CloudFront
aws cloudfront create-invalidation \
  --distribution-id YOUR_DIST_ID \
  --paths "/*"
```

## Environment Variables

If you need to use environment variables, create a `.env.local` file:
   ```
   # Example: EmailJS configuration for contact form
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_DOWNLOAD_TEMPLATE_ID=your_download_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   ```
   These will be embedded in the static build.

## Custom Domain Setup

1. **Route 53**: Create an A record or CNAME pointing to your CloudFront distribution
2. **CloudFront**: Configure alternate domain names in distribution settings
3. **SSL Certificate**: Request a certificate in AWS Certificate Manager

## Troubleshooting

### Images not loading
- Check that all images are in the `public/` directory
- Images should be referenced from root: `/image.png` not `./image.png`

### Routes returning 404
- Static export uses trailing slashes (configured in `next.config.ts`)
- Ensure all links use relative paths

### Build fails
- Check for any server-side features (API routes, middleware, etc.)
- Static export doesn't support:
  - Dynamic routes without `generateStaticParams`
  - Server components (all should be client components for static export)
  - API routes

## Files to Upload

The build creates static files in the `out/` directory:
- `index.html` - Main page
- `_next/static/` - JavaScript bundles and assets
- `public/` folder contents - Static assets
- All route folders with their `index.html` files

## Continuous Deployment

For automated deployments, you can integrate with:
- GitHub Actions
- AWS CodePipeline
- CircleCI
- GitLab CI/CD

Example GitHub Action workflow:

```yaml
name: Deploy to S3

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      - run: aws s3 sync out/ s3://your-bucket-name/ --delete
      - run: aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

## Support

For issues or questions, check:
- [Next.js Static Export Docs](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [AWS S3 Static Website Hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)

