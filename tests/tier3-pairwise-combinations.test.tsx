import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../src/App';
import { Navbar } from '../src/components/Navbar';
import { PricingEstimator } from '../src/components/PricingEstimator';
import { GpuCatalog } from '../src/components/GpuCatalog';
import { CONSOLE_URL } from '../src/config/site';
import { GPU_CATALOG } from '../src/data/gpuData';
import { calculateCost } from '../src/utils/pricing';

describe('Tier 3: Pairwise Combinatorial & Cross-Feature Testing (16+ Tests)', () => {
  // -------------------------------------------------------------------------
  // 1. Combinatorial Pricing Matrix (Model + Qty + Duration + Spot Mode)
  // -------------------------------------------------------------------------
  describe('Hardware Model x Quantity x Duration x Pricing Mode Matrices', () => {
    it('Pair 1: H100 SXM5 + Max Nodes (8) + 1 Week (168h) + Spot Mode', () => {
      const h100 = GPU_CATALOG.find((g) => g.id === 'h100-sxm5')!;
      const result = calculateCost({ gpu: h100, quantity: 8, hours: 168, isSpot: true });
      expect(result.effectiveHourlyRateTotal).toBe(88.00);
      expect(result.totalCost).toBe(14784.00);
      expect(result.savingsVsOnDemand).toBeGreaterThan(0);
    });

    it('Pair 2: H100 SXM5 + Min Node (1) + Min Duration (1h) + On-Demand', () => {
      const h100 = GPU_CATALOG.find((g) => g.id === 'h100-sxm5')!;
      const result = calculateCost({ gpu: h100, quantity: 1, hours: 1, isSpot: false });
      expect(result.effectiveHourlyRateTotal).toBe(15.80);
      expect(result.totalCost).toBe(15.80);
      expect(result.savingsVsOnDemand).toBe(0);
    });

    it('Pair 3: RTX 4090 + Max Nodes (8) + Max Duration (720h) + On-Demand', () => {
      const rtx4090 = GPU_CATALOG.find((g) => g.id === 'rtx-4090')!;
      const result = calculateCost({ gpu: rtx4090, quantity: 8, hours: 720, isSpot: false });
      expect(result.effectiveHourlyRateTotal).toBe(15.04);
      expect(result.totalCost).toBe(10828.80);
      expect(result.savingsVsOnDemand).toBe(0);
    });

    it('Pair 4: RTX 4090 + Single Node (1) + 24 Hours + Spot Mode', () => {
      const rtx4090 = GPU_CATALOG.find((g) => g.id === 'rtx-4090')!;
      const result = calculateCost({ gpu: rtx4090, quantity: 1, hours: 24, isSpot: true });
      expect(result.effectiveHourlyRateTotal).toBe(1.28);
      expect(result.totalCost).toBe(30.72);
      expect(result.savingsVsOnDemand).toBe(14.40);
    });

    it('Pair 5: RTX 3090 + 4 Nodes + 48 Hours + Spot Mode', () => {
      const rtx3090 = GPU_CATALOG.find((g) => g.id === 'rtx-3090')!;
      const result = calculateCost({ gpu: rtx3090, quantity: 4, hours: 48, isSpot: true });
      expect(result.effectiveHourlyRateTotal).toBe(3.52);
      expect(result.totalCost).toBe(168.96);
      expect(result.savingsVsOnDemand).toBe(72.96);
    });

    it('Pair 6: RTX 6000 Ada + 2 Nodes + 168 Hours + On-Demand', () => {
      const rtx6000 = GPU_CATALOG.find((g) => g.id === 'rtx-6000-ada')!;
      const result = calculateCost({ gpu: rtx6000, quantity: 2, hours: 168, isSpot: false });
      expect(result.effectiveHourlyRateTotal).toBe(15.60);
      expect(result.totalCost).toBe(2620.80);
    });
  });

  // -------------------------------------------------------------------------
  // 2. State Retention across Model / Mode Switches
  // -------------------------------------------------------------------------
  describe('State Preservation across Switches', () => {
    it('Pair 7: Changing GPU model preserves chosen quantity and hours in UI', () => {
      render(<PricingEstimator />);
      const qtySlider = screen.getByLabelText(/GPU Quantity/i);
      const hoursSlider = screen.getByLabelText(/Instance Duration/i);

      fireEvent.change(qtySlider, { target: { value: '4' } });
      fireEvent.change(hoursSlider, { target: { value: '120' } });

      const rtx4090Btn = screen.getByRole('button', { name: /RTX 4090/i });
      fireEvent.click(rtx4090Btn);

      expect((qtySlider as HTMLInputElement).value).toBe('4');
      expect((hoursSlider as HTMLInputElement).value).toBe('120');
      expect(screen.getByText(/¥1\.88\/hr/i)).toBeInTheDocument();
    });

    it('Pair 8: Toggling spot mode preserves selected GPU model and node count in UI', () => {
      render(<PricingEstimator showSpotToggle />);
      const a100Btn = screen.getByRole('button', { name: /A100 SXM4/i });
      fireEvent.click(a100Btn);

      const qtySlider = screen.getByLabelText(/GPU Quantity/i);
      fireEvent.change(qtySlider, { target: { value: '2' } });

      const spotToggle = screen.getByRole('switch', { name: /Spot Instance/i });
      fireEvent.click(spotToggle);

      expect((qtySlider as HTMLInputElement).value).toBe('2');
      expect(screen.getByText(/¥5\.30\/hr/i)).toBeInTheDocument();
    });
  });

  // -------------------------------------------------------------------------
  // 3. Category Filter & Search Combinations
  // -------------------------------------------------------------------------
  describe('Category Filtering Combined with Search Queries', () => {
    it('Pair 9: Enterprise category filter + search "H100" returns H100 SXM5', () => {
      render(<GpuCatalog />);
      const enterpriseBtn = screen.getByRole('button', { name: /Enterprise/i });
      fireEvent.click(enterpriseBtn);
      const searchInput = screen.getByPlaceholderText(/Search GPU models/i);
      fireEvent.change(searchInput, { target: { value: 'H100' } });
      expect(screen.getByText('NVIDIA H100 SXM5')).toBeInTheDocument();
      expect(screen.queryByText('NVIDIA RTX 4090')).not.toBeInTheDocument();
    });

    it('Pair 10: Consumer category filter + search "4090" returns RTX 4090', () => {
      render(<GpuCatalog />);
      const consumerBtn = screen.getByRole('button', { name: /Consumer/i });
      fireEvent.click(consumerBtn);
      const searchInput = screen.getByPlaceholderText(/Search GPU models/i);
      fireEvent.change(searchInput, { target: { value: '4090' } });
      expect(screen.getByText('NVIDIA RTX 4090')).toBeInTheDocument();
      expect(screen.queryByText('NVIDIA H100 SXM5')).not.toBeInTheDocument();
    });

    it('Pair 11: Consumer category filter + search "H100" returns empty set (partition isolation)', () => {
      render(<GpuCatalog />);
      const consumerBtn = screen.getByRole('button', { name: /Consumer/i });
      fireEvent.click(consumerBtn);
      const searchInput = screen.getByPlaceholderText(/Search GPU models/i);
      fireEvent.change(searchInput, { target: { value: 'H100' } });
      expect(screen.getByText(/No GPU nodes found matching your criteria/i)).toBeInTheDocument();
    });

    it('Pair 12: Enterprise category filter + search "RTX 3090" returns empty set', () => {
      render(<GpuCatalog />);
      const enterpriseBtn = screen.getByRole('button', { name: /Enterprise/i });
      fireEvent.click(enterpriseBtn);
      const searchInput = screen.getByPlaceholderText(/Search GPU models/i);
      fireEvent.change(searchInput, { target: { value: 'RTX 3090' } });
      expect(screen.getByText(/No GPU nodes found matching your criteria/i)).toBeInTheDocument();
    });
  });

  // -------------------------------------------------------------------------
  // 4. UI Cross-Section Combinations (FAQ + Estimator, Drawer + CTA)
  // -------------------------------------------------------------------------
  describe('UI Component Cross-Section Combinations', () => {
    it('Pair 13: FAQ open state does not conflict with Estimator calculation state', () => {
      render(<App />);
      const billingBtn = screen.getByRole('button', { name: /How does hourly and fractional billing work\?/i });
      fireEvent.click(billingBtn);
      expect(billingBtn).toHaveAttribute('aria-expanded', 'true');

      const qtySlider = screen.getByLabelText(/GPU Quantity/i);
      fireEvent.change(qtySlider, { target: { value: '4' } });

      expect(billingBtn).toHaveAttribute('aria-expanded', 'true');
    });

    it('Pair 14: Mobile drawer open state closes cleanly upon clicking navigation anchor', () => {
      render(<Navbar />);
      const hamburger = screen.getByRole('button', { name: /Toggle Navigation Menu/i });
      fireEvent.click(hamburger);

      const pricingLink = screen
        .getAllByRole('link', { name: /Pricing Estimator/i })
        .find((l) => l.closest('#mobile-drawer'));
      expect(pricingLink).toBeInTheDocument();
      fireEvent.click(pricingLink!);

      expect(document.getElementById('mobile-drawer')).toBeNull();
    });

    it('Pair 15: Mobile drawer open state triggers CTA navigation directly to CONSOLE_URL', () => {
      render(<Navbar />);
      const hamburger = screen.getByRole('button', { name: /Toggle Navigation Menu/i });
      fireEvent.click(hamburger);

      const drawer = document.getElementById('mobile-drawer');
      const drawerConsole = drawer?.querySelector(`a[href="${CONSOLE_URL}"]`);
      expect(drawerConsole).toBeInTheDocument();
      expect(drawerConsole).toHaveAttribute('target', '_blank');

      fireEvent.click(drawerConsole!);
      expect(document.getElementById('mobile-drawer')).toBeNull();
    });

    it('Pair 16: Hardware cost-efficiency ratio (TFLOPS per hourly RMB) comparison matrix', () => {
      const rtx4090 = GPU_CATALOG.find((g) => g.id === 'rtx-4090')!;
      const h100 = GPU_CATALOG.find((g) => g.id === 'h100-sxm5')!;

      const ratio4090 = rtx4090.tflopsFp16 / rtx4090.spotPriceHourly;
      const ratioH100 = h100.tflopsFp16 / h100.spotPriceHourly;

      expect(ratio4090).toBeGreaterThan(150);
      expect(ratioH100).toBeGreaterThan(100);
    });
  });
});
