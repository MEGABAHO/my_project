import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function GET() {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox', 
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-web-security'
            ],
        });

        const page = await browser.newPage();
        
        // Set viewport to A4 dimensions in pixels
        await page.setViewport({
            width: 794,  // A4 width at 96 DPI
            height: 1123, // A4 height at 96 DPI
            deviceScaleFactor: 2, // Higher quality
        });
        
        // Navigate to the CV page
        const cvUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/cv`;
        await page.goto(cvUrl, {
            waitUntil: 'networkidle0',
            timeout: 30000,
        });

        // Wait for the print-zone and all images to load
        await page.waitForSelector('#print-zone');
        await page.waitForSelector('.cube');
        
        // Wait for all images to load
        await page.evaluate(() => {
            return Promise.all(
                Array.from(document.images)
                    .filter(img => !img.complete)
                    .map(img => new Promise(resolve => {
                        img.onload = img.onerror = resolve;
                    }))
            );
        });

        // Inject CSS to ensure all elements render correctly for PDF
        await page.addStyleTag({
            content: `
                /* Force all elements to be visible and properly positioned */
                * {
                    print-color-adjust: exact !important;
                    -webkit-print-color-adjust: exact !important;
                }
                
                .page {
                    width: 210mm !important;
                    min-height: 297mm !important;
                    max-height: 297mm !important;
                    overflow: visible !important;
                }
                
                .header-block {
                    position: relative;
                    z-index: 10;
                }
                
                .cube {
                    transform: none !important;
                    position: relative;
                    z-index: 1;
                }
                
                .name-block {
                    position: relative;
                    z-index: 20;
                    margin-top: -50px;
                }
                
                /* Ensure cards are visible */
                .item {
                    opacity: 1 !important;
                    visibility: visible !important;
                }
                
                .card {
                    transform: none !important;
                    opacity: 1 !important;
                }
                
                .card-back {
                    display: none !important;
                }
                
                /* Fix profile text alignment */
                .logo-profil {
                    text-align: left !important;
                }
                
                /* Ensure background fills entire page */
                body {
                    background: linear-gradient(122deg, rgb(210, 153, 238) 17%, rgb(124, 202, 221) 91%) !important;
                    background-attachment: fixed !important;
                    width: 210mm !important;
                    height: 297mm !important;
                }
                
                /* Show LinkedIn button in PDF */
                .LinkedIn {
                    display: flex !important;
                    opacity: 1 !important;
                    visibility: visible !important;
                }
                
                /* Hide only print/download buttons */
                .Download, .Print {
                    display: none !important;
                }
            `
        });

        // Generate PDF with optimal settings
        const pdf = await page.pdf({
            format: 'A4',
            printBackground: true,
            preferCSSPageSize: false,
            margin: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
            },
            displayHeaderFooter: false,
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
            { error: 'Failed to generate PDF', details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
