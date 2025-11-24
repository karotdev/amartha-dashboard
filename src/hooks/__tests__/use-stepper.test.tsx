import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { renderHook, act } from '@testing-library/react';
import { useStepper } from '../use-stepper';

const createWrapper = (initialEntries = ['/']) => {
  return ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
  );
};

describe('useStepper', () => {
  describe('Initial State', () => {
    it('should initialize with step 0 when no step param exists', () => {
      const { result } = renderHook(() => useStepper([]), {
        wrapper: createWrapper(['/']),
      });

      expect(result.current.currentStep).toBe(0);
      expect(result.current.completedSteps.size).toBe(0);
    });

    it('should initialize with step from URL params', () => {
      const { result } = renderHook(() => useStepper([]), {
        wrapper: createWrapper(['/?step=1']),
      });

      expect(result.current.currentStep).toBe(1);
    });

    it('should initialize with completed steps from URL params', () => {
      const { result } = renderHook(() => useStepper([]), {
        wrapper: createWrapper(['/?completed=0,1']),
      });

      expect(result.current.completedSteps.has(0)).toBe(true);
      expect(result.current.completedSteps.has(1)).toBe(true);
      expect(result.current.completedSteps.size).toBe(2);
    });
  });

  describe('handleStepClick', () => {
    it('should update current step when clicking a step', () => {
      const { result } = renderHook(() => useStepper([]), {
        wrapper: createWrapper(['/']),
      });

      act(() => {
        result.current.handleStepClick(2);
      });

      expect(result.current.currentStep).toBe(2);
    });

    it('should preserve completed steps when clicking a step', () => {
      const { result } = renderHook(() => useStepper([]), {
        wrapper: createWrapper(['/?completed=0']),
      });

      act(() => {
        result.current.handleStepClick(1);
      });

      expect(result.current.currentStep).toBe(1);
      expect(result.current.completedSteps.has(0)).toBe(true);
    });
  });

  describe('handleStepComplete', () => {
    it('should mark current step as completed', () => {
      const { result } = renderHook(() => useStepper([]), {
        wrapper: createWrapper(['/']),
      });

      act(() => {
        result.current.handleStepComplete();
      });

      expect(result.current.completedSteps.has(0)).toBe(true);
    });

    it('should advance to next step if not on last step', () => {
      const steps = [
        { id: 'step1', label: 'Step 1' },
        { id: 'step2', label: 'Step 2' },
      ];

      const { result } = renderHook(() => useStepper(steps), {
        wrapper: createWrapper(['/']),
      });

      act(() => {
        result.current.handleStepComplete();
      });

      expect(result.current.currentStep).toBe(1);
      expect(result.current.completedSteps.has(0)).toBe(true);
    });

    it('should not advance step if on last step', () => {
      const steps = [{ id: 'step1', label: 'Step 1' }];

      const { result } = renderHook(() => useStepper(steps), {
        wrapper: createWrapper(['/']),
      });

      act(() => {
        result.current.handleStepComplete();
      });

      expect(result.current.currentStep).toBe(0);
      expect(result.current.completedSteps.has(0)).toBe(true);
    });

    it('should accumulate completed steps', () => {
      const steps = [
        { id: 'step1', label: 'Step 1' },
        { id: 'step2', label: 'Step 2' },
        { id: 'step3', label: 'Step 3' },
      ];

      const { result } = renderHook(() => useStepper(steps), {
        wrapper: createWrapper(['/']),
      });

      act(() => {
        result.current.handleStepComplete();
      });

      expect(result.current.currentStep).toBe(1);
      expect(result.current.completedSteps.has(0)).toBe(true);

      act(() => {
        result.current.handleStepComplete();
      });

      expect(result.current.currentStep).toBe(2);
      expect(result.current.completedSteps.has(0)).toBe(true);
      expect(result.current.completedSteps.has(1)).toBe(true);
    });

    it('should handle completing steps out of order', () => {
      const steps = [
        { id: 'step1', label: 'Step 1' },
        { id: 'step2', label: 'Step 2' },
      ];

      const { result } = renderHook(() => useStepper(steps), {
        wrapper: createWrapper(['/?step=1']),
      });

      act(() => {
        result.current.handleStepComplete();
      });

      expect(result.current.currentStep).toBe(1);
      expect(result.current.completedSteps.has(1)).toBe(true);
    });
  });

  describe('Integration', () => {
    it('should work with multiple steps and navigation', () => {
      const steps = [
        { id: 'basic-info', label: 'Basic Information' },
        { id: 'details', label: 'Details' },
      ];

      const { result } = renderHook(() => useStepper(steps), {
        wrapper: createWrapper(['/']),
      });

      expect(result.current.currentStep).toBe(0);

      act(() => {
        result.current.handleStepComplete();
      });

      expect(result.current.currentStep).toBe(1);
      expect(result.current.completedSteps.has(0)).toBe(true);

      act(() => {
        result.current.handleStepClick(0);
      });

      expect(result.current.currentStep).toBe(0);
      expect(result.current.completedSteps.has(0)).toBe(true);
    });
  });
});
