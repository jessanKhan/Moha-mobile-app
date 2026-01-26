import InitiativesComponent from '../../components/initiativesComponent/InitiativesComponent';
import CustomCommonIcon from '../../components/customCommonIconComponent/CustomCommonIcon';
import { Building, ChartColumn } from 'lucide-react-native';
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
  Search,
} from 'lucide-react-native';

const SERVICES = [
  {
    id: '1',
    title: 'পরিসংখ্যান',
    icon: BarChart3,
    color: '#3B82F6',
    bgColor: '#EFF6FF',
    route: 'Statistics',
  },
  {
    id: '2',
    title: 'নীতি ও আইন',
    icon: Scale,
    color: '#10B981',
    bgColor: '#ECFDF5',
    route: 'PolicyLaw',
  },
  {
    id: '3',
    title: 'জরুরি যোগাযোগ',
    icon: PhoneCall,
    color: '#EF4444',
    bgColor: '#FEF2F2',
    route: 'EmergencyContact',
  },
  {
    id: '4',
    title: 'উদ্যোগসমূহ',
    icon: Handshake,
    color: '#8B5CF6',
    bgColor: '#F5F3FF',
    route: 'Initiatives',
  },
  {
    id: '5',
    title: 'অভিযোগ করুন',
    icon: FileText,
    color: '#F97316',
    bgColor: '#FFF7ED',
    route: 'Complaint',
  },
  {
    id: '6',
    title: 'সংবাদ ও মিডিয়া',
    icon: Newspaper,
    color: '#D946EF',
    bgColor: '#FDF4FF',
    route: 'NewsMedia',
  },
  {
    id: '7',
    title: 'প্রতিরোধমূলক ব্যবস্থা',
    icon: ShieldCheck,
    color: '#14B8A6',
    bgColor: '#F0FDFA',
    route: 'PreventiveMeasures',
  },
  {
    id: '8',
    title: 'দ্রুত লিংক',
    icon: LinkIcon,
    color: '#0EA5E9',
    bgColor: '#F0F9FF',
    route: 'QuickLink',
  },
  {
    id: '9',
    title: 'পাচারকারী সম্পর্কে তথ্য',
    icon: Users,
    color: '#22C55E',
    bgColor: '#F0FDF4',
    route: 'TraffickerInfo',
  },
  {
    id: '10',
    title: 'সেবা অনুসন্ধান',
    icon: Search,
    color: '#06B6D4',
    bgColor: '#ECFEFF',
    route: 'ServiceSearch',
  },
];

import { useNavigation } from '@react-navigation/native';
import { ScaledSheet } from 'react-native-size-matters';

const HomeScreen = () => {
  const navigation = useNavigation<any>();

  const renderHeader = () => (
    <View style={styles.headerContent}>
      <Slider />
      <View style={styles.headerTitleContainer}>
        <Text style={styles.headerTitle}>
          সেবা সমূহ
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Header
        variant="home"
        title="জাতীয় মানব পাচার দমন সংস্থা"
        subtitle="মানবপাচার মোকাবিলায় জাতীয় পর্যায়ে সমন্বিত উদ্যোগ"
        rightComponent={
          <View style={styles.profileContainer}>
            <View style={styles.profilePlaceholder}>
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
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={() => (
          <View style={styles.footer}>
            <BottomBanner onPress={() => navigation.navigate('AboutTrafficking')} />
            <HotlineBar />
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContent: {
    backgroundColor: 'white',
  },
  headerTitleContainer: {
    paddingHorizontal: '20@ms',
    marginTop: '8@vs',
    marginBottom: '16@vs',
  },
  headerTitle: {
    fontSize: '20@ms',
    fontWeight: 'bold',
    color: '#1E293B',
  },
  profileContainer: {
    height: '40@ms',
    width: '40@ms',
    borderRadius: '20@ms',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  profilePlaceholder: {
    height: '100%',
    width: '100%',
    borderRadius: '20@ms',
    backgroundColor: '#D1D5DB',
    overflow: 'hidden',
  },
  columnWrapper: {
    paddingHorizontal: '12@ms',
  },
  footer: {
    paddingBottom: '20@vs',
  },
});

export default HomeScreen;
