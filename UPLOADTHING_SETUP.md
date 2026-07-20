# Uploadthing Certificate Download Integration Guide

## Overview
This guide explains how to set up Uploadthing for certificate file uploads and downloads in the application.

## Setup Steps

### 1. Get Uploadthing API Keys

1. Go to [uploadthing.com](https://uploadthing.com)
2. Create an account or sign in
3. Create a new app
4. Copy your `UPLOADTHING_SECRET` from the dashboard

### 2. Add Environment Variables

Add the following to your `.env.local`:

```env
# Uploadthing Configuration
UPLOADTHING_SECRET=your_uploadthing_secret_here
```

For development, you can also add:
```env
UPLOADTHING_APP_ID=your_app_id_here
```

### 3. Files Created/Modified

#### New Files:
- `src/app/api/uploadthing/core.ts` - Uploadthing router configuration
- `src/app/api/uploadthing/route.ts` - Uploadthing API route handler
- `src/lib/uploadthing.ts` - Uploadthing client components
- `src/app/api/admin/certificates/upload/[id]/route.ts` - Certificate upload API
- `src/components/CertificateUpload.tsx` - Upload button component

#### Modified Files:
- `prisma/schema.prisma` - Added `certificateUrl` field to Certificate model
- `src/app/admin/certificates/edit/[id]/page.tsx` - Added upload interface
- `src/app/certificate/page.tsx` - Added download button
- `src/lib/certificateUtils.ts` - Updated response to include certificateUrl

### 4. Database Migration

The migration has been applied automatically:
```sql
ALTER TABLE "Certificate" ADD COLUMN "certificateUrl" TEXT;
```

## Usage

### Admin - Upload Certificate

1. Go to Admin Panel → Certificates
2. Click on a certificate to edit
3. Scroll to "Certificate File" section
4. Click the upload button to select a PDF file
5. The file will be uploaded to Uploadthing and saved to the database

### Users - Download Certificate

1. Go to Certificate Verification page
2. Search for your certificate
3. If a certificate file exists, click "Download Certificate" button
4. The PDF will download from Uploadthing

## File Size Limits

- Maximum file size: 16MB (configured in `src/app/api/uploadthing/core.ts`)
- Supported formats: PDF only

## API Endpoints

### Upload/Update Certificate File
```
PATCH /api/admin/certificates/upload/[id]
Content-Type: application/json

{
  "certificateUrl": "https://utfs.io/f/..."
}
```

### Get Certificate with File
```
GET /api/admin/certificates/upload/[id]
```

## Troubleshooting

### "UPLOADTHING_SECRET not found" Error
- Make sure you've added `UPLOADTHING_SECRET` to your `.env.local`
- Restart the development server after adding env variables

### Upload Button Not Showing
- Ensure the `CertificateUpload` component is imported correctly
- Check that Uploadthing API keys are valid
- Verify the component is in a `"use client"` component

### Certificate URL Not Saving
- Check the API response in browser DevTools Network tab
- Ensure the certificate ID is valid
- Verify database connection

## Security Notes

1. All certificate uploads are scoped to admins only
2. Certificate URLs are public but verification requires DOB
3. File size is limited to 16MB to prevent abuse
4. Only PDF files are allowed for certificate uploads

## Support

For issues with Uploadthing, visit: https://docs.uploadthing.com
