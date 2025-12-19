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
                
                html, body {
                    width: 210mm !important;
                    height: 297mm !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    background: url(https://img.freepik.com/free-vector/white-technology-background_23-2148390328.jpg?w=740&t=st=1712143117~exp=1712143717~hmac=8543a1e99664bb913790c25c04fd2b57936ea2bb7e425074b6b7100c327e6862) no-repeat center center !important;
                    background-size: cover !important;
                }
                
                body {
                    background: url(https://img.freepik.com/free-vector/white-technology-background_23-2148390328.jpg?w=740&t=st=1712143117~exp=1712143717~hmac=8543a1e99664bb913790c25c04fd2b57936ea2bb7e425074b6b7100c327e6862) no-repeat center center !important;
                    background-size: cover !important;
                }
                
                /* Override site background gradient - hide Container div gradient */
                html::before,
                html::after,
                body::before,
                body::after {
                    display: none !important;
                }
                
                /* Remove site gradient from Container component */
                body > div:first-child,
                .min-h-screen {
                    background: none !important;
                    background-image: none !important;
                    background-color: transparent !important;
                }
                
                .page {
                    width: 210mm !important;
                    min-height: 297mm !important;
                    height: 297mm !important;
                    overflow: visible !important;
                    background: transparent !important;
                }
                
                #print-zone {
                    width: 210mm !important;
                    min-height: 297mm !important;
                    height: 297mm !important;
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
                
                /* Position name right under profile block */
                .name {
                    top: 21rem !important;
                    left: 8rem !important;
                    right: auto !important;
                    position: absolute !important;
                    margin-left: 0 !important;
                    margin-top: 0 !important;
                }
                
                .name-block {
                    position: relative;
                    z-index: 20;
                }
                
                .name-wrapper {
                    position: relative;
                }
                
                .name-gredient {
                    position: relative;
                }
                
                /* Ensure cards are visible */
                .item {
                    opacity: 1 !important;
                    visibility: visible !important;
                }
                
                .card {
                    transform: none !important;
                    opacity: 1 !important;
                    width: 100% !important;
                    max-width: none !important;
                    margin-right: 0 !important;
                }
                
                .card-back {
                    display: none !important;
                }
                
                /* Shift profile section slightly to the left */
                .profil {
                    position: relative;
                    left: 7rem !important;
                }
                
                .logo-profil {
                    position: relative;
                }
                
                .profil p {
                    text-align: left;
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
