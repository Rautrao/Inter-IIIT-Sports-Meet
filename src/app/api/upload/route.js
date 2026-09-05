import { handleUpload } from '@vercel/blob/client';
import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/session';

export async function POST(request) {
  const body = await request.json();

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        // Authenticate the user (must be logged in)
        const session = await requireAuth(["iiit", "admin"]);
        
        // Generate a safe, structured pathname: payment-proofs/{iiitCode}/{timestamp}-{random}.{extension}
        const iiitCode = session.iiitCode || "admin";
        const extension = pathname.split('.').pop().toLowerCase();
        
        // Allowed extensions: pdf, jpg, jpeg, png
        const allowedExtensions = ['pdf', 'jpg', 'jpeg', 'png'];
        if (!allowedExtensions.includes(extension)) {
          throw new Error('Invalid file type');
        }

        const safePathname = `payment-proofs/${iiitCode}/${Date.now()}-${Math.random().toString(36).substring(7)}.${extension}`;

        return {
          allowedContentTypes: ['application/pdf', 'image/jpeg', 'image/png'],
          maximumSizeInBytes: 5 * 1024 * 1024, // 5 MB
          validUntil: Date.now() + 5 * 60 * 1000, // Token valid for 5 minutes
          tokenPayload: JSON.stringify({ iiitCode, safePathname }),
          pathname: safePathname,
          access: 'private', // BLOB is strictly private
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Triggered by Vercel Blob webhook after successful upload
        // The blob reference will be returned to the client and later saved in PostgreSQL during final submission
        console.log('Blob upload completed', blob, tokenPayload);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error("Vercel Blob Upload Error:", error);
    return NextResponse.json(
      { error: error.message || 'An error occurred during upload' },
      { status: error.statusCode || 400 }
    );
  }
}
