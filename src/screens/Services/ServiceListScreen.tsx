import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import Header from '../../components/Header';
import { Search, ListFilter } from 'lucide-react-native';
import ServiceCenterCard from '../../components/ServiceCenterCard';
import AppBackground from '../../components/AppBackground';
import { useQuery } from '@apollo/client/react';
import { CENTERS_BY_SERVICE_ID } from '../../api/queries';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface Center {
    id: number;
    name: string;
    nameBn: string;
    address: string;
    addressBn: string;
    phone: string;
    phoneBn: string;
    capacity: string;
    capacityBn: string;
}

interface CentersData {
    centersByServiceId: Center[];
}

const ServiceListScreen = () => {
    const route = useRoute<any>();
    const { serviceId, title, subtitle } = route.params || {};
    const [searchQuery, setSearchQuery] = useState('');
    const languageMode = useSelector((state: RootState) => state.language.mode);

    const { data, loading, error } = useQuery<CentersData>(CENTERS_BY_SERVICE_ID, {
        variables: { serviceId: parseFloat(serviceId) },
        skip: !serviceId,
    });

    const centers = data?.centersByServiceId || [];

    const filteredServices = centers.filter((service: any) => {
        const name = languageMode === 'en' ? service.name : service.nameBn;
        const address = languageMode === 'en' ? service.address : service.addressBn;
        return (
            (name?.toLowerCase()?.includes(searchQuery.toLowerCase())) ||
            (address?.toLowerCase()?.includes(searchQuery.toLowerCase()))
        );
    });

    const renderItem = ({ item }: any) => (
        <ServiceCenterCard
            name={languageMode === 'en' ? item.name : item.nameBn}
            address={languageMode === 'en' ? item.address : item.addressBn}
            phone={languageMode === 'en' ? item.phone : item.phoneBn}
            capacity={languageMode === 'en' ? item.capacity : item.capacityBn}
        />
    );

    return (
        <AppBackground>
            <Header 
                title={title || 'Services'} 
                subtitle={subtitle || 'নিরাপদভাবে নিজ দেশে ফেরত যাওয়া'} 
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

            <FlatList
                data={filteredServices}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    loading ? (
                        <ActivityIndicator size="large" color="#ffffff" style={{ marginTop: 20 }} />
                    ) : error ? (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>{languageMode === 'en' ? 'Error loading data' : 'ডাটা লোড করতে সমস্যা হয়েছে'}</Text>
                        </View>
                    ) : (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>{languageMode === 'en' ? 'No centers found' : 'কোন কেন্দ্র পাওয়া যায়নি'}</Text>
                        </View>
                    )
                }
            />
        </AppBackground>
    );
};

const styles = ScaledSheet.create({
    searchContainer: {
        flexDirection: 'row',
        padding: '16@ms',
        alignItems: 'center',
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
