export interface CountryPaymentConfig {
  code: string;
  name: string;
  flag: string;
  currency: string;
  currencySymbol: string;
  localMethods: string[];
  settlementTime?: string;
  bankTransferSupport: boolean;
  bankDetails: {
    accountName: string;
    bankName: string;
    accountNumber: string;
    routingOrSwift: string;
    transitNumber: string;
    institutionNumber: string;
    transferMethods: string[];
    settlementTime: string;
    autodepositEmail: string;
    fee: string;
    notes?: string;
  };
}

export const CANADA_CONFIG: CountryPaymentConfig = {
  code: 'CA',
  name: 'Canada',
  flag: '🇨🇦',
  currency: 'CAD',
  currencySymbol: 'C$',
  localMethods: [
    'Interac e-Transfer Autodeposit (0-1 days)',
    'Domestic EFT Direct Transfer (0-1 days)',
    'EFT Direct Debit',
  ],
  settlementTime: '0-1 business days',
  bankTransferSupport: true,
  bankDetails: {
    accountName: 'TAM VIET QUANG TECHNOLOGY TRADING DEVELOPMENT JOINT STOCK COMPANY',
    bankName: 'Digital Commerce Bank (Canada)',
    accountNumber: '934770603',
    transitNumber: '10009',
    institutionNumber: '352',
    routingOrSwift: 'Transit: 10009 | Institution: 352',
    autodepositEmail: 'etransfer.934770603@airwallex.com',
    transferMethods: [
      'Interac e-Transfer (Autodeposit)',
      'Domestic EFT Transfer',
    ],
    settlementTime: 'Takes 0-1 business days',
    fee: '0.3% on each deposit received',
    notes: 'Official Airwallex CAD Collection Account with Autodeposit enabled',
  },
};

export const SUPPORTED_COUNTRIES: CountryPaymentConfig[] = [CANADA_CONFIG];
