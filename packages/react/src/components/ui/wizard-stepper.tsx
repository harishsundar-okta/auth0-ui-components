'use client';

import * as React from 'react';

import { Stepper, Step, StepTitle, StepDescription } from './stepper';

export interface WizardStep {
  id?: string;
  title: string;
  description?: string;
}

interface WizardStepperProps {
  steps: WizardStep[];
  currentStep?: number;
  onStepClick?: (stepIndex: number, stepId?: string) => void;
  enableAllSteps?: boolean;
  className?: string;
  hideNumbers?: boolean;
}

function WizardStepper({
  steps,
  currentStep = 0,
  onStepClick,
  enableAllSteps = false,
  className,
  hideNumbers = true,
}: WizardStepperProps) {
  const handleStepClick = React.useCallback(
    (stepIndex: number, stepId?: string) => {
      if (!onStepClick) return;

      if (stepIndex === currentStep) return;

      if (!enableAllSteps && stepIndex > currentStep) return;

      onStepClick(stepIndex, stepId);
    },
    [currentStep, onStepClick, enableAllSteps],
  );

  return (
    <Stepper
      currentStep={currentStep}
      onStepClick={handleStepClick}
      enableAllSteps={!!onStepClick}
      className={className}
    >
      {steps.map((step, index) => (
        <Step key={step.id || index} step={index} id={step.id} hideNumber={hideNumbers}>
          <StepTitle className="text-(length:--font-size-label)">{step.title}</StepTitle>
          {step.description && <StepDescription>{step.description}</StepDescription>}
        </Step>
      ))}
    </Stepper>
  );
}

export { WizardStepper };
export type { WizardStepperProps };
