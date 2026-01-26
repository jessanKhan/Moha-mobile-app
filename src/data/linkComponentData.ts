import {
  Phone,
  ShieldAlert,
  Users,
  MapPin,
  Leaf,
  Link,
  LinkIcon,
} from 'lucide-react-native';

export const quickLinksSectionData = [
  {
    id: '1',
    title: 'হেল্পলাইন',
    gradientColors: ['#E7000B', '#C10007'],
    icon: Phone,
    items: [
      { id: '1-1', text: 'জাতীয় জরুরি সেবা: ৯৯৯', linkIcon: LinkIcon },
      { id: '1-2', text: 'দুর্যোগ ব্যবস্থাপনা: ১০৯০', linkIcon: LinkIcon },
      { id: '1-3', text: 'স্বাস্থ্য বাতায়ন: ১৬২৬৩', linkIcon: LinkIcon },
    ],
  },

  {
    id: '2',
    title: 'মানব পাচার',
    gradientColors: ['#00796B', '#00695C'],
    icon: ShieldAlert,
    items: [
      { id: '2-1', text: 'মানব পাচার বিরোধী আইন', linkIcon: LinkIcon },
      { id: '2-2', text: 'মানব পাচার প্রতিরোধ কমিটি', linkIcon: LinkIcon },
      { id: '2-3', text: 'মানব পাচার সংক্রান্ত অভিযোগ', linkIcon: LinkIcon },
    ],
  },

  {
    id: '3',
    title: 'নারী সহায়তা',
    gradientColors: ['#1D4ED8', '#1E40AF'],
    icon: Users,
    items: [
      { id: '3-1', text: 'BLAST (বাংলাদেশ লিগ্যাল এইড)', linkIcon: LinkIcon },
      { id: '3-2', text: 'নারী সহায়তা হটলাইন: ১০৯', linkIcon: LinkIcon },
    ],
  },

  {
    id: '4',
    title: 'সার্ভিস সেন্টার',
    gradientColors: ['#7C3AED', '#6D28D9'],
    icon: MapPin,
    items: [
      { id: '4-1', text: 'নিকটস্থ থানার অবস্থান', linkIcon: LinkIcon },
      { id: '4-2', text: 'আইনি সহায়তা কেন্দ্র', linkIcon: LinkIcon },
    ],
  },

  {
    id: '5',
    title: 'পরিবেশ সংরক্ষণ',
    gradientColors: ['#0F9D58', '#0B8043'],
    icon: Leaf,
    items: [
      { id: '5-1', text: 'বন অধিদপ্তর', linkIcon: LinkIcon },
      { id: '5-2', text: 'পরিবেশ দূষণ অভিযোগ', linkIcon: LinkIcon },
      { id: '5-3', text: 'বন্যপ্রাণী সুরক্ষা', linkIcon: LinkIcon },
    ],
  },
];
