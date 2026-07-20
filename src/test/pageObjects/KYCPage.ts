import { pageFixture } from "../utils/pageFixture";
import { expect } from "@playwright/test";

export default class KYCPage {
    private selectors = {
        // Summary Cards
        totalRequests: 'div:has-text("Total Requests")',
        pending: 'div:has-text("Pending")',
        approved: 'div:has-text("Approved")',
        rejected: 'div:has-text("Rejected")',

        // Status Filter
        statusFilter: 'select',
        statusColumn: 'tbody tr td:nth-child(6)', // Update if needed

        // Search
        searchType: 'select[style*="text-align-last"]',
        searchBox: 'input[placeholder="Search by name..."]',

        // Table Columns (Update if needed)
        nameColumn: 'tbody tr td:nth-child(2)',
        emailColumn: 'tbody tr td:nth-child(3)',
        nicColumn: 'tbody tr td:nth-child(4)',
        mobileColumn: 'tbody tr td:nth-child(5)',

        // Review Details
        reviewDetailsButton: 'button:has-text("Review Details")',

        personalDetailsHeader: 'p:has-text("Personal Details")',
        documentsHeader: 'p:has-text("Documents")',

        fatherName: 'span:has-text("Father Name")',
        motherName: 'span:has-text("Mother Name")',
        dateOfBirth: 'span:has-text("Date of Birth")',
        nicNumber: 'span:has-text("NIC Number")',
        nicIssuedDate: 'span:has-text("NIC Issued Date")',
        address: 'span:has-text("Address")',
        kycSubmittedDate: 'span:has-text("KYC Submitted Date")',

        verifiedStatus: 'span:has-text("Verified")',
        rejectedStatus: 'span:has-text("Rejected")'
    };

    getKYCRequestsHeading() {
        return pageFixture.page.getByText("KYC Requests", { exact: true });
    }

    async verifyKycRequestsHeadingVisible() {
        try {
            await expect(this.getKYCRequestsHeading()).toBeVisible();
            await pageFixture.logger.info("KYC Requests heading is visible.");
        } catch (error) {
            await pageFixture.page.screenshot({
                path: `reports/screenshots/kyc-heading-${Date.now()}.png`
            });
            throw error;
        }
    }

    async verifySummaryCardsVisible() {
        try {
            await expect(pageFixture.page.locator(this.selectors.totalRequests)).toBeVisible();
            await expect(pageFixture.page.locator(this.selectors.pending)).toBeVisible();
            await expect(pageFixture.page.locator(this.selectors.approved).first()).toBeVisible();
            await expect(pageFixture.page.locator(this.selectors.rejected)).toBeVisible();

            await pageFixture.logger.info("Summary cards verified successfully.");
        } catch (error) {
            await pageFixture.page.screenshot({
                path: `reports/screenshots/summary-cards-${Date.now()}.png`
            });
            throw error;
        }
    }

    async verifyStatusFilter() {

        const statuses = [
            { value: "PENDING", text: "Pending" },
            { value: "VERIFIED", text: "Verified" },
            { value: "REJECTED", text: "Rejected" }
        ];

        for (const status of statuses) {

            await pageFixture.page
                .locator(this.selectors.statusFilter)
                .selectOption(status.value);

            await pageFixture.page.waitForLoadState("networkidle");

            const statusCells = pageFixture.page.locator(this.selectors.statusColumn);

            const count = await statusCells.count();

            expect(count).toBeGreaterThan(0);

            for (let i = 0; i < count; i++) {
                const actualStatus = (await statusCells.nth(i).textContent())?.trim();

                expect(actualStatus).toBe(status.text);
            }

            await pageFixture.logger.info(`${status.text} filter verified.`);
        }

        // Reset to All
        await pageFixture.page.locator(this.selectors.statusFilter).selectOption("");
    }

    async verifySearch(searchType: string, searchValue: string) {

        await pageFixture.page
            .locator(this.selectors.searchType)
            .selectOption(searchType);

        const searchBox = pageFixture.page.locator(this.selectors.searchBox);

        await searchBox.clear();
        await searchBox.fill(searchValue);

        await pageFixture.page.waitForLoadState("networkidle");

        let column;

        switch (searchType) {

            case "customerName":
                column = pageFixture.page.locator(this.selectors.nameColumn);
                break;

            case "email":
                column = pageFixture.page.locator(this.selectors.emailColumn);
                break;

            case "nic":
                column = pageFixture.page.locator(this.selectors.nicColumn);
                break;

            case "mobileNumber":
                column = pageFixture.page.locator(this.selectors.mobileColumn);
                break;

            default:
                throw new Error(`Invalid search type: ${searchType}`);
        }

        const count = await column.count();

        expect(count).toBeGreaterThan(0);

        for (let i = 0; i < count; i++) {

            const value = (await column.nth(i).textContent())?.trim().toLowerCase();

            expect(value).toContain(searchValue.toLowerCase());
        }

        await pageFixture.logger.info(
            `Search verified. Type=${searchType}, Value=${searchValue}`
        );

        await searchBox.clear();

        await pageFixture.page
            .locator(this.selectors.searchType)
            .selectOption("customerName");
    }

    async verifyReviewDetails() {

        await pageFixture.page
            .locator(this.selectors.reviewDetailsButton)
            .first()
            .click();

        await expect(
            pageFixture.page.locator(this.selectors.personalDetailsHeader)
        ).toBeVisible();

        await expect(
            pageFixture.page.locator(this.selectors.documentsHeader)
        ).toBeVisible();

        await expect(
            pageFixture.page.locator(this.selectors.fatherName)
        ).toBeVisible();

        await expect(
            pageFixture.page.locator(this.selectors.motherName)
        ).toBeVisible();

        await expect(
            pageFixture.page.locator(this.selectors.dateOfBirth)
        ).toBeVisible();

        await expect(
            pageFixture.page.locator(this.selectors.nicNumber)
        ).toBeVisible();

        await expect(
            pageFixture.page.locator(this.selectors.nicIssuedDate)
        ).toBeVisible();

        await expect(
            pageFixture.page.locator(this.selectors.address)
        ).toBeVisible();

        await expect(
            pageFixture.page.locator(this.selectors.kycSubmittedDate)
        ).toBeVisible();

        const verified = pageFixture.page.locator(this.selectors.verifiedStatus);
        const rejected = pageFixture.page.locator(this.selectors.rejectedStatus);

        if (await verified.count() > 0) {
            await expect(verified.first()).toBeVisible();
        }

        if (await rejected.count() > 0) {
            await expect(rejected.first()).toBeVisible();
        }

        await pageFixture.logger.info("Review Details verified successfully.");
    }
}