import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Linking,
} from 'react-native';
import Header from '../../components/Header';
import { Search, ListFilter, MapPin, Phone } from 'lucide-react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { useRoute, RouteProp } from '@react-navigation/native';

type RootStackParamList = {
    ServiceList: { category: string; title: string };
};

const ServiceListScreen = () => {
    const route = useRoute<RouteProp<RootStackParamList, 'ServiceList'>>();
    const { category, title } = route.params;
    const [searchQuery, setSearchQuery] = useState('');

    const mockData: Record<string, any[]> = {
        rehabilitation: [
            {
                id: '1',
                name: 'নারী ও শিশু পুনর্বাসন কেন্দ্র',
                location: 'মিরপুর, ঢাকা',
                description: 'নারী ও শিশুদের জন্য সম্পূর্ণ পুনর্বাসন সেবা প্রদান করা হয়',
                phone: '0123456789',
            },
            {
                id: '2',
                name: 'চট্টগ্রাম পুনর্বাসন কেন্দ্র',
                location: 'আগ্রাবাদ, চট্টগ্রাম',
                description: 'সামগ্রিক পুনর্বাসন এবং জীবিকা সহায়তা প্রদান',
                phone: '0123456789',
            },
            {
                id: '3',
                name: 'খুলনা নারী পুনর্বাসন',
                location: 'খালিশপুর, খুলনা',
                description: 'নারীদের জন্য বিশেষায়িত পুনর্বাসন কর্মসূচি',
                phone: '0123456789',
            },
        ],
        repatriation: [
            {
                id: '1',
                name: 'নিরাপদ প্রত্যাবর্তন সহায়তা কেন্দ্র',
                location: 'মিরপুর, ঢাকা',
                description: 'বিদেশ থেকে নিরাপদভাবে দেশে ফেরত আসার জন্য সম্পূর্ণ সহায়তা',
                phone: '0123456789',
            },
            {
                id: '2',
                name: 'রাজশাহী প্রত্যাবর্তন সহায়তা',
                location: 'শাহমখদুম, রাজশাহী',
                description: 'সামগ্রিক পুনর্বাসন এবং জীবিকা সহায়তা প্রদান',
                phone: '0123456789',
            },
        ],
        shelter_home: [
            {
                id: '1',
                name: 'সুরক্ষা শেল্টার হোম',
                location: 'মোহাম্মদপুর, ঢাকা',
                description: 'জরুরি নিরাপদ আশ্রয় এবং সাময়িক থাকার ব্যবস্থা',
                phone: '0123456789',
            },
            {
                id: '2',
                name: 'জরুরি শেল্টার - সিলেট',
                location: 'জিন্দাবাজার, সিলেট',
                description: 'সিলেট অঞ্চলে জরুরি আশ্রয় এবং সুরক্ষা সেবা',
                phone: '0123456789',
            },
        ],
    };

    const services = mockData[category] || [];
    const filteredServices = services.filter((s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCall = (phone: string) => {
        Linking.openURL(`tel:${phone}`);
    };

    return (
        <View className="flex-1 bg-[#F8F9FA] dark:bg-black">
            <Header title={title} subtitle="নিরাপদভাবে নিজ দেশে ফেরত যাওয়া" showBackButton={true} />

            <View style={styles.searchContainer}>
                <View style={styles.searchBarWrapper}>
                    <Search color="#9CA3AF" size={moderateScale(20)} />
                    <TextInput
                        placeholder="সেবা বা এলাকা লিখুন"
                        placeholderTextColor="#9CA3AF"
                        className="flex-1 ml-2 text-gray-800 dark:text-gray-100"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
                <TouchableOpacity style={styles.filterButton}>
                    <ListFilter color="#374151" size={moderateScale(20)} />
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1 px-4 py-2" showsVerticalScrollIndicator={false}>
                {filteredServices.map((service) => (
                    <View key={service.id} style={styles.card}>
                        <Text style={styles.serviceName}>{service.name}</Text>

                        <View style={styles.locationRow}>
                            <MapPin color="#6B7280" size={moderateScale(16)} />
                            <Text style={styles.locationText}>{service.location}</Text>
                        </View>

                        <Text style={styles.description}>{service.description}</Text>

                        <View style={styles.buttonRow}>
                            <TouchableOpacity style={styles.detailsButton}>
                                <Text style={styles.detailsButtonText}>বিস্তারিত</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.callButton}
                                onPress={() => handleCall(service.phone)}
                            >
                                <Phone color="white" size={moderateScale(18)} />
                                <Text style={styles.callButtonText}>যোগাযোগ</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
                <View style={{ height: verticalScale(20) }} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        padding: moderateScale(16),
        alignItems: 'center',
        backgroundColor: 'white',
    },
    searchBarWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: moderateScale(12),
        paddingHorizontal: moderateScale(12),
        height: verticalScale(48),
    },
    filterButton: {
        marginLeft: moderateScale(12),
        padding: moderateScale(12),
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: moderateScale(12),
        backgroundColor: 'white',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: moderateScale(16),
        padding: moderateScale(20),
        marginBottom: verticalScale(16),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    serviceName: {
        fontSize: moderateScale(18),
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: verticalScale(8),
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: verticalScale(12),
    },
    locationText: {
        fontSize: moderateScale(14),
        color: '#6B7280',
        marginLeft: moderateScale(4),
    },
    description: {
        fontSize: moderateScale(14),
        color: '#4B5563',
        lineHeight: verticalScale(20),
        marginBottom: verticalScale(20),
    },
    buttonRow: {
        flexDirection: 'row',
        gap: moderateScale(12),
    },
    detailsButton: {
        flex: 1,
        backgroundColor: '#F3F4F6',
        paddingVertical: verticalScale(12),
        borderRadius: moderateScale(10),
        alignItems: 'center',
    },
    detailsButtonText: {
        color: '#374151',
        fontWeight: '600',
        fontSize: moderateScale(15),
    },
    callButton: {
        flex: 1.2,
        flexDirection: 'row',
        backgroundColor: '#2563EB',
        paddingVertical: verticalScale(12),
        borderRadius: moderateScale(10),
        alignItems: 'center',
        justifyContent: 'center',
        gap: moderateScale(8),
    },
    callButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: moderateScale(15),
    },
});

export default ServiceListScreen;
