import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { calculateCost, clampQuantity, clampHours } from '../src/utils/pricing';
import { GPU_FLEET, GPU_CATALOG } from '../src/data/gpuData';
import { GpuCatalog } from '../src/components/GpuCatalog';
import { Faq } from '../src/components/Faq';
import { Navbar } from '../src/components/Navbar';
import { FAQ_ITEMS } from '../src/data/faqData';
import { CONSOLE_URL } from '../src/config/site';

describe('Adversarial & Empirical Stress Verification Suite', () => {
  // =========================================================================
  // Mission 1: Pricing Calculator Extreme Boundary Stress Tests
  // =========================================================================
  describe('Mission 1: Pricing Calculator Extreme Boundaries', () => {
    const testGpu = GPU_CATALOG[0]; // H100 SXM5 ($2.49 on-demand, $1.67 spot)

    describe('Quantity boundary stress-testing: 0, -5, 1, 8, 9, 100, NaN, floats (2.7)', () => {
      it('tests clampQuantity and calculateCost for Quantity = 0', () => {
        expect(clampQuantity(0)).toBe(1);
        const res = calculateCost({ gpu: testGpu, quantity: 0, hours: 10, isSpot: false });
        expect(res.clampedQty).toBe(1);
        expect(res.effectiveHourlyRateTotal).toBe(testGpu.onDemandPriceHourly);
        expect(res.totalCost).toBe(Number((testGpu.onDemandPriceHourly * 10).toFixed(2)));
      });

      it('tests clampQuantity and calculateCost for Quantity = -5', () => {
        expect(clampQuantity(-5)).toBe(1);
        const res = calculateCost({ gpu: testGpu, quantity: -5, hours: 10, isSpot: false });
        expect(res.clampedQty).toBe(1);
        expect(res.effectiveHourlyRateTotal).toBe(testGpu.onDemandPriceHourly);
        expect(res.totalCost).toBe(Number((testGpu.onDemandPriceHourly * 10).toFixed(2)));
      });

      it('tests clampQuantity and calculateCost for Quantity = 1', () => {
        expect(clampQuantity(1)).toBe(1);
        const res = calculateCost({ gpu: testGpu, quantity: 1, hours: 10, isSpot: false });
        expect(res.clampedQty).toBe(1);
        expect(res.effectiveHourlyRateTotal).toBe(testGpu.onDemandPriceHourly);
        expect(res.totalCost).toBe(Number((testGpu.onDemandPriceHourly * 10).toFixed(2)));
      });

      it('tests clampQuantity and calculateCost for Quantity = 8', () => {
        expect(clampQuantity(8)).toBe(8);
        const res = calculateCost({ gpu: testGpu, quantity: 8, hours: 10, isSpot: false });
        expect(res.clampedQty).toBe(8);
        expect(res.effectiveHourlyRateTotal).toBe(Number((testGpu.onDemandPriceHourly * 8).toFixed(2)));
        expect(res.totalCost).toBe(Number((testGpu.onDemandPriceHourly * 8 * 10).toFixed(2)));
      });

      it('tests clampQuantity and calculateCost for Quantity = 9', () => {
        expect(clampQuantity(9)).toBe(8);
        const res = calculateCost({ gpu: testGpu, quantity: 9, hours: 10, isSpot: false });
        expect(res.clampedQty).toBe(8);
        expect(res.effectiveHourlyRateTotal).toBe(Number((testGpu.onDemandPriceHourly * 8).toFixed(2)));
        expect(res.totalCost).toBe(Number((testGpu.onDemandPriceHourly * 8 * 10).toFixed(2)));
      });

      it('tests clampQuantity and calculateCost for Quantity = 100', () => {
        expect(clampQuantity(100)).toBe(8);
        const res = calculateCost({ gpu: testGpu, quantity: 100, hours: 10, isSpot: false });
        expect(res.clampedQty).toBe(8);
        expect(res.effectiveHourlyRateTotal).toBe(Number((testGpu.onDemandPriceHourly * 8).toFixed(2)));
      });

      it('tests clampQuantity and calculateCost for Quantity = NaN', () => {
        expect(clampQuantity(NaN)).toBe(1);
        const res = calculateCost({ gpu: testGpu, quantity: NaN, hours: 10, isSpot: false });
        expect(res.clampedQty).toBe(1);
        expect(res.effectiveHourlyRateTotal).toBe(testGpu.onDemandPriceHourly);
      });

      it('tests clampQuantity and calculateCost for Quantity = float (2.7)', () => {
        expect(clampQuantity(2.7)).toBe(2);
        const res = calculateCost({ gpu: testGpu, quantity: 2.7, hours: 10, isSpot: false });
        expect(res.clampedQty).toBe(2);
        expect(res.effectiveHourlyRateTotal).toBe(Number((testGpu.onDemandPriceHourly * 2).toFixed(2)));
        expect(res.totalCost).toBe(Number((testGpu.onDemandPriceHourly * 2 * 10).toFixed(2)));
      });
    });

    describe('Duration boundary stress-testing: 0, -1, 1, 720, 721, 10000, NaN, floats', () => {
      it('tests clampHours and calculateCost for Duration = 0', () => {
        expect(clampHours(0)).toBe(1);
        const res = calculateCost({ gpu: testGpu, quantity: 1, hours: 0, isSpot: false });
        expect(res.clampedHours).toBe(1);
        expect(res.totalCost).toBe(testGpu.onDemandPriceHourly);
      });

      it('tests clampHours and calculateCost for Duration = -1', () => {
        expect(clampHours(-1)).toBe(1);
        const res = calculateCost({ gpu: testGpu, quantity: 1, hours: -1, isSpot: false });
        expect(res.clampedHours).toBe(1);
        expect(res.totalCost).toBe(testGpu.onDemandPriceHourly);
      });

      it('tests clampHours and calculateCost for Duration = 1', () => {
        expect(clampHours(1)).toBe(1);
        const res = calculateCost({ gpu: testGpu, quantity: 1, hours: 1, isSpot: false });
        expect(res.clampedHours).toBe(1);
        expect(res.totalCost).toBe(testGpu.onDemandPriceHourly);
      });

      it('tests clampHours and calculateCost for Duration = 720', () => {
        expect(clampHours(720)).toBe(720);
        const res = calculateCost({ gpu: testGpu, quantity: 1, hours: 720, isSpot: false });
        expect(res.clampedHours).toBe(720);
        expect(res.totalCost).toBe(Number((testGpu.onDemandPriceHourly * 720).toFixed(2)));
      });

      it('tests clampHours and calculateCost for Duration = 721', () => {
        expect(clampHours(721)).toBe(720);
        const res = calculateCost({ gpu: testGpu, quantity: 1, hours: 721, isSpot: false });
        expect(res.clampedHours).toBe(720);
        expect(res.totalCost).toBe(Number((testGpu.onDemandPriceHourly * 720).toFixed(2)));
      });

      it('tests clampHours and calculateCost for Duration = 10000', () => {
        expect(clampHours(10000)).toBe(720);
        const res = calculateCost({ gpu: testGpu, quantity: 1, hours: 10000, isSpot: false });
        expect(res.clampedHours).toBe(720);
        expect(res.totalCost).toBe(Number((testGpu.onDemandPriceHourly * 720).toFixed(2)));
      });

      it('tests clampHours and calculateCost for Duration = NaN', () => {
        expect(clampHours(NaN)).toBe(1);
        const res = calculateCost({ gpu: testGpu, quantity: 1, hours: NaN, isSpot: false });
        expect(res.clampedHours).toBe(1);
        expect(res.totalCost).toBe(testGpu.onDemandPriceHourly);
      });

      it('tests clampHours and calculateCost for Duration = floats (24.8)', () => {
        expect(clampHours(24.8)).toBe(24);
        const res = calculateCost({ gpu: testGpu, quantity: 1, hours: 24.8, isSpot: false });
        expect(res.clampedHours).toBe(24);
        expect(res.totalCost).toBe(Number((testGpu.onDemandPriceHourly * 24).toFixed(2)));
      });
    });

    describe('Spot toggle verification: spot strictly cheaper, non-negative savings', () => {
      it('verifies spot rate is strictly cheaper than on-demand rate across all catalog GPUs', () => {
        expect(GPU_FLEET.length).toBeGreaterThanOrEqual(6);
        GPU_FLEET.forEach((gpu) => {
          expect(gpu.spotPriceHourly).toBeLessThan(gpu.onDemandPriceHourly);
          expect(gpu.spotPriceHourly).toBeGreaterThan(0);
          expect(gpu.onDemandPriceHourly).toBeGreaterThan(0);
        });
      });

      it('verifies savingsVsOnDemand is non-negative and strictly positive in spot mode across all GPUs and quantities', () => {
        const quantities = [1, 2, 4, 8];
        const hoursList = [1, 24, 168, 720];

        GPU_FLEET.forEach((gpu) => {
          quantities.forEach((qty) => {
            hoursList.forEach((hrs) => {
              // Spot mode:
              const spotRes = calculateCost({ gpu, quantity: qty, hours: hrs, isSpot: true });
              expect(spotRes.savingsVsOnDemand).toBeGreaterThan(0);
              expect(spotRes.savingsVsOnDemand).toBeLessThan(spotRes.totalCost * 2);
              expect(spotRes.totalCost).toBeLessThan(
                calculateCost({ gpu, quantity: qty, hours: hrs, isSpot: false }).totalCost
              );

              // On-demand mode: savings must be non-negative (0)
              const onDemandRes = calculateCost({ gpu, quantity: qty, hours: hrs, isSpot: false });
              expect(onDemandRes.savingsVsOnDemand).toBe(0);
            });
          });
        });
      });
    });
  });

  // =========================================================================
  // Mission 2: Interactive UI State Behaviors
  // =========================================================================
  describe('Mission 2: Interactive UI State Behaviors', () => {
    describe('Category filtering ("all", "enterprise", "consumer")', () => {
      it('correctly filters GPU cards when toggling category buttons', () => {
        render(<GpuCatalog />);

        // By default, category is 'all'. All 6 GPUs should be visible.
        GPU_FLEET.forEach((gpu) => {
          expect(screen.getByText(gpu.name)).toBeInTheDocument();
        });

        // Click 'Enterprise AI'
        const enterpriseBtn = screen.getByRole('button', { name: /Enterprise AI/i });
        fireEvent.click(enterpriseBtn);

        // Enterprise GPUs must remain visible
        const enterpriseGpus = GPU_FLEET.filter((g) => g.category === 'enterprise');
        enterpriseGpus.forEach((gpu) => {
          expect(screen.getByText(gpu.name)).toBeInTheDocument();
        });

        // Consumer GPUs must NOT be visible
        const consumerGpus = GPU_FLEET.filter((g) => g.category === 'consumer');
        consumerGpus.forEach((gpu) => {
          expect(screen.queryByText(gpu.name)).toBeNull();
        });

        // Click 'Consumer'
        const consumerBtn = screen.getByRole('button', { name: /^Consumer$/i });
        fireEvent.click(consumerBtn);

        // Consumer GPUs must be visible
        consumerGpus.forEach((gpu) => {
          expect(screen.getByText(gpu.name)).toBeInTheDocument();
        });

        // Enterprise GPUs must NOT be visible
        enterpriseGpus.forEach((gpu) => {
          expect(screen.queryByText(gpu.name)).toBeNull();
        });

        // Click 'All'
        const allBtn = screen.getByRole('button', { name: /^All$/i });
        fireEvent.click(allBtn);

        // All GPUs must be visible again
        GPU_FLEET.forEach((gpu) => {
          expect(screen.getByText(gpu.name)).toBeInTheDocument();
        });
      });
    });

    describe('FAQ accordion single-expand and collapse', () => {
      it('expands item on click, collapses it on second click, and enforces single-expand', () => {
        render(<Faq />);

        const item1 = FAQ_ITEMS[0];
        const item2 = FAQ_ITEMS[1];

        const btn1 = screen.getByRole('button', { name: item1.q });
        const btn2 = screen.getByRole('button', { name: item2.q });

        // Initially both collapsed
        expect(btn1).toHaveAttribute('aria-expanded', 'false');
        expect(btn2).toHaveAttribute('aria-expanded', 'false');
        expect(screen.queryByText(item1.a)).toBeNull();
        expect(screen.queryByText(item2.a)).toBeNull();

        // Click Item 1: opens item 1
        fireEvent.click(btn1);
        expect(btn1).toHaveAttribute('aria-expanded', 'true');
        expect(btn2).toHaveAttribute('aria-expanded', 'false');
        expect(screen.getByText(item1.a)).toBeInTheDocument();
        expect(screen.queryByText(item2.a)).toBeNull();

        // Click Item 2: opens item 2 AND collapses item 1 (single-expand guarantee)
        fireEvent.click(btn2);
        expect(btn1).toHaveAttribute('aria-expanded', 'false');
        expect(btn2).toHaveAttribute('aria-expanded', 'true');
        expect(screen.queryByText(item1.a)).toBeNull();
        expect(screen.getByText(item2.a)).toBeInTheDocument();

        // Click Item 2 again: collapses item 2 (now all collapsed)
        fireEvent.click(btn2);
        expect(btn1).toHaveAttribute('aria-expanded', 'false');
        expect(btn2).toHaveAttribute('aria-expanded', 'false');
        expect(screen.queryByText(item1.a)).toBeNull();
        expect(screen.queryByText(item2.a)).toBeNull();
      });
    });

    describe('Mobile drawer toggle state', () => {
      it('toggles mobile drawer open and closed via hamburger, link click, and CTA click', () => {
        render(<Navbar />);

        const hamburgerBtn = screen.getByRole('button', { name: /Toggle Navigation Menu/i });

        // Initially closed
        expect(hamburgerBtn).toHaveAttribute('aria-expanded', 'false');
        expect(document.getElementById('mobile-drawer')).toBeNull();

        // Open drawer
        fireEvent.click(hamburgerBtn);
        expect(hamburgerBtn).toHaveAttribute('aria-expanded', 'true');
        const drawer = document.getElementById('mobile-drawer');
        expect(drawer).toBeInTheDocument();

        // Click a navigation link inside drawer to verify it closes drawer
        const drawerGpuCatalogLink = screen
          .getAllByText('GPU Catalog')
          .find((el) => el.closest('#mobile-drawer'));
        expect(drawerGpuCatalogLink).toBeDefined();
        fireEvent.click(drawerGpuCatalogLink!);
        expect(document.getElementById('mobile-drawer')).toBeNull();
        expect(hamburgerBtn).toHaveAttribute('aria-expanded', 'false');

        // Re-open drawer
        fireEvent.click(hamburgerBtn);
        expect(document.getElementById('mobile-drawer')).toBeInTheDocument();

        // Click toggle button again (close X)
        fireEvent.click(hamburgerBtn);
        expect(document.getElementById('mobile-drawer')).toBeNull();
        expect(hamburgerBtn).toHaveAttribute('aria-expanded', 'false');

        // Re-open drawer and click Console CTA inside drawer
        fireEvent.click(hamburgerBtn);
        const drawerConsoleCta = document
          .getElementById('mobile-drawer')
          ?.querySelector(`a[href="${CONSOLE_URL}"]`);
        expect(drawerConsoleCta).toBeInTheDocument();
        fireEvent.click(drawerConsoleCta!);
        expect(document.getElementById('mobile-drawer')).toBeNull();
        expect(hamburgerBtn).toHaveAttribute('aria-expanded', 'false');
      });
    });
  });
});
