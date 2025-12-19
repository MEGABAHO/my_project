import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function GET() {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });

        const page = await browser.newPage();
        
        // Navigate to the CV page
        const cvUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/cv`;
        await page.goto(cvUrl, {
            waitUntil: 'networkidle0',
        });

        // Wait for the print-zone to be loaded
        await page.waitForSelector('#print-zone');

        // Generate PDF
        const pdf = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
            },
        });

        await browser.close();

        // Return PDF as download
        return new NextResponse(pdf, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="Ivan_Topychkanov_CV.pdf"',
            },
        });
    } catch (error) {
        console.error('Error generating PDF:', error);
        return NextResponse.json(
            { error: 'Failed to generate PDF' },
            { status: 500 }
        );
    }
}
