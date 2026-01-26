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
import { scale, verticalScale, moderateScale, ScaledSheet } from 'react-native-size-matters';

const RepatriationScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const services = [
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
    ];

    const filteredServices = services.filter((s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCall = (phone: string) => {
        Linking.openURL(`tel:${phone}`);
    };

    return (
        <View style={styles.container}>
            <Header
                title="প্রত্যাবর্তন"
                subtitle="নিরাপদভাবে নিজ দেশে ফেরত যাওয়া"
                showBackButton={true}
            />

            <View style={styles.searchContainer}>
                <View style={styles.searchBarWrapper}>
                    <Search color="#9CA3AF" size={moderateScale(20)} />
                    <TextInput
                        placeholder="সেবা বা এলাকা লিখুন"
                        placeholderTextColor="#9CA3AF"
                        style={styles.textInput}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
                <TouchableOpacity activeOpacity={0.7} style={styles.filterButton}>
                    <ListFilter color="#374151" size={moderateScale(20)} />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {filteredServices.map((service) => (
                    <View key={service.id} style={styles.card}>
                        <Text style={styles.serviceName}>{service.name}</Text>

                        <View style={styles.locationRow}>
                            <MapPin color="#6B7280" size={moderateScale(16)} />
                            <Text style={styles.locationText}>{service.location}</Text>
                        </View>

                        <Text style={styles.descriptionText}>{service.description}</Text>

                        <View style={styles.buttonRow}>
                            <TouchableOpacity activeOpacity={0.7} style={styles.detailsButton}>
                                <Text style={styles.detailsButtonText}>বিস্তারিত</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={styles.callButton}
                                onPress={() => handleCall(service.phone)}
                            >
                                <Phone color="white" size={moderateScale(18)} />
                                <Text style={styles.callButtonText}>যোগাযোগ</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
                <View style={styles.footerSpacer} />
            </ScrollView>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    searchContainer: {
        flexDirection: 'row',
        padding: '16@ms',
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    searchBarWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: '12@ms',
        paddingHorizontal: '12@ms',
        height: '48@vs',
    },
    textInput: {
        flex: 1,
        marginLeft: '8@ms',
        fontSize: '14@ms',
        color: '#1F2937',
    },
    filterButton: {
        marginLeft: '12@ms',
        padding: '12@ms',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: '12@ms',
        backgroundColor: '#F9FAFB',
    },
    scrollContent: {
        flex: 1,
        paddingHorizontal: '16@ms',
        paddingVertical: '12@vs',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: '16@ms',
        padding: '20@ms',
        marginBottom: '16@vs',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#F3F4F6',
    },
    serviceName: {
        fontSize: '18@ms',
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: '8@vs',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '12@vs',
    },
    locationText: {
        fontSize: '14@ms',
        color: '#6B7280',
        marginLeft: '4@ms',
    },
    descriptionText: {
        fontSize: '14@ms',
        color: '#4B5563',
        lineHeight: '20@ms',
        marginBottom: '20@vs',
    },
    buttonRow: {
        flexDirection: 'row',
        gap: '12@ms',
    },
    detailsButton: {
        flex: 1,
        backgroundColor: '#F3F4F6',
        paddingVertical: '12@vs',
        borderRadius: '10@ms',
        alignItems: 'center',
    },
    detailsButtonText: {
        color: '#374151',
        fontWeight: '600',
        fontSize: '15@ms',
    },
    callButton: {
        flex: 1.2,
        flexDirection: 'row',
        backgroundColor: '#2563EB',
        paddingVertical: '12@vs',
        borderRadius: '10@ms',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8@ms',
    },
    callButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: '15@ms',
    },
    footerSpacer: {
        height: '40@vs',
    },
});

export default RepatriationScreen;
