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
    title: { bn: 'পরিসংখ্যান', en: 'Statistics' },
    icon: BarChart3,
    bgColor: '#EFF6FF',
    route: 'Statistics',
    iconGradientColors: ['#155DFC', '#1447E6'],
  },
  {
    id: '2',
    title: { bn: 'নীতি ও আইন', en: 'Policy & Law' },
    icon: Scale,
    iconGradientColors: ['#009689', '#00786F'],
    bgColor: '#ECFDF5',
    route: 'PolicyLaw',
  },
  {
    id: '3',
    title: { bn: 'জরুরি যোগাযোগ', en: 'Emergency Contact' },
    icon: PhoneCall,
    iconGradientColors: ['#FB2C36', '#E7000B'],
    bgColor: '#FEF2F2',
    route: 'EmergencyContact',
  },
  {
    id: '4',
    title: { bn: 'উদ্যোগসমূহ', en: 'Initiatives' },
    icon: Handshake,
    iconGradientColors: ['#2B7FFF', '#155DFC'],
    bgColor: '#F5F3FF',
    route: 'Initiatives',
  },
  {
    id: '5',
    title: { bn: 'অভিযোগ করুন', en: 'File Complaint' },
    icon: FileText,
    iconGradientColors: ['#FF6900', '#F54900'],
    bgColor: '#FFF7ED',
    route: 'Complaint',
  },
  {
    id: '6',
    title: { bn: 'সংবাদ ও মিডিয়া', en: 'News & Media' },
    icon: Newspaper,
    iconGradientColors: ['#9810FA', '#8200DB'],
    bgColor: '#FDF4FF',
    route: 'NewsMedia',
  },
  {
    id: '7',
    title: { bn: 'প্রতিরোধমূলক ব্যবস্থা', en: 'Preventive Measures' },
    icon: ShieldCheck,
    iconGradientColors: ['#00A63E', '#008236'],
    bgColor: '#F0FDFA',
    route: 'PreventiveMeasures',
  },
  {
    id: '8',
    title: { bn: 'দ্রুত লিংক', en: 'Quick Links' },
    icon: LinkIcon,
    iconGradientColors: ['#00BBA7', '#009689'],
    bgColor: '#F0F9FF',
    route: 'QuickLink',
  },
  {
    id: '9',
    title: { bn: 'পাচারকারী সম্পর্কে তথ্য', en: 'Trafficker Info' },
    icon: Users,
    iconGradientColors: ['#00A63E', '#008236'],
    bgColor: '#F0FDF4',
    route: 'TraffickerInfo',
  },
  {
    id: '10',
    title: { bn: 'সেবা অনুসন্ধান', en: 'Service Search' },
    icon: Search,
    iconGradientColors: ['#155DFC', '#1447E6'],
    bgColor: '#ECFEFF',
    route: 'ServiceSearch',
  },
];

import { useNavigation } from '@react-navigation/native';
import { ScaledSheet } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const languageMode = useSelector((state: RootState) => state.language.mode);

  const renderHeader = () => (
    <View style={styles.headerContent}>
      <Slider />
      <View style={styles.headerTitleContainer}>
        <Text style={styles.headerTitle}>
          {languageMode === 'bn' ? 'সেবা সমূহ' : 'Services'}
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
        title={languageMode === 'bn' ? "জাতীয় মানব পাচার দমন সংস্থা" : "National Authority for Prevention of Human Trafficking"}
        subtitle={languageMode === 'bn' ? "মানবপাচার মোকাবিলায় জাতীয় পর্যায়ে সমন্বিত উদ্যোগ" : "Coordinated National Initiative to Combat Human Trafficking"}
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
            title={item.title[languageMode]}
            icon={item.icon}
            iconGradientColors={item.iconGradientColors}
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
    fontFamily: 'July-Bold',
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
