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
import { useNavigation } from '@react-navigation/native';
import { ScaledSheet } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useQuery } from '@apollo/client/react';
import { GET_SLIDERS_QUERY, COMPONENTS_QUERY } from '../../api/queries';
import AppBackground from '../../components/AppBackground';

const ICON_MAPPING: { [key: string]: any } = {
  BarChart3,
  Scale,
  PhoneCall,
  Handshake,
  FileText,
  Newspaper,
  ShieldCheck,
  Link2: LinkIcon,
  Users,
  Search,
};

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const languageMode = useSelector((state: RootState) => state.language.mode);

  const { data: sliderData } = useQuery<any>(GET_SLIDERS_QUERY, {
    variables: { page: 1, limit: 5 },
    fetchPolicy: 'cache-and-network',
  });

  const { data: componentsData } = useQuery<any>(COMPONENTS_QUERY, {
    variables: { page: 1, limit: 100 },
    fetchPolicy: 'cache-and-network',
  });

  const renderHeader = () => (
    <View style={styles.headerContent}>
      <Slider sliders={sliderData?.sliders || []} />
      <View style={styles.headerTitleContainer}>
        <Text style={styles.headerTitle}>
          {languageMode === 'bn' ? 'সেবা সমূহ' : 'Services'}
        </Text>
      </View>
    </View>
  );

  return (
    <AppBackground>
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
        data={(componentsData?.components || []).filter(
          (item: any) => item.isMobile === 'YES' && item.mobileRouteName !== 'AboutTrafficking'
        )}
        renderItem={({ item }) => (
          <ServiceCard
            title={languageMode === 'bn' ? item.labelBn : item.label}
            icon={ICON_MAPPING[item.iconName] || Search}
            iconGradientColors={item.iconGradientColors}
            onPress={() => navigation.navigate(item.mobileRouteName, { componentId: item.id })}
          />
        )}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={() => {
          const aboutTraffickingComponent = (componentsData?.components || []).find(
            (item: any) => item.mobileRouteName === 'AboutTrafficking' && item.isMobile === 'YES'
          );

          return (
            <View style={styles.footer}>
              <BottomBanner
                onPress={() =>
                  navigation.navigate('AboutTrafficking', {
                    componentId: aboutTraffickingComponent?.id,
                  })
                }
                thumbnailPath={aboutTraffickingComponent?.thumbnailPath}
                title={
                  languageMode === 'bn'
                    ? aboutTraffickingComponent?.labelBn
                    : aboutTraffickingComponent?.label
                }
              />
              <HotlineBar />
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
      />
    </AppBackground>
  );
};

const styles = ScaledSheet.create({
  headerContent: {
    backgroundColor: 'transparent',
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
