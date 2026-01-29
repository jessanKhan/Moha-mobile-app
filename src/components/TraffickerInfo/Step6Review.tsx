import React from 'react';
import { View, Text } from 'react-native';
import { User, MapPin, FileText } from 'lucide-react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';

interface Props {
    formData: any;
}

const Step6Review = ({ formData }: Props) => (
    <View style={styles.container}>
        <Text style={styles.title}>পর্যালোচনা ও জমা</Text>
        <Text style={styles.subtitle}>তথ্য যাচাই করুন</Text>

        <View style={styles.cardContainer}>
            <View style={styles.reviewCard}>
                <View style={styles.cardHeader}>
                    <View style={styles.iconWrapperBlue}>
                        <User size={moderateScale(20)} color="#2196F3" />
                    </View>
                    <Text style={styles.headerTitle}>পাচারকারীর তথ্য</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>নাম:</Text>
                    <Text style={styles.infoValue}>{formData.name}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>ডাকনাম:</Text>
                    <Text style={styles.infoValue}>{formData.nickname}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>বয়স:</Text>
                    <Text style={styles.infoValue}>{formData.age}</Text>
                </View>
                <View style={[styles.infoRow, { marginBottom: moderateScale(16) }]}>
                    <Text style={styles.infoLabel}>লিঙ্গ:</Text>
                    <Text style={styles.infoValue}>{formData.gender}</Text>
                </View>

                <View style={styles.divider} />

                <Text style={styles.subHeader}>কার্যকলাপ:</Text>
                <View style={styles.tagRow}>
                    {formData.activities.map((act: string) => (
                        <View key={act} style={styles.tag}>
                            <Text style={styles.tagText}>{act}</Text>
                        </View>
                    ))}
                </View>
            </View>

            <View style={styles.reviewCard}>
                <View style={styles.cardHeader}>
                    <View style={styles.iconWrapperTeal}>
                        <MapPin size={moderateScale(20)} color="#00897B" />
                    </View>
                    <Text style={styles.headerTitle}>ঘটনার স্থান ও সময়</Text>
                </View>
                <Text style={styles.locationMain}>{formData.eventPlace}</Text>
                <Text style={styles.locationSub}>তারিখ: ১৯/১/২০২৬</Text>
                <Text style={styles.locationSub}>সময়: ০২:২৪</Text>
            </View>

            <View style={styles.reviewCard}>
                <View style={styles.cardHeader}>
                    <View style={styles.iconWrapperPurple}>
                        <FileText size={moderateScale(20)} color="#8B5CF6" />
                    </View>
                    <Text style={styles.headerTitle}>বিবরণ</Text>
                </View>
                <Text style={styles.descriptionText}>{formData.description}</Text>
            </View>

            <View style={styles.identityNote}>
                <Text style={styles.identityTitle}>আপনার পরিচয়</Text>
                <Text style={styles.identityStatus}>
                    {formData.identityPreference === 'anonymous' ? 'পরিচয় গোপন রেখে জমা দেওয়া হচ্ছে' : 'যোগাযোগ তথ্য প্রদান করা হচ্ছে'}
                </Text>
            </View>
        </View>
    </View>
);

const styles = ScaledSheet.create({
    container: {
        paddingHorizontal: '20@ms',
        paddingVertical: '24@vs',
    },
    title: {
        fontSize: '18@ms',
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: '4@vs',
    },
    subtitle: {
        fontSize: '13@ms',
        color: '#9CA3AF',
        marginBottom: '24@vs',
    },
    cardContainer: {
        gap: '16@vs',
    },
    reviewCard: {
        backgroundColor: 'white',
        borderRadius: '24@ms',
        padding: '20@ms',
        borderWidth: 1,
        borderColor: '#F3F4FB',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 1,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '16@vs',
    },
    iconWrapperBlue: {
        backgroundColor: '#E3F2FD',
        padding: '8@ms',
        borderRadius: '12@ms',
        marginRight: '10@ms',
    },
    iconWrapperTeal: {
        backgroundColor: '#E0F2F1',
        padding: '8@ms',
        borderRadius: '12@ms',
        marginRight: '10@ms',
    },
    iconWrapperPurple: {
        backgroundColor: '#F5F3FF',
        padding: '8@ms',
        borderRadius: '12@ms',
        marginRight: '10@ms',
    },
    headerTitle: {
        fontSize: '11@ms',
        fontWeight: 'bold',
        color: '#9CA3AF',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    infoRow: {
        flexDirection: 'row',
        marginBottom: '6@vs',
    },
    infoLabel: {
        fontSize: '13@ms',
        color: '#6B7280',
        width: '60@ms',
    },
    infoValue: {
        fontSize: '13@ms',
        fontWeight: 'bold',
        color: '#1F2937',
        flex: 1,
    },
    divider: {
        height: 1,
        backgroundColor: '#F3F4FB',
        marginBottom: '16@vs',
    },
    subHeader: {
        fontSize: '11@ms',
        fontWeight: 'bold',
        color: '#9CA3AF',
        marginBottom: '8@vs',
    },
    tagRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '8@ms',
    },
    tag: {
        backgroundColor: '#FEF2F2',
        paddingHorizontal: '12@ms',
        paddingVertical: '4@vs',
        borderRadius: '20@ms',
    },
    tagText: {
        color: '#EF4444',
        fontWeight: 'bold',
        fontSize: '11@ms',
    },
    locationMain: {
        fontSize: '14@ms',
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: '4@vs',
    },
    locationSub: {
        fontSize: '12@ms',
        color: '#6B7280',
        marginBottom: '2@vs',
    },
    descriptionText: {
        fontSize: '13@ms',
        color: '#4B5563',
        lineHeight: '18@ms',
    },
    identityNote: {
        backgroundColor: '#E0F2F1',
        borderRadius: '24@ms',
        padding: '20@ms',
        borderWidth: 1,
        borderColor: '#B2DFDB',
    },
    identityTitle: {
        fontSize: '13@ms',
        fontWeight: 'bold',
        color: '#111827',
    },
    identityStatus: {
        fontSize: '11@ms',
        fontWeight: 'bold',
        color: '#00897B',
        marginTop: '4@vs',
    },
});

export default Step6Review;
