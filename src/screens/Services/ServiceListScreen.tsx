import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import Header from '../../components/Header';
import { Search, ListFilter } from 'lucide-react-native';
import ServiceCenterCard from '../../components/ServiceCenterCard';

const ServiceListScreen = () => {
    const route = useRoute<any>();
    const navigation = useNavigation();
    const { category, title } = route.params || {};
    const [searchQuery, setSearchQuery] = useState('');

    // Mock data - replace with API call later
    const services = [
        { id: '1', name: 'চট্টগ্রাম শিশু সুরক্ষা কেন্দ্র', address: 'নাসিরাবাদ হাউজিং সোসাইটি, চট্টগ্রাম-৪২০৩', phone: '+৮৮০-২-৯১১২২৩৩', capacity: '৫০' },
        { id: '2', name: 'চট্টগ্রাম শিশু সুরক্ষা কেন্দ্র', address: 'নাসিরাবাদ হাউজিং সোসাইটি, চট্টগ্রাম-৪২০৩', phone: '+৮৮০-২-৯১১২২৩৩', capacity: '৫০' },
        { id: '3', name: 'চট্টগ্রাম শিশু সুরক্ষা কেন্দ্র', address: 'নাসিরাবাদ হাউজিং সোসাইটি, চট্টগ্রাম-৪২০৩', phone: '+৮৮০-২-৯১১২২৩৩', capacity: '৫০' },
        { id: '4', name: 'চট্টগ্রাম শিশু সুরক্ষা কেন্দ্র', address: 'নাসিরাবাদ হাউজিং সোসাইটি, চট্টগ্রাম-৪২০৩', phone: '+৮৮০-২-৯১১২২৩৩', capacity: '৫০' },
        { id: '5', name: 'চট্টগ্রাম শিশু সুরক্ষা কেন্দ্র', address: 'নাসিরাবাদ হাউজিং সোসাইটি, চট্টগ্রাম-৪২০৩', phone: '+৮৮০-২-৯১১২২৩৩', capacity: '৫০' },
    ];

    const filteredServices = services.filter(service =>
        service.name.includes(searchQuery) || service.address.includes(searchQuery)
    );

    const renderItem = ({ item }: any) => (
        <ServiceCenterCard
            name={item.name}
            address={item.address}
            phone={item.phone}
            capacity={item.capacity}
        />
    );

    return (
        <View style={styles.container}>
            <Header title={title || 'Services'} subtitle="নিরাপদভাবে নিজ দেশে ফেরত যাওয়া" showBackButton={true} />

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

            <FlatList
                data={filteredServices}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No services found for this category.</Text>
                    </View>
                }
            />
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    searchContainer: {
        flexDirection: 'row',
        padding: '16@ms',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingBottom: '20@vs'
    },
    searchBarWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: '12@ms',
        paddingHorizontal: '12@ms',
        height: '48@vs',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    textInput: {
        flex: 1,
        marginLeft: '10@ms',
        fontSize: '14@ms',
        color: '#1F2937',
        fontFamily: 'July-Regular',
    },
    filterButton: {
        marginLeft: '12@ms',
        padding: '12@ms',
        borderRadius: '12@ms',
        backgroundColor: 'white',
        height: '48@vs',
        width: '48@vs',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    listContainer: {
        padding: '16@ms',
        backgroundColor: 'white',
        paddingBottom: '40@vs',
        flexGrow: 1,
    },
    emptyContainer: {
        padding: '32@ms',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: '14@ms',
        color: '#9CA3AF',
        fontFamily: 'July-Regular',
    },
});

export default ServiceListScreen;
