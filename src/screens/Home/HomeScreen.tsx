import React from 'react';
import { View, Text, FlatList, StatusBar } from 'react-native';
import Header from '../../components/Header';
import Slider from '../../components/Home/Slider';
import ServiceCard from '../../components/Home/ServiceCard';
import BottomBanner from '../../components/Home/BottomBanner';
import HotlineBar from '../../components/Home/HotlineBar';
import {
  BarChart3,
  Scale,
  PhoneCall,
  Handshake,
  FileText,
  Newspaper,
  ShieldCheck,
  Link as LinkIcon,
  Users,
  Search
} from 'lucide-react-native';

const SERVICES = [
  { id: '1', title: 'পরিসংখ্যান', icon: BarChart3, color: '#3B82F6', bgColor: '#EFF6FF', route: 'Statistics' },
  { id: '2', title: 'নীতি ও আইন', icon: Scale, color: '#10B981', bgColor: '#ECFDF5', route: 'PolicyLaw' },
  { id: '3', title: 'জরুরি যোগাযোগ', icon: PhoneCall, color: '#EF4444', bgColor: '#FEF2F2', route: 'EmergencyContact' },
  { id: '4', title: 'উদ্যোগসমূহ', icon: Handshake, color: '#8B5CF6', bgColor: '#F5F3FF', route: 'Initiatives' },
  { id: '5', title: 'অভিযোগ করুন', icon: FileText, color: '#F97316', bgColor: '#FFF7ED', route: 'Complaint' },
  { id: '6', title: 'সংবাদ ও মিডিয়া', icon: Newspaper, color: '#D946EF', bgColor: '#FDF4FF', route: 'NewsMedia' },
  { id: '7', title: 'প্রতিরোধমূলক ব্যবস্থা', icon: ShieldCheck, color: '#14B8A6', bgColor: '#F0FDFA', route: 'PreventiveMeasures' },
  { id: '8', title: 'দ্রুত লিংক', icon: LinkIcon, color: '#0EA5E9', bgColor: '#F0F9FF', route: 'QuickLink' },
  { id: '9', title: 'পাচারকারী সম্পর্কে তথ্য', icon: Users, color: '#22C55E', bgColor: '#F0FDF4', route: 'TraffickerInfo' },
  { id: '10', title: 'সেবা অনুসন্ধান', icon: Search, color: '#06B6D4', bgColor: '#ECFEFF', route: 'ServiceSearch' },
];

import { useNavigation } from '@react-navigation/native';
import { ScaledSheet } from 'react-native-size-matters';

const HomeScreen = () => {
  const navigation = useNavigation<any>();

  const renderHeader = () => (
    <View className="bg-white dark:bg-black">
      <Slider />
      <View style={styles.headerTitleContainer}>
        <Text
          className="font-bold text-slate-800 dark:text-white"
          style={styles.headerTitle}
        >
          সেবা সমূহ
        </Text>
      </View>
    </View>
  );



  return (
    <View className="flex-1 bg-white dark:bg-black">
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <Header
        variant="home"
        title="জাতীয় মানব পাচার দমন সংস্থা"
        subtitle="মানবপাচার মোকাবিলায় জাতীয় পর্যায়ে সমন্বিত উদ্যোগ"
        rightComponent={
          <View className="h-10 w-10 rounded-full bg-white/20 items-center justify-center border border-white/30">
            {/* Profile placeholder */}
            <View className="h-full w-full rounded-full bg-gray-300 overflow-hidden">
              {/* Image can go here */}
            </View>
          </View>
        }
      />
      <FlatList
        data={SERVICES}
        renderItem={({ item }) => (
          <ServiceCard
            title={item.title}
            icon={item.icon}
            iconBgColor={item.color}
            onPress={() => navigation.navigate(item.route)}
          />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ paddingHorizontal: 12 }}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={() => (
          <View>
            <BottomBanner />
            <View className="h-4" />
            <HotlineBar />
            <View className="h-4" />
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />


    </View>
  );
};
const styles = ScaledSheet.create({
  headerTitleContainer: {
    paddingHorizontal: '16@s',
    marginTop: '8@vs',
    marginBottom: '16@vs'
  },
  headerTitle: {
    fontSize: '20@ms'
  }
});
export default HomeScreen;
