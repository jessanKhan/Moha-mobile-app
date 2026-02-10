import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import { MapPin, Phone, Users } from 'lucide-react-native';

interface ServiceCenterCardProps {
    name: string;
    address: string;
    phone: string;
    capacity: string;
    onPress?: () => void;
}

const ServiceCenterCard = ({ name, address, phone, capacity, onPress }: ServiceCenterCardProps) => {

    const handleCall = () => {
        Linking.openURL(`tel:${phone}`);
    };

    return (
        <TouchableOpacity activeOpacity={0.9} style={styles.card} onPress={onPress}>
            <Text style={styles.name}>{name}</Text>

            <View style={styles.infoRow}>
                <View style={styles.iconContainer}>
                    <MapPin size={moderateScale(16)} color="#2563EB" />
                </View>
                <Text style={styles.infoText}>{address}</Text>
            </View>

            <TouchableOpacity activeOpacity={0.7} onPress={handleCall} style={styles.infoRow}>
                <View style={styles.iconContainer}>
                    <Phone size={moderateScale(16)} color="#2563EB" />
                </View>
                <Text style={styles.infoText}>{phone}</Text>
            </TouchableOpacity>

            <View style={styles.infoRow}>
                <View style={styles.iconContainer}>
                    <Users size={moderateScale(16)} color="#2563EB" />
                </View>
                <Text style={styles.infoText}>ধারণক্ষমতা: {capacity}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = ScaledSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: '12@ms',
        padding: '16@ms',
        marginBottom: '12@vs',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    name: {
        fontSize: '16@ms',
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: '12@vs',
        fontFamily: 'July-Bold',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '8@vs',
    },
    iconContainer: {
        width: '28@ms',
        height: '28@ms',
        borderRadius: '14@ms',
        backgroundColor: '#EFF6FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '10@ms',
    },
    infoText: {
        fontSize: '14@ms',
        color: '#4B5563',
        flex: 1, // Ensure text wraps if too long
        fontFamily: 'July-Regular',
    },
});

export default ServiceCenterCard;
