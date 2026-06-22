const GROWTH_PACKAGES = [
  {
    id: 'starter',
    name: 'Starter Boost',
    priceKsh: 800,
    followers: 500,
    views: 1000,
    likes: 250,
    comments: 20,
    shares: 50,
    profileViews: 50,
    deliveryTime: '24 Hours',
    features: [
      'Real Profile Engagements',
      'No Password Required',
      'Instant Kickoff',
      'Algorithmic Warm-up',
      '24/7 WhatsApp Support'
    ]
  },
  {
    id: 'standard-growth',
    name: 'TikTok Growth Standard',
    priceKsh: 1500,
    followers: 1000,
    views: 2000,
    likes: 500,
    comments: 50,
    shares: 150,
    profileViews: 100,
    deliveryTime: '24 Hours',
    isPopular: true,
    features: [
      'Official Growth Package',
      'Perfect for Creators & Businesses',
      'Organic Interaction Ratios',
      'Algorithmic Push Triggered',
      'Guaranteed Safe Delivery',
      'Dedicated Campaign Manager'
    ]
  },
  {
    id: 'viral-expansion',
    name: 'Viral Acceleration',
    priceKsh: 4000,
    followers: 3000,
    views: 8000,
    likes: 1500,
    comments: 150,
    shares: 400,
    profileViews: 500,
    deliveryTime: '2-3 Days',
    features: [
      'High-Velocity Growth',
      'Enhanced FYP Placement Probability',
      'Multi-Video Distribution Option',
      'Viral Hook Coaching Included',
      'Priority Delivery Queue',
      'Post-Campaign Analytics Review'
    ]
  },
  {
    id: 'creator-pro',
    name: 'Creator Fund Unlocker',
    priceKsh: 12500,
    followers: 10000,
    views: 25000,
    likes: 5000,
    comments: 500,
    shares: 1500,
    profileViews: 2000,
    deliveryTime: '4-6 Days',
    features: [
      'Unlocks TikTok Creator Rewards',
      'Unlocks LIVE Streaming Access',
      'Custom Trend Analysis Reports',
      'Direct Profile Funnel Design',
      'Lifetime Retention Guarantee',
      'Personal Call w/ Growth Specialist'
    ]
  }
];

const PROFESSIONAL_SERVICES = [
  {
    id: 'account-management',
    title: 'Full Account Management',
    description: 'Completely offload your TikTok operations. We optimize your profile, script your content, track trends, and manage daily publishing to turn views into loyal followers.',
    price: 'From KSh 15,000 / mo',
    icon: 'UserCheck',
    bullets: [
      'Bio optimization & brand positioning',
      'Weekly trend forecasting & custom audio briefs',
      'Full script-writing & hook optimization templates',
      'Engagement management (replying to top comments)',
      'Detailed monthly performance analytics'
    ]
  },
  {
    id: 'campaign-management',
    title: 'Viral Campaign Management',
    description: 'Design and launch high-impact campaigns tailored to trend-jacking, custom audio promotion, or product launches. We trigger the TikTok algorithm to work in your favor.',
    price: 'From KSh 10,000 / campaign',
    icon: 'TrendingUp',
    bullets: [
      'Custom campaign concept & brief development',
      'Sound promotion and trend choreography planning',
      'Strategic hashtag & challenge structuring',
      'Ad targeting setup & spend optimization',
      'Comprehensive conversion metrics dashboard'
    ]
  },
  {
    id: 'lead-generation',
    title: 'TikTok Lead Generation',
    description: 'Transform viral attention into qualified business leads. We design high-converting funnel pathways, bio-links, and auto-responders to channel TikTok traffic directly to your sales team.',
    price: 'From KSh 8,500 / setup',
    icon: 'Users',
    bullets: [
      'High-converting Link-in-Bio structure design',
      'Lead magnet creation and hook strategy',
      'WhatsApp sales funnel integration',
      'Automated DM sequence strategy',
      'Targeted audience lead-capture forms setup'
    ]
  }
];

const CASE_STUDIES = [
  {
    id: 'cs1',
    niche: 'Content Creator (Fashion & Lifestyle)',
    username: '@glowbeauty_ke',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop',
    before: {
      followers: 430,
      views: 1200,
      likes: 180,
      engagementRate: '2.4%'
    },
    after: {
      followers: 12500,
      views: 340000,
      likes: 58000,
      engagementRate: '12.8%'
    },
    duration: '21 Days',
    strategy: 'Utilized TikTok Growth Standard package combined with Lead Generation setup to direct users to their WhatsApp merchandise storefront.'
  },
  {
    id: 'cs2',
    niche: 'Local Brand & Production',
    username: '@chomazone_nairobi',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop',
    before: {
      followers: 150,
      views: 650,
      likes: 45,
      engagementRate: '1.2%'
    },
    after: {
      followers: 6800,
      views: 185000,
      likes: 24300,
      engagementRate: '9.5%'
    },
    duration: '14 Days',
    strategy: 'Viral Campaign Management with locally targeted audio trends. Boosted 3 key promotional videos to capture immediate viewer interest.'
  },
  {
    id: 'cs3',
    niche: 'Independent Music Artist',
    username: '@coach_kenya_fit',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&auto=format&fit=crop',
    before: {
      followers: 820,
      views: 3100,
      likes: 620,
      engagementRate: '3.8%'
    },
    after: {
      followers: 24400,
      views: 620000,
      likes: 98500,
      engagementRate: '14.1%'
    },
    duration: '30 Days',
    strategy: 'Full Account Management package with structured sound profile setups and audio distribution targeting local demographics.'
  }
];

const FAQS = [
  {
    question: 'How does the growth campaign work?',
    answer: 'We leverage our proprietary TikTok promotion network, high-engagement groups, and algorithmic distribution strategies to expose your profile and videos to real, targeted users who actively interact with content in your niche.'
  },
  {
    question: 'Is it safe for my TikTok account?',
    answer: '100% safe. We strictly comply with TikTok Terms of Service. Because we do not use bot farms and do not require your account password, there is absolutely zero risk of your account being shadowbanned, suspended, or compromised.'
  },
  {
    question: 'What are the requirements to start?',
    answer: 'We only require three simple things: (1) Your TikTok username, (2) At least one video published on your profile (so we can deliver the views, likes, and shares), and (3) Your willingness to accept promotional requests sent to your account.'
  },
  {
    question: 'Do you need my TikTok password?',
    answer: 'No, we will NEVER ask for your password or any sensitive login credentials. Your security is our utmost priority. All campaigns are initiated externally using public promotional interfaces.'
  },
  {
    question: 'How quickly will I see results?',
    answer: 'Campaigns usually start within 1 to 2 hours of payment. Depending on the size of the package you select, baseline delivery completes safely within a 24-hour turnaround window, maintaining a clean trajectory.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept M-Pesa (Send Money / Lipa na M-Pesa Till Number) for Kenyan clients, and cards/PayPal for international clients. All payment details will be provided and verified during our WhatsApp consultation.'
  },
  {
    question: 'How do I place an order?',
    answer: 'Simply click any "Get Started" or "Order via WhatsApp" button on this website. This will open a short form to capture your details, then generate a pre-filled message and direct you to chat with our growth team on WhatsApp where we will finalize the details.'
  }
];

const WHATSAPP_NUMBER = '254758596269';
