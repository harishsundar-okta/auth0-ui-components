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
  onStepClick?: (stepIndex: number, stepId: string) => void;
  allowClickableSteps?: boolean;
  className?: string;
  hideNumbers?: boolean;
}

function WizardStepper({
  steps,
  currentStep = 0,
  onStepClick,
  allowClickableSteps = false,
  className,
  hideNumbers = true,
}: WizardStepperProps) {
  const handleStepClick = React.useCallback(
    (stepIndex: number, stepId?: string) => {
      if (!onStepClick || !stepId) return;

      if (stepIndex === currentStep) return;

      if (!allowClickableSteps && stepIndex > currentStep) return;

      onStepClick(stepIndex, stepId);
    },
    [currentStep, onStepClick, allowClickableSteps],
  );

  return (
    <Stepper
      currentStep={currentStep}
      onStepClick={handleStepClick}
      allowClickableSteps={!!onStepClick}
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
