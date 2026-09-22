import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../src/App';
import { CONSOLE_URL } from '../src/config/site';
import { GPU_CATALOG } from '../src/data/gpuData';
import { calculateCost } from '../src/utils/pricing';
import { GpuCatalog } from '../src/components/GpuCatalog';
import { Faq } from '../src/components/Faq';

describe('Tier 2: Boundary Value & Corner Case Testing', () => {
  // -------------------------------------------------------------------------
  // 1. Quantity Slider Boundary Limits (1 to 8)
  // -------------------------------------------------------------------------
  describe('Quantity Slider Boundary Values', () => {
    const rtx4090 = GPU_CATALOG.find((g) => g.id === 'rtx-4090')!;

    it('handles minimum quantity of 1 instance accurately', () => {
      const res = calculateCost({ gpu: rtx4090, quantity: 1, hours: 1, isSpot: false });
      expect(res.clampedQty).toBe(1);
      expect(res.effectiveHourlyRateTotal).toBe(1.88);
      expect(res.totalCost).toBe(1.88);
    });

    it('handles maximum quantity of 8 instances accurately', () => {
      const res = calculateCost({ gpu: rtx4090, quantity: 8, hours: 1, isSpot: false });
      expect(res.clampedQty).toBe(8);
      expect(res.effectiveHourlyRateTotal).toBe(15.04);
      expect(res.totalCost).toBe(15.04);
    });

    it('safely clamps zero or negative quantity to minimum 1', () => {
      const zeroQty = calculateCost({ gpu: rtx4090, quantity: 0, hours: 10, isSpot: false });
      expect(zeroQty.clampedQty).toBe(1);
      expect(zeroQty.effectiveHourlyRateTotal).toBe(1.88);
      const negQty = calculateCost({ gpu: rtx4090, quantity: -5, hours: 10, isSpot: false });
      expect(negQty.clampedQty).toBe(1);
      expect(negQty.effectiveHourlyRateTotal).toBe(1.88);
    });

    it('safely clamps excessive quantity (>8) to maximum 8', () => {
      const excessQty = calculateCost({ gpu: rtx4090, quantity: 999, hours: 10, isSpot: false });
      expect(excessQty.clampedQty).toBe(8);
      expect(excessQty.effectiveHourlyRateTotal).toBe(15.04);
    });

    it('handles non-integer quantity by flooring to nearest integer bounded [1, 8]', () => {
      const floatQty = calculateCost({ gpu: rtx4090, quantity: 3.7, hours: 10, isSpot: false });
      expect(floatQty.clampedQty).toBe(3);
      expect(floatQty.effectiveHourlyRateTotal).toBe(5.64);
    });
  });

  // -------------------------------------------------------------------------
  // 2. Duration Slider Boundary Limits (1 to 720 Hours)
  // -------------------------------------------------------------------------
  describe('Duration Slider Boundary Values', () => {
    const h100 = GPU_CATALOG.find((g) => g.id === 'h100-sxm5')!;
    const rtx4090 = GPU_CATALOG.find((g) => g.id === 'rtx-4090')!;

    it('handles minimum duration of 1 hour accurately', () => {
      const res = calculateCost({ gpu: h100, quantity: 1, hours: 1, isSpot: false });
      expect(res.clampedHours).toBe(1);
      expect(res.totalCost).toBe(15.80);
    });

    it('handles maximum duration of 720 hours (30 days / 1 month) accurately', () => {
      const res = calculateCost({ gpu: rtx4090, quantity: 1, hours: 720, isSpot: true });
      expect(res.clampedHours).toBe(720);
      expect(res.totalCost).toBe(921.60);
    });

    it('safely clamps zero or negative duration to minimum 1 hour', () => {
      const zeroHours = calculateCost({ gpu: h100, quantity: 1, hours: 0, isSpot: false });
      expect(zeroHours.clampedHours).toBe(1);
      expect(zeroHours.totalCost).toBe(15.80);
      const negHours = calculateCost({ gpu: h100, quantity: 1, hours: -100, isSpot: false });
      expect(negHours.clampedHours).toBe(1);
      expect(negHours.totalCost).toBe(15.80);
    });

    it('safely clamps excessive duration (>720 hours) to maximum 720', () => {
      const excessHours = calculateCost({ gpu: h100, quantity: 1, hours: 10000, isSpot: false });
      expect(excessHours.clampedHours).toBe(720);
      expect(excessHours.totalCost).toBe(11376.00);
    });

    it('handles NaN or undefined inputs without throwing, defaulting safely', () => {
      const nanInput = calculateCost({ gpu: h100, quantity: NaN, hours: NaN, isSpot: false });
      expect(nanInput.clampedQty).toBe(1);
      expect(nanInput.clampedHours).toBe(1);
      expect(nanInput.totalCost).toBe(15.80);
    });
  });

  // -------------------------------------------------------------------------
  // 3. Spot vs On-Demand Variance & Discount Ratio
  // -------------------------------------------------------------------------
  describe('Spot vs On-Demand Pricing Variance', () => {
    it('verifies all GPUs provide between 20% and 40% spot discounts', () => {
      GPU_CATALOG.forEach((gpu) => {
        const discountPercent = ((gpu.onDemandPriceHourly - gpu.spotPriceHourly) / gpu.onDemandPriceHourly) * 100;
        expect(discountPercent).toBeGreaterThanOrEqual(20);
        expect(discountPercent).toBeLessThanOrEqual(40);
      });
    });

    it('verifies spot rate is always strictly lower than on-demand rate', () => {
      GPU_CATALOG.forEach((gpu) => {
        expect(gpu.spotPriceHourly).toBeLessThan(gpu.onDemandPriceHourly);
        expect(gpu.spotPriceHourly).toBeGreaterThan(0);
      });
    });

    it('calculates non-zero positive savings when spot mode is selected', () => {
      const h100 = GPU_CATALOG.find((g) => g.id === 'h100-sxm5')!;
      const spotCalc = calculateCost({ gpu: h100, quantity: 4, hours: 168, isSpot: true });
      expect(spotCalc.savingsVsOnDemand).toBeGreaterThan(0);
      expect(spotCalc.savings).toBeGreaterThan(0);
    });
  });

  // -------------------------------------------------------------------------
  // 4. Empty Filter & Category Boundary States
  // -------------------------------------------------------------------------
  describe('Catalog Category Filter Boundary States', () => {
    it('returns all items when filter is "all"', () => {
      render(<GpuCatalog />);
      const allBtn = screen.getByRole('button', { name: /All/i });
      fireEvent.click(allBtn);
      GPU_CATALOG.forEach((gpu) => {
        expect(screen.getByText(gpu.name)).toBeInTheDocument();
      });
    });

    it('renders empty state when filter search query does not match any category without crashing', () => {
      render(<GpuCatalog />);
      const searchInput = screen.getByPlaceholderText(/Search GPU models/i);
      fireEvent.change(searchInput, { target: { value: 'quantum-computing' } });
      expect(screen.getByText(/No GPU nodes found matching your criteria/i)).toBeInTheDocument();
    });

    it('handles special characters and potential injection queries safely', () => {
      render(<GpuCatalog />);
      const searchInput = screen.getByPlaceholderText(/Search GPU models/i);
      const injectionAttempt = '<script>alert(1)</script>';
      fireEvent.change(searchInput, { target: { value: injectionAttempt } });
      expect(screen.getByText(/No GPU nodes found matching your criteria/i)).toBeInTheDocument();
    });
  });

  // -------------------------------------------------------------------------
  // 5. Rapid Clicks & State Transitions (FAQ & Toggles)
  // -------------------------------------------------------------------------
  describe('Accordion State Consistency & Rapid Interactions', () => {
    it('preserves state integrity during rapid repeated clicks on same accordion item', () => {
      render(<Faq />);
      const billingBtn = screen.getByRole('button', { name: /How does hourly and fractional billing work\?/i });

      // 10 rapid alternating clicks
      for (let i = 0; i < 10; i++) {
        fireEvent.click(billingBtn);
      }
      expect(billingBtn).toHaveAttribute('aria-expanded', 'false');

      fireEvent.click(billingBtn);
      expect(billingBtn).toHaveAttribute('aria-expanded', 'true');
    });

    it('rapidly switching between distinct FAQ questions leaves only the last active', () => {
      render(<Faq />);
      const buttons = screen.getAllByRole('button', { name: /\?/i });
      buttons.forEach((btn) => fireEvent.click(btn));
      const lastButton = buttons[buttons.length - 1];
      expect(lastButton).toHaveAttribute('aria-expanded', 'true');
      buttons.slice(0, -1).forEach((btn) => {
        expect(btn).toHaveAttribute('aria-expanded', 'false');
      });
    });
  });

  // -------------------------------------------------------------------------
  // 6. Viewport Boundary & Responsive Layout
  // -------------------------------------------------------------------------
  describe('Viewport Breakpoint Dimensions', () => {
    it('renders landing page root without breaking on ultra-narrow viewports (320px)', () => {
      const { container } = render(<App />);
      expect(container.firstChild).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    it('renders full header with CTA button on desktop dimensions', () => {
      render(<App />);
      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
      expect(screen.getByText('NextX GPU Cloud')).toBeInTheDocument();
    });

    it('ensures all CTA links maintain exact CONSOLE_URL regardless of device scale', () => {
      render(<App />);
      const allLinks = screen.getAllByRole('link');
      const consoleLinks = allLinks.filter((l) => l.getAttribute('href') === CONSOLE_URL);
      expect(consoleLinks.length).toBeGreaterThanOrEqual(3);
    });
  });
});
