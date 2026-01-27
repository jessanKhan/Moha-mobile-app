import {
  Phone,
  ShieldAlert,
  Users,
  MapPin,
  Leaf,
  Link,
  LinkIcon,
  House,
  Scale,
  HeartHandshake,
  Globe,
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
    title: 'আশ্রয় কেন্দ্র',
    gradientColors: ['#00796B', '#00695C'],
    icon: House,
    items: [
      { id: '2-1', text: 'ঢাকা আশ্রয় কেন্দ্র', linkIcon: LinkIcon },
      { id: '2-2', text: 'চট্টগ্রাম নিরাপদ আশ্রয়', linkIcon: LinkIcon },
      { id: '2-3', text: 'সিলেট মহিলা সহায়তা কেন্দ্র', linkIcon: LinkIcon },
    ],
  },

  {
    id: '3',
    title: 'আইনি সহায়তা',
    gradientColors: ['#1D4ED8', '#1E40AF'],
    icon: Scale,
    items: [
      { id: '3-1', text: 'BLAST (বাংলাদেশ লিগ্যাল এইড)', linkIcon: LinkIcon },
      {
        id: '3-2',
        text: 'জাতীয় আইনি সহায়তা প্রদান সংস্থা',
        linkIcon: LinkIcon,
      },
    ],
  },

  {
    id: '4',
    title: 'কাউন্সেলিং সেবা',
    gradientColors: ['#7C3AED', '#6D28D9'],
    icon: HeartHandshake,
    items: [
      {
        id: '4-1',
        text: 'মানসিক স্বাস্থ্য পরামর্শ হটলাইন',
        linkIcon: LinkIcon,
      },
      { id: '4-2', text: 'আশা ফাউন্ডেশন কাউন্সেলিং', linkIcon: LinkIcon },
    ],
  },

  {
    id: '5',
    title: 'সরকারি ওয়েবসাইট',
    gradientColors: ['#0F9D58', '#0B8043'],
    icon: Globe,
    items: [
      { id: '5-1', text: 'স্বরাষ্ট্র মন্ত্রণালয়', linkIcon: LinkIcon },
      {
        id: '5-2',
        text: 'মহিলা ও শিশু বিষয়ক মন্ত্রণালয়',
        linkIcon: LinkIcon,
      },
      { id: '5-3', text: 'বাংলাদেশ পুলিশ', linkIcon: LinkIcon },
    ],
  },
];
