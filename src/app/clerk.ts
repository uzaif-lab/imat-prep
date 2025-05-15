// Clerk configuration settings for the application

// Application-wide shared appearance settings
export const clerkAppearance = {
  layout: {
    showOptionalFields: false,
    socialButtonsVariant: "iconButton",
    socialButtonsPlacement: "top",
    termsPageUrl: "/terms",
    privacyPageUrl: "/privacy",
    logoPlacement: "inside",
    logoImageUrl: "",
    shimmer: false,
  },
  variables: {
    colorPrimary: '#2563eb',  // blue-600
    borderRadius: '0.375rem', // equivalent to rounded-md
  },
  elements: {
    formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
    footerActionLink: "text-blue-600 hover:text-blue-700 font-medium",
    card: "rounded-lg shadow-md",
    headerTitle: "text-gray-900 text-2xl font-bold",
    headerSubtitle: "text-gray-600",
    socialButtonsIconButton: "border border-gray-300 hover:bg-gray-50",
    dividerText: "text-gray-500",
    formFieldLabel: "text-gray-700 font-medium",
    identityPreviewEditButton: "text-blue-600 hover:text-blue-500",
    formFieldInput: "rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500",
  },
};

// Additional Clerk configuration options
export const clerkOptions = {
  // Configure OAuth providers to prioritize
  oauthOptions: {
    // Make Google the primary provider
    primaryProvider: 'oauth_google', 
    // Define providers to display prominently
    providerIcons: ['oauth_google', 'oauth_github', 'oauth_facebook'],
  },
  // Control verification and sign-in/sign-up preferences
  signUpOptions: {
    // Disable email verification for a faster flow
    emailVerification: false, 
    // Only require minimal information
    requiredFields: ['firstName'],
  },
  // Set redirection behaviors
  redirectOptions: {
    // After sign in, send directly to homepage
    afterSignIn: '/',
    // After sign up, send directly to homepage
    afterSignUp: '/',
  },
}; 