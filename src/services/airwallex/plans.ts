export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  monthlyCad: number;
  features: string[];
  recommended?: boolean;
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'starter',
    name: 'Starter Fleet (Micro Test)',
    description: 'Micro-payment test plan (~10,000 VND / ~50 cents CAD)',
    monthlyCad: 0.50, // 0.50 CAD ~ 9.000 - 10.000 VND
    features: [
      'Up to 5 active drivers / vehicles',
      'Smart AI route optimization across Canada',
      'Barcode & QR code scanner via mobile app',
      'Weekly performance analytics & fuel reporting',
      'Standard 24/7 Canadian email support',
    ],
  },
  {
    id: 'professional',
    name: 'Professional Team',
    description: 'Affordable fleet testing plan (~1.00 CAD)',
    monthlyCad: 1.00, // 1.00 CAD
    recommended: true,
    features: [
      'Up to 25 active drivers / vehicles',
      'Real-time traffic rerouting & weather alerts (Snow/Ice)',
      'Advanced reporting with CRA-compliant expense export',
      'Full RouteAI API access & integrations',
      'Fast Interac e-Transfer automated reconciliation',
      'Priority Canadian phone & chat support',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise Scale',
    description: 'Testing plan for enterprise fleet workflow (~2.00 CAD)',
    monthlyCad: 2.00, // 2.00 CAD
    features: [
      'Unlimited drivers & vehicles across all provinces',
      'Multi-depot automated AI dispatching',
      'Dedicated private cloud infrastructure & 99.9% SLA',
      'Custom role-based permissions & franchise management',
      'Dedicated Canadian account manager & custom onboarding',
    ],
  },
];
